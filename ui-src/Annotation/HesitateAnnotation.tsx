import { InnerInputArea } from "./InnerInputArea";

export function HesitateAnnotation() {
  return (
    <div className="shadow-md">
      <div className="h-2 bg-[#F8CF3E]"></div>
      <div className="p-4 flex flex-col gap-2">
        <InnerInputArea
          className="font-bold tracking-tight text-xl outline-1 outline-blue-200 p-px"
          name="title"
          defaultValue="Hesitate about this."
        />
        <InnerInputArea
          className="tracking-tight text-sm text-[#49495A] outline-1 outline-blue-200 p-px"
          name="description"
          defaultValue="Think about this thing."
        />
      </div>
    </div>
  );
}
