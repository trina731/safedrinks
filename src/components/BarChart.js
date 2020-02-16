import React from 'react';
import ReactDOM from 'react-dom';
import {HorizontalBar} from 'react-chartjs-2';
import './BarChart.scss'

const data = {
  labels: ['Calvin', 'Isil', 'Maruth', 'Aditya', 'Michael'],
  datasets: [
    {
      label: 'BAC Level',
      pointRadius: 0.05,
      backgroundColor: 'rgba(0, 181, 204, 1)',
      borderColor: 'rgba(44, 130, 201, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0, 181, 204, 1)',
      hoverBorderColor: 'rgba(44, 130, 201, 1)',
      data: [0.17, 0.00, 0.24, 0.06, 0.13]
    }
  ]
};

const options = {
  scales: {
      xAxes: [{
          gridLines: {
              offsetGridLines: true
          }
      }]
  },
  maintainAspectRatio: false,
  responsive: true
};

class BarChart extends React.Component{
  render() {
    return (
  <div>        
    <h2>My Circle</h2>
        <HorizontalBar data={data} width={100} height={200} options={{ maintainAspectRatio: false }}
/>
      </div>
    );
  }
}

export default BarChart;