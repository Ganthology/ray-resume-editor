"use client";

import EditPanel from "./EditPanel";
import PreviewPanel from "./PreviewPanel";

export default function ResumeBuilder() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Main Content - Three Panel Layout */}
      <div className="mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Middle Panel - Edit Panel */}
          <div className="lg:col-span-1">
            <EditPanel />
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-1">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
