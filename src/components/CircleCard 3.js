import React from "react";

function CircleCard({ circleName, numMembers }) {
  return (
    <div>
      <a onClick={() => console.log("clicked")}>
        <div
          style={{
            height: "280px",
            width: "300px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div style={{ paddingBottom: "20px" }}>
            <h3>{circleName}</h3>
          </div>

          <div style={{}}>{numMembers} members</div>
        </div>
      </a>
    </div>
  );
}

export default CircleCard;
