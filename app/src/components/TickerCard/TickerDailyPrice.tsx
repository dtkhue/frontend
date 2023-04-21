
import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect,useState } from 'react';
import axios from 'axios';
import {CircularProgress} from '@mui/material';
//Begin InterFace
interface BasicInfo{
  cik: string;
  name: string;
  type:string;
  active:string;
  locale:string;
  market:string;
  ticker:string;
  currency_name:string;
  composite_figi: string;
  last_updated_utc:string;
  primary_exchange: string;
  share_class_figi: string
}
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


//End Interface


//Custom Styled 
const CustomCard = styled(Card)({
  backgroundColor: 'transparent',
  border: 'none',
  padding: '20px',

  marginBottom:'20px'
});

const TickerName = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '18px',
});

const TickerinCurrency=styled(Typography)({
  fontSize: '14px',
  color: 'gray',
})
const TickerDescription = styled(Typography)({
  fontSize: '14px',
  color: 'gray',
});

const TickerPrice = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '24px',
  marginRight: '10px',

});

const PriceChange = styled(Typography)(({ priceChange }:{priceChange:number}) => ({
  fontSize: '18px',
  color: priceChange >= 0 ? 'green' : 'red',
 
}));

//End CustomStyle





export const TickerDailyPrice: React.FC<{ ticker: string }> = ({ ticker })=> {

  const [LoadedBasicInfo, setLoadedBasicInfo]=useState(false);
  const [BasicInfoData,setBasicInfoData]=useState<BasicInfo>();
  const [rawData,setrawData]=useState<TickerSeriesData[]>([]);
  const [LoadingrawData,setLoadingrawData]=useState(false);

  useEffect(() =>{
    
    if (ticker){
    axios.get(`https://api.nessight.com/api/v1/beta/tickers/Series/${ticker}?page=1&page_size=2&sort_order=desc`).then((res)=>{
        setrawData((prevData: any[]) => [...prevData, ...res.data.items]);
        setLoadingrawData(true);
    })
    }
  },[ticker]);  
  useEffect(()=>{
    const basicInfourl="https://api.nessight.com/api/v1/beta/tickers/basicinfo/"
      if (ticker){
        axios.get(basicInfourl+ticker).then((res)=>{
          if (res.data.items.length >0){
            setBasicInfoData(res.data.items[0]);
          }
          setLoadedBasicInfo(true);
        })
        
      }
  },[ticker])
  
  return (
    <>
      {LoadedBasicInfo && LoadingrawData ? (
       
        <CustomCard>
          <TickerName>{ticker}</TickerName>
          <TickerDescription>{BasicInfoData?.name}</TickerDescription>
          <TickerinCurrency>
            In Currency {BasicInfoData?.currency_name.toUpperCase()}{" "}
          </TickerinCurrency>
          {rawData.length >0 ? (
            <Box display="flex" alignItems="baseline">
              <TickerPrice>{rawData?.[1].close}</TickerPrice>
              <PriceChange priceChange={(rawData?.[1].close - rawData?.[0].close)}>
                {(rawData?.[1].close - rawData?.[0].close).toFixed(2)} {`(${((rawData?.[1].close - rawData?.[0].close) / rawData?.[0].close).toFixed(2)}%)`}
              </PriceChange>
            </Box>
          ):(<></>)}
        </CustomCard>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          marginTop="100px"
        >
          <CircularProgress />
          Loading Data ....
        </Box>
      )}
    </>
  );

}
