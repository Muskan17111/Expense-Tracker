import React, { useState } from "react";
import { Box, Card } from "@mui/material";
import WalletCard from "./walletcard";
import ExpenseCard from "./expensecard";
import ExpenseHistory from "./historytransction";
import CustomPieChart from "./piechart"; 
import './wallet.css';
import BarChart from "./bar";

const Wallet = () => {
  const [balance, setBalance] = useState(4500);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(500);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    const expenseToDelete = expenses.find(expense => expense.id === id);
    setBalance(balance + expenseToDelete.amount);
    setTotalExpenses(totalExpenses - expenseToDelete.amount);
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const editExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map(expense => 
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    const originalExpense = expenses.find(expense => expense.id === updatedExpense.id);
    const amountDifference = updatedExpense.amount - originalExpense.amount;
    setBalance(balance - amountDifference);
    setTotalExpenses(totalExpenses + amountDifference);
    setExpenses(updatedExpenses);
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <Box className="expense-card">
        <WalletCard balance={balance} setBalance={setBalance} />
        <ExpenseCard
          balance={balance}
          setBalance={setBalance}
          totalExpenses={totalExpenses}
          setTotalExpenses={setTotalExpenses}
          addExpense={addExpense}/>
        <CustomPieChart expenses={expenses} /> 
      </Box>
      <div className="tracker">
        <ExpenseHistory expenses={expenses} deleteExpense={deleteExpense} editExpense={editExpense} />
       <Card className="bar">
        <BarChart  expenses={expenses} />
        </Card>
        </div>
    </div>
  );
};

export default Wallet;


 

