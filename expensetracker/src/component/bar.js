import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ expenses }) => {
  const categories = ['Food', 'Entertainment', 'Travel'];
  const categoryTotals = categories.map(category => {
    return expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  });

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses',
        data: categoryTotals,
        backgroundColor: ['rgba(135, 132, 210, 1)', 'rgba(135, 132, 210, 1)', 'rgba(135, 132, 210, 1)'],
        borderColor: ['rgba(135, 132, 210, 1)', 'rgba(135, 132, 210, 1)', 'rgba(135, 132, 210, 1)'],
        borderWidth: 1,
        barThickness: 20,
        borderRadius: {
            topLeft: 20,
            topRight: 20,
            bottomLeft: 20,
            bottomRight: 20
          },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',

      },
      title: {
        display: true,
        text: 'Expenses by Category',
      },
    }, 
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        display: false,
        
      },
      y: {
        grid: {
          display: false,
        },
     
    
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;

