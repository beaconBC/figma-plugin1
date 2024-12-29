import { useRef, useState } from "react";
import { Summary } from "./Summary/Summary";

enum HangoverType {
  NotePad = "NotePad",
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

  const [selectValue, setSelectValue] = useState(HangoverType.NotePad);

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
            <option value={HangoverType.NotePad}>NotePad</option>
          </select>
        </div>
      </header>
      <div className="mt-5">
        <Summary>
          <div className="flex justify-between">
            <Summary.SummaryOptions />
            <Summary.SummaryButton />
          </div>
          <Summary.SummaryArea />
        </Summary>
      </div>
    </main>
  );
}

export default App;
