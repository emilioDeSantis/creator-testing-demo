import React, { useState } from "react";
import { Question, QuestionType, Survey } from "@/app/types";

interface NewQuestionProps {
    addQuestion: (question: Omit<Question, "id" | "type" | "options" | "parameters">) => void;
    survey: Survey;
}

const NewQuestion: React.FC<NewQuestionProps> = ({ addQuestion, survey }) => {
    const [inputText, setInputText] = useState("");

    const onTextChange = (text: string) => {
        addQuestion({
            question: text,
        });
        setInputText("");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleInputBlur = () => {
        if (inputText === "") return;
        onTextChange(inputText);
    };

    const handleInputKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            if (inputText === "") {
                event.preventDefault();
                return;
            }
            onTextChange(inputText);
            event.preventDefault();
        }
    };

    return (
        <div
            className="question"
            style={{
                display: "flex",
                opacity: inputText === "" ? 0.5 : 1,
                width: "100%",
            }}
        >
            {survey.questions.length + 1}.&nbsp;
            <input
                className="question"
                type="text"
                placeholder="Type your question"
                value={inputText}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyPress={handleInputKeyPress}
            />
        </div>
    );
};

export default NewQuestion;
