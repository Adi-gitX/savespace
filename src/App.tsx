import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SmoothScroll } from "./components/ui/SmoothScroll";

const queryClient = new QueryClient();
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Visualization = lazy(() => import("./pages/Index"));
const FinderInterface = lazy(() => import("./pages/FinderInterface"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const Theory = lazy(() => import("./pages/Theory"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SmoothScroll>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-black">Loading...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/visualization" element={<Visualization />} />
              <Route path="/finder" element={<FinderInterface />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/theory" element={<Theory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </SmoothScroll>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
