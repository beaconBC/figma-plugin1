import { useContext } from "react";
import { SummaryContext } from "./Summary";
import { convertRequestedData } from "./Summary.type";
import { SummaryButtonProps } from "./SummaryArea";
import { produce } from "immer";

export default function SummaryButton({ className }: SummaryButtonProps) {
  const { state, setState } = useContext(SummaryContext);

  const clickHandler = () => {
    const summaryData = convertRequestedData(state);

    parent.postMessage(
      { pluginMessage: { type: "create-summary", summaryData } },
      "*"
    );

    setState(
      produce((draft) => {
        draft.title.value = "";
        draft.summary.value = "";
        draft.description.value = "";
      })
    );
  };

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        className="outline p-3 rounded-md hover:bg-slate-100"
        onClick={clickHandler}
      >
        Create Summary
      </button>
    </div>
  );
}
