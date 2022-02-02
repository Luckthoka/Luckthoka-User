import { Grid, Typography } from "@mui/material";
import React from "react";
import ReactPlayer from "react-player";

const VideoTile = ({ videoLink, heading }) => {
  return (
    <Grid
      container
      direction="column"
      sx={{
        backgroundImage: "linear-gradient(#ffd400,#d93013)",
        color: "primary.main",
        width: "100%",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ p: 2 }}>
          {heading}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ReactPlayer url={videoLink} width="100%" height="270px" controls />
      </Grid>
    </Grid>
  );
};

export default VideoTile;
