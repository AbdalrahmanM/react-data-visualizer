import React, { useState } from 'react';
import BarChart from './components/BarChart';
import Generator from './components/Generator';

function App() {
  const [generatedData, setGeneratedData] = useState([]);
  const [numChannels, setNumChannels] = useState(2); 

  const handleDataGenerated = newData => {
    setGeneratedData(prevData => [...prevData, newData]);
  };

  const handleSaveData = () => {
    localStorage.setItem('generatedData', JSON.stringify(generatedData));
  };

  const handleLoadData = () => {
    const savedData = localStorage.getItem('generatedData');
    if (savedData) {
      setGeneratedData(JSON.parse(savedData));
    }
  };

  const handleNumChannelsChange = newNumChannels => {
    setNumChannels(newNumChannels);
    setGeneratedData([]); 
  };

  return (
    <div className='text-center'>
      <h1 className='text-2xl font-extrabold text-center m-4'>React Data Visualizer</h1>
      <Generator onDataGenerated={handleDataGenerated} numChannels={numChannels} />
      <BarChart data={generatedData} numChannels={numChannels} />
      <div className='flex justify-around text-lg font-bold'>
        <button className='border-solid text-base border-2 rounded-2xl border-indigo-600 p-2 text-white bg-slate-700' onClick={handleSaveData}>Save Data</button>
        <button className='border-solid text-base border-2 rounded-2xl border-indigo-600 p-2 text-white bg-slate-700' onClick={handleLoadData}>Load Data</button>
        <label className='flex flex-col text-lg font-bold justify-between'>
          Number of Channels:
          <input
            type="number"
            value={numChannels}
            onChange={(e) => handleNumChannelsChange(parseInt(e.target.value, 10))}
            min="1"
          />
        </label>
      </div>
    </div>
  );
}

export default App;
