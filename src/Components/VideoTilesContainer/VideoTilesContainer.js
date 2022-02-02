import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPageContent } from "../../api";
import { getRequest } from "../../axiosClient";
import VideoTile from "../VideoTile";

const VideoTileContainer = () => {
  const [pageContent, setPageContent] = useState({});
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setPageLoading(true);
    getRequest(getPageContent)
      .then((data) => {
        setPageContent({ ...data.data.content[0] });
        setPageLoading(false);
      })
      .catch((res) => {
        setErrorMessage(res.error);
      });
  }, []);

  return (
    <>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h3">LEARN MORE</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">ALL YOU NEED TO KNOW</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {!pageLoading && (
            <Grid container direction="row" spacing={3}>
              <Grid item xs={12} sm={6}>
                <VideoTile
                  heading="HOW TO BUY MATIC"
                  videoLink={pageContent.videoLink1}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <VideoTile
                  heading="SEND MATIC TO METAMASK"
                  videoLink={pageContent.videoLink2}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <VideoTile
                  heading="CONNECT WALLET JOIN THE POOL"
                  videoLink={pageContent.videoLink3}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <VideoTile
                  heading="CHECK YOUR WINNINGS"
                  videoLink={pageContent.videoLink4}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* <div>
        {!pageLoading && (
          <div>
            <div xs={12} md={6} sm={6} lg={6} className="my-3">
              <VideoTile
                heading="HOW TO BUY MATIC"
                videoLink={pageContent.videoLink1}
              />
            </div>

            <div xs={12} md={6} sm={6} lg={6} className="my-3">
              <VideoTile
                heading="SEND MATIC TO METAMASK"
                videoLink={pageContent.videoLink2}
              />
            </div>

            <div xs={12} md={6} sm={6} lg={6} className="my-3">
              <VideoTile
                heading="CONNECT WALLET JOIN THE POOL"
                videoLink={pageContent.videoLink3}
              />
            </div>

            <div xs={12} md={6} sm={6} lg={6} className="my-3">
              <VideoTile
                heading="CHECK YOUR WINNINGS"
                videoLink={pageContent.videoLink4}
              />
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};

export default VideoTileContainer;
