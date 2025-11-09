import React from "react";
import { render, waitFor } from "@testing-library/react";
import { act } from "react";
import usetasks from "@/lib/hooks/usetasks";

beforeEach(() => {
  localStorage.clear();
});

function HookTester({ callback }: { callback: (hook: ReturnType<typeof usetasks>) => void }) {
  const hook = usetasks();
  React.useEffect(() => {
    callback(hook);
  }, [hook, callback]);
  return null;
}

describe("usetasks hook", () => {
  let hookResult: ReturnType<typeof usetasks> | null = null;

  // helper to wait for task to appear in state
  async function waitForTask(taskId: string) {
    await waitFor(() => {
      if (!hookResult!.tasks.find((t) => t.id === taskId)) throw new Error("Task not yet in state");
    });
  }

  it("can create a new task", async () => {
    render(<HookTester callback={(hook) => (hookResult = hook)} />);
    await waitFor(() => hookResult !== null);

    let createdTaskId = "";
    await act(async () => {
      const result = await hookResult!.createTask("c1", "New Task");
      createdTaskId = result.task.id;
      expect(result.success).toBe(true);
    });

    await waitForTask(createdTaskId);

    expect(hookResult!.tasks.length).toBe(1);
    expect(hookResult!.tasks.find((t) => t.id === createdTaskId)!.title).toBe("New Task");
  });

  it("can update a task", async () => {
    render(<HookTester callback={(hook) => (hookResult = hook)} />);
    await waitFor(() => hookResult !== null);

    let taskId = "";
    await act(async () => {
      const create = await hookResult!.createTask("c1", "Task to Update");
      taskId = create.task.id;
    });

    await waitForTask(taskId);

    await act(async () => {
      const update = await hookResult!.updateTask(taskId, { title: "Updated Task" });
      expect(update.success).toBe(true);
    });

    expect(hookResult!.tasks.find((t) => t.id === taskId)!.title).toBe("Updated Task");
  });

  it("can delete a task", async () => {
    render(<HookTester callback={(hook) => (hookResult = hook)} />);
    await waitFor(() => hookResult !== null);

    let taskId = "";
    await act(async () => {
      const create = await hookResult!.createTask("c1", "Task to Delete");
      taskId = create.task.id;
    });

    await waitForTask(taskId);

    await act(async () => {
      const del = await hookResult!.deleteTask(taskId);
      expect(del.success).toBe(true);
    });

    expect(hookResult!.tasks.find((t) => t.id === taskId)).toBeUndefined();
  });

  it("can toggle task status", async () => {
    render(<HookTester callback={(hook) => (hookResult = hook)} />);
    await waitFor(() => hookResult !== null);

    let taskId = "";
    await act(async () => {
      const create = await hookResult!.createTask("c1", "Task to Toggle");
      taskId = create.task.id;
    });

    await waitForTask(taskId);

    await act(async () => {
      // first toggle
      await hookResult!.toggleTask(taskId);
    });
    expect(hookResult!.tasks.find((t) => t.id === taskId)!.status).toBe("completed");

    await act(async () => {
      // second toggle
      await hookResult!.toggleTask(taskId);
    });
    expect(hookResult!.tasks.find((t) => t.id === taskId)!.status).toBe("pending");
  });

  it("filters tasks by contactId", async () => {
    render(<HookTester callback={(hook) => (hookResult = hook)} />);
    await waitFor(() => hookResult !== null);

    let t1Id = "",
      t2Id = "";
    await act(async () => {
      const t1 = await hookResult!.createTask("c1", "Task 1");
      t1Id = t1.task.id;
      const t2 = await hookResult!.createTask("c2", "Task 2");
      t2Id = t2.task.id;
    });

    await waitForTask(t1Id);
    await waitForTask(t2Id);

    const c1Tasks = hookResult!.byContact("c1");
    expect(c1Tasks.length).toBe(1);
    expect(c1Tasks[0].contactId).toBe("c1");
  });
});
