// components/RankingSettings.tsx
import React from "react";
import { Parameters } from "@/app/types";

interface RankingSettingsProps {
    parameters: Parameters;
    toggleParameter: (parameter: keyof Parameters) => void;
}

const RankingSettings: React.FC<RankingSettingsProps> = ({
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
                    checked={parameters.randomize}
                    onChange={() => handleToggleParameter("randomize")}
                />
                Randomize Options
            </label>
        </div>
    );
};

export default RankingSettings;
