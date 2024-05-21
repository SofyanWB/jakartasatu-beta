import { CheckBox, CheckBoxOutlineBlank, ExpandLess, MoreHoriz } from '@mui/icons-material'
import { Box, Button, Checkbox, Collapse, FormControlLabel, FormGroup, IconButton, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useEffect } from 'react';
import Shapefile from './Shapefile';

const listStyle = {
  width: "100%",
  height: "93%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    width: "1em"
  },
  "::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)"
  },
  "::-webkit-scrollbar-thumb":{
    backgroundColor: "darkgrey",
    outLine: "1px solid slategrey"
  },
  border: "1px gray solid"
}

const Data = ({ view, groupList, setGroupList, geoJSON, setGeoJSON }) => {

  useEffect(() => {
    if(view?.map?.layers?.items?.filter(layer => layer.listMode === "show" && layer.title !== "Locate User").length > 0) {
      const groupsLayer = view.map.layers.items.filter(group => group.listMode === "show" && group.title !== "Locate User").reverse()
      setGroupList((prevState) => {
        return groupsLayer.map((group, index) => {
          const prevGroup = prevState.find(prev => prev.group.id === group.id);
          const newexpand = prevGroup ? prevGroup.expand : false;
          const newGroup = prevGroup ? prevGroup.group : group;
          return {
            ...prevGroup,
            group: newGroup,
            expand: newexpand
          };
        });
      });
    }
  }, [view?.map?.layers?.items?.length, geoJSON]);

  const toggleGroupVisible = (list) => {
    return () => {
      list.group.visible = !list.group.visible;
      setGroupList((prevState) => {
        const updatedState = [...prevState];
        return updatedState
      })
    }
  };

  const toggleGroupExpand = (index) => {
    return () => {
      setGroupList((prevState) => {
        const updatedState = [...prevState];
        updatedState[index].expand = !updatedState[index].expand;
        return updatedState
      })
    }
  };

  const toggleLayerVisible = (layer) => {
    return () => {
      layer.visible = !layer.visible;
      setGroupList((prevState) => {
        const updatedState = [...prevState];
        return updatedState
      })
    }
  }

  return (
    <Box sx={{width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "5%", justifyContent: "space-between"}}>
      <Box sx={{width: "100%", height: "5%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Shapefile geoJSON={geoJSON} setGeoJSON={setGeoJSON} view={view} />
      </Box>
      <Box sx={listStyle}>
          {view && view.map.layers.items.filter(layer => layer.listMode === "show" && layer.title !== "Locate User").reverse().map((group, index) => (
            <Box sx={{width: "100%",display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Box sx={{width: "20%", height: "50px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <Checkbox checked={group.visible} onChange={toggleGroupVisible(groupList[index])}/>
                </Box>
                <Box sx={{width: "80%", display: "flex", flexDirection: "column"}}>
                    <ListItemButton onClick={toggleGroupExpand(index)} sx={{width: "100%", height: "50px", padding: 1}}>
                      <ListItemText primary={group.title} />
                      {groupList[index]?.expand ? <ExpandLess /> : <MoreHoriz />}
                    </ListItemButton>
                    <Collapse in={groupList[index]?.expand}>
                      <FormGroup>
                        {group.layers.items.map((layer, i) => (
                          <FormControlLabel control={<Checkbox defaultChecked checked={groupList[index]?.group.layers.items[i]?.visible}/>} onChange={toggleLayerVisible(layer)} label={layer.title}/>
                        ))}
                      </FormGroup>
                    </Collapse>
                </Box>
            </Box>
          ))}
      </Box>
    </Box>
  )
}

export default Data