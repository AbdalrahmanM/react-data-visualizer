import React, { useState, useEffect } from 'react';

const Generator = ({ onDataGenerated, numChannels }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [intervalSeconds, setIntervalSeconds] = useState(1);
  const [numberRange, setNumberRange] = useState(10);

  const generateRandomNumber = () => Math.floor(Math.random() * (numberRange + 1));

  const startGenerator = () => {
    setIsGenerating(true);
  };

  const stopGenerator = () => {
    setIsGenerating(false);
  };

  useEffect(() => {
    let intervalId;

    if (isGenerating) {
      intervalId = setInterval(() => {
        const newData = {};

        for (let i = 1; i <= numChannels; i++) {
          newData[`channel${i}`] = generateRandomNumber();
        }

        onDataGenerated(newData);
      }, intervalSeconds * 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isGenerating, onDataGenerated, intervalSeconds, numberRange, numChannels]);

  return (
    <div className="flex flex-col">
      <div>
        <h2 className="text-xl font-bold">Number Generator</h2>
      </div>
      <div className="flex justify-around text-xl font-bold">
        <label>
          Interval (seconds):
          <input
            type="number"
            value={intervalSeconds}
            onChange={(e) => setIntervalSeconds(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Number Range:
          <input
            type="number"
            value={numberRange}
            onChange={(e) => setNumberRange(parseInt(e.target.value, 10))}
          />
        </label>
      </div>
      <div className="flex justify-evenly m-2">
        <button onClick={startGenerator} disabled={isGenerating} className="border-solid text-base border-2 rounded-2xl border-indigo-600 p-2 text-white bg-slate-700">
          Start
        </button>
        <button onClick={stopGenerator} disabled={!isGenerating} className="border-solid text-base border-2 rounded-2xl border-indigo-600 p-2 text-white bg-slate-700">
          Stop
        </button>
      </div>
    </div>
  );
};

export default Generator;
