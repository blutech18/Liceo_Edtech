import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Hotline from "./pages/Hotline";
import GoogleClassroom from "./pages/GoogleClassroom";
import Resources from "./pages/Resources";
import Trainings from "./pages/Trainings";
import EdTechTeam from "./pages/EdTechTeam";
import Feedback from "./pages/Feedback";
import AboutUs from "./pages/AboutUs";
import Forms from "./pages/Forms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hotline" element={<Hotline />} />
          <Route path="/google-classroom" element={<GoogleClassroom />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/edtech-team" element={<EdTechTeam />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/forms" element={<Forms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
