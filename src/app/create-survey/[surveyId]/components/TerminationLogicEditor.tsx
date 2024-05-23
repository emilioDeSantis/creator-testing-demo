import React, { useEffect } from "react";
import { Question, Survey } from "@/app/types";
import { useDynamicOptions } from "../hooks/useDynamicOptions";

interface TerminationLogicEditorProps {
    question: Question;
    survey: Survey;
    updateQuestion: (id: string, updatedQuestion: Partial<Question>) => void;
    allQuestions: Question[];
}

const TerminationLogicEditor: React.FC<TerminationLogicEditorProps> = ({
    question,
    survey,
    updateQuestion,
    allQuestions,
}) => {
    const { selectedDynamicQuestion } = useDynamicOptions(
        question,
        updateQuestion,
        allQuestions
    );

    const dynamicOptions = selectedDynamicQuestion
        ? selectedDynamicQuestion.options
        : question.options;

    const handleCheckboxChange = (
        optionId: string,
        terminateIfSelected: boolean
    ) => {
        const logicKey = terminateIfSelected
            ? "terminateIfSelectedOptionIds"
            : "terminateIfNotSelectedOptionIds";
        const oppositeLogicKey = terminateIfSelected
            ? "terminateIfNotSelectedOptionIds"
            : "terminateIfSelectedOptionIds";

        const updatedLogic = {
            ...question.logic,
            [logicKey]: question.logic?.[logicKey]?.includes(optionId)
                ? question?.logic?.[logicKey]?.filter((id) => id !== optionId)
                : [...(question.logic?.[logicKey] || []), optionId],
            [oppositeLogicKey]:
                question.logic?.[oppositeLogicKey]?.filter(
                    (id) => id !== optionId
                ) || [],
        };

        updateQuestion(question.id, { logic: updatedLogic });
    };

    const renderCheckmarks = (terminateIfSelected: boolean) => {
        const logicKey = terminateIfSelected
            ? "terminateIfSelectedOptionIds"
            : "terminateIfNotSelectedOptionIds";
        return dynamicOptions.map((option) => (
            <div key={option.id}>
                <label>
                    <input
                        type="checkbox"
                        checked={
                            question.logic?.[logicKey]?.includes(option.id) ||
                            false
                        }
                        onChange={() =>
                            handleCheckboxChange(option.id, terminateIfSelected)
                        }
                    />
                    {option.label}
                </label>
            </div>
        ));
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

    const selectedDynamicQuestionDynamic = findQuestionById(
        question.dynamicOptionsId || ""
    );

    useEffect(() => {
        console.log(
            "TerminationLogicEditor Component - Selected Dynamic Question:",
            selectedDynamicQuestionDynamic
        );
    }, [selectedDynamicQuestionDynamic]);

    useEffect(() => {
        console.log("TerminationLogicEditor Component - Question:", question);
    }, [question]);

    const handleCheckboxChangeDynamic = (
        optionId: string,
        terminateIfSelected: boolean
    ) => {
        const logicKey = terminateIfSelected
            ? "terminateIfSelectedOptionIds"
            : "terminateIfNotSelectedOptionIds";
        const oppositeLogicKey = terminateIfSelected
            ? "terminateIfNotSelectedOptionIds"
            : "terminateIfSelectedOptionIds";

        const updatedLogic = {
            ...question.logic,
            [logicKey]: question.logic?.[logicKey]?.includes(optionId)
                ? question?.logic?.[logicKey]?.filter((id) => id !== optionId)
                : [...(question.logic?.[logicKey] || []), optionId],
            [oppositeLogicKey]:
                question.logic?.[oppositeLogicKey]?.filter(
                    (id) => id !== optionId
                ) || [],
        };

        updateQuestion(question.id, { logic: updatedLogic });
    };

    const renderCheckmarksDynamic = (terminateIfSelected: boolean) => {
        const logicKey = terminateIfSelected
            ? "terminateIfSelectedOptionIds"
            : "terminateIfNotSelectedOptionIds";
        return selectedDynamicQuestionDynamic?.options.map((option) => (
            <div key={option.id}>
                <label>
                    <input
                        type="checkbox"
                        checked={
                            question.logic?.[logicKey]?.includes(option.id) ||
                            false
                        }
                        onChange={() =>
                            handleCheckboxChangeDynamic(
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
        <div>
            {selectedDynamicQuestionDynamic ? (
                <div>
                    <h4>Terminate If Selected</h4>
                    {renderCheckmarksDynamic(true)}

                    <h4>Terminate If Not Selected</h4>
                    {renderCheckmarksDynamic(false)}
                </div>
            ) : (
                <div>
                    <h4>Termination Logic</h4>
                    <div>
                        <h5>Terminate If Selected</h5>
                        {renderCheckmarks(true)}
                    </div>
                    <div>
                        <h5>Terminate If Not Selected</h5>
                        {renderCheckmarks(false)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TerminationLogicEditor;
