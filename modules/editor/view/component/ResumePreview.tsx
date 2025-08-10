"use client";

interface ResumePreviewProps {
  isLoading: boolean;
  error: string | null;
  pdfUrl: string | null;
  generatePDF: () => void;
}

export default function ResumePreview({
  isLoading,
  error,
  pdfUrl,
  generatePDF,
}: ResumePreviewProps) {
  return (
    <div className="w-full h-[800px] rounded-lg overflow-hidden bg-white">
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Generating PDF preview...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-sm text-red-600 mb-2">{error}</p>
            <button
              onClick={generatePDF}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {pdfUrl && !isLoading && !error && (
        <iframe
          src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Resume Preview"
        />
      )}
    </div>
  );
}
