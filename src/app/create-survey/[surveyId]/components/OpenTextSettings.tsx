// components/OpenTextSettings.tsx
import React from "react";
import { Parameters } from "@/app/types";
import ToggleSwitch from "./ToggleSwitch";

interface OpenTextSettingsProps {
    parameters: Parameters;
    toggleParameter: (parameter: keyof Parameters) => void;
    updateParameterValue: (parameter: keyof Parameters, value: number) => void;
}

const OpenTextSettings: React.FC<OpenTextSettingsProps> = ({
    parameters,
    toggleParameter,
    updateParameterValue,
}) => {
    const handleToggleParameter = (parameter: keyof Parameters) => {
        toggleParameter(parameter);
    };

    const handleParameterChange = (
        parameter: keyof Parameters,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        updateParameterValue(parameter, parseInt(event.target.value, 10));
    };

    return (
        <div
        className="parameter-container"
        >
            <label className="parameter">
                Minimum Characters
                <ToggleSwitch
                    checked={parameters.minimumCharacters}
                    onChange={() => handleToggleParameter("minimumCharacters")}
                />
            </label>
            {parameters.minimumCharacters && (
                <input
                    type="number"
                    value={parameters.minimumCharactersValue}
                    onChange={(event) =>
                        handleParameterChange("minimumCharactersValue", event)
                    }
                    min={0}
                    style={{ 
                        width: "100%",
                        paddingBlock: "0.5rem",
                        paddingInline: "0.5rem",
                        borderRadius: "8px", 
                        border: "1px solid #ccc",
                        color: "#667085",
                        marginBottom: "0.5rem",
                     }}
                />
            )}
            <label className="parameter">
                Maximum Characters
                <ToggleSwitch
                    checked={parameters.maximumCharacters}
                    onChange={() => handleToggleParameter("maximumCharacters")}
                />
            </label>
            {parameters.maximumCharacters && (
                <input
                    type="number"
                    min={0}
                    value={parameters.maximumCharactersValue}
                    onChange={(event) =>
                        handleParameterChange("maximumCharactersValue", event)
                    }
                    style={{ 
                        width: "100%",
                        paddingBlock: "0.5rem",
                        paddingInline: "0.5rem",
                        borderRadius: "8px", 
                        border: "1px solid #ccc",
                        color: "#667085",
                     }}
                />
            )}
        </div>
    );
};

export default OpenTextSettings;
