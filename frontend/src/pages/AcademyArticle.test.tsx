// @vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { beforeAll, describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import AcademyArticle from "./AcademyArticle";

beforeAll(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});

describe("AcademyArticle Redesign", () => {
  const renderComponent = (academyId = "sustainable-agriculture") => {
    return render(
      <MemoryRouter initialEntries={[`/academy/${academyId}`]}>
        <Routes>
          <Route path="/academy/:id" element={<AcademyArticle />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders the hero banner with academic branding and logo", () => {
    renderComponent("sustainable-agriculture");

    // Banner heading and content heading both display the title
    const headings = screen.getAllByRole("heading", {
      name: /GFSRD – Global Centre for Sustainable Agriculture and Food Security/i,
    });
    expect(headings.length).toBeGreaterThanOrEqual(1);

    // Quick View header
    expect(screen.getByText("Quick View")).toBeInTheDocument();
  });

  it("renders all required Quick View sections in navigation", () => {
    renderComponent("sustainable-agriculture");

    const navs = screen.getAllByRole("navigation", { hidden: true });
    expect(navs.length).toBeGreaterThanOrEqual(1);

    expect(screen.getByRole("button", { name: /^About Us$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Vision$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Mission$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Plan$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Objectives$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /People/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Join Us/i })[0]).toBeInTheDocument();
  });

  it("dynamically switches content when clicking Quick View items", () => {
    renderComponent("sustainable-agriculture");

    // Click Vision
    const visionBtn = screen.getByRole("button", { name: /^Vision$/i });
    fireEvent.click(visionBtn);
    expect(screen.getByRole("heading", { name: /^Vision$/i })).toBeInTheDocument();

    // Click Mission
    const missionBtn = screen.getByRole("button", { name: /^Mission$/i });
    fireEvent.click(missionBtn);
    expect(screen.getByRole("heading", { name: /^Mission$/i })).toBeInTheDocument();

    // Click Plan
    const planBtn = screen.getByRole("button", { name: /^Plan$/i });
    fireEvent.click(planBtn);
    expect(screen.getByRole("heading", { name: /^Plan$/i })).toBeInTheDocument();

    // Click Objectives
    const objBtn = screen.getByRole("button", { name: /^Objectives$/i });
    fireEvent.click(objBtn);
    expect(screen.getByRole("heading", { name: /^Objectives$/i })).toBeInTheDocument();
  });

  it("renders People section with Academy Head and Team", () => {
    renderComponent("sustainable-agriculture");

    // Click Academy Head sub-item
    const headBtn = screen.getByRole("button", { name: /Academy Head/i });
    fireEvent.click(headBtn);

    // Academy Head details using the exact head image from data
    expect(screen.getByText(/Dr\. Kanchan Bhowmik/i)).toBeInTheDocument();
    const headImg = screen.getByRole("img", { name: /Dr\. Kanchan Bhowmik/i });
    expect(headImg).toHaveAttribute("src", "/academy-heads/kanchan-bhowmik.png");

    // Click Team sub-item
    const teamBtn = screen.getByRole("button", { name: /Team/i });
    fireEvent.click(teamBtn);

    // Team section
    expect(screen.getByText(/Team details coming soon/i)).toBeInTheDocument();
  });

  it("renders Join Us section with existing roles", () => {
    renderComponent("sustainable-agriculture");

    // Select the Quick View button for Join Us
    const joinBtns = screen.getAllByRole("button", { name: /Join Us/i });
    const quickViewJoinBtn = joinBtns.find((b) => b.closest("nav")) || joinBtns[0];
    fireEvent.click(quickViewJoinBtn);

    expect(screen.getByRole("heading", { name: /^Join Us$/i })).toBeInTheDocument();
    expect(screen.getByText(/^Member$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Fellow$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Intern$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Volunteer$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Partner$/i)).toBeInTheDocument();
  });
});
