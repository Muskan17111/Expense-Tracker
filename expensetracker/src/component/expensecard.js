import React, { useState } from 'react';
import { CardContent, Typography, Button } from '@mui/material';
import ReusableModal from './modal';

const ExpenseCard = ({ balance, setBalance, totalExpenses, setTotalExpenses, addExpense }) => {
  const [showAddExpenseCard, setShowAddExpenseCard] = useState(false);
  const [expenseData, setExpenseData] = useState({ title: '', amount: '', category: '', date: '' });

  const handleAddExpense = () => {
    const amount = parseFloat(expenseData.amount);
    if (!isNaN(amount) && amount > 0) {
      const expense = {
        id: Date.now(),
        title: expenseData.title,
        amount: amount,
        category: expenseData.category,
        date: expenseData.date,
      };
      setBalance(balance - amount);
      setTotalExpenses(totalExpenses + amount);
      addExpense(expense);
      setShowAddExpenseCard(false);
      setExpenseData({ title: '', amount: '', category: '', date: '' });
    }
  };

  return (
    <CardContent className="card">
      <Typography gutterBottom variant="h5">
        Expense: <span style={{ color: 'rgba(181, 220, 82, 1)' }}>₹{totalExpenses}</span>
      </Typography>
      <Button
        sx={{ background: 'linear-gradient(45deg, rgba(181, 220, 82, 1) 30%, rgba(137, 225, 72, 1) 90%)' }}
        variant="contained"
        onClick={() => setShowAddExpenseCard(true)}
      >
        - Add Expense
      </Button>
      <ReusableModal
        open={showAddExpenseCard}
        onClose={() => setShowAddExpenseCard(false)}
        onSave={handleAddExpense}
        type="expense"
        data={expenseData}
        setData={setExpenseData}
      />
    </CardContent>
  );
};

export default ExpenseCard;



