import React from "react";

interface ContactSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ContactSearch({ value, onChange }: ContactSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search contacts..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-sky-400"
    />
  );
}
