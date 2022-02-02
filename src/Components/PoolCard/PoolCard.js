import React from "react";
import { Grid, Typography, CircularProgress, Button, Box } from "@mui/material";
import { amber } from "@mui/material/colors";

import useMediaQuery from "@mui/material/useMediaQuery";

const PoolCard = ({ pool, joinPool, isPoolLoading, availableSlots }) => {
  const mobileMatches = useMediaQuery("(max-width:480px)");
  return (
    <>
      <Box>
        <Typography
          variant="body2"
          sx={{
            textAlign: "end",
            color: amber[100],
            // pb: 1,
          }}
        >
          #{pool.poolId}
        </Typography>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          paddingY={4}
          rowSpacing={{ md: 7, sm: 1 }}
          sx={{
            backgroundImage: "linear-gradient(#ffd400,#d93013)",
            color: "primary.main",
            borderRadius: 1,
            height: { sm: 520 },
            position: { sm: "relative" },
            mb: 3,
          }}
          //columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ position: { md: "absolute", top: "22%" }, right: 0 }}
            >
              <Grid item>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: "2rem", sm: "4rem" },
                    lineHeight: { sm: 0.7 },
                  }}
                >
                  {pool.poolSlots} ENTIRIES
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h1"
                  sx={{
                    color: amber[100],
                    fontSize: { xs: "3rem", sm: "5rem", md: "7.5rem" },
                    lineHeight: { sm: 1 },
                    fontWeight: "600",
                    textAlign: "center",
                    px: 1,
                  }}
                >
                  {pool.winner} WINNER
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Grid
                item
                xs={4}
                sm={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  order: { xs: 2, sm: 1 },
                }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ pt: { xs: 2, sm: 1 } }}
                >
                  <Grid item>
                    <Typography
                      variant={mobileMatches ? "subtitle1" : "h6"}
                      sx={{
                        textAlign: "center",
                        lineHeight: { xs: 1.49, sm: 1.75 },
                      }}
                    >
                      AVAILABLE SLOTS
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Box
                      sx={{
                        backgroundColor: "primary.main",
                        p: 0.75,
                        borderRadius: 1,
                      }}
                    >
                      {availableSlots && (
                        <Typography
                          variant={"h2"}
                          sx={{
                            color: amber[100],
                            lineHeight: "1",
                            textAlign: "center",
                          }}
                        >
                          {availableSlots}
                        </Typography>
                      )}
                      {!availableSlots && (
                        <Typography
                          variant={"h2"}
                          sx={{
                            color: amber[100],
                            lineHeight: "1",
                            textAlign: "center",
                          }}
                        >
                          {pool.members && pool.members.length > 0
                            ? pool?.poolSlots - pool?.members?.length
                            : pool?.poolSlots}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ order: { xs: 1, sm: 1 } }}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: "2rem", sm: "4rem" },
                        fontWeight: "500",
                      }}
                    >
                      ₹{pool.prizeAmount}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="p"
                      sx={{
                        fontSize: { xs: "1.3rem", sm: "2.6rem" },
                      }}
                    >
                      ({pool.prizeConversionAmount})
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={8} sm={4} sx={{ order: { xs: 3, sm: 1 } }}>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item sx={{ pt: { xs: 2 } }}>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => joinPool(pool.poolId)}
                      sx={{ minWidth: 200 }}
                    >
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        direction="column"
                        rowSpacing={mobileMatches ? 0 : 1}
                        columnSpacing={4}
                      >
                        {isPoolLoading && (
                          <Grid item>
                            <CircularProgress color="secondary" />
                          </Grid>
                        )}
                        {!isPoolLoading && (
                          <>
                            <Grid item>
                              <Typography
                                variant={"p"}
                                sx={{
                                  color: amber[100],
                                  //fontSize: { xs: "1.75rem", sm: "4rem" },
                                  fontSize: "1.75rem",
                                }}
                              >
                                JOIN POOL
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                //variant={mobileMatches ? "subtitle1" : "h3"}
                                variant="h4"
                              >
                                ₹ {pool.entryFee}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                variant={
                                  mobileMatches ? "subtitle1" : "subtitle2"
                                }
                                sx={{ color: amber[100] }}
                              >
                                ({pool.conversionAmount})
                              </Typography>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PoolCard;
