import React from 'react';
import { Box, Card, Typography, Button, Modal, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const ReusableModal = ({ open, onClose, onSave, type, data, setData }) => {
  const handleChange = (field) => (event) => {
    setData({ ...data, [field]: event.target.value });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Card sx={{ width: 400, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          {type === 'income' ? 'Add Income' : 'Add Expense'}
        </Typography>
        {type !== 'income' && (
          <>
            <TextField
              label="Title"
              value={data.title || ''}
              onChange={handleChange('title')}
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={data.category || ''}
                onChange={handleChange('category')}
                label="Category"
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Date"
              type="date"
              value={data.date || ''}
              onChange={handleChange('date')}
              variant="outlined"
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}
        <TextField
          label="Amount"
          value={data.amount || ''}
          onChange={handleChange('amount')}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button
            sx={{ background: 'linear-gradient(45deg, rgba(181, 220, 82, 1) 30%, rgba(137, 225, 72, 1) 90%)', color: 'white' }}
            variant="contained"
            onClick={onSave}
          >
            {type === 'income' ? 'Add Income' : 'Add Expense'}
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Card>
    </Modal>
  );
};

export default ReusableModal;

