// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

import People from "./People";

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

describe("People", () => {
  it("renders source team members with profile links", () => {
    render(
      <MemoryRouter>
        <People />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", { name: "Mr. Shirdad Mohammadi" }),
    ).toHaveAttribute("href", "/people/shirdad-mohammadi");
    expect(
      screen.getByRole("img", { name: "Mr. Shirdad Mohammadi" }),
    ).toHaveAttribute("src", "/team/mem1.png");
  });
});
