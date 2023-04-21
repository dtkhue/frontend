//Begin Import 
import React, { Suspense,useEffect,useState,useRef, useCallback } from "react";
import { Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { HistoricalDataTable } from "./Tabs/HistoricalData/HistoricalData";
import {CircularProgress} from "@mui/material";
import axios from "axios";
import { downloadExcelFile } from "../Utils/DownloadFile";
import { TickerDailyPrice } from "./TickerDailyPrice";

//End Import 

//Begin Interface
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


//End Interface 
import { Button } from '@mui/material';
import { CandleStickChart } from "../Chart/CandleStick";
// import Summary from "./Tabs/Summary/Summary";
function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="TabPanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontSize: '12px' }} >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number): Record<string, unknown> {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function TickerTab({ticker}:{ticker:string}): JSX.Element {

  const isFirstRender = useRef(true);
  const [value, setValue] = React.useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [ChangeTickerState,setChangeTickerState]=useState(false);


 
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  

  // begin ChangeTickerState

  useEffect(()=>{
    if(ticker){
      setChangeTickerState(true)
    }
  })
  // Begin Reseting State
  useEffect(() => {
    if (ticker) {
      if(isFirstRender.current){
        isFirstRender.current=false;
        return;
      }
    }
  }, [ticker]);
  // End Reseting State
  // Fetching Basic Info Data
  
  // End Fetching Basic Info Data

  // Begin Fetching Historical Data
  // useEffect(()=>{
  //   if (ticker && !allDataLoaded && url!=""){
  //     axios.get(url).then((res)=>{
  //         setrawData((prevData:any[])=>[...prevData,...res.data.items])
  //         if (res.data.has_next){
  //             setCurrentPage((prevPage) => prevPage + 1);
  //         }
  //         else{
  //             setAllDataLoaded(true);
  //         }
  //     })
  //   }
  // },[ticker,url]);
 
  // End Fetching Historical Data

  


  //Downloading Data to Excel
  // const exportToExcel= useCallback(()=>{
  //   const sheetname= `HistoricalData`;
  //   const fileName= `${ticker}_Historical_Data`;
  //   downloadExcelFile(rawData,sheetname,fileName);
  // },[rawData,ticker])
  // End Downloading



  return (
    <>
    <TickerDailyPrice key={ticker} ticker={ticker}/>
    

    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Ticker Tabs"
        >
          <Tab sx={{ fontSize: '8px' }} label="Chart" {...a11yProps(0)} />
          <Tab sx={{ fontSize: '8px' }} label="Summary" {...a11yProps(1)} />
          <Tab sx={{ fontSize: '8px' }} label="Historical Data" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} >
        <CandleStickChart  key={ticker} ticker={ticker} />
         
          
      </TabPanel>
      <TabPanel value={value} index={1}>
        {allDataLoaded ? (
            // Your Summary tab content
            // <Summary />
            "Summary"
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop="100px">
              <CircularProgress />
              Loading Data ....
            </Box>
          )}
      </TabPanel>
      
      <TabPanel  value={value} index={2} >
        <HistoricalDataTable key={ticker} ticker={ticker}/>
      </TabPanel>
      {/* <TabPanel value={value} index={2} >
        
        </Box>
        {allDataLoaded ? (
          rawData.length > 0 ? (
            <React.Fragment>
              <Suspense fallback={<div>Loading...</div>}>
                <HistoricalDataTable rawData={rawData} />
              </Suspense>
            </React.Fragment>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop="50px">
              <Typography>Data is not available</Typography>
            </Box>
          )
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop="50px">
            <CircularProgress />
          </Box>
        )}
      </TabPanel> */}
    </Box>
    </>
  );
  
}

// TickerTab.propTypes = {
//   // Add propTypes here for any props passed to TickerTab
//   // For example:
//   // someProp: PropTypes.string.isRequired,
// };

