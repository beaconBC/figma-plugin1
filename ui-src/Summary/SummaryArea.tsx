import { produce } from "immer";
import { useContext } from "react";
import { SummaryContext } from "./Summary";

export interface SummaryButtonProps {
  className?: string;
}

export function SummaryArea() {
  const {
    state: { title, summary, description },
    setState,
  } = useContext(SummaryContext);

  return (
    <>
      <div className="bg-black text-white p-6">
        {title.isUse && (
          <div>
            <input
              placeholder="Enter Title"
              type="text"
              defaultValue={title.value}
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
        )}
        <div className="mt-2">24.11.28</div>
        {summary.isUse && (
          <>
            <div className="border-t-[1px] border-white my-5" />
            <div>
              <div className="font-semibold">Summary</div>
              <input
                defaultValue={summary.value}
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
        )}
        {description.isUse && (
          <>
            <div className="border-t-[1px] border-white my-5" />
            <div>
              <div className="font-semibold">Description</div>
              <div>
                <textarea
                  defaultValue={description.value}
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
            </div>
          </>
        )}
      </div>
    </>
  );
}
