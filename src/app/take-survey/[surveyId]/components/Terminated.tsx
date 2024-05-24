import HeavyHitterButton from "@/app/components/HeavyHitterButton";
import Link from "next/link";
import React from "react";

const Terminated: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100vh",
                paddingInline: "1.6rem",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                style={{
                    height: "4rem",
                    width: "4rem",
                    color: "#ff8866",
                }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
            </svg>

            <h2
                style={{
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    marginTop: "3rem",
                    textAlign: "center",
                }}
            >
                Not Eligible for this Survey
            </h2>
            <p
                style={{
                    fontSize: "1.2rem",
                    color: "#667085",
                    marginTop: "1rem",
                    textAlign: "center",
                    maxWidth: "30rem",
                    marginBottom: "2rem",
                }}
            >
                Unfortunately, you do not qualify to participate in this survey
            </p>
            <HeavyHitterButton
                text="Home →"
                onClick={() => {}}
            ></HeavyHitterButton>
        </div>
    );
};

export default Terminated;
