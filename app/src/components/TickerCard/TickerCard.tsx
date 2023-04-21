import React, {useEffect,useState,useMemo } from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
const TickerTab = dynamic(() => import("./TickerCardTab"), { ssr: false });

export default function TickerCard({ticker}:{ticker:string}){
   
   return(

   
    <Box >
        <TickerTab ticker={ticker} />
    </Box>

   
    )

}