import { useRef, useState } from "react";

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

  const onBox1 = () => {
    parent.postMessage({ pluginMessage: { type: "create-box1" } }, "*");
  };

  const [selectValue, setSelectValue] = useState("");

  return (
    <main className="">
      <header>
        <h2 className="text-4xl bg-black text-white">Rectangle Creator</h2>
      </header>
      <section className="bg-slate-200  p-2">
        <label htmlFor="input">Rectangle Count</label>
        <input id="input" type="number" min="0" ref={inputRef} />
      </section>
      <div>
        <select
          id="pet-select"
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>

        <div>selected value : {selectValue}</div>
      </div>

      <div>
        {selectValue === "cat" && <Cat />}
        {selectValue !== "cat" && <Summary />}
      </div>

      <footer>
        <button className="outline p-5" onClick={onCreate}>
          Create
        </button>
        <button className="outline p-5" onClick={onBox1}>
          box1
        </button>
        <button className="outline p-5" onClick={onCancel}>
          Cancel
        </button>
      </footer>
    </main>
  );
}

function Cat() {
  return <div>CAT</div>;
}

function Summary() {
  const inputRef = useRef<HTMLInputElement>(null);

  const onBox1 = () => {
    parent.postMessage(
      { pluginMessage: { type: "create-box1", summaryText } },
      "*"
    );
  };

  const [summaryText, setSummaryText] = useState("");

  return (
    <div>
      <h2>Summary</h2>
      <div>
        <input
          className="outline outline-slate-300"
          type="text"
          placeholder="summary text"
          onChange={(e) => setSummaryText(e.target.value)}
          ref={inputRef}
        />
      </div>
      <button type="button" className="outline p-3" onClick={onBox1}>
        Create Summary
      </button>
    </div>
  );
}

export default App;
