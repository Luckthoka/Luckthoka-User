import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { addUserToPool, getLatestPool } from "../../api";
import { getRequest, postRequest } from "../../axiosClient";
import PoolCard from "../PoolCard/PoolCard";
import SimpleSnackbar from "../SimpleSnackbar/SimpleSnackbar";

function Header({ onConnectClick, isWalletConnected, account, contract }) {
  const defaultPool = {
    poolId: "#########",
    conversionAmount: "00000 Matic",
    poolSlots: "000",
    winner: "0",
    entryFee: "0000",
    prizeAmount: "0,00,000",
    prizeConversionAmount: "00000 MATIC",
    isActive: false,
  };
  const [isPoolLoading, setLoading] = useState(false);
  const [pool, setPool] = useState(defaultPool);
  const [error, setError] = useState();
  const [isJoined, setJoined] = useState(false);
  const [message, setMessage] = useState("");

  const [availableSlots, setAvailableSlots] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRequest(getLatestPool)
      .then((data) => {
        setPool({ ...data.data.pool });
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setMessage(err.error);
        setLoading(false);
      });
  }, []);

  const handleJoinEvent = (
    poolId,
    poolName,
    joiningFee,
    poolAmount,
    availableSlots,
    members
  ) => {
    contract.off("LogLotteryPoolJoined", handleJoinEvent);
    const _poolId = poolId.toString();
    setAvailableSlots(availableSlots.toString());
    handleAddUser(_poolId);
    setJoined(true);
    setError(false);
    setMessage("Successfully joined the pool");
    setLoading(false);
  };

  const joinPool = async (poolId) => {
    setLoading(true);
    setMessage("transaction in progress");
    try {
      if (parseInt(pool.poolSlots) - pool.members.length === 0) {
        throw new Error("House Full");
      }

      if (pool.members.indexOf(account) !== -1) {
        throw new Error("You are already part of this pool");
      }

      const overrides = {
        from: account,
        gasLimit: "3000000",
        value: pool.entryFeeContract,
      };

      await contract.joinLotteryPool(poolId, overrides);
      contract.on("LogLotteryPoolJoined", handleJoinEvent);
    } catch (err) {
      setJoined(false);
      setLoading(false);
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

  const handleResetMessage = () => {
    setMessage("");
    setError(false);
  };

  return (
    <>
      <PoolCard
        pool={pool}
        joinPool={joinPool}
        availableSlots={availableSlots}
        isPoolLoading={isPoolLoading}
      />
      <SimpleSnackbar
        openSnackbar={message}
        message={message}
        handleCloseSnackbar={handleResetMessage}
        severity={error ? "error" : "info"}
      />
      {/* <div>        
        <div className="wrapper">
          <div className="bg_img">
            <div className="content_wrapper">              
              {(Object.keys(pool).length === 0 || !pool.isActive) && (
                <div className="content_wrapper mt-5">
                  <p variant="warning">
                    <h1 variant="warning">Wait Until New Pool gets created</h1>
                  </p>
                </div>
              )}
              {message && (
                <p variant={error ? "danger" : "success"}>{message}</p>
              )}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Header;
