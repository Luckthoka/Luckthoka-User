import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { getPageContent } from "../../api";
import { getRequest } from "../../axiosClient";

const Content = () => {
  const [pageContent, setPageContent] = useState({});
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

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
      {!pageLoading && (
        <>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8}>
              <Grid
                container
                justifyContent="center"
                paddingY={2}
                sx={{
                  backgroundImage: "linear-gradient(#ffd400,#d93013)",
                  color: "primary.main",
                }}
              >
                <Grid item>
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontSize: { xs: "1.4rem", sm: "1.5rem", md: "3rem" },
                    }}
                    noWrap
                  >
                    {pageContent.title}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            mt={2}
            sx={{ paddingLeft: 2, paddingRight: 2 }}
          >
            <Grid item>
              <Typography variant="body1" sx={{ textAlign: "justify" }}>
                {pageContent.description}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Content;
