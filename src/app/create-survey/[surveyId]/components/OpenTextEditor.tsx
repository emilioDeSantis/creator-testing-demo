// components/OpenTextEditor.tsx
import React from "react";
import { Question } from "@/app/types";

interface OpenTextEditorProps {
    question: Question;
    updateQuestion: (id: string, updatedQuestion: Partial<Question>) => void;
}

const OpenTextEditor: React.FC<OpenTextEditorProps> = ({
    question,
    updateQuestion,
}) => {
    const handleTextChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        updateQuestion(question.id, { questionText: event.target.value });
    };

    return (
        <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
            <div
                style={{
                    width: "100%",
                    paddingLeft: "1.6rem",
                    marginTop: "2rem",
                    fontSize: "0.9rem",
                    color: "#888888",
                    textDecoration: "underline",
                }}
            >
                Response goes here
            </div>
        </div>
    );
};

export default OpenTextEditor;
