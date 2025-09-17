'use client';

import { Download, RotateCcw, Upload } from 'lucide-react';

import { Button } from '@/platform/component/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/platform/component/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/platform/component/ui/drawer';
import { DrawerFooter } from '@/platform/component/ui/drawer';
import { useEffect } from 'react';
import ResumeBuilder from '@/modules/editor/view/component/ResumeBuilder';
import { exportToPDFUseCase } from '../../domain/useCase/exportToPDFUseCase';
import { useResumeStore } from '@/app/store/resumeStore';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ResumeEditorScreen() {
  const { clearAllData, loadFromJSON, resumeData } = useResumeStore();
  const [isExporting, setIsExporting] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [autoPrompted, setAutoPrompted] = useState(false);

  useEffect(() => {
    const isEmpty =
      !resumeData.personalInfo.name &&
      resumeData.experiences.length === 0 &&
      resumeData.education.length === 0 &&
      resumeData.skills.length === 0 &&
      resumeData.summary.content.trim().length === 0;

    // Auto-open only once if empty; close if data becomes non-empty and we opened automatically
    if (isEmpty && !autoPrompted && !openUpload) {
      setOpenUpload(true);
      setAutoPrompted(true);
    } else if (!isEmpty && autoPrompted && openUpload) {
      setOpenUpload(false);
      setAutoPrompted(false);
    }
  }, [resumeData, autoPrompted, openUpload]);

  useEffect(() => {
    const update = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 1024);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const onUploadFileSelected = async (file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB (hard limit before any compression)
    if (file.size > maxSize) {
      toast.error('File too large. Please upload a PDF under 5MB.');
      return;
    }
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are supported.');
      return;
    }
    const loadingId = toast.loading('Uploading and parsing your resume...');
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/resume/upload', { method: 'POST', body: form });
      if (!res.ok) {
        throw new Error('Upload failed');
      }
      const data = await res.json();
      if (data?.resumeData) {
        loadFromJSON(data.resumeData);
        setOpenUpload(false);
        setSelectedFileName(file.name);
        toast.success('Resume parsed and prefilling completed.', { id: loadingId });
      } else {
        toast.error('Unexpected response from server.', { id: loadingId });
      }
    } catch (error) {
      console.error('Upload or parsing failed:', error);
      toast.error('Failed to process resume. Please try again.', { id: loadingId });
    }
  };

  // Removed draft save/load UI in simplified editor

  const clearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      clearAllData();
    }
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    await exportToPDFUseCase(resumeData);
    setIsExporting(false);
  };

  const UploadBody = (
    <>
      <DialogDescription>
        We will parse your PDF and prefill the editor using AI. PDFs only, max 5MB.
      </DialogDescription>
      <div
        role="button"
        className="mt-4 border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50"
        onClick={() => document.getElementById('resume-file-input')?.click()}
        onDragOver={(ev) => ev.preventDefault()}
        onDrop={(ev) => {
          ev.preventDefault();
          const dropped = ev.dataTransfer.files?.[0];
          if (dropped) {
            setSelectedFile(dropped);
            setSelectedFileName(dropped.name);
          }
        }}
      >
        <p className="text-sm text-gray-700">Drag and drop your PDF here, or click to choose</p>
      </div>
      <input
        id="resume-file-input"
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) {
            setSelectedFile(f);
            setSelectedFileName(f.name);
          }
        }}
      />
      {selectedFileName && (
        <p className="mt-2 text-xs text-gray-600">Selected file: {selectedFileName}</p>
      )}
    </>
  );

  const ConfirmActions = (
    <div className="mt-4 flex justify-end gap-2">
      <Button
        variant="default"
        size="sm"
        disabled={!selectedFile}
        onClick={() => {
          if (selectedFile) onUploadFileSelected(selectedFile);
        }}
      >
        Confirm & Parse
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Editor Actions Header */}
      <div className="bg-white px-6 py-4">
        <div className="space-y-4">
          <h1 className="text-xl font-semibold text-gray-900">Resume Editor for Ray</h1>
          <div className="flex flex-wrap items-center gap-2">
            {isMobile ? (
              <Drawer
                open={openUpload}
                onOpenChange={(open) => {
                  setOpenUpload(open);
                  if (!open) {
                    setSelectedFile(null);
                    setSelectedFileName('');
                  }
                }}
                direction="bottom"
              >
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Resume (PDF)
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Upload your resume</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 pb-2">{UploadBody}</div>
                  <DrawerFooter>
                    <div className="w-full flex justify-end">
                      <Button
                        variant="default"
                        size="sm"
                        disabled={!selectedFile}
                        onClick={() => {
                          if (selectedFile) onUploadFileSelected(selectedFile);
                        }}
                      >
                        Confirm & Parse
                      </Button>
                    </div>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            ) : (
              <Dialog
                open={openUpload}
                onOpenChange={(open) => {
                  setOpenUpload(open);
                  if (!open) {
                    setSelectedFile(null);
                    setSelectedFileName('');
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Resume (PDF)
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload your resume</DialogTitle>
                    {UploadBody}
                  </DialogHeader>
                  {ConfirmActions}
                </DialogContent>
              </Dialog>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={clearData}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Clear All
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={exportToPDF}
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Editor Content */}
      <main className="flex-1 overflow-hidden">
        <ResumeBuilder />
      </main>
    </div>
  );
}
