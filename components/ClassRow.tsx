"use client";

import { categories, CategoryKey, targets, TargetId, getClassesForCategory, getSubcategoriesForCategory } from "@/lib/tailwind-classes";
import SearchableSelect from "./SearchableSelect";

export interface ClassRowData {
  id: string;
  target: TargetId;
  category: CategoryKey;
  subcategory: string | null;
  value: string;
}

interface ClassRowProps {
  row: ClassRowData;
  onChange: (row: ClassRowData) => void;
  onDelete: () => void;
}

export default function ClassRow({ row, onChange, onDelete }: ClassRowProps) {
  const categoryKeys = Object.keys(categories) as CategoryKey[];
  const subcategories = getSubcategoriesForCategory(row.category);

  const getAvailableClasses = (): string[] => {
    if (subcategories && row.subcategory) {
      return subcategories[row.subcategory] || [];
    }
    if (!subcategories) {
      return getClassesForCategory(row.category);
    }
    return [];
  };

  const availableClasses = getAvailableClasses();

  const handleTargetChange = (target: TargetId) => {
    onChange({ ...row, target });
  };

  const handleCategoryChange = (category: CategoryKey) => {
    const newSubcategories = getSubcategoriesForCategory(category);
    const newSubcategory = newSubcategories ? Object.keys(newSubcategories)[0] : null;
    const newClasses = newSubcategory
      ? newSubcategories![newSubcategory]
      : getClassesForCategory(category);

    onChange({
      ...row,
      category,
      subcategory: newSubcategory,
      value: newClasses[0] || "",
    });
  };

  const handleSubcategoryChange = (subcategory: string) => {
    const classes = subcategories![subcategory] || [];
    onChange({
      ...row,
      subcategory,
      value: classes[0] || "",
    });
  };

  const handleValueChange = (value: string) => {
    onChange({ ...row, value });
  };

  const selectClasses = "px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 appearance-none cursor-pointer hover:bg-gray-100 transition-colors";

  return (
    <div className="flex items-center gap-1.5 p-2 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors">
      {/* Target dropdown */}
      <select
        value={row.target}
        onChange={(e) => handleTargetChange(e.target.value as TargetId)}
        className={selectClasses}
      >
        {targets.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>

      {/* Separator */}
      <span className="text-gray-300">/</span>

      {/* Category dropdown */}
      <select
        value={row.category}
        onChange={(e) => handleCategoryChange(e.target.value as CategoryKey)}
        className={selectClasses}
      >
        {categoryKeys.map((key) => (
          <option key={key} value={key}>
            {categories[key].label}
          </option>
        ))}
      </select>

      {/* Subcategory dropdown (only for colors) */}
      {subcategories && (
        <>
          <span className="text-gray-300">/</span>
          <select
            value={row.subcategory || ""}
            onChange={(e) => handleSubcategoryChange(e.target.value)}
            className={selectClasses}
          >
            {Object.keys(subcategories).map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Arrow */}
      <span className="text-gray-300 px-1">→</span>

      {/* Value dropdown - searchable */}
      <SearchableSelect
        value={row.value}
        options={availableClasses}
        onChange={handleValueChange}
        className="flex-1 min-w-0"
      />

      {/* Delete button */}
      <button
        onClick={onDelete}
        className="p-1.5 text-gray-300 hover:text-gray-500 hover:bg-gray-200 rounded transition-colors ml-1"
        aria-label="Delete row"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
