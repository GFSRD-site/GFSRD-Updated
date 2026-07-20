// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

import GlobalInitiative from "./GlobalInitiative";

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

describe("GlobalInitiative", () => {
  it("selects the continent from the query string on load", () => {
    render(
      <MemoryRouter initialEntries={["/global?continent=europe"]}>
        <GlobalInitiative />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: "Europe" })).toHaveClass("bg-primary");
    expect(screen.getByRole("button", { name: "Asia" })).not.toHaveClass("bg-primary");
  });
});
