export type Item = Record<string, string>;

export type Project = {
  name: string;
  googleSheetId: string;
  columns: string;
  weightColumnName: string;
};
