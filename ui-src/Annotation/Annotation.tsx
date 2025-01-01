import { createContext, ReactNode, useCallback, useState } from "react";
import {
  AnnotationContextProps,
  initAnnotationData,
  AnnotationData,
} from "./Annotation.type";
import { AnnotationArea } from "./AnnotationArea";
import { DoAnnotation } from "./DoAnnotation";
import { DontAnnotation } from "./DontAnnotation";
import { HesitateAnnotation } from "./HesitateAnnotation";

export const AnnotationContext = createContext<AnnotationContextProps>({
  state: initAnnotationData,
  setState: () => {},
  reset: () => {},
});

export function Annotation({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AnnotationData>(initAnnotationData);

  const reset = useCallback(() => {
    setState(({ type }) => ({ ...initAnnotationData, type }));
  }, []);

  return (
    <AnnotationContext.Provider value={{ state, setState, reset }}>
      {children}
    </AnnotationContext.Provider>
  );
}

Annotation.Area = AnnotationArea;
Annotation.Do = DoAnnotation;
Annotation.Dont = DontAnnotation;
Annotation.Hesitate = HesitateAnnotation;
