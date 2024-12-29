import { createContext, ReactNode, useState } from "react";
import { initSummaryData, SummaryData } from "./Summary.type";
import { SummaryArea } from "./SummaryArea";
import { SummaryOptions } from "./SummaryOptions";
import { SummaryButton } from "./SummaryButton";

interface SummaryContextProps {
  state: SummaryData;
  setState: React.Dispatch<React.SetStateAction<SummaryData>>;
}

export const SummaryContext = createContext<SummaryContextProps>({
  state: initSummaryData,
  setState: () => {},
});

export function Summary({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SummaryData>(initSummaryData);

  return (
    <SummaryContext.Provider value={{ state, setState }}>
      {children}
    </SummaryContext.Provider>
  );
}

Summary.SummaryArea = SummaryArea;
Summary.SummaryButton = SummaryButton;
Summary.SummaryOptions = SummaryOptions;
