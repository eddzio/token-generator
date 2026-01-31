"use client";

import { useState, useRef, useEffect } from "react";

interface SearchableSelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

export default function SearchableSelect({
  value,
  options,
  onChange,
  className = "",
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = search
    ? options.filter((opt) =>
        opt.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  // Reset highlighted index when filtered options change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions.length, search]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (isOpen && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else {
          setIsOpen(true);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearch("");
        break;
      case "Tab":
        if (isOpen) {
          setIsOpen(false);
          setSearch("");
        }
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
    // Find current value in options and highlight it
    const currentIndex = filteredOptions.indexOf(value);
    if (currentIndex >= 0) {
      setHighlightedIndex(currentIndex);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={isOpen ? search : value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={isOpen ? "Type to search..." : value}
        className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 hover:bg-gray-100 transition-colors"
      />

      {/* Dropdown indicator */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>

      {isOpen && (
        <ul
          ref={listRef}
          className="absolute z-50 mt-1 w-full max-h-48 overflow-auto bg-white border border-gray-200 rounded shadow-lg"
        >
          {filteredOptions.length === 0 ? (
            <li className="px-2 py-2 text-xs text-gray-400 italic">
              No matches found
            </li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`px-2 py-1.5 text-xs cursor-pointer transition-colors ${
                  index === highlightedIndex
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                } ${option === value ? "font-medium" : ""}`}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
