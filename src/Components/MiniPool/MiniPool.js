import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addUserToPool,
  getActiveMiniPools,
  getLatestMiniPool,
} from "../../api";
import { getRequest, postRequest } from "../../axiosClient";
import MiniPoolCard from "../MiniPoolCard/MiniPoolCard";
import SimpleSnackbar from "../SimpleSnackbar/SimpleSnackbar";

const MiniPool = ({ contract, account, handleRefetch }) => {
  const defaultPool = {
    poolId: "#########",
    conversionAmount: "00000 Matic",
    poolSlots: "000",
    winner: "0",
    entryFee: "0000",
    prizeAmount: "0,00,000",
    prizeConversionAmount: "00000 MATIC",
  };

  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [isMiniLoading, setMiniLoading] = useState(false);
  const [pool, setPool] = useState(defaultPool);
  const [availableSlots, setAvailableSlots] = useState(false);
  const [isMemberJoined, setMemberJoined] = useState(false);
  const [miniPools, setMiniPools] = useState([]);
  const [miniPoolsMessage, setMiniPoolMessage] = useState("");
  const [poolIdJoining, setPoolIdJoining] = useState("");

  const handleJoinEvent = (
    poolId,
    poolName,
    joiningFee,
    poolAmount,
    availableSlots,
    members
  ) => {
    const _poolId = poolId.toString();
    contract.off("LogLotteryPoolJoined", handleJoinEvent);
    setAvailableSlots(availableSlots.toString());
    handleAddUser(_poolId);
    setMiniLoading(false);
    setError(false);
    if (members.indexOf(account) > -1) {
      setMemberJoined(true);
    }
    setMessage("Successfully joined the pool");
    handleRefetch();
  };

  const joinMiniPool = async (poolId) => {
    setMiniLoading(true);
    setPoolIdJoining(poolId);
    try {
      if (
        parseInt(pool.poolSlots) - pool.members.length === 0 ||
        availableSlots === 0
      ) {
        throw new Error("House Full");
      }

      if (pool.members.indexOf(account) !== -1 || isMemberJoined) {
        throw new Error("You are already part of this pool");
      }

      const overrides = {
        from: account,
        gasLimit: "3000000",
        value: pool.entryFeeContract,
      };
      await contract.joinMiniLotteryPool(poolId, overrides);
      contract.on("LogLotteryPoolJoined", handleJoinEvent);
    } catch (err) {
      setMessage("gas limit exceeded, try again");
      setMiniLoading(false);
      setError(true);
      setMessage(err.data && err.data.message ? err.data.message : err.message);
    }
  };

  const handleAddUser = (poolId) => {
    const walletId = account;
    const data = {
      walletId: walletId,
      poolId: poolId,
    };
    postRequest(addUserToPool, data)
      .then((dta) => {
        console.log(dta);
      })
      .catch((err) => {
        setError(true);
        setMessage(err.error);
        console.log(err);
      });
  };

  useEffect(() => {
    getRequest(getLatestMiniPool)
      .then((data) => {
        if (data.data.pool) {
          setPool({ ...data.data.pool });
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.error);
        setMiniLoading(false);
      });
  }, []);

  useEffect(() => {
    getRequest(getActiveMiniPools)
      .then((data) => {
        if (data.data.pools) {
          setMiniPools(JSON.parse(data.data.pools));
        } else {
          setMiniPoolMessage("Wait until the pools get created.");
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.error);
        setMiniLoading(false);
      });
  }, []);

  const handleResetMessage = () => {
    setError();
    setMessage();
  };

  return (
    <>
      <Grid container spacing={4} justifyContent="center">
        {/* <Grid item xs={12} sm={6} md={4}>
          <MiniPoolCard
            pool={pool}
            isPoolLoading={isMiniLoading}
            availableSlots={availableSlots}
            joinPool={joinMiniPool}
            isMiniCard={true}
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={4}>
          <MiniPoolCard
            pool={pool}
            isPoolLoading={isMiniLoading}
            availableSlots={availableSlots}
            joinPool={joinMiniPool}
            isMiniCard={true}
          />
        </Grid> */}
        {miniPools.length > 0 &&
          miniPools.map((pool, ind) => (
            <Grid item xs={12} sm={6} md={4} key={ind}>
              <MiniPoolCard
                pool={pool}
                isPoolLoading={isMiniLoading}
                availableSlots={availableSlots}
                joinPool={joinMiniPool}
                poolIdJoining={poolIdJoining}
                isMiniCard={true}
              />
            </Grid>
          ))}
      </Grid>
      <SimpleSnackbar
        openSnackbar={message ? true : false}
        message={message}
        handleCloseSnackbar={handleResetMessage}
        severity={error ? "error" : "info"}
      />
      {/* <div>
        <div>
          <div className="nextPatch">            
            {Object.keys(pool).length === 0 ||
              (pool.poolId === defaultPool.poolId && (
                <h3>
                  No Mini Pool has been created yet. Wait until admin creates
                  one.
                </h3>
              ))}           
          </div>
        </div>
      </div> */}
    </>
  );
};

export default MiniPool;
