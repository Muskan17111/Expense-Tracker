import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomPieChart = ({ expenses }) => {
  const calculateCategoryExpenses = (expenses) => {
    const categoryExpenses = {
      Food: 30,
      Travel: 10,
      Entertainment: 60
    };

    expenses.forEach(expense => {
      if (expense.category === 'Food') {
        categoryExpenses.Food += expense.amount;
      } else if (expense.category === 'Travel') {
        categoryExpenses.Travel += expense.amount;
      } else if (expense.category === 'Entertainment') {
        categoryExpenses.Entertainment += expense.amount;
      }
    });

    return categoryExpenses;
  };

  const categoryExpenses = calculateCategoryExpenses(expenses);

  const data = Object.keys(categoryExpenses).map(category => ({
    name: category,
    value: categoryExpenses[category]
  }));

  const COLORS = ['#82ca9d', '#8884d8', '#ffc658'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={14}
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <ResponsiveContainer width="30%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;


// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const CustomPieChart = ({ expenses }) => {
//   const calculateCategoryExpenses = (expenses) => {
//     const categoryExpenses = {
//       Food: 30,
//       Travel: 10,
//       Entertainment: 60
//     };
  
//     expenses.forEach(expense => {
//       if (expense.category === 'Food') {
//         categoryExpenses.Food += expense.amount;
//       } else if (expense.category === 'Travel') {
//         categoryExpenses.Travel += expense.amount;
//       } else if (expense.category === 'Entertainment') {
//         categoryExpenses.Entertainment += expense.amount;
//       }
//     });
  
//     return categoryExpenses;
//   };
//   const categoryExpenses = calculateCategoryExpenses(expenses);


//   const data = Object.keys(categoryExpenses).map(category => ({
//     name: category,
//     value: categoryExpenses[category]
//   }));

//   return (
//     <ResponsiveContainer width="30%" height={250}>
//       <PieChart>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           label={({ name, percent }) => ${name} ${(percent * 100).toFixed(0)}%}
//           outerRadius={100}
//           fill="#8884d8"
//           dataKey="value"
//         >
//           {data.map((entry, index) => (
//             <Cell key={cell-${index}} fill={['#82ca9d', '#8884d8', '#ffc658'][index % 3]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// export default CustomPieChart;






