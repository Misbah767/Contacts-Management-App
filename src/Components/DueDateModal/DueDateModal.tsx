"use client";
import React, { useState, useEffect } from "react";
import { getAllTags, addCustomTag } from "@/utils/tagsManager";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const PRIORITIES = ["Low", "Medium", "High"] as const;
type Priority = (typeof PRIORITIES)[number];

interface DueDateModalProps {
  isOpen: boolean;
  initialValue?: string | Date;
  onCancel: () => void;
  onSave: (data: { dueAt: string; tags: string[]; priority: Priority }) => void;
  initialTags?: string[];
  initialPriority?: Priority;
}

const toISO = (
  year: number,
  monthIndex: number,
  day: number,
  hour12: number,
  minute: number,
  period: string,
) => {
  let h = hour12 % 12;
  if (period === "PM") h += 12;
  const dt = new Date(year, monthIndex, day, h, minute, 0, 0);
  return dt.toISOString();
};

const generateMonthGrid = (year: number, monthIndex: number) => {
  const first = new Date(year, monthIndex, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const prevMonthDays = new Date(year, monthIndex, 0).getDate();
  const cells: { day: number; current: boolean }[] = [];

  for (let i = 0; i < startDay; i++) {
    cells.push({ day: prevMonthDays - startDay + 1 + i, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  while (cells.length % 7 !== 0 || cells.length < 42) {
    cells.push({
      day: cells.length - (startDay + daysInMonth) + 1,
      current: false,
    });
  }
  return cells;
};

const DueDateModal: React.FC<DueDateModalProps> = ({
  isOpen,
  initialValue,
  onCancel,
  onSave,
  initialTags = [],
  initialPriority = "Medium",
}) => {
  const now = new Date();
  const init = initialValue ? new Date(initialValue) : now;

  const [viewYear, setViewYear] = useState(init.getFullYear());
  const [viewMonth, setViewMonth] = useState(init.getMonth());
  const [selectedDay, setSelectedDay] = useState(init.getDate());
  const [hour, setHour] = useState(String(init.getHours() % 12 || 12).padStart(2, "0"));
  const [minute, setMinute] = useState(String(init.getMinutes()).padStart(2, "0"));
  const [period, setPeriod] = useState(init.getHours() >= 12 ? "PM" : "AM");
  const [error, setError] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState("");
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [priority, setPriority] = useState<Priority>(initialPriority);

  useEffect(() => {
    setAvailableTags(getAllTags());
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const base = initialValue ? new Date(initialValue) : new Date();
    setViewYear(base.getFullYear());
    setViewMonth(base.getMonth());
    setSelectedDay(base.getDate());

    const h = base.getHours();
    const h12 = h % 12 || 12;
    setHour(h12.toString().padStart(2, "0"));
    setMinute(base.getMinutes().toString().padStart(2, "0"));
    setPeriod(h >= 12 ? "PM" : "AM");

    setError("");
    setSelectedTags([...initialTags]);
    setNewTag("");
    setPriority(initialPriority);
  }, [isOpen]);

  const goPrevMonth = () => {
    const m = viewMonth - 1;
    if (m < 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else setViewMonth(m);
    setError("");
  };

  const goNextMonth = () => {
    const m = viewMonth + 1;
    if (m > 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else setViewMonth(m);
    setError("");
  };

  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) setSelectedTags((prev) => [...prev, tag]);
  };
  const removeTag = (tagToRemove: string) =>
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  const handleAddNewTag = () => {
    if (newTag.trim()) {
      const trimmed = newTag.trim();
      addTag(trimmed);
      addCustomTag(trimmed);
      setAvailableTags(getAllTags());
      setNewTag("");
    }
  };
  const save = () => {
    const iso = toISO(
      viewYear,
      viewMonth,
      selectedDay,
      parseInt(hour, 10),
      parseInt(minute, 10),
      period,
    );
    const dt = new Date(iso);
    if (Number.isNaN(dt.getTime())) {
      setError("Invalid date/time");
      return;
    }
    if (dt < new Date()) {
      setError("Invalid date: selected time is in the past");
      return;
    }
    onSave({ dueAt: iso, tags: selectedTags, priority });
  };

  if (!isOpen) return null;

  const monthName = new Date(viewYear, viewMonth, 1).toLocaleString(undefined, {
    month: "long",
  });
  const cells = generateMonthGrid(viewYear, viewMonth);
  const today = new Date();
  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] transform transition-all duration-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b border-sky-200">
          <h3 className="text-lg font-semibold text-sky-900">Select Due Date & Time</h3>
          <button onClick={onCancel} className="text-sky-400 hover:text-sky-600">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Calendar */}
            <div className="p-4 my-auto">
              <div className="flex items-center justify-between mb-3">
                <button onClick={goPrevMonth} className="p-1.5 rounded-md hover:bg-sky-100">
                  ←
                </button>
                <div className="text-sm font-medium text-sky-800">
                  {monthName} {viewYear}
                </div>
                <button onClick={goNextMonth} className="p-1.5 rounded-md hover:bg-sky-100">
                  →
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-xs">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-sky-600 py-1">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 mt-1">
                {cells.map((c, i) => {
                  const isSel = c.current && c.day === selectedDay;
                  const isPast = c.current && isCurrentMonth && c.day < today.getDate();
                  const disabled = !c.current || isPast;
                  return (
                    <button
                      key={i}
                      onClick={() => !disabled && setSelectedDay(c.day)}
                      className={`py-2 text-sm rounded-md transition-colors ${
                        isSel
                          ? "bg-sky-400 text-white"
                          : disabled
                            ? "text-sky-300"
                            : "text-sky-800 hover:bg-sky-100"
                      }`}
                      disabled={disabled}
                    >
                      {c.day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time / Priority / Tags */}
            <div className="p-4 border-t lg:border-t-0 lg:border-l border-sky-200 space-y-4">
              {/* Time */}
              <div>
                <div className="text-sm font-medium mb-2 text-sky-800">Time</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    type="number"
                    value={hour}
                    onChange={(e) =>
                      setHour(
                        String(
                          Math.min(12, Math.max(1, parseInt(e.target.value || "0", 10))),
                        ).padStart(2, "0"),
                      )
                    }
                    className="w-16 px-2 py-2 text-center rounded-md border bg-sky-50"
                    min={1}
                    max={12}
                  />
                  <span className="text-sky-800">:</span>
                  <input
                    type="number"
                    value={minute}
                    onChange={(e) =>
                      setMinute(
                        String(
                          Math.min(59, Math.max(0, parseInt(e.target.value || "0", 10))),
                        ).padStart(2, "0"),
                      )
                    }
                    className="w-16 px-2 py-2 text-center rounded-md border bg-sky-50"
                    min={0}
                    max={59}
                  />
                  <div className="flex rounded-md overflow-hidden border">
                    <button
                      type="button"
                      onClick={() => setPeriod("AM")}
                      className={`w-12 px-2 py-2 text-sm ${
                        period === "AM" ? "bg-sky-400 text-white" : "bg-sky-50"
                      }`}
                    >
                      AM
                    </button>
                    <button
                      type="button"
                      onClick={() => setPeriod("PM")}
                      className={`w-12 px-2 py-2 text-sm ${
                        period === "PM" ? "bg-sky-400 text-white" : "bg-sky-50"
                      }`}
                    >
                      PM
                    </button>
                  </div>
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              {/* Priority */}
              <div>
                <div className="text-sm font-medium mb-2 text-sky-800">Priority</div>
                <div className="flex gap-2">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        priority === p
                          ? "bg-sky-400 text-white"
                          : "bg-sky-50 border hover:bg-sky-100"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="text-sm font-medium mb-2 text-sky-800">Tags</div>
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {selectedTags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-sky-200 text-sky-800"
                      >
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="mb-3">
                  <div className="text-xs text-sky-600 mb-1">Available Tags:</div>
                  <div className="flex flex-wrap gap-1">
                    {availableTags
                      .filter((tag) => !selectedTags.includes(tag))
                      .map((tag) => (
                        <button
                          key={tag}
                          onClick={() => addTag(tag)}
                          className="px-2 py-1 text-xs rounded-full border hover:bg-sky-100"
                        >
                          + {tag}
                        </button>
                      ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddNewTag()}
                    placeholder="Add custom tag..."
                    className="flex-1 px-2 py-1 text-sm rounded-md border bg-sky-50"
                  />
                  <button
                    onClick={handleAddNewTag}
                    className="px-3 py-1 text-sm bg-sky-400 text-white rounded-md hover:bg-sky-500"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex justify-end gap-2 border-t border-sky-200">
          <button onClick={onCancel} className="px-4 py-2 rounded-md hover:bg-sky-100">
            Cancel
          </button>
          <button
            onClick={save}
            className="px-4 py-2 rounded-md bg-sky-400 hover:bg-sky-500 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DueDateModal;
