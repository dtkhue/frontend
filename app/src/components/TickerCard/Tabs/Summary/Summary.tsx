import React, { useEffect } from 'react';
import { Card, Typography, Box, Divider } from '@mui/material';
import { styled } from '@mui/system';

const Title = styled(Typography)({
  fontSize: '18px',
});

const TitleValue = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '20px',
});

const Item = ({title, value}: {title: string; value: string}) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Title>{title}</Title>
      <TitleValue>{value}</TitleValue>
    </Box>
  );
};

function createData(title:string, value:string) {
  return { title, value };
}

const data = [
  createData('Previous Close', '4,124.51'),
  createData('Open', '4,128.03'),
  createData('Volume', '2,229,695,000'),
  createData("Day's Range", '4,086.87 - 4,133.13'),
  createData('52 Week Range', '3,491.58 - 4,593.45'),
];

const Summary = () => {
  const fetchChart = () => {
    const authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjgwNjYyOTQ5LCJqdGkiOiJkYWU3ZTU2Mi04MWZhLTRlNGItOTA5MS0xZmRlZTY0OTNlODgiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2ODA2NjI5NDksImV4cCI6MTY4MDY2Mzg0OX0.JZcZy2Mbt3Sqbtys_tUKrs5knlCxVaIsLt8IBuRCLBo";
    const params = new URLSearchParams({
      q: JSON.stringify({
        force: true,
        thumb_size: [1000],
        window_size: [1000],
      }),
    });
    fetch('https://superset.nessight.com/api/v1/chart/4/data/?form_data=%7B%22adhoc_filters%22%3A%5B%7B%22clause%22%3A%22WHERE%22%2C%22expressionType%22%3A%22SIMPLE%22%2C%22comparator%22%3A%22AAA%22%2C%22operator%22%3A%22%3D%3D%22%2C%22subject%22%3A%22ticker%22%7D%5D%7D', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    fetchChart();
  }, []);

  return (
    <Card sx={{ maxWidth: '400px', minWidth: '350px' }}>
      <Box sx={{ p: 2 }}>
        {data.map((element) => (
          <React.Fragment key={element.title}>
            <Item title={element.title} value={element.value} />
            <Divider />
          </React.Fragment>
        ))}
      </Box>
    </Card>
    
  );
};

export default Summary;
