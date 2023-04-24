import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { stockData } from '../../pages/SummuryContainerInfo/Datatest/test';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";


// import SummaryContainer from "./DataTest/TestKhue";

type SummaryContainerProps = {
  id: number;
};

const SummaryContainer = ({ id }: SummaryContainerProps) => {
  const data = stockData.find((stock) => stock.id === id);

  if (!data) {
    return null; // or render a loading indicator
  }

  return (
    <Container>
      <Box
          sx={{
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 2,
          backgroundColor: (theme: Theme) => theme.palette.primary.light,
          color: (theme: Theme) => theme.palette.primary.contrastText,
        }}
      >
        <Grid item xs={12} spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', paddingRight: 2 }}>
              Previous Close:
            </Typography>
            <Typography variant="body1">{data.previousClose}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', paddingRight: 2 }}>
              Open:
            </Typography>
            <Typography variant="body1">{data.open}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', paddingRight: 2 }}>
              Volume:
            </Typography>
            <Typography variant="body1">{data.volume}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', paddingRight: 2 }}>
              Day's Range:
            </Typography>
            <Typography variant="body1">{data.dayRange}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', paddingRight: 2 }}>
              Daily Avg Return:
            </Typography>
            <Typography variant="body1">{data.dailyAvgReturn}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', paddingRight: 2 }}>
              Avg Volume:
            </Typography>
            <Typography variant="body1">{data.avgVolume}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', paddingRight: 2 }}>
              Volatility:
            </Typography>
            <Typography variant="body1">{data.volatility}</Typography>
          </Grid>
        </Grid>
        </Box>
    </Container>
  );
};
export default SummaryContainer;

