"use client";

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const TaskActions: React.FC<Props> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex gap-2 flex-col mt-1">
      <button
        onClick={onEdit}
        className="p-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white"
        aria-label="Edit Task"
      >
        <FaEdit size={14} />
      </button>
      <button
        onClick={onDelete}
        className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
        aria-label="Delete Task"
      >
        <FaTrash size={14} />
      </button>
    </div>
  );
};

export default TaskActions;
