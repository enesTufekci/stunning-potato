import * as React from "react";
import { Item } from "./types";
import { parser } from "./utils/parser";
import { SettingsContext } from "./SettingsContext";
import { Settings } from "./Settings";

export type FilterFn = (data: Item[]) => Item[];

interface DataContextValue {
  data: Item[];
  getData: (fn: FilterFn) => Item[];
}
export let DataContext = React.createContext<DataContextValue>({} as any);

export let DataProvider: React.FC = ({ children }) => {
  let { selectedProject } = React.useContext(SettingsContext);
  let [data, setData] = React.useState<Item[] | null>(null);
  let getData = (fn: FilterFn = (data) => data) => fn(data || []);

  React.useEffect(() => {
    if (selectedProject) {
      fetch(
        `https://spreadsheets.google.com/feeds/list/${selectedProject.googleSheetId}/1/public/full?alt=json`
      )
        .then((res) => res.json())
        .then((data) => {
          if (selectedProject) {
            setData(parser(selectedProject, data));
          }
        });
    }
  }, [selectedProject]);

  if (!selectedProject) {
    return <Settings />;
  }
  return (
    <DataContext.Provider value={{ data: data || [], getData }}>
      {!data ? <>Loading</> : <>{children}</>}
    </DataContext.Provider>
  );
};
