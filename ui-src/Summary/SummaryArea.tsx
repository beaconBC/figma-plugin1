import { produce } from "immer";
import { memo, useContext } from "react";
import { SummaryContext } from "./Summary";

export interface SummaryButtonProps {
  className?: string;
}

export function SummaryArea() {
  return (
    <div className="bg-black text-white p-6">
      <TitleArea />
      <DateArea />
      <SummaryTextArea />
      <DescriptionTextArea />
    </div>
  );
}

const TitleArea = () => {
  const {
    state: { title },
    setState,
  } = useContext(SummaryContext);

  if (!title.isUse) {
    return null;
  }

  return (
    <div>
      <input
        placeholder="Enter Title"
        type="text"
        value={title.value}
        onChange={(e) => {
          setState(
            produce((draft) => {
              draft.title.value = e.target.value;
            })
          );
        }}
        className="text-3xl font-bold bg-black w-full outline-none"
      />
    </div>
  );
};

interface DateAreaProps {
  date?: Date;
}

const DateArea = ({ date = new Date() }: DateAreaProps) => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return (
    <div className="mt-2">{`${date.getFullYear() % 100}.${month}.${day}`}</div>
  );
};

const SummaryTextArea = () => {
  const {
    state: { summary },
    setState,
  } = useContext(SummaryContext);

  if (!summary.isUse) {
    return null;
  }

  return (
    <>
      <div className="border-t-[1px] border-white my-5" />
      <div>
        <div className="font-semibold">Summary</div>
        <input
          value={summary.value}
          onChange={(e) => {
            setState(
              produce((draft) => {
                draft.summary.value = e.target.value;
              })
            );
          }}
          className="bg-black outline-none text-[#C6C6D4] text-sm"
          type="text"
          placeholder="Enter Summary"
        />
      </div>
    </>
  );
};

const DescriptionTextArea = () => {
  const {
    state: { description },
    setState,
  } = useContext(SummaryContext);

  if (!description.isUse) {
    return null;
  }

  return (
    <>
      <div className="border-t-[1px] border-white my-5" />
      <div>
        <div className="font-semibold">Description</div>
        <textarea
          value={description.value}
          onChange={(e) => {
            setState(
              produce((draft) => {
                draft.description.value = e.target.value;
              })
            );
          }}
          className="w-full bg-black outline-none text-[#C6C6D4] text-sm"
          placeholder="Enter description"
        ></textarea>
      </div>
    </>
  );
};
