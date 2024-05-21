import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, List, TextField, Tooltip, Typography } from "@mui/material";
import EsriSearch from "@arcgis/core/widgets/Search";
import { ClearRounded } from "@mui/icons-material";

const Search = ({ view }) => {
    const [searchText, setSearchText] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState();
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
      if (view) {
        const searchWidget = new EsriSearch({
          view: view,
          // allPlaceholder: "Jalan/Bangunan/RT/RW",
          includeDefaultSources: false,
          locationEnabled: false,
          sources: [
            {
              url: "https://tataruang.jakarta.go.id/server/rest/services/Locator_DKI/GeocodeServer",
              singleLineFieldName: "SingleLine",
              name: "Jakarta Geocoding Service",
              placeholder: "Jalan/Bangunan/RT/RW",
            },
          ],
        });
        setSearch(searchWidget);
      }
    }, [view]);

    const handleOpenSearch = () => {
      setSearchOpen(!searchOpen);
    };

    const handleTextChange = (event) => {
      const newSearchText = event.target.value;
      setSearchText(newSearchText);
      search.searchTerm = newSearchText;
  
      search.suggest(newSearchText).then((value) => {
        if (value) {
          const searchSuggestion = value.results[0].results;
          setSuggestions(searchSuggestion);
        }
      });
    };

    const handleClearIcon = () => {
      search.clear();
      setSearchText("");
      setSuggestions([]);
    };

    const handleListClick = (suggestionText) => {
      setSearchText(suggestionText);
      search.searchTerm = suggestionText;
      search.search();
    };

    return(
    <Box sx={{display: "flex", flexDirection: "row", columnGap: 2, width: "100%"}}>
      {searchOpen && (
        <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
          <Box sx={{display: "flex", flexDirection: "row", backgroundColor: "white", borderRadius: 2, width: "100%"}}>
            <TextField id="searchInput" value={searchText} label="Jalan/Bangunan/RT/RW" variant="filled" size="small" sx={{backgroundColor: "white", borderRadius: 2, width: "auto"}} onChange={handleTextChange}/>
            <IconButton variant="contained" onClick={handleClearIcon} sx={{maxHeight: "48px", maxWidth: "48px"}}>
              <ClearRounded />
            </IconButton>
          </Box>
          {suggestions && suggestions.length > 0 && (
            <List sx={{ display: "grid" }}>
              {suggestions.map((suggestion, index) => (
                <Typography 
                  key={`sugestion-${index}`} 
                  onClick={() => handleListClick(suggestion.text)}
                  sx={{
                    backgroundColor: "white",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#e4e4e4" },
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    paddingTop: "2px",
                    paddingBottom: "2px"
                  }}
                >
                  {suggestion.text}
                </Typography>
              ))}
            </List>
          )}
        </Box>
      )}
      <Box sx={{backgroundColor: "white", borderRadius: 2, height: "48px", width: "48px"}}>
        <Tooltip title="Search" placement="bottom">
          <IconButton onClick={handleOpenSearch} sx={{ height: "48px", width: "48px", padding: 0, backgroundColor: "white", borderRadius: 2 }}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
    );
};

export default Search;