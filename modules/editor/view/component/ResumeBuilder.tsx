'use client';

import { useEffect, useState } from 'react';

import EditPanel from './EditPanel';
import PreviewPanel from './PreviewPanel';
import { Button } from '@/platform/component/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/platform/component/ui/drawer';

const sections = [
  { id: 'section-personal', label: 'Personal' },
  { id: 'section-summary', label: 'Summary' },
  { id: 'section-experience', label: 'Experience' },
  { id: 'section-leadership', label: 'Leadership' },
  { id: 'section-project', label: 'Projects' },
  { id: 'section-research', label: 'Research' },
  { id: 'section-education', label: 'Education' },
  { id: 'section-skills', label: 'Skills' },
  { id: 'section-portfolio', label: 'Portfolio' },
];

export default function ResumeBuilder() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [sectionDrawerOpen, setSectionDrawerOpen] = useState(false);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 1024);
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const container = document.getElementById('edit-scroll-container');
    const target = document.getElementById(sectionId);
    if (!container || !target) return;
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const offset = 8; // small top padding
    const top = targetRect.top - containerRect.top + container.scrollTop - offset;
    container.scrollTo({ top, behavior: 'smooth' });
  };

  const BottomTabs = () => (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200">
      <div className="grid grid-cols-2">
        <Button
          variant={activeTab === 'edit' ? 'default' : 'ghost'}
          className="rounded-none"
          onClick={() => setActiveTab('edit')}
        >
          Edit
        </Button>
        <Button
          variant={activeTab === 'preview' ? 'default' : 'ghost'}
          className="rounded-none"
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </Button>
      </div>
    </div>
  );

  const FloatingSections = () => (
    <Drawer
      open={sectionDrawerOpen}
      onOpenChange={(open) => {
        setSectionDrawerOpen(open);
        if (!open && pendingScrollId) {
          // wait a tick for drawer to unmount then scroll
          window.requestAnimationFrame(() => {
            setTimeout(() => {
              scrollToSection(pendingScrollId);
              setPendingScrollId(null);
            }, 50);
          });
        }
      }}
    >
      <DrawerTrigger asChild>
        <Button className="lg:hidden fixed bottom-16 right-4 shadow-md">Sections</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Jump to section</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 grid grid-cols-2 gap-2">
          {sections.map((s) => (
            <Button
              key={s.id}
              variant="outline"
              onClick={() => {
                setPendingScrollId(s.id);
                setSectionDrawerOpen(false);
              }}
            >
              {s.label}
            </Button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );

  return (
    <div className="h-full bg-gray-50">
      {/* Desktop: side-by-side layout; Mobile: tabs */}
      <div className="h-full flex flex-col lg:flex-row pb-14 lg:pb-0">
        {/* Edit panel */}
        <div
          className={`h-full bg-white ${
            isMobile ? (activeTab === 'edit' ? 'block' : 'hidden') : 'lg:w-3/5'
          }`}
        >
          <div id="edit-scroll-container" className="h-full overflow-y-auto p-6 scroll-smooth">
            <EditPanel />
          </div>
        </div>

        {/* Preview panel: hidden in mobile when on edit tab */}
        <div
          className={`h-full bg-gray-50 ${
            isMobile ? (activeTab === 'preview' ? 'block' : 'hidden') : 'lg:w-2/5'
          }`}
        >
          <div className="h-full p-6">
            <div className="h-full bg-white rounded-lg overflow-hidden">
              <PreviewPanel />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile UI elements */}
      {isMobile && (
        <>
          {activeTab === 'edit' && <FloatingSections />}
          <BottomTabs />
        </>
      )}
    </div>
  );
}
