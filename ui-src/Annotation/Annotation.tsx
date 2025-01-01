import { createContext, ReactNode, useState } from "react";
import {
  AnnotationContextProps,
  initAnnotationData,
  AnnotationData,
} from "./Annotation.type";

export const AnnotationContext = createContext<AnnotationContextProps>({
  state: initAnnotationData,
  setState: () => {},
});

export function Annotation({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AnnotationData>(initAnnotationData);

  return (
    <AnnotationContext.Provider value={{ state, setState }}>
      {children}
    </AnnotationContext.Provider>
  );
}
