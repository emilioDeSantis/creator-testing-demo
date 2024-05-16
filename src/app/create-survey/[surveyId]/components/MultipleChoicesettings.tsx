// components/MultipleChoiceSettings.tsx
import React from "react";
import { Parameters } from "@/app/types";

interface MultipleChoiceSettingsProps {
    parameters: Parameters;
    toggleParameter: (parameter: keyof Parameters) => void;
}

const MultipleChoiceSettings: React.FC<MultipleChoiceSettingsProps> = ({
    parameters,
    toggleParameter
}) => {
    const handleToggleParameter = (parameter: keyof Parameters) => {
        toggleParameter(parameter);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label>
                <input
                    type="checkbox"
                    checked={parameters.multipleSelections}
                    onChange={() => handleToggleParameter("multipleSelections")}
                />
                Multiple Selections
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={parameters.randomize}
                    onChange={() => handleToggleParameter("randomize")}
                />
                Randomize Options
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={parameters.otherOption}
                    onChange={() => handleToggleParameter("otherOption")}
                />
                Other Option
            </label>
        </div>
    );
};

export default MultipleChoiceSettings;
