"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import firestore from "../../firebaseConfig";
import Link from "next/link";

interface Survey {
    id: string;
    name: string;
    questions: [any];
}

const HomePage: React.FC = () => {
    const [surveys, setSurveys] = useState<Survey[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(
                    collection(firestore, "surveys")
                );
                let s: Survey[] = [];
                querySnapshot.forEach((doc) => {
                    s.push({
                        id: doc.id,
                        name: doc.data().name,
                        questions: doc.data().questions,
                    });
                });
                setSurveys(s);
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                height: "100vh",
                paddingBottom: "2rem",
                marginTop: "4rem",
            }}
        >
            <div
                style={{
                    width: "100%",
                    marginBlock: "1.2rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                <h1
                    style={{
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        width: "26rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingBlock: "1.2rem",
                        borderBottom: "1px solid #eee",
                    }}
                >
                    Surveys
                </h1>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginTop: "1rem",
                }}
            >
                {surveys.map((survey) => (
                    <div
                        key={survey.id}
                        style={{
                            display: "flex",
                            width: "60rem",
                            border: "1px solid #eee",
                            borderRadius: "4px",
                            paddingBlock: "1rem",
                            paddingInline: "1rem",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <h3>{survey.name}</h3>
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                            }}
                        >
                            <Link
                                style={{
                                    borderRadius: "1000px",
                                    paddingBlock: "0.8rem",
                                    paddingInline: "1.8rem",
                                    background: "#E0888722",
                                    color: "#E08887",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                }}
                                href={"/results/" + survey.id}
                            >
                                View Results
                            </Link>
                            <Link
                                style={{
                                    borderRadius: "1000px",
                                    paddingBlock: "0.8rem",
                                    paddingInline: "1.8rem",
                                    background: "#E0888722",
                                    color: "#E08887",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                }}
                                target="_blank"
                                href={"/take-survey/" + survey.id}
                            >

                                Take Survey
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Link
                href="/create-survey"
                style={{
                    borderRadius: "1000px",
                    paddingBlock: "0.8rem",
                    paddingInline: "1.8rem",
                    background: "#A259FF",
                    color: "white",
                    fontWeight: 500,
                    cursor: "pointer",
                    marginTop: "3rem",
                }}
            >
                Create new survey
            </Link>
        </main>
    );
};

export default HomePage;
