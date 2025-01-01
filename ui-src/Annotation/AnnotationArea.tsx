import { useContext } from "react";
import { Annotation, AnnotationContext } from "./Annotation";
import { OneTab } from "./OneTabProps";
import { AnnotationType } from "./Annotation.type";

export function AnnotationArea() {
  const { state, setState, reset } = useContext(AnnotationContext);

  const clickHandler = () => {
    const annotationData = state;
    parent.postMessage(
      { pluginMessage: { type: "create-annotation", annotationData } },
      "*"
    );
    reset();
  };

  return (
    <div className="">
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
      <div className="flex flex-col h-max">
        <div className="mt-10 flex-grow">
          {state.type === AnnotationType.DO && <Annotation.Do />}
          {state.type === AnnotationType.DONT && <Annotation.Dont />}
          {state.type === AnnotationType.HESITATE && <Annotation.Hesitate />}
        </div>
        <div className="text-right">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
            onClick={clickHandler}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
