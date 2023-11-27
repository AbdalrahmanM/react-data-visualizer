// App component

import React, { useState } from "react";
import BarChart from "./components/BarChart";
import Generator from "./components/Generator";

function App() {
  const [generatedData, setGeneratedData] = useState([]);
  const [numChannels, setNumChannels] = useState(2);

  const handleDataGenerated = (newData) => {
    setGeneratedData((prevData) => [...prevData, newData]);
  };

  const handleSaveData = () => {
    localStorage.setItem("generatedData", JSON.stringify(generatedData));
  };

  const handleLoadData = () => {
    const loadedData = localStorage.getItem("generatedData");
    if (loadedData) {
      setGeneratedData(JSON.parse(loadedData));
    }
  };

  return (
    <div className='text-center'>
      <h1 className='text-2xl font-extrabold text-center m-4'>
        React Data Visualizer
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <BarChart data={generatedData} numChannels={numChannels} />
        </div>
        <div className="pt-[8rem]">
          <Generator
            onDataGenerated={handleDataGenerated}
            numChannels={numChannels}
          />
          <div className="flex justify-evenly m-4">
            <button
              className="border-solid text-base border-2 rounded-2xl border-indigo-600 p-2 text-white bg-slate-700"
              onClick={handleSaveData}
            >
              Save
            </button>
            <button
              className="border-solid text-base border-2 rounded-2xl border-indigo-600 p-2 text-white bg-slate-700"
              onClick={handleLoadData}
            >
              Load
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
