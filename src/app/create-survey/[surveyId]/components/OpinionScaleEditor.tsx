// components/OpinionScaleEditor.tsx
import React from "react";
import { Question, Parameters } from "@/app/types";

interface OpinionScaleEditorProps {
    question: Question;
}

const OpinionScaleEditor: React.FC<OpinionScaleEditorProps> = ({
    question,
}) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "2.4rem",
                }}
            >
                {Array.from({ length: 11 }, (_, i) => (
                    <div
                        key={i}
                        style={{
                            width: "2rem",
                            height: "2rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #7047EB",
                            borderRadius: "1px",
                            padding: "0.6rem",
                            color: "#7047EB",
                            fontWeight: 700,
                            // fontSize: "1.2rem",
                            background: '#E2DBFA',
                        }}
                    >
                        {i}
                    </div>
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "1rem",
                    fontSize: "0.9rem",
                    color: '#888888'
                }}
            >
                <label
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {question.parameters.minimumRatingValue}
                </label>
                <label
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {question.parameters.middleRatingValue}
                </label>
                <label
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {question.parameters.maximumRatingValue}
                </label>
            </div>
        </div>
    );
};

export default OpinionScaleEditor;
