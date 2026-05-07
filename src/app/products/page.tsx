"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getStaticChemicals, getStaticCategories } from "@/lib/static-data";
import { Search, X, ArrowRight, FlaskConical, Sprout, Stethoscope, Droplet, Layers, Wrench, Hexagon } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  science: FlaskConical, compost: Sprout, medical_services: Stethoscope,
  water_drop: Droplet, bubble_chart: Layers, hardware: Wrench, default: Hexagon,
};

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const allChemicals = getStaticChemicals();
  const categories = getStaticCategories();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = allChemicals;
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          (c.casNumber && c.casNumber.toLowerCase().includes(q))
      );
    }
    if (category) {
      result = result.filter((c) => c.category === category);
    }
    return result;
  }, [allChemicals, query, category]);

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const chemicals = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setCurrentPage(1);
  };

  return (
    <section className="py-24 px-6 md:px-8 bg-surface min-h-screen">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-sm text-xs font-bold tracking-widest uppercase mb-4">
            Our Products
          </div>
          <h1 className="text-3xl md:text-5xl text-primary font-black mb-4 tracking-tight">
            Chemical Product Catalog
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            Browse our comprehensive portfolio of {totalItems}+ high-purity
            industrial chemicals. Filter by category or search by name and CAS
            number.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-10 bg-white rounded-xl border border-surface-variant p-6 shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center bg-surface border border-surface-variant rounded-lg px-4 py-2.5">
              <Search className="text-on-surface-variant mr-3 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search by name, CAS number, or description..."
                className="bg-transparent border-none outline-none w-full text-sm placeholder-on-surface-variant text-on-surface"
              />
            </div>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
              className="bg-surface border border-surface-variant rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-accent"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {(query || category) && (
              <button
                type="button"
                onClick={clearFilters}
                className="border border-surface-variant text-on-surface-variant px-6 py-2.5 text-sm font-medium rounded-lg hover:bg-surface-low transition-colors text-center whitespace-nowrap flex items-center gap-2 justify-center"
              >
                <X className="w-4 h-4" /> Clear
              </button>
            )}
          </form>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-on-surface-variant">
            Showing{" "}
            <span className="font-semibold text-on-surface">
              {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalItems)}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-on-surface">
              {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-on-surface">{totalItems}</span>{" "}
            products
            {category && (
              <> in <span className="font-semibold text-accent">{category}</span></>
            )}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {chemicals.map((chemical) => {
            const Icon = iconMap[chemical.icon] || iconMap.default;
            return (
              <motion.div
                key={chemical.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/products/${chemical.id}`}
                  className="bg-white border border-surface-variant p-6 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-surface-low rounded-full flex items-center justify-center text-primary shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-semibold bg-surface-low text-on-surface-variant px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {chemical.category}
                    </span>
                  </div>
                  <h3 className="text-lg text-primary font-bold mb-2 group-hover:text-accent transition-colors">
                    {chemical.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-4 flex-grow leading-relaxed line-clamp-3">
                    {chemical.description}
                  </p>
                  {chemical.casNumber && chemical.casNumber !== "N/A" && (
                    <div className="text-[10px] font-mono text-on-surface-variant bg-surface-low px-2.5 py-1 rounded inline-block mb-3 w-fit">
                      CAS: {chemical.casNumber}
                    </div>
                  )}
                  {chemical.applications && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {chemical.applications
                        .split(",")
                        .slice(0, 3)
                        .map((app) => (
                          <span
                            key={app.trim()}
                            className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full"
                          >
                            {app.trim()}
                          </span>
                        ))}
                    </div>
                  )}
                  <span className="text-xs font-bold text-accent uppercase tracking-widest flex items-center gap-2 mt-auto pt-3 border-t border-surface-variant group-hover:gap-3 transition-all">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {chemicals.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-on-surface-variant/30 mx-auto mb-4" />
            <h3 className="text-xl text-primary font-bold mb-2">No chemicals found</h3>
            <p className="text-on-surface-variant text-sm">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-surface-variant rounded-lg text-sm font-medium ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed text-on-surface-variant"
                  : "text-primary hover:bg-surface-low"
              }`}
            >
              ← Previous
            </button>
            <span className="text-sm text-on-surface-variant px-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className={`px-4 py-2 border border-surface-variant rounded-lg text-sm font-medium ${
                currentPage >= totalPages
                  ? "opacity-50 cursor-not-allowed text-on-surface-variant"
                  : "text-primary hover:bg-surface-low"
              }`}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
