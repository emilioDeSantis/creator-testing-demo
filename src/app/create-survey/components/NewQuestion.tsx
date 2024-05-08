import React, { useState } from "react";

interface NewQuestionProps {
    setSurvey: React.Dispatch<React.SetStateAction<any>>;
    survey: any;
}

const NewQuestion: React.FC<NewQuestionProps> = ({ setSurvey, survey }) => {
    const [inputText, setInputText] = useState("");

    const onTextChange = (text: string) => {
        setSurvey((prev: any) => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    question: text,
                    options: ["", "", "", ""],
                },
            ],
        }));
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
                width: '100%',
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
