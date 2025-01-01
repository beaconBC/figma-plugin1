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

export const AnnotationDefaultTexts = {
  [AnnotationType.DO]: {
    title: "Do this thing.",
    description: "Details of what to do.",
  },
  [AnnotationType.DONT]: {
    title: "Don't do this thing.",
    description: "Details of what not to do.",
  },
  [AnnotationType.HESITATE]: {
    title: "Hesitate before doing this.",
    description: "Details of what to be cautious about.",
  },
};

export const getAnnotationDefaultTexts = (type: AnnotationType) => {
  return (
    AnnotationDefaultTexts[type] || {
      title: "title",
      description: "description",
    }
  );
};
