import React, { useEffect } from "react";
import { Question, Option, Survey } from "@/app/types";
import { useDynamicOptions } from "../hooks/useDynamicOptions";
import OptionsEditor from "./OptionsEditor";
import SubQuestionsEditor from "./SubQuestions";
import DynamicOptions from "./DynamicOptions";

interface ProgressiveGridEditorProps {
    question: Question;
    updateQuestion: (id: string, updatedQuestion: Partial<Question>) => void;
    addOptionToQuestion: (questionId: string, option: Omit<Option, "id">) => void;
    removeOptionFromQuestion: (questionId: string, optionId: string) => void;
    updateOptionInQuestion: (questionId: string, optionId: string, label: string) => void;
    allQuestions: Question[];
    survey: Survey;
}

const ProgressiveGridEditor: React.FC<ProgressiveGridEditorProps> = ({
    question,
    updateQuestion,
    addOptionToQuestion,
    removeOptionFromQuestion,
    updateOptionInQuestion,
    allQuestions,
    survey,
}) => {
    const {
        handleDynamicOptionsChange,
        handleDynamicOptionToggle,
    } = useDynamicOptions(question, updateQuestion, allQuestions);

    const updateSubQuestion = (subQuestionId: string, updatedSubQuestion: Partial<Question>) => {
        const updatedSubQuestions = question.subQuestions?.map((subQuestion) =>
            subQuestion.id === subQuestionId ? { ...subQuestion, ...updatedSubQuestion } : subQuestion
        );
        updateQuestion(question.id, { subQuestions: updatedSubQuestions });
    };

    const findQuestionById = (id: string): Question | undefined => {
        for (const q of survey.questions) {
            if (q.id === id) {
                return q;
            }
            if (q.subQuestions) {
                for (const subQ of q.subQuestions) {
                    if (subQ.id === id) {
                        return q;
                    }
                }
            }
        }
        return undefined;
    };

    const selectedDynamicQuestion = findQuestionById(question.dynamicOptionsId || "");

    useEffect(() => {
        console.log("ProgressiveGridEditor Component - Question:", question);
    }, [question]);

    const handleCheckboxChange = (
        subQuestionId: string,
        optionId: string,
        terminateIfSelected: boolean
    ) => {
        const subQuestion = question.subQuestions?.find(sq => sq.id === subQuestionId);
        if (!subQuestion) return;

        const logicKey = terminateIfSelected
            ? "terminateIfSelectedOptionIds"
            : "terminateIfNotSelectedOptionIds";
        const oppositeLogicKey = terminateIfSelected
            ? "terminateIfNotSelectedOptionIds"
            : "terminateIfSelectedOptionIds";

        const updatedLogic = {
            ...subQuestion.logic,
            [logicKey]: subQuestion.logic?.[logicKey]?.includes(optionId)
                ? subQuestion?.logic?.[logicKey]?.filter((id) => id !== optionId)
                : [...(subQuestion.logic?.[logicKey] || []), optionId],
            [oppositeLogicKey]:
                subQuestion.logic?.[oppositeLogicKey]?.filter(
                    (id) => id !== optionId
                ) || [],
        };

        const updatedSubQuestions = question.subQuestions?.map((sq) =>
            sq.id === subQuestionId ? { ...sq, logic: updatedLogic } : sq
        );
        updateQuestion(question.id, { subQuestions: updatedSubQuestions });
    };

    const renderCheckmarks = (subQuestionId: string, terminateIfSelected: boolean) => {
        const subQuestion = question.subQuestions?.find(sq => sq.id === subQuestionId);
        if (!subQuestion || !selectedDynamicQuestion) return null;

        const logicKey = terminateIfSelected
            ? "terminateIfSelectedOptionIds"
            : "terminateIfNotSelectedOptionIds";
        return selectedDynamicQuestion.options.map((option) => (
            <div key={option.id}>
                <label>
                    <input
                        type="checkbox"
                        checked={
                            subQuestion.logic?.[logicKey]?.includes(option.id) || false
                        }
                        onChange={() =>
                            handleCheckboxChange(
                                subQuestionId,
                                option.id,
                                terminateIfSelected
                            )
                        }
                    />
                    {option.label}
                </label>
            </div>
        ));
    };

    return (
        <div style={{ marginTop: "1rem" }}>
            <DynamicOptions
                question={question}
                allQuestions={allQuestions}
                handleDynamicOptionsChange={handleDynamicOptionsChange}
                handleDynamicOptionToggle={handleDynamicOptionToggle}
                survey={survey}
            />

            <SubQuestionsEditor
                question={question}
                updateQuestion={updateQuestion}
            />

            <OptionsEditor
                question={question}
                addOptionToQuestion={addOptionToQuestion}
                updateOptionInQuestion={updateOptionInQuestion}
                removeOptionFromQuestion={removeOptionFromQuestion}
            />

            {question.subQuestions?.map((subQuestion) => (
                <div key={subQuestion.id} style={{ marginTop: "1rem" }}>
                    <h4>Sub-Question: {subQuestion.questionText}</h4>
                    <div>
                        <h5>Terminate If Selected</h5>
                        {renderCheckmarks(subQuestion.id, true)}

                        <h5>Terminate If Not Selected</h5>
                        {renderCheckmarks(subQuestion.id, false)}
                    </div>
                </div>
            ))}

            {selectedDynamicQuestion && !question.subQuestions ? (
                <div>
                    <h4>Terminate If Selected</h4>
                    {renderCheckmarks(question.id, true)}

                    <h4>Terminate If Not Selected</h4>
                    {renderCheckmarks(question.id, false)}
                </div>
            ) : (
                question.subQuestions && question.subQuestions.length > 0 ? (
                    <div style={{ marginTop: '1rem' }}>
                        <h4>Sub-Question Termination Logic</h4>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${question.subQuestions.length + 1}, auto)`,
                                gap: '1rem',
                                marginBottom: '1rem',
                            }}
                        >
                            <div></div>
                            {question.subQuestions.map((subQuestion) => (
                                <div key={subQuestion.id} style={{ fontWeight: 'bold' }}>
                                    {subQuestion.questionText}
                                </div>
                            ))}
                            {question.options.map((option) => (
                                <React.Fragment key={option.id}>
                                    <div style={{ fontWeight: 'bold' }}>{option.label}</div>
                                    {question?.subQuestions?.map((subQuestion) => (
                                        <div key={subQuestion.id}>
                                            <input
                                                type="checkbox"
                                                checked={subQuestion.logic?.terminateIfSelectedOptionIds?.includes(option.id) || false}
                                                onChange={() =>
                                                    handleCheckboxChange(subQuestion.id, option.id, true)
                                                }
                                            />
                                            <input
                                                type="checkbox"
                                                checked={subQuestion.logic?.terminateIfNotSelectedOptionIds?.includes(option.id) || false}
                                                onChange={() =>
                                                    handleCheckboxChange(subQuestion.id, option.id, false)
                                                }
                                            />
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ) : null
            )}
        </div>
    );
};

export default ProgressiveGridEditor;

