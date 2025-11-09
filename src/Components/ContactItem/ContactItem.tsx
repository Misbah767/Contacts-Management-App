"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { Contact } from "@/models/contactModel";

interface ContactItemProps {
  contact: Contact;
  isSelected?: boolean;
  onClick?: () => void;
  onEnter?: () => void;
}

export default function ContactItem({
  contact,
  isSelected = false,
  onClick,
  onEnter,
}: ContactItemProps) {
  const router = useRouter();

  const handleTasksClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/tasks/${contact.id}`);
  };

  return (
    <div
      id={contact.id}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (onEnter) onEnter();
        }
      }}
      className={`flex items-center outline-none justify-between p-4 rounded-lg cursor-pointer transition 
        ${isSelected ? "bg-[#e0f2fe] border-none" : "bg-white hover:bg-[#f1faff]"}`}
    >
      <div className="flex items-center gap-4">
        <img
          src={contact.avatar || "/default-avatar.png"}
          alt={contact.name}
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 text-lg">{contact.name}</span>
          <span className="text-gray-600 text-sm">{contact.email}</span>
          <span className="text-gray-500 text-sm">{contact.phone}</span>
          <span className="text-gray-500 text-sm">{contact.company}</span>
        </div>
      </div>

      <button
        onClick={handleTasksClick}
        className="px-4 py-2 bg-[#0084d1] hover:bg-[#006bb3] rounded-lg text-white font-medium transition shadow"
      >
        Tasks
      </button>
    </div>
  );
}
