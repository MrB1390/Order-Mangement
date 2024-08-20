import React from 'react';
import { Bar } from 'react-chartjs-2';

const Statistics = ({ data }) => {
  console.log('Chart Data:', data); // Log chart data for debugging
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Statistical Bar Chart</h2>
      <Bar
        data={data}
        options={{
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }}
      />
    </div>
  );
};

export default Statistics;
