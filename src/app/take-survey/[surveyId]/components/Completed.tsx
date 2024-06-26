import HeavyHitterButton from "@/app/components/HeavyHitterButton";
import Link from "next/link";
import React from "react";

const Completed: React.FC = () => {
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
                    color: "#55bb44",
                }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
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
                Success, you qualify to participate!
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
                Click the link below to begin this study
            </p>
            <HeavyHitterButton
                text="Take survey →"
                onClick={() => {}}
            ></HeavyHitterButton>
        </div>
    );
};

export default Completed;
