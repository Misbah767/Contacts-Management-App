"use client";

import React, { useState } from "react";
import type { Task, Priority } from "@/models/taskModel";
import DueDateModal from "../DueDateModal/DueDateModal";
import Checkbox from "../CheckBox/CheckBox";
import TaskActions from "../TaskActions/TaskActions";

interface Props {
  tasks: Task[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
}

const TaskList: React.FC<Props> = ({
  tasks,
  toggleTask,
  deleteTask,
  updateTask,
}) => {
  const [editing, setEditing] = useState<Task | null>(null);

  const saveEdit = (data: {
    dueAt: string;
    tags: string[];
    priority: Priority;
  }) => {
    if (!editing) return;
    updateTask(editing.id, {
      dueAt: data.dueAt,
      tags: data.tags,
      priority: data.priority,
    });
    setEditing(null);
  };

  if (!tasks.length)
    return (
      <div className="text-sky-400 text-center py-6 text-sm sm:text-base md:text-lg">
        No tasks for this contact.
      </div>
    );

  return (
    <>
      <div className="space-y-4">
        {tasks.map((t) => (
          <div
            key={t.id}
            className={`bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-md flex flex-row justify-between gap-6 items-center transition-all duration-300 ${
              t.status === "completed" ? "opacity-70" : ""
            }`}
          >
            {/* Task Info */}
            <div className="flex-1 w-full flex flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <h2
                  className={`text-base sm:text-lg md:text-xl font-semibold ${
                    t.status === "completed"
                      ? "line-through text-sky-300"
                      : "text-sky-900"
                  }`}
                >
                  {t.title}
                </h2>
                <div className="space-y-1 text-xs sm:text-sm text-sky-500">
                  <p>Status: {t.status}</p>
                  <p>
                    Due:{" "}
                    {t.dueAt
                      ? new Date(t.dueAt).toLocaleString()
                      : "No due date"}
                  </p>
                </div>
                {/* Safe tags check */}
                {t.tags && t.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {t.tags.map((tag) => (
                      <span
                        key={tag + t.id}
                        className="text-xs sm:text-sm bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Priority */}
              <span
                className={`px-2 sm:px-3 py-0.5 rounded-full text-xs sm:text-sm font-medium ${
                  t.priority === "High"
                    ? "bg-sky-600"
                    : t.priority === "Medium"
                    ? "bg-sky-400"
                    : "bg-sky-200"
                } text-white`}
              >
                {t.priority}
              </span>
            </div>

            {/* Actions: Checkbox + Edit/Delete */}
            <div className="flex justify-center items-center gap-4">
              <Checkbox
                checked={t.status === "completed"}
                onChange={() => toggleTask(t.id)}
              />
              <TaskActions
                onEdit={() => setEditing(t)}
                onDelete={() => deleteTask(t.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <DueDateModal
          isOpen={!!editing}
          initialValue={editing.dueAt}
          initialTags={editing.tags || []} // always ensure array
          initialPriority={editing.priority}
          onCancel={() => setEditing(null)}
          onSave={saveEdit}
        />
      )}
    </>
  );
};

export default TaskList;
