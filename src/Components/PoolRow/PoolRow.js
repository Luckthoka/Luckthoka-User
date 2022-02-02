import React, { useState } from "react";
import PoolModal from "../PoolModal/PoolModal";
import "./PoolRow.css";

const PoolRow = ({ pool }) => {
  const [showPoolModal, setShowPoolModal] = useState(false);
  const handleCardClick = (pool) => {
    setShowPoolModal(true);
  };

  return (
    <tr>
      {pool && Object.keys(pool).length > 0 && (
        <>
          <div onClick={() => handleCardClick(pool)}>
            <div className="flexBox equalFlex flexRow">
              <div className="flexBox_modal" xs={6} md={3}>
                <strong>#{pool.poolId}</strong>
              </div>
              <div className="flexBox_modal" xs={6} md={3}>
                <span>Slots</span> <span>{pool.poolSlots}</span>
              </div>
              <div className="flexBox_modal" xs={6} md={3}>
                <span>Prize Amount</span> <span>{pool.prizeAmount}</span>
              </div>
              <div className="flexBox_modal" xs={6} md={3}>
                <span>Status</span>{" "}
                <span>{pool.isActive ? "Active" : "Closed"}</span>
              </div>
            </div>
          </div>

          <PoolModal
            show={showPoolModal}
            onHide={() => setShowPoolModal(false)}
            pool={pool}
          />
        </>
      )}
    </tr>
  );
};

export default PoolRow;
