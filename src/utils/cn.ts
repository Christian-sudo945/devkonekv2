import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Market-specific class combinations
export const marketClasses = {
  container: (isCompact: boolean) =>
    cn(
      "section-wrapper scrolled-spacing",
      isCompact ? "scrolled-compact" : "scrolled-normal"
    ),
  header: (isCompact: boolean) =>
    cn(
      "section-header",
      isCompact ? "scrolled-compact" : "scrolled-normal"
    ),
  grid: (isCompact: boolean) =>
    cn(
      "grid",
      isCompact ? "gap-0.5 mt-0.5" : "gap-2 mt-2"
    ),
  card: "card-base p-1.5",
  searchInput: "search-input border-0 shadow-none",
  filterButton: "filter-button shrink-0",
  codePreview: "bg-gray-950 rounded-md p-1.5 text-xs overflow-x-auto text-gray-200",
  badge: "shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
  actionButton: "flex-1 bg-blue-600 hover:bg-blue-700 text-white",
  iconButton: "shrink-0 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
};
