import { Grid, Typography, Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getMiniPools, getPools, getUserWithWalletId } from "../../api";
import { getRequest, postRequest } from "../../axiosClient";
import HistoryTable from "../HistoryTable/HisotryTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const HistoryTabs = ({ account, refetchHistory }) => {
  const [pools, setPools] = useState([]);
  const [miniPools, setMiniPools] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [userPoolIds, setUserPoolIds] = useState([]);
  const [userPools, setUserPools] = useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterUserPools = (_pools) => {
    const uPools = _pools.map(
      (uP) => [...pools, ...miniPools].filter((item) => item.poolId === uP)[0]
    );

    setUserPools([...uPools]);
  };

  const fetchPools = () => {
    getRequest(getPools)
      .then((data) => {
        setPools([...data.data.pools]);
      })
      .catch((err) => {
        setErrorMessage(err.error);
      });
    getRequest(getMiniPools)
      .then((data) => {
        setMiniPools([...data.data.pools]);
      })
      .catch((err) => {
        setErrorMessage(err.error);
      });
  };

  useEffect(() => {
    fetchPools();
    const poolInterval = setInterval(fetchPools, 15000);
    return () => clearInterval(poolInterval);
  }, [refetchHistory]);

  useEffect(() => {
    postRequest(getUserWithWalletId, { walletId: account })
      .then((data) => {
        setUserPoolIds([...data.data.poolsParticipated]);
      })
      .catch((err) => setErrorMessage(err.error));
  }, [account, refetchHistory]);

  useEffect(() => {
    if (userPoolIds && userPoolIds.length > 0) {
      filterUserPools([...userPoolIds]);
    }
  }, [userPoolIds]);

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h3">NEED TO KNOW ABOUT</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">HISTORY</Typography>
        </Grid>
      </Grid>

      <Box sx={{ width: "100%" }}>
        <Box
        // sx={{
        //   backgroundImage: "linear-gradient(to right, #ffd400,#d93013)",
        // }}
        >
          <Tabs
            // TabIndicatorProps={{
            //   sx: { backgroundColor: "primary.main", color: "#ffffff" },
            // }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs"
            textColor="primary.main"
            indicatorColor="primary.contrastText"
          >
            <Tab label="Pool History" {...a11yProps(0)} />
            <Tab label="Your History" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <HistoryTable data={[...pools, ...miniPools]} account={account} />
          {/* {<History historyData={[...pools, ...miniPools]} isPool={true} />} */}
          {/* {pools.length === 0 && <p>No Pools</p>} */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {userPools.length > 0 && (
            <HistoryTable
              data={[...userPools]}
              isUserHistory={true}
              account={account}
            />
          )}
          {userPools.length === 0 && <Box>No History 😝</Box>}
        </TabPanel>
      </Box>
    </>
  );
};

export default HistoryTabs;
