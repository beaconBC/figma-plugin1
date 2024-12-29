import { useRef, useState } from "react";
import { Summary } from "./Summary/Summary";

enum HangoverType {
  Summary = "Summary",
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

  const [selectValue, setSelectValue] = useState(HangoverType.Summary);

  return (
    <main className="p-3">
      <header className="flex justify-between">
        <h2 className="text-4xl text-black">Hangover</h2>
        <div className="p-2 outline flex w-fit rounded-md">
          <select
            className="outline-none pr-2"
            id="pet-select"
            onChange={(e) => setSelectValue(e.target.value as HangoverType)}
          >
            <option value={HangoverType.Summary}>{HangoverType.Summary}</option>
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
            <Summary.SummaryArea />
          </Summary>
        )}
      </div>
    </main>
  );
}

export default App;
