import React from "react";
import { Survey, QuestionType, Parameters } from "@/app/types";
import MultipleChoiceSettings from "./MultipleChoicesettings";
import OpenTextSettings from "./OpenTextSettings";
import OpinionScaleSettings from "./OpinionScaleSettings";
import RankingSettings from "./RankingSettings";

interface QuestionPannelProps {
    survey: Survey;
    focusedQuestionId: string | null;
    updateQuestionType: (id: string, type: QuestionType) => void;
    toggleParameter: (id: string, parameter: keyof Parameters) => void;
    updateParameterValue: (
        id: string,
        parameter: keyof Parameters,
        value: number | string
    ) => void;
}

const QuestionPannel: React.FC<QuestionPannelProps> = ({
    survey,
    focusedQuestionId,
    updateQuestionType,
    toggleParameter,
    updateParameterValue,
}) => {
    const focusedQuestion = survey.questions.find(
        (q) => q.id === focusedQuestionId
    );

    if (!focusedQuestion) {
        return <div>No question selected</div>;
    }

    const handleQuestionTypeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        updateQuestionType(
            focusedQuestion.id,
            event.target.value as QuestionType
        );
    };

    const handleToggleParameter = (parameter: keyof Parameters) => {
        toggleParameter(focusedQuestion.id, parameter);
    };

    const handleParameterValueChange = (
        parameter: keyof Parameters,
        value: string | number
    ) => {
        updateParameterValue(focusedQuestion.id, parameter, value);
    };

    return (
        <div
            className="border"
            style={{
                width: "20rem",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <h4>Question Type</h4>
            <select
                value={focusedQuestion.type}
                onChange={handleQuestionTypeChange}
                style={{ marginBottom: "1rem" }}
            >
                {Object.values(QuestionType).map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <h3>Settings</h3>
            {focusedQuestion.type === QuestionType.MultipleChoice && (
                <MultipleChoiceSettings
                    parameters={focusedQuestion.parameters}
                    toggleParameter={(parameter) =>
                        handleToggleParameter(parameter)
                    }
                />
            )}
            {focusedQuestion.type === QuestionType.Text && (
                <OpenTextSettings
                    parameters={focusedQuestion.parameters}
                    toggleParameter={handleToggleParameter}
                    updateParameterValue={handleParameterValueChange}
                />
            )}

            {focusedQuestion.type === QuestionType.OpinionScale && (
                <OpinionScaleSettings
                    parameters={focusedQuestion.parameters}
                    updateParameterValue={handleParameterValueChange}
                />
            )}
            {focusedQuestion.type === QuestionType.Ranking && (
                <RankingSettings
                    parameters={focusedQuestion.parameters}
                    toggleParameter={(parameter) =>
                        handleToggleParameter(parameter)
                    }
                />
            )}
        </div>
    );
};

export default QuestionPannel;
