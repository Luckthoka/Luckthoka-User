import React, { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress, Button, Box } from "@mui/material";
import { amber } from "@mui/material/colors";

const MiniPoolCard = ({
  pool,
  joinPool,
  isPoolLoading,
  availableSlots,
  isMiniCard,
  poolIdJoining,
}) => {
  const mobileMatches = isMiniCard;
  //const [poolIdJoining, setPoolIdJoining] = useState("");

  // const handleJoinPool = (poolId) => {
  //   setPoolIdJoining(poolId);
  //   joinPool(poolId);
  // };

  useEffect(() => {}, [poolIdJoining]);

  // const handleJoined = () => {
  //   setPoolLoading(false);
  // }

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
          //rowSpacing={1}
          sx={{
            backgroundImage: "linear-gradient(#ffd400,#d93013)",
            color: "primary.main",
            borderRadius: 1,
            //height: { sm: 520 },
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
              sx={{ right: 0 }}
            >
              <Grid item>
                <Typography variant="h4" sx={{ fontSize: "2rem" }}>
                  {pool.poolSlots} ENTIRIES
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h1"
                  component="h2"
                  sx={{
                    color: amber[100],
                    fontSize: "3rem",
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
                  order: 2,
                }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ pt: 2 }}
                >
                  <Grid item>
                    <Typography
                      variant={mobileMatches ? "subtitle1" : "h6"}
                      sx={{
                        // pt: 1,
                        textAlign: "center",
                        lineHeight: 1.49,
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
              <Grid item xs={12} sx={{ order: 1 }}>
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
                        fontSize: "2rem",
                        fontWeight: "500",
                      }}
                    >
                      ₹{pool.prizeAmount}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="p" sx={{ fontSize: "1.3rem" }}>
                      ({pool.prizeConversionAmount})
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={8} sx={{ order: 3 }}>
                <Grid container justifyContent="center" alignItems="center">
                  {(!isPoolLoading || poolIdJoining !== pool.poolId) && (
                    <Grid item sx={{ pt: 2 }}>
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={() => joinPool(pool.poolId)}
                      >
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          direction="column"
                          rowSpacing={mobileMatches ? 0 : 2}
                          columnSpacing={4}
                        >
                          <Grid item>
                            <Typography
                              //variant={mobileMatches ? "subtitle1" : "h4"}
                              variant={"p"}
                              sx={{
                                color: amber[100],
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
                              ₹{pool.entryFee}
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
                        </Grid>
                      </Button>
                    </Grid>
                  )}
                  {isPoolLoading && poolIdJoining === pool.poolId && (
                    <Grid item sx={{ mt: 7 }}>
                      <CircularProgress />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MiniPoolCard;
