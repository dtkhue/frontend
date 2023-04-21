import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Router from 'next/router'
import { debounce } from "lodash";

interface Ticker {
  label: string;
  name: string;
}

const SearchBar: React.FC = () => {
  const [tickers, setTickers] = React.useState<Ticker[]>([]);

  // debounce the function
  const fetchTickers = React.useMemo(() => {
    return debounce((query: string) => {
      if (!query) return;
      const url_fetch =
        "https://api.nessight.com/api/v1/beta/ticker/search/"+query
      axios.get(url_fetch).then((res) => {
        const reformat: Ticker[] = [];
        for (const _index in res.data["data"]) {
          const build: Ticker = {
            label: res.data["data"][_index]["ticker"],
            name: res.data["data"][_index]["name"],
          };
          reformat.push(build);
        }
        setTickers(reformat);
      });
    }, 200);
  }, []);

  return (
    <Autocomplete
      disablePortal
      id="tickersbox"
      onChange={(event, newValue) => {
        if (newValue) {
          Router.push(`/stock_dashboard/${newValue.label}`);
        }
      }}
      onInputChange={(event, newValue) => {
        fetchTickers(newValue);
      }}
      options={tickers}
      sx={{ width: 600 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ticker"
        />
      )}
      
      getOptionLabel={(option) => `${option.label} - ${option.name}`}
      noOptionsText="Search for Your ticker"
    />
  );
};

export default SearchBar;
