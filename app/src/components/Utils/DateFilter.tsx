import React, { useState } from 'react';
import { Box,TextField,Button } from '@mui/material';

interface Props {
  onFilter: (start: Date, end: Date) => void;
}

const DateFilter: React.FC<Props> = ({ onFilter }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setStartDate(date ? new Date(date) : null);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setEndDate(date ? new Date(date) : null);
  };

  const handleFilter = () => {
    if (startDate && endDate) {
      onFilter(startDate, endDate);
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <TextField
        label="Start Date"
        type="date"
        value={startDate ? startDate.toISOString().split('T')[0] : ''}
        onChange={handleStartDateChange}
        sx={{ marginRight: '16px' }}
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate ? endDate.toISOString().split('T')[0] : ''}
        onChange={handleEndDateChange}
        sx={{ marginRight: '16px' }}
      />
    </Box>
  );
};

export default DateFilter;
