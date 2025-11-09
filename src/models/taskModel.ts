// src/models/taskModel.ts

export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  contactId: string; // linked contact
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  dueAt?: string;
  tags?: string[];
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}
