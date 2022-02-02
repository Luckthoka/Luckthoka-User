import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import PoolRow from "./PoolRow/PoolRow";

function History({ historyData, isPool }) {
  useEffect(() => {}, [historyData]);
  return (
    <table>
      <Grid container>
        <Grid item xs={12}>
          {historyData &&
            historyData.length > 0 &&
            historyData.map((item, ind) =>
              isPool ? <PoolRow key={ind} pool={item} /> : ""
            )}
        </Grid>
      </Grid>
    </table>
  );
}

export default History;
