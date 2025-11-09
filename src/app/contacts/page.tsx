"use client";

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // add this
import useContacts from "@/lib/hooks/usecontacts";
import ContactItem from "@/Components/ContactItem/ContactItem";
import { useVirtualizer } from "@tanstack/react-virtual";
import Input from "@/Components/Input/Input";
import Loader from "@/Components/Loader/Loader";

export default function ContactsPage() {
  const {
    contacts,
    total,
    totalPages,
    query,
    setQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    page,
    setPage,
    perPage,
    setPerPage,
    loading,
    selectedIndex,
    setSelectedIndex,
  } = useContacts();

  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const rowVirtualizer = useVirtualizer({
    count: contacts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 5,
  });

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    setSelectedIndex(0);
    if (parentRef.current) parentRef.current.scrollTop = 0;
  };

  const paginationRange = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToPage(page + 1);
      if (e.key === "ArrowLeft") goToPage(page - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [page, totalPages]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <header className="p-6 bg-white shadow flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0084d1] text-center">
          Contacts ({total.toLocaleString()})
        </h1>
      </header>

      {/* Controls */}
      <div className="p-4 sm:p-6 bg-white shadow-sm flex flex-col md:flex-row items-center justify-center gap-6 md:gap-6">
        {/* Search */}
        <div className="flex-1 max-w-md relative w-full">
          <Input
            value={query}
            onChange={setQuery}
            placeholder="Search by name, email, phone or company..."
            icon={
              <svg viewBox="0 0 24 24" className="search__icon">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                </g>
              </svg>
            }
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute left-125 top-10  text-3xl   transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex flex-wrap items-center justify-center gap-2 lg:ml-40">
          <label className="text-sm font-medium text-gray-900">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-300 rounded px-2 py-1 bg-white text-gray-900"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="company">Company</option>
          </select>
          <button
            onClick={() => setSortOrder((s) => (s === "asc" ? "desc" : "asc"))}
            className="px-3 py-1 border rounded bg-[#0084d1] text-white hover:bg-[#006bb3] transition"
          >
            {sortOrder === "asc" ? "A→Z" : "Z→A"}
          </button>
        </div>

        {/* Per page */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <label className="text-sm font-medium text-gray-900">Per page</label>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 bg-white text-gray-900"
          >
            {[10, 25, 50, 100, 1000].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* List + Loader */}
      <main className="flex-1  sm:p-6">
        <div className="text-sm text-gray-600 mb-3  mt-4 lg:mt-1 text-center">
          Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of{" "}
          {total.toLocaleString()} contacts
        </div>

        {loading ? (
          <div className="h-[calc(100vh-250px)] w-full flex items-center justify-center rounded shadow-sm">
            <Loader text="Loading contacts..." />
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-10">
            <h2 className="text-2xl font-semibold text-[#0084d1] mb-2">
              No results found for “{query || "your search"}”
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              We couldn’t find any contacts matching your search. <br />
              Please try using a different keyword or check your spelling.
            </p>
            <img
              src="/assets/notfound.png"
              alt="No results found"
              className="w-64 h-64 object-contain opacity-90"
            />
          </div>
        ) : (
          <div
            ref={parentRef}
            className=" w-full overflow-auto border border-gray-300 rounded shadow-sm"
            role="listbox"
            aria-label="Contacts list"
          >
            <div
              style={{
                height: rowVirtualizer.getTotalSize(),
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const contact = contacts[virtualRow.index];
                const isSelected = selectedIndex === virtualRow.index;

                return (
                  <div
                    key={contact.id}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelectedIndex(virtualRow.index)}
                  >
                    <ContactItem
                      contact={contact}
                      isSelected={isSelected}
                      onClick={() => setSelectedIndex(virtualRow.index)}
                      onEnter={() => router.push(`/tasks/${contact.id}`)} // ← added routing here
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded bg-white text-gray-900 hover:bg-[#e0f2fe] disabled:opacity-50 transition"
            >
              Prev
            </button>

            {paginationRange.map((p) => (
              <button
                key={`page-${p}`}
                onClick={() => goToPage(p)}
                className={`px-3 py-1 border rounded transition ${
                  p === page
                    ? "bg-[#0084d1] text-white"
                    : "bg-white text-gray-900 hover:bg-[#e0f2fe]"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded bg-white text-gray-900 hover:bg-[#e0f2fe] disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
