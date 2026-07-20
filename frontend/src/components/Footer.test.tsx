// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

import { Footer } from "./Footer";

beforeAll(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

describe("Footer", () => {
  it("shows regional links and India contact details", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "About GFSRD" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Regional Heads" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Upcoming Events" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Quick Contact" })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Europe" })).toHaveAttribute(
      "href",
      "/global?continent=europe",
    );
    expect(screen.getByText(/Vill \+ P\.O - Bahiri/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /gfsrd\.international@gmail\.com/i })).toHaveAttribute(
      "href",
      "mailto:netwrok@gfsrd.org",
    );
  });
});
