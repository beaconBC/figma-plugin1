import { produce } from "immer";
import { memo, useContext } from "react";
import { SummaryContext } from "./Summary";
import { SummaryData } from "./Summary.type";

const OptionsText = {
  title: "Title",
  summary: "Summary",
  description: "Description",
};

export default function SummaryOptions() {
  const { state, setState } = useContext(SummaryContext);
  const keys = Object.keys(state) as (keyof SummaryData)[];
  return (
    <div>
      {keys.map((key, idx) => {
        const value = state[key];
        const id = `checkbox-${key}-${idx}`;
        return (
          <div key={id} className="flex justify-between gap-3">
            <label htmlFor={id}>{OptionsText[key]}</label>
            <input
              defaultChecked={value.isUse}
              type="checkbox"
              id={id}
              onChange={(e) => {
                setState(
                  produce((draft) => {
                    draft[key].isUse = e.target.checked;
                  })
                );
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
