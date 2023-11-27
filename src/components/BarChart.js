import React from 'react';
const BarChart = ({ data }) => {
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Bar Chart</h2>
      <div className='flex flex-end overflow-x-auto whitespace-nowrap'>
        {data.map((item, index) => (
          <div
            key={index}
            className='relative text-red-500 bg-blue-600 w-[50px] mr-[10px] text-center inline-flex mb-4'
            style={{
                height: `${(item.channel1 + item.channel2) * 10}px`,
                backgroundColor: index % 2 === 0 ? '#3498db' : '#e74c3c',
            }}
          >
            <span className='absolute transform rotate-90 mt-4 text-black font-semibold'>{`Bar ${index + 1}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
