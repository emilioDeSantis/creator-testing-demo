"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header: React.FC = () => {
    const pathname = usePathname();

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
            {pathname != "/take-survey" && (
                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                    }}
                >
                    <Link
                        style={{
                            textDecoration: "none",
                            borderRadius: "1000px",
                            paddingBlock: "0.8rem",
                            paddingInline: "1.8rem",
                            background:
                                pathname == "/create-survey"
                                    ? "#E0888722"
                                    : "white",
                            color:
                                pathname == "/create-survey"
                                    ? "#E08887"
                                    : "black",
                            fontWeight: 500,
                            cursor: "pointer",
                        }}
                        href="/create-survey"
                    >
                        Create new survey
                    </Link>
                    <Link
                        style={{
                            textDecoration: "none",
                            borderRadius: "1000px",
                            paddingBlock: "0.8rem",
                            paddingInline: "1.8rem",
                            background:
                                pathname == "/"
                                    ? "#E0888722"
                                    : "white",
                            color: pathname == "/" ? "#E08887" : "black",
                            fontWeight: 500,
                            cursor: "pointer",
                        }}
                        href="/"
                    >
                        Surveys
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
