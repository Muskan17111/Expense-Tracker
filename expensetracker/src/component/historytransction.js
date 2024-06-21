import React, { useState } from "react";
import { Box, Typography, Button, CardContent } from "@mui/material";
import ReusableModal from './modal.js';
import EditIcon from '../logo/editlogo.svg';
import DeleteIcon from '../logo/delete.svg';
import FoodIcon from '../logo/food.svg';
import TravelIcon from '../logo/travel.svg';
import EntertainmentIcon from '../logo/entertainment.svg';
import './historylist.css';

const ExpenseHistory = ({ initialExpenses }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const defaultExpenses = [
    { id: 1, title: 'Samosa', amount: 150, category: 'Food', date: '2023-06-01' },
    { id: 2, title: 'Movie', amount: 300, category: 'Entertainment', date: '2023-06-02' },
    { id: 3, title: 'Travel', amount: 50, category: 'Travel', date: '2023-06-03' }
  ];

  const [expenses, setExpenses] = useState(initialExpenses || defaultExpenses);

  const openEditModal = (expense) => {
    setSelectedExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleEditExpense = () => {
    const updatedExpense = {
      ...selectedExpense,
      title: selectedExpense.title,
      amount: parseFloat(selectedExpense.amount),
      category: selectedExpense.category,
      date: selectedExpense.date
    };
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    setIsEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedExpense(null);
  };

  const setEditedData = (data) => {
    setSelectedExpense((prev) => ({ ...prev, ...data }));
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(expenses.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getCategoryLogo = (category) => {
    switch (category) {
      case 'Food':
        return FoodIcon;
      case 'Travel':
        return TravelIcon;
      case 'Entertainment':
        return EntertainmentIcon;
      default:
        return null;
    }
  };

  return (
    <div>
  <Typography className="historyTranscation" variant="h5">History Transaction</Typography>
    <Box className="expense-history-card">
      {expenses.length === 0 ? (
        <Typography>No expenses recorded.</Typography>
      ) : (
        currentExpenses.map((expense) => (
                  <CardContent  className="historylist" sx={{  display:"flex", flexDirection:"row" ,justifyContent:"space-between", width:"100%", marginTop:"0px"}}>
                  <div className="logo">
                      <img src={getCategoryLogo(expense.category)} alt={expense.category} style={{ width: '50px', height: '50px', margin: '10px' }} />
                    <div>
                    <p>{expense.title}</p>
                    <p>{expense.date}</p>
                        </div>
                    </div>
                   <div>
                    <div className="amount">
                    <p >₹{expense.amount}</p>
                    <Button onClick={() => handleDeleteExpense(expense.id)}>
                    <img src={DeleteIcon} alt="Delete" style={{ width: '50px', height: '50px' }} />
                    </Button>
                    <Button onClick={() => openEditModal(expense)}>
                      <img src={EditIcon} alt="Edit" style={{ width: '50px', height: '50px' }} />
                    </Button>
                    </div>
                    </div>
                 </CardContent>
        ))
      )}

        {selectedExpense && (
          <ReusableModal
            open={isEditModalOpen}
            onClose={handleCloseModal}
            onSave={handleEditExpense}
            type="expense"
            data={selectedExpense}
            setData={setEditedData}
          />
        )}

        <Box className="pagination">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          {pageNumbers.map((number) => (
            <Button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </Button>
          ))}
          <Button onClick={handleNextPage} disabled={currentPage === pageNumbers.length}>
            Next
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ExpenseHistory;


