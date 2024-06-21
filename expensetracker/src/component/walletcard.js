import React, { useState } from 'react';
import { CardContent, Typography, Button } from '@mui/material';
import ReusableModal from './modal.js';

const WalletCard = ({ balance, setBalance }) => {
  const [showAddIncomeCard, setShowAddIncomeCard] = useState(false);
  const [incomeData, setIncomeData] = useState({ amount: '' });

  const handleAddIncome = () => {
    const amount = parseFloat(incomeData.amount);
    if (!isNaN(amount) && amount > 0) {
      setBalance(balance + amount);
    }
    setShowAddIncomeCard(false);
    setIncomeData({ amount: '' });
  };

  return (
    <CardContent className="card">
      <Typography variant="h5">
        Wallet Balance: <span style={{ color: 'rgba(181, 220, 82, 1)' }}>₹{balance}</span>
      </Typography>
      <Button
        sx={{ background: 'linear-gradient(45deg, rgba(181, 220, 82, 1) 30%, rgba(137, 225, 72, 1) 90%)' }}
        variant="contained"
        onClick={() => setShowAddIncomeCard(true)}
      >
        + Add Income
      </Button>
      <ReusableModal
        open={showAddIncomeCard}
        onClose={() => setShowAddIncomeCard(false)}
        onSave={handleAddIncome}
        type="income"
        data={incomeData}
        setData={setIncomeData}
      />
    </CardContent>
  );
};

export default WalletCard;


