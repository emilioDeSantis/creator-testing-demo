import { Option, Question } from "@/app/types";
import React, { useEffect, useRef } from "react";


interface MultipleChoiceEditorProps {
    question: Question;
    addOptionToQuestion: (
        questionId: string,
        option: Omit<Option, "id">
    ) => void;
    updateOptionInQuestion: (
        questionId: string,
        optionId: string,
        label: string
    ) => void;
    removeOptionFromQuestion: (questionId: string, optionId: string) => void;
}

const MultipleChoiceEditor: React.FC<MultipleChoiceEditorProps> = ({
    question,
    addOptionToQuestion,
    updateOptionInQuestion,
    removeOptionFromQuestion,
}) => {
    const optionRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        optionRefs.current = optionRefs.current.slice(
            0,
            question.options.length
        );
    }, [question.options]);

    const handleOptionChange = (optionIndex: number, label: string) => {
        const option = question.options[optionIndex];
        updateOptionInQuestion(question.id, option.id, label);
    };

    const handleInputKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>,
        optionIndex: number
    ) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission

            if (optionIndex + 1 < question.options.length) {
                optionRefs.current[optionIndex + 1]?.focus(); // Focus the next option input
            } else {
                addOptionToQuestion(question.id, { label: "" });
                setTimeout(() => {
                    optionRefs.current[question.options.length]?.focus(); // Focus the newly created input
                }, 0);
            }
        } else if (event.key === "ArrowUp" && optionIndex > 0) {
            event.preventDefault();
            optionRefs.current[optionIndex - 1]?.focus(); // Focus the previous input
        } else if (
            event.key === "ArrowDown" &&
            optionIndex + 1 < question.options.length
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
                gap: "1rem",
                marginTop: "1.2rem",
            }}
        >
            {question.options.map((option, optionIndex) => (
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
                            opacity: option.label === "" ? 0.4 : 1,
                        }}
                    />
                    <input
                        ref={(el) => {
                            optionRefs.current[optionIndex] = el;
                        }}
                        style={{
                            marginLeft: "0.6rem",
                            opacity: option.label === "" ? 0.4 : 1,
                        }}
                        type="text"
                        placeholder="Type option label"
                        value={option.label}
                        onChange={(event) =>
                            handleOptionChange(optionIndex, event.target.value)
                        }
                        onKeyDown={(event) =>
                            handleInputKeyPress(event, optionIndex)
                        }
                    />
                </div>
            ))}
            {question.parameters.otherOption && (
                <div style={{ display: "flex", marginLeft: "1rem" }}>
                    <div
                        style={{
                            height: "1rem",
                            width: "1rem",
                            borderRadius: "100%",
                            border: "1px solid black",
                            opacity: 0.8,
                        }}
                    />
                    <div
                        style={{
                            marginLeft: "0.6rem",
                            opacity: 0.8,
                        }}
                    >
                        Other
                    </div>
                </div>
            )}
            <button
                style={{
                    padding: "0.6rem 1rem",
                    color: "#7047EB",
                    border: "1px solid #7047EB",
                    borderRadius: "4px",
                    cursor: "pointer",
                    background: "transparent",
                    fontSize: "1.2rem",
                    marginTop: "1.2rem",
                }}
                onClick={() => addOptionToQuestion(question.id, { label: "" })}
            >
                Add Option
            </button>
        </div>
    );
};

export default MultipleChoiceEditor;