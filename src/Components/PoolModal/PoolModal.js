import React, { useEffect, useState } from "react";
import "./PoolModal.css";

function PoolModal({ show, onHide, pool }) {
  console.log(pool);
  return (
    <>
      <div
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="poolModal"
        centered
      >
        <div closeButton>
          <title id="contained-modal-title-vcenter">
            Pool ID {pool.poolId}
          </title>
        </div>
        <div>
          <div>
            <div className="">
              <div className="flexBox_modal" xs={6} md={3}>
                <span>Pool Name</span> <span>{pool.poolName}</span>
              </div>
              <div className="flexBox_modal" xs={6} md={3}>
                <span>Created Date</span>{" "}
                <span>{new Date(pool.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flexBox_modal" xs={6} md={3}>
                <span>Slots</span> <span>{pool.poolSlots}</span>
              </div>
              <div className="flexBox_modal" xs={6} md={3}>
                <span>Status</span>{" "}
                <span>{pool.isActive ? "Active" : "Closed"}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flexBox_modal" xs={6} md={3}>
                <span>Entry Fee</span> <span>{pool.entryFee}</span>
              </div>
              <div className="flexBox_modal" xs={6} md={3}>
                <span>Prize Amount</span> <span>{pool.prizeAmount}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button variant="warning" onClick={onHide}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default PoolModal;
