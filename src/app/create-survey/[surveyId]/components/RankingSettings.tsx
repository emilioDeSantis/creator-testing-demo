// components/RankingSettings.tsx
import React from "react";
import { Parameters } from "@/app/types";
import ToggleSwitch from "./ToggleSwitch";

interface RankingSettingsProps {
    parameters: Parameters;
    toggleParameter: (parameter: keyof Parameters) => void;
}

const RankingSettings: React.FC<RankingSettingsProps> = ({
    parameters,
    toggleParameter,
}) => {
    const handleToggleParameter = (parameter: keyof Parameters) => {
        toggleParameter(parameter);
    };

    return (
        <div className="parameter-container">
            <label className="parameter">
                Randomize Options
                <ToggleSwitch
                    checked={parameters.randomize}
                    onChange={() => handleToggleParameter("randomize")}
                />
            </label>
        </div>
    );
};

export default RankingSettings;
