import Link from "next/link";
import React from "react";

const Completed: React.FC = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
        
        }}>
            <h1>Thank you for completing this survey.</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem 1.6rem",
                    color: "#7047EB",
                    border: "1px solid #7047EB",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "3rem",
                    background: "transparent",
                    fontSize: "1.2rem",
                }}
                onClick={() => {
                    window.close()
                }}
            >
                Continue
            </div>
        </div>
    );
};

export default Completed;
