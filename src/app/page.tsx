"use client";

import Link from "next/link";
import React from "react";
import "./globals.css";
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-gray-900">
      <div className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-sky-600">TaskTracker</h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Manage your <span className="font-semibold">Contacts</span> efficiently with search, sort,
          pagination, and smooth updates.
        </p>
        <div className="flex justify-center mt-5">
          <Link
            href="/contacts"
            className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-all"
          >
            View Contacts
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-4 text-gray-500 text-sm">Built with ❤️ by Misbah</footer>
    </main>
  );
}
