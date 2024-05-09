import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                borderBottom: "1px solid #eee",
                paddingInline: "4rem",
                paddingBlock: "0.6rem",
                fontSize: "0.9rem",
                position: "fixed",
                background: "#fff",
                zIndex: 1000,
            }}
        >
            <Link
            href={"/"}
                style={{
                    width: "12rem",
                    height: "3rem",
                    position: "relative",
                }}
            >
                <Image
                    fill
                    src={`/creator-testing-logo.png`}
                    alt={"image"}
                    sizes="20vw"
                    priority
                    style={{
                        objectFit: "cover",
                    }}
                />
            </Link>
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                }}
            >
            <Link style={{
                color: "#333",
                textDecoration: "none",
                paddingBlock: "0.6rem",
                paddingInline: "1.6rem",
            }} href="/create-survey">Create new survey</Link>
            <Link style={{
                color: "#333",
                textDecoration: "none",
                paddingBlock: "0.6rem",
                paddingInline: "1.6rem",
            }} href="/">Surveys</Link>
            </div>
        </div>
    );
};

export default Header;
