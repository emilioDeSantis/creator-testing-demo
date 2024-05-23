import React from "react";
import { Survey, QuestionType, Parameters } from "@/app/types";
import MultipleChoiceSettings from "./MultipleChoicesettings";
import OpenTextSettings from "./OpenTextSettings";
import OpinionScaleSettings from "./OpinionScaleSettings";
import RankingSettings from "./RankingSettings";

const questionTypeDisplay = {
    [QuestionType.MultipleChoice]: "Multiple Choice",
    [QuestionType.Text]: "Open Text Response",
    [QuestionType.OpinionScale]: "Opinion Scale",
    [QuestionType.Ranking]: "Ranking",
    [QuestionType.ProgressiveGrid]: "Progressive Grid",
};

interface QuestionPannelProps {
    survey: Survey;
    focusedQuestionId: string | null;
    updateQuestionType: (id: string, type: QuestionType) => void;
    toggleParameter: (id: string, parameter: keyof Parameters) => void;
    updateParameterValue: (
        id: string,
        parameter: keyof Parameters,
        value: number | string | boolean
    ) => void;
    index: number;
}

const QuestionPannel: React.FC<QuestionPannelProps> = ({
    survey,
    focusedQuestionId,
    updateQuestionType,
    toggleParameter,
    updateParameterValue,
    index,
}) => {
    const focusedQuestion = survey.questions.find(
        (q) => q.id === focusedQuestionId
    );

    if (!focusedQuestion) {
        return (
            <div
                className="border"
                style={{
                    width: "22rem",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            />
        );
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
        value: string | number | boolean
    ) => {
        updateParameterValue(focusedQuestion.id, parameter, value);
    };

    return (
        <div
            className="border"
            style={{
                width: "18rem",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: "1rem",
            }}
        >
            <span
                style={{
                    fontWeight: 500,
                    display: "flex",
                    gap: "1rem",
                    width: "14rem",
                    paddingBlock: "0.8rem",
                    position: "relative",
                }}
            >
                <div>{index + 1 + "."}</div>
                <div
                    style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        flexGrow: 1,
                    }}
                >
                    {focusedQuestion.questionText}
                </div>
            </span>
            <h3
                style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                }}
            >
                Question Type
            </h3>

            <select
                value={focusedQuestion.type}
                onChange={handleQuestionTypeChange}
                style={{
                    width: "100%",
                    paddingInline: "0.6rem",
                    paddingBlock: "0.6rem",
                    borderRadius: "6px",
                    fontSize: "16px",
                    color: "#667085",
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    position: "relative",
                    backgroundImage:
                        "url(\"data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23667085' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='feather feather-chevron-down' viewBox='0 0 24 24'><path d='M6 9l6 6 6-6'/></svg>\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 10px center",
                    backgroundSize: "16px 16px",
                    marginTop: "0.6rem",
                    cursor: "pointer",
                }}
            >
                {Object.values(QuestionType).map((type) => (
                    <option
                        key={type}
                        value={type}
                        style={{
                            backgroundColor: "#fff",
                            color: "#333",
                            fontSize: "0.9rem",
                            fontWeight: 400,
                        }}
                    >
                        {questionTypeDisplay[type]}
                    </option>
                ))}
            </select>
            <h3
                style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    marginTop: "2.4rem",
                }}
            >
                Settings
            </h3>
            {focusedQuestion.type === QuestionType.MultipleChoice && (
                <MultipleChoiceSettings
                    parameters={focusedQuestion.parameters!}
                    toggleParameter={handleToggleParameter}
                />
            )}
            {focusedQuestion.type === QuestionType.ProgressiveGrid && (
                <MultipleChoiceSettings
                    parameters={focusedQuestion.parameters!}
                    toggleParameter={handleToggleParameter}
                />
            )}
            {focusedQuestion.type === QuestionType.Text && (
                <OpenTextSettings
                    parameters={focusedQuestion.parameters!}
                    toggleParameter={handleToggleParameter}
                    updateParameterValue={handleParameterValueChange}
                />
            )}
            {focusedQuestion.type === QuestionType.OpinionScale && (
                <OpinionScaleSettings
                    parameters={focusedQuestion.parameters!}
                    updateParameterValue={handleParameterValueChange}
                />
            )}
            {focusedQuestion.type === QuestionType.Ranking && (
                <RankingSettings
                    parameters={focusedQuestion.parameters!}
                    toggleParameter={handleToggleParameter}
                />
            )}
        </div>
    );
};

export default QuestionPannel;
