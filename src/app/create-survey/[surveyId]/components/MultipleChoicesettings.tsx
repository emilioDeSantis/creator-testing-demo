// components/MultipleChoiceSettings.tsx
import React from "react";
import { Parameters } from "@/app/types";
import ToggleSwitch from "./ToggleSwitch";

interface MultipleChoiceSettingsProps {
    parameters: Parameters;
    toggleParameter: (parameter: keyof Parameters) => void;
}

const MultipleChoiceSettings: React.FC<MultipleChoiceSettingsProps> = ({
    parameters,
    toggleParameter,
}) => {
    const handleToggleParameter = (parameter: keyof Parameters) => {
        toggleParameter(parameter);
    };

    return (
        <div className="parameter-container">
            <label className="parameter">
                Allow Multiple Selections
                <ToggleSwitch
                    checked={parameters.multipleSelections || false}
                    onChange={() => handleToggleParameter("multipleSelections")}
                />
            </label>
            <label className="parameter">
                Randomize Options
                <ToggleSwitch
                    checked={parameters.randomize}
                    onChange={() => handleToggleParameter("randomize")}
                />
            </label>
            <label className="parameter">
                {`"Other" Option`}
                <ToggleSwitch
                    checked={parameters.otherOption}
                    onChange={() => handleToggleParameter("otherOption")}
                />
            </label>
        </div>
    );
};

export default MultipleChoiceSettings;
