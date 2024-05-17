import React from "react";
import { Question, Option, QuestionType } from "@/app/types";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import OpenTextEditor from "./OpenTextEditor";
import OpinionScaleEditor from "./OpinionScaleEditor";
import RankingEditor from "./RankingEditor";

interface QuestionEditorProps {
    question: Question;
    index: number;
    updateQuestion: (id: string, updatedQuestion: Partial<Question>) => void;
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
    setFocusedQuestionId: (id: string) => void;
    focused: boolean;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
    question,
    index,
    updateQuestion,
    addOptionToQuestion,
    updateOptionInQuestion,
    removeOptionFromQuestion,
    setFocusedQuestionId,
    focused,
}) => {
    const handleQuestionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        updateQuestion(question.id, { question: event.target.value });
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // Always set focus on the question editor
        setFocusedQuestionId(question.id);

        // Prevent the default action and propagation for button clicks
        const target = event.target as HTMLElement;
        if (target.tagName === "BUTTON" || target.tagName === "INPUT") {
            event.stopPropagation();
        }
    };

    return (
        <div
            onClick={handleClick}
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                marginBottom: "2rem",
                cursor: "pointer",
                opacity: focused ? 1 : 0.5,
            }}
        >
            <div className="question" style={{ display: "flex" }}>
                {index + 1}.&nbsp;
                <input
                    type="text"
                    className="question"
                    placeholder="Type your question"
                    value={question.question}
                    onChange={handleQuestionChange}
                />
            </div>
            {question.type === QuestionType.MultipleChoice && (
                <MultipleChoiceEditor
                    question={question}
                    addOptionToQuestion={addOptionToQuestion}
                    updateOptionInQuestion={updateOptionInQuestion}
                    removeOptionFromQuestion={removeOptionFromQuestion}
                />
            )}
            {question.type === QuestionType.Text && (
                <OpenTextEditor
                    question={question}
                    updateQuestion={updateQuestion}
                />
            )}
            {question.type === QuestionType.OpinionScale && (
                <OpinionScaleEditor
                    question={question}
                />
            )}
            {question.type === QuestionType.Ranking && (
                <RankingEditor
                    question={question}
                    addOptionToQuestion={addOptionToQuestion}
                    updateOptionInQuestion={updateOptionInQuestion}
                    removeOptionFromQuestion={removeOptionFromQuestion}
                />
            )}
        </div>
    );
};

export default QuestionEditor;
