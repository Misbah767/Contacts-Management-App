"use client";

import React, { useState, useMemo } from "react";
import contactsData from "./data/contacts.json";
import ContactList from "../../Components/ContactList/ContactList";
import ContactSearch from "../../Components/ContactSearch/ContactSearch";

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredContacts = useMemo(() => {
    const filtered = contactsData.filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }, [search, sortOrder]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-sky-700">Contacts</h1>

      <div className="flex justify-between items-center mb-4">
        <ContactSearch value={search} onChange={setSearch} />
        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600"
        >
          Sort: {sortOrder === "asc" ? "A → Z" : "Z → A"}
        </button>
      </div>

      <ContactList contacts={filteredContacts} />
    </div>
  );
}
