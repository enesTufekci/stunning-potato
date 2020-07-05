import * as React from "react";
import { DataContext } from "./DataContext";
import { Item } from "./types";
import { rdwt } from "./utils/rdwt";
import { SettingsContext } from "./SettingsContext";

function getRandomItem(data: Item[], currentItem?: Item): Item {
  let newItem = rdwt(data, (i) => Number(i.frequency));
  if (currentItem && newItem.german === currentItem.german) {
    return getRandomItem(data, currentItem);
  } else {
    return newItem;
  }
}

export let SingleRandomItem: React.FC = () => {
  let { data } = React.useContext(DataContext);
  let { selectedProject } = React.useContext(SettingsContext);
  let [item, setItem] = React.useState<Item>(getRandomItem(data));

  let next = () => {
    setItem(getRandomItem(data, item));
  };
  let { german, english, notes, frequency, context } = item;
  console.log(selectedProject?.weightColumnName);
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="h-full flex-1 overflow-y-scroll">
        <div>
          <span className="text-sm px-2 py-1 rounded-md bg-orange-400">
            frequency: <span className="font-bold">{frequency}</span>
          </span>
          <span> </span>
          <span className="text-sm px-2 py-1 rounded-md bg-orange-400">
            context: <span className="font-bold">{context}</span>
          </span>
        </div>
        <div className="h-4"></div>
        <div>
          <h4 className="text-xl font-bold">German</h4>
          <p>{german}</p>
        </div>
        <div className="h-4"></div>
        <div>
          <h4 className="text-xl font-bold">English</h4>
          <p>{english}</p>
        </div>
        <div className="h-4"></div>
        {notes !== "" && (
          <div>
            <h4 className="text-xl font-bold">Notes</h4>
            <p>{notes}</p>
          </div>
        )}
      </div>
      <div className="py-12">
        <button
          className="bg-indigo-700 text-white rounded-md shadow-sm px-4 py-2 w-full"
          onClick={next}
        >
          Next
        </button>
      </div>
    </div>
  );
};
