import { useContext } from "react";
import { AnnotationContext } from "./Annotation";
import { OneTab } from "./OneTabProps";
import { AnnotationType } from "./Annotation.type";
import { DoAnnotation } from "./DoAnnotation";

export function AnnotationArea() {
  const { state, setState } = useContext(AnnotationContext);

  return (
    <div>
      <div className="border-b-2 ">
        <ul className="flex  -mb-[2px]">
          {Object.values(AnnotationType).map((oneType) => (
            <OneTab
              key={oneType}
              selected={state.type === oneType}
              onClick={() => setState({ ...state, type: oneType })}
            >
              {oneType}
            </OneTab>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        {state.type === AnnotationType.DO && <DoAnnotation />}
      </div>
    </div>
  );
}
