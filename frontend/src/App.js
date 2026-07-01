import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import { SwiftProvider } from "@/components/swift/SwiftContext";
import Header from "@/components/swift/Header";
import Footer from "@/components/swift/Footer";
import ChatAssistant from "@/components/swift/ChatAssistant";
import ScrollProgress from "@/components/swift/ScrollProgress";
import ComingSoonModal from "@/components/swift/ComingSoonModal";
import ScheduleConsultModal from "@/components/swift/ScheduleConsultModal";

function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return undefined;
    const lenis = new Lenis({ duration: 1.2, lerp: 0.08, smoothWheel: true });
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

function Shell({ children }) {
  useLenis();
  return (
    <div className="App relative">
      <ScrollProgress />
      <Header />
      {children}
      <Footer />
      <ChatAssistant />
      <ComingSoonModal />
      <ScheduleConsultModal />
    </div>
  );
}

function App() {
  return (
    <SwiftProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Shell>
                <Landing />
              </Shell>
            }
          />
          <Route
            path="/login"
            element={
              <Shell>
                <Login />
              </Shell>
            }
          />
          <Route
            path="*"
            element={
              <Shell>
                <Landing />
              </Shell>
            }
          />
        </Routes>
      </BrowserRouter>
    </SwiftProvider>
  );
}

export default App;
