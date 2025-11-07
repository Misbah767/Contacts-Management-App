import React from "react";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface ContactListProps {
  contacts: Contact[];
}

export default function ContactList({ contacts }: ContactListProps) {
  if (contacts.length === 0)
    return <p className="text-gray-500 text-center mt-8">No contacts found.</p>;

  return (
    <ul className="divide-y divide-gray-200 border rounded-lg">
      {contacts.map((contact) => (
        <li
          key={contact.id}
          className="p-4 hover:bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center"
        >
          <div>
            <h2 className="font-semibold text-gray-900">{contact.name}</h2>
            <p className="text-sm text-gray-600">{contact.email}</p>
          </div>
          <p className="text-sm text-gray-700">{contact.phone}</p>
        </li>
      ))}
    </ul>
  );
}
