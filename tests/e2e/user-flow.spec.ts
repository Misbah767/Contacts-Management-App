import { test, expect } from "@playwright/test";

test.describe("Contacts → Search & click last contact Tasks button", () => {
  const searchItems = ["Abagail Bechtelar", "abbigail.jones@example.com", "031716076"];

  test("search → focus first contact → clear search → click last contact Tasks button", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("text=TaskTracker")).toBeVisible();

    // Open Contacts page
    await page.locator("text=View Contacts").click();
    await expect(page.locator('h1:has-text("Contacts")')).toBeVisible({ timeout: 20000 });

    const searchInput = page.locator('input[placeholder*="Search"]');
    const clearButton = page.locator('button[aria-label="Clear search"]');

    // Search loop
    for (const query of searchItems) {
      await searchInput.fill(query);

      const firstContact = page.locator('[role="listbox"] [role="option"]').first();
      await expect(firstContact).toBeVisible({ timeout: 10000 });
      await firstContact.focus();

      await clearButton.click();
      await expect(searchInput).toHaveValue("");

      // Wait for contacts list to stabilize
      await expect(page.locator('[role="listbox"] [role="option"]').first()).toBeVisible({
        timeout: 10000,
      });
    }

    // Click last contact Tasks button safely
    const lastTasksButton = page
      .locator('[role="listbox"] [role="option"]')
      .last()
      .locator('button:has-text("Tasks")');

    await expect(lastTasksButton).toBeVisible({ timeout: 20000 });
    await lastTasksButton.click();

    // ✅ Wait for Tasks page to fully render
    const tasksHeader = page.locator("h1");
    await tasksHeader.waitFor({ state: "visible", timeout: 20000 });
    await expect(tasksHeader).toContainText(/Tasks for/i);

    console.log("✅ Search + last contact Tasks button click flow completed!");
  });
});
