import React, { useState, useEffect, useRef } from "react";

interface QuestionEditorProps {
    setSurvey: React.Dispatch<React.SetStateAction<any>>;
    survey: any;
    index: number;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
    survey,
    setSurvey,
    index,
}) => {
    const [question, setQuestion] = useState(survey.questions[index].question);
    const [options, setOptions] = useState(survey.questions[index].options);

    // Ref to track option input elements
    const optionRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        optionRefs.current = optionRefs.current.slice(0, options.length);
    }, [options]);

    const handleUpdateSurvey = () => {
        const updatedSurvey = { ...survey };
        updatedSurvey.questions[index].question = question;
        updatedSurvey.questions[index].options = options;
        setSurvey(updatedSurvey);
    };

    const handleQuestionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setQuestion(event.target.value);
    };

    const handleOptionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        optionIndex: number
    ) => {
        const updatedOptions = [...options];
        updatedOptions[optionIndex] = event.target.value;
        setOptions(updatedOptions);
    };

    const handleInputBlur = () => {
        handleUpdateSurvey();
    };

    const handleInputKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>,
        optionIndex: number
    ) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            handleUpdateSurvey();

            if (optionIndex + 1 < options.length) {
                optionRefs.current[optionIndex + 1]?.focus(); // Focus the next option input
            } else {
                const newOptions = [...options, ""];
                setOptions(newOptions);
                setTimeout(() => {
                    optionRefs.current[newOptions.length - 1]?.focus(); // Focus the newly created input
                }, 0);
            }
        } else if (event.key === "ArrowUp" && optionIndex > 0) {
            event.preventDefault();
            optionRefs.current[optionIndex - 1]?.focus(); // Focus the previous input
        } else if (
            event.key === "ArrowDown" &&
            optionIndex + 1 < options.length
        ) {
            event.preventDefault();
            optionRefs.current[optionIndex + 1]?.focus(); // Focus the next input
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                marginBottom: "2rem",
            }}
        >
            <div className="question" style={{ display: "flex" }}>
                {index + 1}.&nbsp;
                <input
                    type="text"
                    className="question"
                    placeholder="Type your question"
                    value={question}
                    onChange={handleQuestionChange}
                    onBlur={handleInputBlur}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginTop: "1.2rem",
                }}
            >
                {options.map((option: string, optionIndex: number) => (
                    <div
                        key={optionIndex}
                        style={{ display: "flex", marginLeft: "1rem" }}
                    >
                        <div
                            style={{
                                height: "1rem",
                                width: "1rem",
                                borderRadius: "100%",
                                border: "1px solid black",
                                opacity: option === "" ? 0.4 : 1,
                            }}
                        />
                        <input
                            ref={(el) => {
                                optionRefs.current[optionIndex] = el; // Properly update the refs array without returning anything
                            }}
                            style={{
                                marginLeft: "0.6rem",
                                opacity: option === "" ? 0.4 : 1,
                            }}
                            type="text"
                            placeholder="Type option label"
                            value={option}
                            onChange={(event) =>
                                handleOptionChange(event, optionIndex)
                            }
                            onBlur={handleInputBlur}
                            onKeyDown={(event) =>
                                handleInputKeyPress(event, optionIndex)
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionEditor;
