import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import PropTypes from 'prop-types';
import Kegiatan from './Kegiatan';
import Data from './Data';
import Intensitas from './Intensitas';

const TabPanel = (props) => {
  const { children, value, index } = props;
  return(
    <div role='tabpanel' hidden={value != index} id={`tabpanel-${index}`} style={{width: "100%", height: "100%"}}>
      { value === index && (
        <>
          {children}
        </>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

const allyProps = (index) => {
  return {
    id: `tabpanel-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const SidePanel = ({ kegiatan, layerView, view, setView, luasLahan, geoJSON, setGeoJSON }) => {
  const [listKegiatan, setListKegiatan] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [groupList, setGroupList] = useState([]);
  const [klb, setKLB] = useState(0);
  const [kdb, setKDB] = useState(0);
  const [kdh, setKDH] = useState(0);
  const [ldb, setLDB] = useState();
  const [llb, setLLB] = useState();
  const [jlb, setJLB] = useState();
  const [lh, setLH] = useState();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", backgroundColor: "#E5E5E5", borderRadius: "7px"}}>
      <Box sx={{display: "flex", width: "100%", height: "6%"}}>
        <Tabs value={tabValue} onChange={handleChange} variant='fullWidth' textColor='inherit' sx={{height: "100%", width: "100%" , backgroundColor: "#E5E5E5", borderRadius: "7px 7px 0px 0px"}} indicatorColor='#00ffffff'>
          <Tab label="Kegiatan" {...allyProps(0)} sx={{height: "100%", backgroundColor: tabValue === 0 ? "#E5E5E5" : "#003577", fontWeight: tabValue === 0 ? 600 : 100, color: tabValue === 0 ? "#003577" : "white", borderRadius: "7px 0px 0px 0px", opacity: 1, textTransform: "none"}}/>
          <Tab label="Intensitas" {...allyProps(1)} sx={{backgroundColor: tabValue === 1 ? "#E5E5E5" : "#003577", fontWeight: tabValue === 1 ? 600 : 100, color: tabValue === 1 ? "#003577" : "white", opacity: 1, textTransform: "none"}}/>
          <Tab label="Data" {...allyProps(2)} sx={{backgroundColor: tabValue === 2 ? "#E5E5E5" : "#003577", fontWeight: tabValue === 2 ? 600 : 100,  color: tabValue === 2 ? "#003577" : "white", borderRadius: "0px 7px 0px 0px", opacity: 1, textTransform: "none"}}/>
        </Tabs>
      </Box>
      <Box sx={{display: "flex", width: "100%", height: "94%"}}>
        <TabPanel value={tabValue} index={0}>
          <Kegiatan kegiatan={kegiatan} layerView={layerView} listKegiatan={listKegiatan} setListKegiatan={setListKegiatan} searchInput={searchInput} setSearchInput={setSearchInput}/>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Intensitas luasLahan={luasLahan} jlb={jlb} setJLB={setJLB} kdb={kdb} setKDB={setKDB} kdh={kdh} klb={klb} ldb={ldb} llb={llb} lh={lh} setKDH={setKDH} setKLB={setKLB} setLDB={setLDB} setLLB={setLLB} setLH={setLH}/>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Data view={view} setView={setView} groupList={groupList} setGroupList={setGroupList} geoJSON={geoJSON} setGeoJSON={setGeoJSON}/>
        </TabPanel>
      </Box>
      
    </Box>
  )
}

export default SidePanel