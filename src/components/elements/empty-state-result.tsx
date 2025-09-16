import React from "react";
import { Plus, SearchX } from "lucide-react";

interface EmptySearchStateProps {
  searchQuery?: string;
  onAddItem?: () => void;
  onClearSearch?: () => void;
  category: "food" | "building";
}

export default function EmptyStateResult({
  searchQuery,
  onAddItem,
  onClearSearch,
  category,
}: EmptySearchStateProps) {
  const label = category === "building" ? "Bangunan" : "Makanan";
  const description =
    category === "building"
      ? "Belum ada bangunan yang tersedia. Mulai dengan menambahkan bangunan pertama untuk melestarikan warisan arsitektur Indonesia."
      : "Belum ada makanan tradisional yang tersedia. Mulai dengan menambahkan makanan pertama untuk melestarikan warisan kuliner Indonesia.";

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center">
          <SearchX className="w-10 h-10 text-gray-500" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">
        {searchQuery ? `${label} tidak ditemukan` : `Belum Ada ${label}`}
      </h3>

      <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
        {searchQuery ? (
          <>
            Tidak ada {label.toLowerCase()} yang cocok dengan pencarian{" "}
            <span className="text-white font-medium">{searchQuery}</span>.
          </>
        ) : (
          description
        )}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {searchQuery && onClearSearch && (
          <button
            onClick={onClearSearch}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Hapus Pencarian
          </button>
        )}

        {onAddItem && (
          <button
            onClick={onAddItem}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah {label}</span>
          </button>
        )}
      </div>
    </div>
  );
}
