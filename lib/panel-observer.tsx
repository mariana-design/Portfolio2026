"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

type PanelMeta = { number: string; label: string };

type PanelObserverCtx = {
  active: PanelMeta | null;
  activate: (index: number, meta: PanelMeta, on: boolean) => void;
};

const PanelObserverContext = createContext<PanelObserverCtx>({
  active: null,
  activate: () => {},
});

export function PanelObserverProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<PanelMeta | null>(null);
  const activeByIndex = useRef<Map<number, PanelMeta>>(new Map());

  const activate = useCallback((index: number, meta: PanelMeta, on: boolean) => {
    if (on) activeByIndex.current.set(index, meta);
    else activeByIndex.current.delete(index);
    const indices = [...activeByIndex.current.keys()];
    setActive(indices.length ? activeByIndex.current.get(Math.max(...indices)) ?? null : null);
  }, []);

  const value = useMemo(() => ({ active, activate }), [active, activate]);

  return <PanelObserverContext.Provider value={value}>{children}</PanelObserverContext.Provider>;
}

export function usePanelObserver() {
  return useContext(PanelObserverContext);
}
