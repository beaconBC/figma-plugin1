import { useContext } from "react";
import { SummaryContext } from "./Summary";
import { convertRequestedData } from "./Summary.type";
import { SummaryButtonProps } from "./SummaryArea";

export function SummaryButton({ className }: SummaryButtonProps) {
  const { state } = useContext(SummaryContext);

  const onBox1 = () => {
    const summaryData = convertRequestedData(state);

    parent.postMessage(
      { pluginMessage: { type: "create-summary", summaryData } },
      "*"
    );
  };

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        className="outline p-3 rounded-md hover:bg-slate-100"
        onClick={onBox1}
      >
        Create Summary
      </button>
    </div>
  );
}
