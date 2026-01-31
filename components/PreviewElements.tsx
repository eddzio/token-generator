"use client";

interface PreviewElementsProps {
  cardClasses: string;
  h1Classes: string;
  h2Classes: string;
  h3Classes: string;
  paragraphClasses: string;
  captionClasses: string;
  monoClasses: string;
  primaryBtnClasses: string;
  secondaryBtnClasses: string;
}

export default function PreviewElements({
  cardClasses,
  h1Classes,
  h2Classes,
  h3Classes,
  paragraphClasses,
  captionClasses,
  monoClasses,
  primaryBtnClasses,
  secondaryBtnClasses,
}: PreviewElementsProps) {
  // These elements use system-ui font by default (inherited from Preview container)
  // to stay isolated from the app's DM Mono styling
  return (
    <div className={`bg-white border border-gray-200 p-6 ${cardClasses}`}>
      <h1 className={`text-2xl font-bold mb-2 text-gray-900 ${h1Classes}`}>
        H1 Heading
      </h1>

      <h2 className={`text-xl font-semibold mb-2 text-gray-800 ${h2Classes}`}>
        H2 Heading
      </h2>

      <h3 className={`text-lg font-medium mb-4 text-gray-700 ${h3Classes}`}>
        H3 Heading
      </h3>

      <p className={`mb-4 text-gray-600 ${paragraphClasses}`}>
        This is a paragraph of text. It demonstrates how body text will look with the applied Tailwind CSS classes. You can experiment with typography, colors, and spacing.
      </p>

      <p className={`text-sm text-gray-500 mb-4 ${captionClasses}`}>
        This is a caption - smaller supplementary text.
      </p>

      <code className={`font-mono text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded inline-block mb-6 ${monoClasses}`}>
        const code = &quot;monospace&quot;;
      </code>

      <div className="flex gap-3 flex-wrap">
        <button className={`px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors ${primaryBtnClasses}`}>
          Primary Button
        </button>

        <button className={`px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors ${secondaryBtnClasses}`}>
          Secondary Button
        </button>
      </div>
    </div>
  );
}
