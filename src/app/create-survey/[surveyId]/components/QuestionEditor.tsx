import React from "react";
import { Question, Option, QuestionType, Survey } from "@/app/types";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import OpenTextEditor from "./OpenTextEditor";
import OpinionScaleEditor from "./OpinionScaleEditor";
import RankingEditor from "./RankingEditor";
import ProgressiveGridEditor from "./ProgressiveGridEditor";

interface QuestionEditorProps {
    question: Question;
    index: number;
    updateQuestion: (id: string, updatedQuestion: Partial<Question>) => void;
    addOptionToQuestion: (questionId: string, option: Omit<Option, "id">) => void;
    updateOptionInQuestion: (questionId: string, optionId: string, label: string) => void;
    removeOptionFromQuestion: (questionId: string, optionId: string) => void;
    setFocusedQuestionId: (id: string) => void;
    focused: boolean;
    allQuestions: Question[];
    survey: Survey;
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
    allQuestions,
    survey,
}) => {
    const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateQuestion(question.id, { questionText: event.target.value });
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setFocusedQuestionId(question.id);
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
                    value={question.questionText}
                    onChange={handleQuestionChange}
                />
            </div>
            {question.type === QuestionType.MultipleChoice && (
                <MultipleChoiceEditor
                    question={question}
                    addOptionToQuestion={addOptionToQuestion}
                    updateOptionInQuestion={updateOptionInQuestion}
                    removeOptionFromQuestion={removeOptionFromQuestion}
                    allQuestions={allQuestions}
                    updateQuestion={updateQuestion}
                    survey={survey}
                />
            )}
            {question.type === QuestionType.Text && (
                <OpenTextEditor question={question} updateQuestion={updateQuestion} />
            )}
            {question.type === QuestionType.OpinionScale && (
                <OpinionScaleEditor question={question} />
            )}
            {question.type === QuestionType.Ranking && (
                <RankingEditor
                    question={question}
                    addOptionToQuestion={addOptionToQuestion}
                    updateOptionInQuestion={updateOptionInQuestion}
                    removeOptionFromQuestion={removeOptionFromQuestion}
                />
            )}
            {question.type === QuestionType.ProgressiveGrid && (
                <ProgressiveGridEditor
                    question={question}
                    updateQuestion={updateQuestion}
                    addOptionToQuestion={addOptionToQuestion}
                    removeOptionFromQuestion={removeOptionFromQuestion}
                    updateOptionInQuestion={updateOptionInQuestion}
                    allQuestions={allQuestions}
                    survey={survey}
                />
            )}
        </div>
    );
};

export default QuestionEditor;
