"use client";

import { useState, useEffect, useMemo } from "react";
import { loadContacts } from "@/lib/scripts/generateData";
import type { Contact } from "@/models/contactModel";

export default function usecontacts() {
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sortBy, setSortBy] = useState<keyof Contact>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Load contacts
  useEffect(() => {
    setLoading(true);
    const fetchContacts = async () => {
      await new Promise((r) => setTimeout(r, 500));
      const data = loadContacts(10000);
      setAllContacts(data);
      setLoading(false);
    };
    fetchContacts();
  }, []);

  // Debounce search query for better UX
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1); // reset page on new search
      setSelectedIndex(0);
    }, 300); // 300ms debounce

    return () => clearTimeout(handler);
  }, [query]);

  // Filter contacts
  const filtered = useMemo(() => {
    const lower = debouncedQuery.toLowerCase();
    return allContacts.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.email.toLowerCase().includes(lower) ||
        c.phone.toLowerCase().includes(lower),
    );
  }, [allContacts, debouncedQuery]);

  // Sort contacts
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = (a[sortBy] ?? "").toString().toLowerCase();
      const bVal = (b[sortBy] ?? "").toString().toLowerCase();
      return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }, [filtered, sortBy, sortOrder]);

  // Pagination
  const total = sorted.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginated = sorted.slice(start, end);

  return {
    contacts: paginated,
    allContacts: sorted,
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
  };
}
