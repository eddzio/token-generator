// All Tailwind color names
const colorNames = [
  "slate", "gray", "zinc", "neutral", "stone",
  "red", "orange", "amber", "yellow", "lime",
  "green", "emerald", "teal", "cyan", "sky",
  "blue", "indigo", "violet", "purple", "fuchsia",
  "pink", "rose"
];

const colorShades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

// Generate color classes
const generateColorClasses = (prefix: string): string[] => {
  const base = [`${prefix}-white`, `${prefix}-black`, `${prefix}-transparent`];
  const colors = colorNames.flatMap(color =>
    colorShades.map(shade => `${prefix}-${color}-${shade}`)
  );
  return [...base, ...colors];
};

export const categories = {
  colors: {
    label: "Colors",
    subcategories: {
      "Background": generateColorClasses("bg"),
      "Text": generateColorClasses("text"),
      "Border": generateColorClasses("border"),
    }
  },
  typography: {
    label: "Typography",
    classes: [
      "text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl", "text-5xl", "text-6xl",
      "font-thin", "font-extralight", "font-light", "font-normal", "font-medium", "font-semibold", "font-bold", "font-extrabold", "font-black",
      "italic", "not-italic",
      "underline", "overline", "line-through", "no-underline",
      "uppercase", "lowercase", "capitalize", "normal-case",
      "tracking-tighter", "tracking-tight", "tracking-normal", "tracking-wide", "tracking-wider", "tracking-widest",
      "leading-none", "leading-tight", "leading-snug", "leading-normal", "leading-relaxed", "leading-loose",
      "text-left", "text-center", "text-right", "text-justify",
    ]
  },
  spacing: {
    label: "Spacing",
    classes: [
      "p-0", "p-1", "p-2", "p-3", "p-4", "p-5", "p-6", "p-8", "p-10", "p-12", "p-16",
      "px-0", "px-1", "px-2", "px-3", "px-4", "px-5", "px-6", "px-8", "px-10", "px-12", "px-16",
      "py-0", "py-1", "py-2", "py-3", "py-4", "py-5", "py-6", "py-8", "py-10", "py-12", "py-16",
      "pt-0", "pt-1", "pt-2", "pt-3", "pt-4", "pt-5", "pt-6", "pt-8",
      "pb-0", "pb-1", "pb-2", "pb-3", "pb-4", "pb-5", "pb-6", "pb-8",
      "pl-0", "pl-1", "pl-2", "pl-3", "pl-4", "pl-5", "pl-6", "pl-8",
      "pr-0", "pr-1", "pr-2", "pr-3", "pr-4", "pr-5", "pr-6", "pr-8",
      "m-0", "m-1", "m-2", "m-3", "m-4", "m-5", "m-6", "m-8", "m-auto",
      "mx-0", "mx-1", "mx-2", "mx-3", "mx-4", "mx-5", "mx-6", "mx-8", "mx-auto",
      "my-0", "my-1", "my-2", "my-3", "my-4", "my-5", "my-6", "my-8", "my-auto",
      "mt-0", "mt-1", "mt-2", "mt-3", "mt-4", "mt-5", "mt-6", "mt-8",
      "mb-0", "mb-1", "mb-2", "mb-3", "mb-4", "mb-5", "mb-6", "mb-8",
      "ml-0", "ml-1", "ml-2", "ml-3", "ml-4", "ml-5", "ml-6", "ml-8",
      "mr-0", "mr-1", "mr-2", "mr-3", "mr-4", "mr-5", "mr-6", "mr-8",
      "gap-0", "gap-1", "gap-2", "gap-3", "gap-4", "gap-5", "gap-6", "gap-8",
      "space-x-0", "space-x-1", "space-x-2", "space-x-3", "space-x-4", "space-x-6", "space-x-8",
      "space-y-0", "space-y-1", "space-y-2", "space-y-3", "space-y-4", "space-y-6", "space-y-8",
    ]
  },
  borders: {
    label: "Borders",
    classes: [
      "border-0", "border", "border-2", "border-4", "border-8",
      "border-t-0", "border-t", "border-t-2", "border-t-4",
      "border-b-0", "border-b", "border-b-2", "border-b-4",
      "border-l-0", "border-l", "border-l-2", "border-l-4",
      "border-r-0", "border-r", "border-r-2", "border-r-4",
      "border-solid", "border-dashed", "border-dotted", "border-double", "border-none",
      "rounded-none", "rounded-sm", "rounded", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
      "rounded-t-none", "rounded-t-sm", "rounded-t", "rounded-t-md", "rounded-t-lg", "rounded-t-xl",
      "rounded-b-none", "rounded-b-sm", "rounded-b", "rounded-b-md", "rounded-b-lg", "rounded-b-xl",
      "rounded-l-none", "rounded-l-sm", "rounded-l", "rounded-l-md", "rounded-l-lg", "rounded-l-xl",
      "rounded-r-none", "rounded-r-sm", "rounded-r", "rounded-r-md", "rounded-r-lg", "rounded-r-xl",
      "divide-x", "divide-x-2", "divide-y", "divide-y-2",
    ]
  },
  shadows: {
    label: "Shadows",
    classes: [
      "shadow-none", "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl", "shadow-inner",
      "ring-0", "ring-1", "ring-2", "ring-4", "ring-8", "ring-inset",
      "ring-white", "ring-black", "ring-gray-200", "ring-gray-300", "ring-gray-400", "ring-gray-500",
      "ring-blue-200", "ring-blue-300", "ring-blue-400", "ring-blue-500",
      "drop-shadow-none", "drop-shadow-sm", "drop-shadow", "drop-shadow-md", "drop-shadow-lg", "drop-shadow-xl", "drop-shadow-2xl",
    ]
  },
  sizing: {
    label: "Sizing",
    classes: [
      "w-0", "w-1", "w-2", "w-3", "w-4", "w-5", "w-6", "w-8", "w-10", "w-12", "w-16", "w-20", "w-24", "w-32", "w-40", "w-48", "w-56", "w-64",
      "w-auto", "w-1/2", "w-1/3", "w-2/3", "w-1/4", "w-3/4", "w-full", "w-screen", "w-min", "w-max", "w-fit",
      "min-w-0", "min-w-full", "min-w-min", "min-w-max", "min-w-fit",
      "max-w-xs", "max-w-sm", "max-w-md", "max-w-lg", "max-w-xl", "max-w-2xl", "max-w-3xl", "max-w-4xl", "max-w-5xl", "max-w-6xl", "max-w-7xl", "max-w-full", "max-w-none",
      "h-0", "h-1", "h-2", "h-3", "h-4", "h-5", "h-6", "h-8", "h-10", "h-12", "h-16", "h-20", "h-24", "h-32", "h-40", "h-48", "h-56", "h-64",
      "h-auto", "h-1/2", "h-1/3", "h-2/3", "h-1/4", "h-3/4", "h-full", "h-screen", "h-min", "h-max", "h-fit",
      "min-h-0", "min-h-full", "min-h-screen", "min-h-min", "min-h-max", "min-h-fit",
      "max-h-0", "max-h-full", "max-h-screen", "max-h-min", "max-h-max", "max-h-fit",
    ]
  },
  layout: {
    label: "Layout",
    classes: [
      "block", "inline-block", "inline", "flex", "inline-flex", "grid", "inline-grid", "hidden",
      "flex-row", "flex-row-reverse", "flex-col", "flex-col-reverse",
      "flex-wrap", "flex-wrap-reverse", "flex-nowrap",
      "flex-1", "flex-auto", "flex-initial", "flex-none",
      "grow", "grow-0", "shrink", "shrink-0",
      "justify-start", "justify-end", "justify-center", "justify-between", "justify-around", "justify-evenly",
      "items-start", "items-end", "items-center", "items-baseline", "items-stretch",
      "self-auto", "self-start", "self-end", "self-center", "self-stretch",
      "grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4", "grid-cols-5", "grid-cols-6",
      "grid-rows-1", "grid-rows-2", "grid-rows-3", "grid-rows-4", "grid-rows-5", "grid-rows-6",
      "col-span-1", "col-span-2", "col-span-3", "col-span-4", "col-span-full",
      "row-span-1", "row-span-2", "row-span-3", "row-span-full",
      "overflow-auto", "overflow-hidden", "overflow-visible", "overflow-scroll",
      "overflow-x-auto", "overflow-x-hidden", "overflow-y-auto", "overflow-y-hidden",
    ]
  },
  effects: {
    label: "Effects",
    classes: [
      "opacity-0", "opacity-5", "opacity-10", "opacity-20", "opacity-25", "opacity-30", "opacity-40", "opacity-50", "opacity-60", "opacity-70", "opacity-75", "opacity-80", "opacity-90", "opacity-95", "opacity-100",
      "blur-none", "blur-sm", "blur", "blur-md", "blur-lg", "blur-xl", "blur-2xl", "blur-3xl",
      "brightness-0", "brightness-50", "brightness-75", "brightness-90", "brightness-95", "brightness-100", "brightness-105", "brightness-110", "brightness-125", "brightness-150", "brightness-200",
      "contrast-0", "contrast-50", "contrast-75", "contrast-100", "contrast-125", "contrast-150", "contrast-200",
      "grayscale-0", "grayscale",
      "invert-0", "invert",
      "saturate-0", "saturate-50", "saturate-100", "saturate-150", "saturate-200",
      "sepia-0", "sepia",
      "transition-none", "transition-all", "transition", "transition-colors", "transition-opacity", "transition-shadow", "transition-transform",
      "duration-75", "duration-100", "duration-150", "duration-200", "duration-300", "duration-500", "duration-700", "duration-1000",
      "ease-linear", "ease-in", "ease-out", "ease-in-out",
      "cursor-auto", "cursor-default", "cursor-pointer", "cursor-wait", "cursor-text", "cursor-move", "cursor-not-allowed",
    ]
  },
};

export type CategoryKey = keyof typeof categories;

export const targets = [
  { id: "global", label: "Global" },
  { id: "card", label: "Card" },
  { id: "primaryBtn", label: "Primary Button" },
  { id: "secondaryBtn", label: "Secondary Button" },
  { id: "h1", label: "H1" },
  { id: "h2", label: "H2" },
  { id: "h3", label: "H3" },
  { id: "paragraph", label: "Paragraph" },
  { id: "caption", label: "Caption" },
  { id: "mono", label: "Mono" },
] as const;

export type TargetId = typeof targets[number]["id"];

export function getClassesForCategory(categoryKey: CategoryKey): string[] {
  const category = categories[categoryKey];
  if ("subcategories" in category) {
    return Object.values(category.subcategories).flat();
  }
  return category.classes;
}

export function getSubcategoriesForCategory(categoryKey: CategoryKey): Record<string, string[]> | null {
  const category = categories[categoryKey];
  if ("subcategories" in category) {
    return category.subcategories;
  }
  return null;
}
