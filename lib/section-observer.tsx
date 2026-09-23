"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type SectionObserverCtx = {
  activeId: string | null;
  activeDark: boolean;
  register: (id: string, el: HTMLElement, dark: boolean) => () => void;
  setPanelActive: (order: number, id: string, dark: boolean, on: boolean) => void;
};

// Vertical middle of the fixed nav bar (py-4 + ~34px of content).
const NAV_MID = 33;

const noopRegister = () => () => {};

const SectionObserverContext = createContext<SectionObserverCtx>({
  activeId: null,
  activeDark: false,
  register: noopRegister,
  setPanelActive: () => {},
});

export function SectionObserverProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeDark, setActiveDark] = useState(false);
  const sections = useRef<Map<string, { el: HTMLElement; dark: boolean }>>(new Map());
  const panelsByOrder = useRef<Map<number, { id: string; dark: boolean }>>(new Map());

  const setPanelActive = useCallback((order: number, id: string, dark: boolean, on: boolean) => {
    if (on) panelsByOrder.current.set(order, { id, dark });
    else panelsByOrder.current.delete(order);
    const orders = [...panelsByOrder.current.keys()];
    if (!orders.length) return;
    const top = panelsByOrder.current.get(Math.max(...orders))!;
    setActiveId(top.id);
    setActiveDark(top.dark);
  }, []);

  // The nav's theme follows whichever registered section is behind the middle of the nav bar. Measured on scroll,
  // so it is right in both directions (an observer only reports crossings and can be left holding a stale theme).
  const recompute = useCallback(() => {
    const y = NAV_MID;
    for (const [id, { el, dark }] of sections.current) {
      const r = el.getBoundingClientRect();
      if (r.top <= y && r.bottom > y) {
        setActiveId(id);
        setActiveDark(dark);
        return;
      }
    }
  }, []);

  useEffect(() => {
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(recompute);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [recompute]);

  const register = useCallback(
    (id: string, el: HTMLElement, dark: boolean) => {
      sections.current.set(id, { el, dark });
      requestAnimationFrame(recompute);
      return () => {
        sections.current.delete(id);
      };
    },
    [recompute]
  );

  return (
    <SectionObserverContext.Provider value={{ activeId, activeDark, register, setPanelActive }}>
      {children}
    </SectionObserverContext.Provider>
  );
}

export function useSectionObserver() {
  return useContext(SectionObserverContext);
}
