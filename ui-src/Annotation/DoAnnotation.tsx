import { InnerInputArea } from "./InnerInputArea";

export function DoAnnotation() {
  return (
    <div className="shadow-md">
      <div className="h-2 bg-[#00D870]"></div>
      <div className="p-4 flex flex-col gap-2">
        <InnerInputArea
          className="font-bold tracking-tight text-xl outline-1 outline-blue-200 p-px"
          name="title"
          defaultValue="Do this thing."
        />
        <InnerInputArea
          className="tracking-tight text-sm text-[#49495A] outline-1 outline-blue-200 p-px"
          name="description"
          defaultValue="Details of what to do."
        />
      </div>
    </div>
  );
}
