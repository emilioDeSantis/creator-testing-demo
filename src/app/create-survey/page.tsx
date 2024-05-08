"use client";
import React from "react";
import NewQuestion from "./components/NewQuestion";
import QuestionEditor from "./components/QuestionEditor";
import PublishButton from "./components/PublishButton";

const CreateSurvey: React.FC = () => {
    const [survey, setSurvey] = React.useState({
        questions: [],
    });
    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                width: '100%',
                height:'100vh',
                paddingBottom: '2rem',
            }}
        >
            <div
                style={{
                    width: "100%",
                    marginBlock: "1.2rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: 'relative',
                }}
            >
                <h1 style={{
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    width: '26rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBlock: '1.2rem',
                    borderBottom: '1px solid #eee',
                }}>Create your survey</h1>
                <div style={{
                    position: 'absolute',
                    right: '1.2rem',
                }}>
                    <PublishButton/>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "center",
                    width: "100%",
                    flexGrow: 1,
                    paddingInline: "1.2rem",
                    gap: "1.6rem",
                }}
            >
                <div
                    style={{
                        width: '20rem',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height:'100%',
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                    }}
                ></div>
                <div
                    style={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        maxHeight:'100%',
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        paddingInline: '8rem',
                        paddingTop: '6rem',
                        overflowY: 'auto',
                        paddingBottom: '24rem',
                    }}
                >
                    {survey.questions.map((question: any, index: number) => (
                        <QuestionEditor
                            key={question.question}
                            index={index}
                            setSurvey={setSurvey}
                            survey={survey}
                        />
                    ))}

                    <NewQuestion setSurvey={setSurvey} survey={survey}/>
                </div>
                <div
                    style={{
                        width: '20rem',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: '100%',
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                    }}
                ></div>
            </div>
        </main>
    );
};

export default CreateSurvey;
