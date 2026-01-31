"use client";

import PreviewElements from "./PreviewElements";
import { TargetId } from "@/lib/tailwind-classes";

interface PreviewProps {
  elementClasses: Record<TargetId, string[]>;
}

export default function Preview({ elementClasses }: PreviewProps) {
  const getClasses = (target: TargetId): string => {
    return elementClasses[target]?.join(" ") || "";
  };

  const globalClasses = getClasses("global");

  const appliedTargets = Object.entries(elementClasses).filter(
    ([, classes]) => classes.length > 0
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Panel header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <span className="text-xs font-medium tracking-wider uppercase text-gray-400">
          Preview
        </span>
      </div>

      {/* Preview area - isolated from app styling */}
      <div className={`flex-1 overflow-auto p-6 ${globalClasses}`} style={{ fontFamily: 'system-ui, sans-serif' }}>
        <PreviewElements
          cardClasses={getClasses("card")}
          h1Classes={getClasses("h1")}
          h2Classes={getClasses("h2")}
          h3Classes={getClasses("h3")}
          paragraphClasses={getClasses("paragraph")}
          captionClasses={getClasses("caption")}
          monoClasses={getClasses("mono")}
          primaryBtnClasses={getClasses("primaryBtn")}
          secondaryBtnClasses={getClasses("secondaryBtn")}
        />
      </div>

      {/* Applied classes summary */}
      <div className="px-4 py-3 border-t border-gray-200 bg-white">
        <details className="text-xs">
          <summary className="cursor-pointer text-gray-400 hover:text-gray-600 font-medium tracking-wider uppercase select-none">
            Applied Classes {appliedTargets.length > 0 && `(${appliedTargets.length})`}
          </summary>
          <div className="mt-3 space-y-2 max-h-32 overflow-y-auto">
            {appliedTargets.length > 0 ? (
              appliedTargets.map(([target, classes]) => (
                <div key={target} className="flex items-start gap-2">
                  <span className="text-gray-400 shrink-0 w-20 capitalize">{target}:</span>
                  <code className="text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded text-xs break-all">
                    {classes.join(" ")}
                  </code>
                </div>
              ))
            ) : (
              <div className="text-gray-400 italic">No classes applied</div>
            )}
          </div>
        </details>
      </div>
    </div>
  );
}
