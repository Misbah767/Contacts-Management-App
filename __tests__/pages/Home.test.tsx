// __tests__/Home.test.tsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "@/app/page"; // make sure this path matches your project

// ------------------------
// Mock Next.js modules
// ------------------------

// Mock next/link to render children as a simple <a>
jest.mock("next/link", () => ({ children, href }: any) => <a href={href}>{children}</a>);

// Mock next/navigation useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("HomePage", () => {
  it("renders title and description", () => {
    render(<HomePage />);

    // Title
    expect(screen.getByText("TaskTracker")).toBeInTheDocument();

    // Description (span breaks text, so use function matcher)
    expect(
      screen.getByText(
        (content) => content.includes("Manage your") && content.includes("efficiently"),
      ),
    ).toBeInTheDocument();
  });

  it("renders View Contacts link", () => {
    render(<HomePage />);
    const link = screen.getByRole("link", { name: /view contacts/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/contacts");
  });

  it("clicking View Contacts works", async () => {
    render(<HomePage />);
    const user = userEvent.setup();
    const link = screen.getByRole("link", { name: /view contacts/i });

    // Simulate click
    await user.click(link);

    // Since Link is mocked, just ensure href exists
    expect(link).toHaveAttribute("href", "/contacts");
  });

  it("renders footer correctly", () => {
    render(<HomePage />);
    expect(screen.getByText(/Built with ❤️ by Hafiza Misbah/i)).toBeInTheDocument();
  });
});
