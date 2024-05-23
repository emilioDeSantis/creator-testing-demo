import React from "react";
import { Option, Question, QuestionType, Survey } from "@/app/types";
import DynamicOptions from "./DynamicOptions";
import OptionsEditor from "./OptionsEditor";
import { useDynamicOptions } from "../hooks/useDynamicOptions";
import SubQuestionsEditor from "./SubQuestions";
import TerminationLogicEditor from "./TerminationLogicEditor";

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
    allQuestions: Question[];
    updateQuestion: (id: string, updatedQuestion: Partial<Question>) => void;
    survey: Survey;
}

const MultipleChoiceEditor: React.FC<MultipleChoiceEditorProps> = ({
    question,
    addOptionToQuestion,
    updateOptionInQuestion,
    removeOptionFromQuestion,
    allQuestions,
    updateQuestion,
    survey,
}) => {
    const {
        selectedDynamicQuestion,
        handleDynamicOptionsChange,
        handleDynamicOptionToggle,
    } = useDynamicOptions(question, updateQuestion, allQuestions);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1.2rem",
                width: "100%",
                alignItems: "flex-start",
            }}
        >
            <DynamicOptions
                question={question}
                allQuestions={allQuestions}
                handleDynamicOptionsChange={handleDynamicOptionsChange}
                handleDynamicOptionToggle={handleDynamicOptionToggle}
                survey={survey}
            />

            <OptionsEditor
                question={question}
                addOptionToQuestion={addOptionToQuestion}
                updateOptionInQuestion={updateOptionInQuestion}
                removeOptionFromQuestion={removeOptionFromQuestion}
            />

            {/* <TerminationLogicEditor
    question={question}
    updateQuestion={updateQuestion}
    isSubQuestion={false} // or true if it's a sub-question
    allQuestions={allQuestions} // pass the array of all questions
/> */}

            <TerminationLogicEditor
                question={question}
                survey={survey}
                updateQuestion={updateQuestion}
                allQuestions={allQuestions}
            />

            {question.type === QuestionType.ProgressiveGrid && (
                <SubQuestionsEditor
                    question={question}
                    updateQuestion={updateQuestion}
                />
            )}
        </div>
    );
};

export default MultipleChoiceEditor;
