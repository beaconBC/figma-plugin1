export const initSummaryData = {
  title: { isUse: true, value: "" },
  summary: { isUse: true, value: "" },
  description: { isUse: true, value: "" },
};

export type SummaryData = typeof initSummaryData;

export type SummaryRequestData = {
  [key in keyof SummaryData]: SummaryData[key]["value"];
};

export function convertRequestedData(data: SummaryData): SummaryRequestData {
  const targetData = { ...initSummaryData };
  const keys = Object.keys(targetData) as (keyof SummaryData)[];

  const result = keys.reduce((acc, key) => {
    if (data[key].isUse) {
      acc[key] = data[key].value;
    }
    return acc;
  }, {} as SummaryRequestData);

  return result;
}
