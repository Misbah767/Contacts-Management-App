// src/scripts/generateData.ts
import { faker } from "@faker-js/faker";
import type { Contact } from "@/models/contactModel";
import type { Task } from "@/models/taskModel";

faker.seed(123); // ✅ Deterministic fake data every time

// LocalStorage keys
const CONTACTS_KEY = "contacts_data";
const TASKS_KEY = "tasks_data";

// ✅ Generate or load contacts
export const loadContacts = (count = 10000): Contact[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(CONTACTS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length >= count) {
        console.log(
          `🧩 Loaded ${parsed.length.toLocaleString()} contacts from localStorage`
        );
        return parsed;
      }
    }
  }

  console.time("Generating contacts");
  const contacts: Contact[] = Array.from({ length: count }, (_, i) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      id: `contact-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `03${faker.number
        .int({ min: 0, max: 9999999 })
        .toString()
        .padStart(7, "0")}`,
      company: faker.company.name(),
      avatar: faker.image.avatar(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
  });
  console.timeEnd("Generating contacts");

  if (typeof window !== "undefined") {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }

  console.log(`✅ Generated ${contacts.length.toLocaleString()} contacts`);
  console.log("📊 Sample contact:", contacts[0]);

  return contacts;
};

// ✅ Generate or load tasks
export const loadTasks = (
  contacts: Contact[],
  maxTasksPerContact = 3
): Task[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(TASKS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        console.log(
          `🧩 Loaded ${parsed.length.toLocaleString()} tasks from localStorage`
        );
        return parsed;
      }
    }
  }

  console.time("Generating tasks");
  const tasks: Task[] = [];

  contacts.forEach((c) => {
    const n = faker.number.int({ min: 0, max: maxTasksPerContact });
    for (let i = 0; i < n; i++) {
      tasks.push({
        id: faker.string.uuid(),
        contactId: c.id,
        title: faker.hacker.phrase(),
        description: faker.lorem.sentences(2),
        status: faker.helpers.arrayElement([
          "pending",
          "in-progress",
          "completed",
        ]),
        dueAt: faker.date.soon().toISOString(),
        tags: faker.helpers.arrayElements(
          ["UI", "Backend", "Bug", "Review"],
          1
        ),
        priority: faker.helpers.arrayElement(["Low", "Medium", "High"]),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      });
    }
  });
  console.timeEnd("Generating tasks");

  if (typeof window !== "undefined") {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }

  console.log(`✅ Generated ${tasks.length.toLocaleString()} tasks`);
  console.log("📊 Sample task:", tasks[0]);

  return tasks;
};

// ✅ Helper function to generate both and log totals
export const generateAndLogAllData = () => {
  const contacts = loadContacts(10000); // 10k contacts
  const tasks = loadTasks(contacts, 3);

  console.log("🧮 Final Counts:");
  console.table({
    "Total Contacts": contacts.length,
    "Total Tasks": tasks.length,
  });
};
