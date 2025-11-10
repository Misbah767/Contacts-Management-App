"use client";

import React, { useState } from "react";
import Input from "@/Components/Input/Input";
import DueDateModal from "@/Components/DueDateModal/DueDateModal";
import type { Priority } from "@/models/taskModel";

interface AddTaskProps {
  contactId: string;
  onAddTask: (data: {
    title: string;
    dueDate?: string;
    tags?: string[];
    priority?: Priority;
  }) => void;
  placeholder?: string;
  buttonText?: string;
  buttonClassName?: string;
}

const AddTaskButton: React.FC<AddTaskProps> = ({
  contactId,
  onAddTask,
  placeholder = "Enter task title...",
  buttonText = "Create Task",
  buttonClassName = "",
}) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSave = (data: { dueDate?: string; tags?: string[]; priority?: Priority }) => {
    onAddTask({ title, ...data });
    setTitle("");
    setError("");
    setIsModalOpen(false);
  };

  const plusIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );

  return (
    <div className="mb-4 w-full flex flex-col sm:flex-row sm:items-start sm:gap-2">
      {/* Input with error message */}
      <div className="div flex flex-row justify-center align-center">
        <div className="flex flex-col lg:ml-11 ">
          <Input
            value={title}
            onChange={(v) => {
              setTitle(v);
              if (v.trim()) setError("");
            }}
            placeholder={placeholder}
            icon={plusIcon}
            errorMessage={error}
          />
        </div>

        {/* Button aligned properly */}
        <div className="flex mt-2 sm:mt-0 sm:items-start w-full md:mt-3 lg:ml-7 sm:w-auto">
          <button
            onClick={handleOpenModal}
            className={`bg-sky-400 hover:bg-sky-500 outline-none text-white font-semibold px-6 py-4 rounded-full transition-colors duration-200 cursor-pointer w-full sm:w-auto ${buttonClassName}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
      {/* Due Date Modal */}
      <DueDateModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default AddTaskButton;
