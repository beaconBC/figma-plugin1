export enum AnnotationType {
  DO = "Do",
  DONT = "Don't",
  HESITATE = "Hesitate",
}

export const initAnnotationData = {
  type: AnnotationType.DO,
  title: "",
  description: "",
};

export type AnnotationData = typeof initAnnotationData;

export interface AnnotationContextProps {
  state: AnnotationData;
  reset: () => void;
  setState: React.Dispatch<React.SetStateAction<AnnotationData>>;
}
