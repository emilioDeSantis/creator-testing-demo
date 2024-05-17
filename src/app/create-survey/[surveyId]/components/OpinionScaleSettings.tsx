// components/OpinionScaleSettings.tsx
import React from "react";
import { Parameters } from "@/app/types";

interface OpinionScaleSettingsProps {
    parameters: Parameters;
    updateParameterValue: (parameter: keyof Parameters, value: string) => void;
}

const OpinionScaleSettings: React.FC<OpinionScaleSettingsProps> = ({
    parameters,
    updateParameterValue,
}) => {
    const handleLabelChange = (
        parameter: keyof Parameters,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        updateParameterValue(parameter, event.target.value);
    };

    return (
        <div className="parameter-container">
            <input
                className="parameter-input"
                type="text"
                placeholder="Minimum Label"
                maxLength={20}
                value={parameters.minimumRatingValue || ""}
                onChange={(event) =>
                    handleLabelChange("minimumRatingValue", event)
                }
            />
            <input
                className="parameter-input"
                type="text"
                placeholder="Middle Label"
                value={parameters.middleRatingValue || ""}
                maxLength={20}
                onChange={(event) =>
                    handleLabelChange("middleRatingValue", event)
                }
            />
            <input
                className="parameter-input"
                type="text"
                placeholder="Maximum Label"
                maxLength={20}
                value={parameters.maximumRatingValue || ""}
                onChange={(event) =>
                    handleLabelChange("maximumRatingValue", event)
                }
            />
        </div>
    );
};

export default OpinionScaleSettings;
