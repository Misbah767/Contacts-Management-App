import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import usecontacts from "@/lib/hooks/usecontacts";

// Helper component to test hooks
function HookTester({ callback }: { callback: (hook: ReturnType<typeof usecontacts>) => void }) {
  const hook = usecontacts();
  React.useEffect(() => {
    callback(hook);
  }, [hook, callback]);
  return null;
}

describe("usecontacts hook", () => {
  it("loads contacts and sets initial state", async () => {
    let hookResult: ReturnType<typeof usecontacts> | null = null;

    render(<HookTester callback={(hook) => (hookResult = hook)} />);

    // wait until loading is false
    await waitFor(
      () => {
        if (!hookResult) throw new Error("Hook not initialized yet");
        if (hookResult.loading) throw new Error("Contacts still loading");
      },
      { timeout: 2000 },
    ); // max 2s wait

    expect(hookResult).not.toBeNull();
    expect(hookResult!.contacts.length).toBeGreaterThan(0);
    expect(hookResult!.total).toBeGreaterThan(0);
    expect(hookResult!.loading).toBe(false);
    expect(hookResult!.page).toBe(1);
    expect(hookResult!.perPage).toBe(50);
  });

  it("filters contacts based on query", async () => {
    let hookResult: ReturnType<typeof usecontacts> | null = null;

    render(
      <HookTester
        callback={(hook) => {
          hookResult = hook;
          hook.setQuery("john");
        }}
      />,
    );

    // wait until debounce applied
    await waitFor(
      () => {
        if (!hookResult) throw new Error("Hook not initialized yet");
        if (hookResult.loading) throw new Error("Contacts still loading");
        if (hookResult.contacts.length === 0) throw new Error("Filtered contacts not ready");
      },
      { timeout: 2000 },
    );

    expect(hookResult).not.toBeNull();
    expect(
      hookResult!.contacts.every(
        (c) =>
          c.name.toLowerCase().includes("john") ||
          c.email.toLowerCase().includes("john") ||
          c.phone.toLowerCase().includes("john"),
      ),
    ).toBe(true);
  });

  it("sorts contacts correctly", async () => {
    let hookResult: ReturnType<typeof usecontacts> | null = null;

    render(
      <HookTester
        callback={(hook) => {
          hookResult = hook;
          hook.setSortBy("email");
          hook.setSortOrder("desc");
        }}
      />,
    );

    await waitFor(
      () => {
        if (!hookResult) throw new Error("Hook not initialized yet");
        if (hookResult.loading) throw new Error("Contacts still loading");
      },
      { timeout: 2000 },
    );

    const emails = hookResult!.contacts.map((c) => c.email);
    const sortedEmails = [...emails].sort((a, b) => b.localeCompare(a));
    expect(emails).toEqual(sortedEmails);
  });
});
