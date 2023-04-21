import React, {use, useEffect,useState} from "react";
import * as echarts from "echarts";
import axios from "axios";
type EchartsOption = echarts.EChartsOption;
import { Box } from "@mui/material";
import {CircularProgress} from "@mui/material";
//Begin InterFace
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

//End InterFace

//Time Series Function
function calculateMA(dayCount: number, data: number[][]): (number | string)[] {
  const result = [];
  for (let i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      const currentData = data[i - j];
      if (currentData) {
        sum += currentData[1];
      }
    }
    result.push(sum / dayCount);
  }
  return result;
}

//End Time Series Function



export const CandleStickChart: React.FC<Props> =({ticker}:{ticker:string})=>{
  //One way to solve the problem of data Reseting when switching tab is to have these State in the TickerCard and pass in to CandelStickChart as Props 
  // Will solve it but not priority now
  
  const [rawData,setRawData]= useState<TickerSeriesData[]>([]);
  const [hasNext,setHasNext]=useState(true);
  const [currentPage,setCurrentPage]=useState(1);
  const [initState,setInitState]=useState(true);
  const size = 50;
  const [url,setUrl]=useState<string>()
  
  console.log(ticker);
  

  
  useEffect(() => {
    if (ticker) {
      setUrl(`https://api.nessight.com/api/v1/beta/tickers/Series/${ticker}?page=${currentPage}&sort_order=desc&page_size=${size}`);
    }
  }, [ticker, currentPage]);

  
  //Fetching
  useEffect(
    ()=>{
      if(ticker && initState &&url){
        axios.get(url).then(
          (res) => {
            setRawData((prevData: any[]) => sortRawDataByDateAsc([...prevData,...res.data.items ]));
            if (res.data.has_next) {
              setHasNext(true);
            } else {
              setHasNext(false);
            }
            setInitState(false)
          }

        ).catch((error) => {
          console.log(error)
        })
      } else if(ticker && !initState && url &&hasNext){
        axios.get(url).then(
          (res) => {
            setRawData((prevData: any[]) => sortRawDataByDateAsc([...prevData,...res.data.items]));
            if (res.data.has_next) {
              setHasNext(true);
            } else {
              setHasNext(false);
            }
          }

        ).catch((error) => {
          console.log(error)
        })
      }
    },[url,ticker]
  )
   
  
  const onZoom = (params: any) => {
    const zoomStart = params.batch[0].start;
    const zoomEnd = params.batch[0].end;
    console.log(zoomStart);
    console.log(zoomEnd);
    if (zoomEnd -zoomStart <95){
      setCurrentPage ((prevPage)=>prevPage+1)
    }
  }

  useEffect(() => {
    console.log("Data loaded from backend: ", rawData.length);
    if(rawData.length>0){
      const sdates=SerializeDate(rawData);
      const ChartData=SerializeChartData(rawData);
      const chartDom=document.getElementById("main")!;
      const myChart=echarts.init(chartDom);
      const option: EchartsOption=getCandleStickChartOption({Dates:sdates,ChartData:ChartData});
      option && myChart.setOption(option);
      myChart.on("datazoom",onZoom);
  
      return () =>{
        myChart.off("datazoom", onZoom);
        myChart.dispose();
      };
    }
   
  }, [ticker,rawData]);

  return (
    <>
      {rawData.length > 0 ? (
        <div id="main" style={{ width: "100%", height: "500px" }}> </div>
      ) : (
        <>
          {initState ? (
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
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              marginTop="100px"
            >
              Data not available
            </Box>
          )}
        </>
      )}
    </>
  );

};

function SerializeDate(rawData:TickerSeriesData[]){
    const data=rawData.map((item:TickerSeriesData) =>item.date)
    return data
}
function sortRawDataByDateAsc(rawData: TickerSeriesData[]): TickerSeriesData[] {
  const sortedRawData = [...rawData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
  return sortedRawData;
}
function SerializeChartData(rawData:TickerSeriesData[]){
    const chartData=rawData.map(function(item){
        return [+item.open, +item.close, +item.low, +item.high]
    })
    return chartData;
}

function getCandleStickChartOption({Dates,ChartData}:{Dates: string[]; ChartData: number[][] }){

    const option = {
        
        tooltip: {
          trigger: 'axis' as const,
          axisPointer: {
            animation: false,
            type: 'cross' as const,
            lineStyle: {
              color: '#376df4',
              width: 2,
              opacity: 1
            }
          }
        },
        xAxis: {
          type: 'category' as const,
          data: Dates,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: { show: true }, 
          scale: true,
          boundaryGap: false,
          min: "dataMin",
          max: "dataMax",
        },
        yAxis: {
          scale: true,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitArea: {
            show: true,
          },
          splitLine: { show: true }
          
        },
        grid: {
          bottom: 80
        },
        dataZoom:[
          {
            type:'inside',
            showDetail:false,
            end: 100,
            start:30,
            minspan:30
          }
        ],
        // dataZoom: [
        //   {
        //     textStyle: {
        //       color: '#8392A5'
        //     },
        //     handleIcon:
        //       'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        //     dataBackground: {
        //       areaStyle: {
        //         color: '#8392A5'
        //       },
        //       lineStyle: {
        //         opacity: 0.8,
        //         color: '#8392A5'
        //       }
        //     },
        //     brushSelect: true
        //   },
        //   {
        //     type: 'inside'
        //   }
        // ],
        series: [
          {
            type: 'candlestick' as const,
            name: 'CandleStick',
            data: ChartData,
            itemStyle: {
              color: '#FD1050',
              color0: '#0CF49B',
              borderColor: '#FD1050',
              borderColor0: '#0CF49B'
            }
          },
          // {
          //   name: 'MA5',
          //   type: 'line' as const,
          //   data: calculateMA(5, ChartData),
          //   smooth: true,
          //   showSymbol: false,
          //   lineStyle: {
          //     width: 1
          //   }
          // },
          // {
          //   name: 'MA10',
          //   type: 'line' as const,
          //   data: calculateMA(10, ChartData),
          //   smooth: true,
          //   showSymbol: false,
          //   lineStyle: {
          //     width: 1
          //   }
          // },
          // {
          //   name: 'MA20',
          //   type: 'line' as const,
          //   data: calculateMA(20, ChartData),
          //   smooth: true,
          //   showSymbol: false,
          //   lineStyle: {
          //     width: 1
          //   }
          // },
          // {
          //   name: 'MA30',
          //   type: 'line' as const,
          //   data: calculateMA(30, ChartData),
          //   smooth: true,
          //   showSymbol: false,
          //   lineStyle: {
          //     width: 1
          //   }
          // }
        ],
        animationDuration: 1000, // set the duration of the animation
        animationEasing: 'cubicOut' as const // set the easing function for the animation
      };
    return option;

      

    
}