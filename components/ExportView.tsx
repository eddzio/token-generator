"use client";

import { useState } from "react";
import { TargetId, targets } from "@/lib/tailwind-classes";

interface ExportViewProps {
  elementClasses: Record<TargetId, string[]>;
}

export default function ExportView({ elementClasses }: ExportViewProps) {
  const [copied, setCopied] = useState(false);

  const generateCSS = (): string => {
    const lines: string[] = [":root {"];

    targets.forEach((target) => {
      const classes = elementClasses[target.id];
      if (classes && classes.length > 0) {
        const varName = `--${target.id.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        lines.push(`  ${varName}: "${classes.join(" ")}";`);
      }
    });

    lines.push("}");

    // Only return if there are actual classes
    if (lines.length <= 2) {
      return "/* No classes defined yet */";
    }

    return lines.join("\n");
  };

  const generateTailwindConfig = (): string => {
    const config: Record<string, string> = {};

    targets.forEach((target) => {
      const classes = elementClasses[target.id];
      if (classes && classes.length > 0) {
        config[target.id] = classes.join(" ");
      }
    });

    if (Object.keys(config).length === 0) {
      return "// No classes defined yet";
    }

    return `const styles = ${JSON.stringify(config, null, 2)};`;
  };

  const cssOutput = generateCSS();
  const jsOutput = generateTailwindConfig();

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const appliedCount = Object.values(elementClasses).filter(
    (classes) => classes.length > 0
  ).length;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <span className="text-xs font-medium tracking-wider uppercase text-gray-400">
          Export
        </span>
        <span className="text-xs text-gray-300 ml-2">
          {appliedCount} {appliedCount === 1 ? "target" : "targets"} configured
        </span>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* CSS Variables */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium tracking-wider uppercase text-gray-500">
              CSS Variables
            </label>
            <button
              onClick={() => handleCopy(cssOutput)}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="p-4 bg-white border border-gray-200 rounded text-xs text-gray-700 overflow-x-auto whitespace-pre">
            {cssOutput}
          </pre>
        </div>

        {/* JavaScript Object */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium tracking-wider uppercase text-gray-500">
              JavaScript Object
            </label>
            <button
              onClick={() => handleCopy(jsOutput)}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Copy
            </button>
          </div>
          <pre className="p-4 bg-white border border-gray-200 rounded text-xs text-gray-700 overflow-x-auto whitespace-pre">
            {jsOutput}
          </pre>
        </div>

        {/* Usage hint */}
        <div className="p-4 bg-white border border-gray-200 rounded">
          <h3 className="text-xs font-medium tracking-wider uppercase text-gray-500 mb-2">
            Usage
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Copy the CSS variables into your stylesheet, or use the JavaScript object
            in your components with template literals:
          </p>
          <pre className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
{`<div className={styles.card}>
  <h1 className={styles.h1}>...</h1>
</div>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
