import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Academy from "./pages/Academy";
import AcademyArticle from "./pages/AcademyArticle";
import MediaCoverage from "./pages/MediaCoverage";
import GlobalInitiative from "./pages/GlobalInitiative";
import GlobalProfile from "./pages/GlobalPorfile";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Internship from "./pages/Internship";
import People from "./pages/People";
import TeamProfile from "./pages/TeamProfile";
import IndiaInitiative from "./pages/IndiaInitiative";
import Partners from "./pages/Partner";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/event" element={<Events />} />
          <Route path="/academy/:id" element={<AcademyArticle />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/media-coverage" element={<MediaCoverage />} />
          <Route path="/global" element={<GlobalInitiative />} />
          <Route path="/global/profile/:id" element={<GlobalProfile />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/india" element={<IndiaInitiative />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:id" element={<TeamProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
