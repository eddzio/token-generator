"use client";

import { useState, useCallback } from "react";
import ClassEditor from "./ClassEditor";
import Preview from "./Preview";
import ExportView from "./ExportView";
import { ClassRowData } from "./ClassRow";
import { TargetId, targets } from "@/lib/tailwind-classes";

type ViewMode = "editor" | "export";

export default function Playground() {
  const [rows, setRows] = useState<ClassRowData[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("editor");

  const elementClasses = useCallback((): Record<TargetId, string[]> => {
    const result: Record<TargetId, string[]> = {} as Record<TargetId, string[]>;

    targets.forEach((t) => {
      result[t.id] = [];
    });

    rows.forEach((row) => {
      if (row.value) {
        result[row.target].push(row.value);
      }
    });

    return result;
  }, [rows]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-stone-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-stone-400 rounded-full"></div>
          <h1 className="text-sm font-medium tracking-wide uppercase text-stone-700">
            Token Generator
          </h1>
        </div>

        {/* Segment Control */}
        <div className="flex items-center bg-stone-100 rounded p-0.5">
          <button
            onClick={() => setViewMode("editor")}
            className={`px-3 py-1 text-xs font-medium tracking-wide uppercase rounded transition-colors ${
              viewMode === "editor"
                ? "bg-white text-stone-800 shadow-sm"
                : "text-stone-600 hover:text-stone-800"
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setViewMode("export")}
            className={`px-3 py-1 text-xs font-medium tracking-wide uppercase rounded transition-colors ${
              viewMode === "export"
                ? "bg-white text-stone-800 shadow-sm"
                : "text-stone-600 hover:text-stone-800"
            }`}
          >
            Export
          </button>
        </div>

        <div className="text-xs text-stone-800 tracking-wider">
          v4.0
        </div>
      </header>

      {/* Main content */}
      {viewMode === "editor" ? (
        <div className="flex flex-1 min-h-0">
          {/* Left panel - Class Editor */}
          <div className="w-1/2 border-r border-stone-200 flex flex-col min-w-0">
            <ClassEditor rows={rows} onRowsChange={setRows} />
          </div>

          {/* Right panel - Preview */}
          <div className="w-1/2 flex flex-col min-w-0">
            <Preview elementClasses={elementClasses()} />
          </div>
        </div>
      ) : (
        <div className="flex flex-1 min-h-0">
          {/* Left panel - Export */}
          <div className="w-1/2 border-r border-stone-200 flex flex-col min-w-0">
            <ExportView elementClasses={elementClasses()} />
          </div>

          {/* Right panel - Preview (still visible) */}
          <div className="w-1/2 flex flex-col min-w-0">
            <Preview elementClasses={elementClasses()} />
          </div>
        </div>
      )}
    </div>
  );
}
