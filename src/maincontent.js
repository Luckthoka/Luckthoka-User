import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Content from "./Components/Content/Content";
import HistoryTabs from "./Components/HistoryTabs/HistoryTabs";
import MiniPool from "./Components/MiniPool/MiniPool";
import StepFlowStatic from "./Components/StepFlowStatic/StepFlowStatic";
import VideoTileContainer from "./Components/VideoTilesContainer/VideoTilesContainer";

function MainContent({ account, contract }) {
  const [refetch, setRefetch] = useState(false);

  return (
    <Grid container spacing={{ xs: 12, sm: 4 }}>
      <Grid item xs={12} sm={12}>
        <Content />
      </Grid>
      <Grid item xs={12} sm={12}>
        <MiniPool
          contract={contract}
          account={account}
          handleRefetch={() => setRefetch((prev) => !prev)}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <VideoTileContainer />
      </Grid>
      <Grid item xs={12} sm={12}>
        <HistoryTabs account={account} refetchHistory={refetch} />
      </Grid>
    </Grid>
  );
}

export default MainContent;
