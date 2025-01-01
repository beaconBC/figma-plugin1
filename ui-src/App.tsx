import { useRef, useState } from "react";
import { Summary } from "./Summary/Summary";
import { Annotation } from "./Annotation/Annotation";
import { AnnotationArea } from "./Annotation/AnnotationArea";

enum HangoverType {
  Summary = "Summary",
  ANNOTATION = "Annotation",
}

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const onCreate = () => {
    const count = Number(inputRef.current?.value || 0);
    parent.postMessage(
      { pluginMessage: { type: "create-rectangles", count } },
      "*"
    );
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  const [selectValue, setSelectValue] = useState(HangoverType.ANNOTATION);

  return (
    <main className="p-3">
      <header className="flex justify-between">
        <h2 className="text-4xl text-black">Hand Off</h2>
        <div className="p-2 outline flex w-fit rounded-md">
          <select
            defaultValue={selectValue}
            className="outline-none pr-2"
            id="pet-select"
            onChange={(e) => setSelectValue(e.target.value as HangoverType)}
          >
            {Object.values(HangoverType).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </header>
      <div className="mt-5">
        {selectValue === HangoverType.Summary && (
          <Summary>
            <div className="flex justify-between">
              <Summary.SummaryOptions />
              <Summary.SummaryButton />
            </div>
            <div className="mt-3">
              <Summary.SummaryArea />
            </div>
          </Summary>
        )}
        {selectValue === HangoverType.ANNOTATION && (
          <Annotation>
            <AnnotationArea />
          </Annotation>
        )}
      </div>
    </main>
  );
}

export default App;
