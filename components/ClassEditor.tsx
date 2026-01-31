"use client";

import ClassRow, { ClassRowData } from "./ClassRow";

interface ClassEditorProps {
  rows: ClassRowData[];
  onRowsChange: (rows: ClassRowData[]) => void;
}

export default function ClassEditor({ rows, onRowsChange }: ClassEditorProps) {
  const addRow = () => {
    const newRow: ClassRowData = {
      id: crypto.randomUUID(),
      target: "global",
      category: "colors",
      subcategory: "Background",
      value: "bg-white",
    };
    onRowsChange([...rows, newRow]);
  };

  const updateRow = (index: number, updatedRow: ClassRowData) => {
    const newRows = [...rows];
    newRows[index] = updatedRow;
    onRowsChange(newRows);
  };

  const deleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    onRowsChange(newRows);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Panel header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium tracking-wider uppercase text-gray-400">
            Classes
          </span>
          <span className="text-xs text-gray-400 tabular-nums">
            {rows.length} {rows.length === 1 ? "rule" : "rules"}
          </span>
        </div>
        <button
          onClick={addRow}
          className="w-full px-3 py-2 text-xs font-medium tracking-wide uppercase bg-gray-100 text-gray-600 border border-gray-200 rounded hover:bg-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Class
        </button>
      </div>

      {/* Rows container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {rows.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-300 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-xs text-gray-400">No classes defined</p>
            <p className="text-xs text-gray-300 mt-1">Click &quot;Add Class&quot; to begin</p>
          </div>
        ) : (
          rows.map((row, index) => (
            <ClassRow
              key={row.id}
              row={row}
              onChange={(updatedRow) => updateRow(index, updatedRow)}
              onDelete={() => deleteRow(index)}
            />
          ))
        )}
      </div>
    </div>
  );
}
