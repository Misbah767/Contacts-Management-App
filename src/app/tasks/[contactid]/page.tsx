"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useTasks from "@/lib/hooks/usetasks";
import useContacts from "@/lib/hooks/usecontacts";
import TaskList from "@/Components/TaskList/TaskList";
import AddTaskButton from "@/Components/AddTaskButton/AddtaskButton";
import Loader from "@/Components/Loader/Loader";

export default function TasksPage() {
  const params = useParams();
  const contactId = params.contactid as string | undefined;

  const { allContacts, loading: contactsLoading } = useContacts();
  const { byContact, createTask, toggleTask, deleteTask, updateTask } = useTasks();

  const [contactName, setContactName] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    if (!contactsLoading && contactId && Array.isArray(allContacts)) {
      const contact = allContacts.find((c) => c.id === contactId);
      setContactName(contact ? contact.name : null);
    }
  }, [contactsLoading, allContacts, contactId]);

  if (!contactId) {
    return <div className="p-6 text-gray-800">No contact selected.</div>;
  }

  if (contactsLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <Loader text="Loading contact info..." />
      </div>
    );
  }

  const contactTasks = byContact(contactId);

  const handleQuickAdd = () => {
    if (!newTaskTitle.trim()) return;

    // ✅ Provide default dueDate if modal not used
    createTask(contactId, newTaskTitle.trim(), {
      dueDate: new Date().toISOString(),
      tags: [],
      priority: "Medium",
    });

    setNewTaskTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleQuickAdd();
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-[#1f2937]">
          Tasks for: {contactName ?? `Contact ID: ${contactId}`}
        </h1>

        <AddTaskButton
          contactId={contactId}
          onAddTask={(data) => {
            createTask(contactId, data.title, {
              dueDate: data.dueDate ?? new Date().toISOString(),
              tags: data.tags,
              priority: data.priority,
            });
          }}
        />

        <TaskList
          tasks={contactTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
}
