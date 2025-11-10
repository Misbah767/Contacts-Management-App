"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Task, Priority } from "@/models/taskModel";

const STORAGE_KEY = "tasktracker_tasks_v2";

export default function usetasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const createTask = async (
    contactId: string,
    title: string,
    options?: {
      dueDate?: string;
      tags?: string[];
      priority?: Priority;
      description?: string;
    },
  ) => {
    const newTask: Task = {
      id: uuidv4(),
      contactId,
      title,
      description: options?.description,
      status: "pending",
      dueAt: options?.dueDate ?? new Date().toISOString(), // ✅ default to now
      tags: options?.tags ?? [],
      priority: options?.priority ?? "Medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);

    try {
      await new Promise((res) => setTimeout(res, 100));
      return { success: true, task: newTask };
    } catch (err) {
      setTasks((prev) => prev.filter((t) => t.id !== newTask.id));
      setError((err as Error).message);
      return { success: false, error: (err as Error).message };
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const prev = tasks.find((t) => t.id === id);
    if (!prev) return { success: false, error: "Not found" };
    const updated: Task = {
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setTasks((all) => all.map((t) => (t.id === id ? updated : t)));
    try {
      await new Promise((res) => setTimeout(res, 100));
      return { success: true, task: updated };
    } catch (err) {
      setTasks((all) => all.map((t) => (t.id === id ? prev : t)));
      return { success: false, error: (err as Error).message };
    }
  };

  const deleteTask = async (id: string) => {
    const prev = tasks.find((t) => t.id === id);
    if (!prev) return { success: false, error: "Not found" };
    setTasks((all) => all.filter((t) => t.id !== id));
    try {
      await new Promise((res) => setTimeout(res, 100));
      return { success: true };
    } catch (err) {
      setTasks((all) => [prev, ...all]);
      return { success: false, error: (err as Error).message };
    }
  };

  const toggleTask = async (id: string) => {
    const prev = tasks.find((t) => t.id === id);
    if (!prev) return { success: false, error: "Not found" };

    let newStatus: Task["status"];
    if (prev.status === "pending") newStatus = "completed";
    else if (prev.status === "completed") newStatus = "pending";
    else newStatus = "in-progress";

    const updated: Task = {
      ...prev,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    setTasks((all) => all.map((t) => (t.id === id ? updated : t)));

    try {
      await new Promise((res) => setTimeout(res, 100));
      return { success: true };
    } catch (err) {
      setTasks((all) => all.map((t) => (t.id === id ? prev : t)));
      return { success: false, error: (err as Error).message };
    }
  };

  const byContact = (contactId: string) => tasks.filter((t) => t.contactId === contactId);

  return {
    tasks,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    byContact,
    setError,
  };
}
