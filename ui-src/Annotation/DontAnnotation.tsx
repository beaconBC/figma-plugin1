import { useContext } from "react";
import { AnnotationContext } from "./Annotation";
import { InnerInputArea } from "./InnerInputArea";
import { AnnotationDefaultTexts, AnnotationType } from "./Annotation.type";

const { title: TITLE, description: DESCRIPTION } =
  AnnotationDefaultTexts[AnnotationType.DONT];

export function DontAnnotation() {
  const { state, setState } = useContext(AnnotationContext);

  return (
    <div className="shadow-md">
      <div className="h-2 bg-[#FF3737]"></div>
      <div className="p-4 flex flex-col gap-2">
        <InnerInputArea
          className="font-bold tracking-tight text-xl outline-1 outline-blue-200 p-px"
          name="title"
          defaultValue={state.title || TITLE}
          onBlur={(title) => {
            setState({ ...state, title });
          }}
        />
        <InnerInputArea
          className="tracking-tight text-sm text-[#49495A] outline-1 outline-blue-200 p-px"
          name="description"
          defaultValue={state.description || DESCRIPTION}
          onBlur={(description) => {
            setState({ ...state, description });
          }}
        />
      </div>
    </div>
  );
}
