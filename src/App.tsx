import React from "react";

import { DataProvider } from "./DataContext";
import { SettingsProvider } from "./SettingsContext";
import { SingleRandomItem } from "./SingleRandomItem";

function App() {
  return (
    <SettingsProvider>
      <DataProvider>
        <div className="flex items-center justify-center">
          <div
            style={{ width: "600px" }}
            className="bg-gray-200 max-w-md w-64 max-h-full h-screen"
          >
            <SingleRandomItem />
          </div>
        </div>
      </DataProvider>
    </SettingsProvider>
  );
}

export default App;
