import  React,{useState,useEffect} from 'react';
import { Button, Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import { Paper } from '@mui/material';
import Box from '@mui/material';
import axios from 'axios';
import {TablePagination} from '@mui/material';
interface TickerSeriesData{
  close: number;
  high: number;
  low: number;
  num_transaction: number;
  open: number;
  trading_volume: number;
  ticker: string;
  adjusted: boolean;
  date: string;
}
interface Props {
    ticker:string;

}



export const HistoricalDataTable: React.FC<Props> =({ticker})=> {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rawData,setrawData]=useState<TickerSeriesData[]>([]);
  const [currentPage,setcurrentPage]=useState(1);
  const size=50;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    if (newPage >= Math.floor(rawData.length / rowsPerPage)-5) {
      setcurrentPage((prev) => prev + 1);
    }
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const [url,setURL]=useState("")
  
  useEffect(()=>{
    if (ticker){
      setURL(`https://api.nessight.com/api/v1/beta/tickers/Series/${ticker}?page=${currentPage}&sort_order=desc&page_size=${size}`)
    }
  },[ticker,currentPage])
  useEffect(()=>{
    if (url!="") {
      axios.get(url).then((res)=>{
        const newRawData = [...rawData, ...res.data.items];
        setrawData(newRawData);
      }).catch((error) => {
        console.log(error);
      })
    }
  },[url])
 
  return (
  

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '800px'}} aria-label="Historical Table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '13px' }} align="center">Date</TableCell>
            <TableCell sx={{ fontSize: '13px' }} align="center">Open</TableCell>
            <TableCell sx={{ fontSize: '13px' }} align="center">High</TableCell>
            <TableCell sx={{ fontSize: '13px' }} align="center">Low</TableCell>
            <TableCell sx={{ fontSize: '13px' }} align="center">Close</TableCell>
            <TableCell sx={{ fontSize: '13px' }} align="center">Volume</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {rawData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>  (
              <TableRow
                key={row.date}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ fontSize: '13px' }} align="center">{row.date}</TableCell>
                <TableCell sx={{ fontSize: '13px' }} align="center">{row.open}</TableCell>
                <TableCell sx={{ fontSize: '13px' }} align="center">{row.high}</TableCell>
                <TableCell sx={{ fontSize: '13px' }} align="center">{row.low}</TableCell>
                <TableCell sx={{ fontSize: '13px' }} align="center">{row.close}</TableCell>
                <TableCell sx={{ fontSize: '13px' }} align="center">{row.num_transaction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
      <TablePagination
      rowsPerPageOptions={[10, 25, 50]}
      component="div"
      count={rawData.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
   
  )
}
