"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

type SectionObserverCtx = {
  activeId: string | null;
  activeDark: boolean;
  register: (id: string, el: HTMLElement, dark: boolean) => () => void;
  setPanelActive: (order: number, id: string, dark: boolean, on: boolean) => void;
};

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
  const darkById = useRef<Map<string, boolean>>(new Map());
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

  function register(id: string, el: HTMLElement, dark: boolean) {
    darkById.current.set(id, dark);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveId(id);
          setActiveDark(darkById.current.get(id) ?? false);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }

  return (
    <SectionObserverContext.Provider value={{ activeId, activeDark, register, setPanelActive }}>
      {children}
    </SectionObserverContext.Provider>
  );
}

export function useSectionObserver() {
  return useContext(SectionObserverContext);
}
