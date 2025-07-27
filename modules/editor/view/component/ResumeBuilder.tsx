"use client";

import EditPanel from "./EditPanel";
import PreviewPanel from "./PreviewPanel";

export default function ResumeBuilder() {
  return (
    <div className="h-full bg-gray-50">
      {/* Main Content - Split Panel Layout */}
      <div className="h-full flex flex-col lg:flex-row">
        {/* Left Panel - Edit Panel (40%) */}
        <div className="lg:w-3/5 h-full bg-white border-r border-gray-200 shadow-sm">
          <div className="h-full overflow-y-auto p-6">
            <EditPanel />
          </div>
        </div>

        {/* Right Panel - Preview (40%) */}
        <div className="lg:w-2/5 h-full bg-gray-50">
          <div className="h-full p-6">
            <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <PreviewPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
