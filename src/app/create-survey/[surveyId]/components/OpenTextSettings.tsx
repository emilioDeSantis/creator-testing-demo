// components/OpenTextSettings.tsx
import React from 'react';
import { Parameters } from '@/app/types';

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

    const handleParameterChange = (parameter: keyof Parameters, event: React.ChangeEvent<HTMLInputElement>) => {
        updateParameterValue(parameter, parseInt(event.target.value, 10));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label>
                <input
                    type="checkbox"
                    checked={parameters.mininmumCharacters}
                    onChange={() => handleToggleParameter("mininmumCharacters")}
                />
                Minimum Characters
                {parameters.mininmumCharacters && (
                    <input
                        type="number"
                        value={parameters.minimumCharactersValue}
                        onChange={(event) => handleParameterChange("minimumCharactersValue", event)}
                        style={{ marginLeft: "1rem" }}
                    />
                )}
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={parameters.maximumCharacters}
                    onChange={() => handleToggleParameter("maximumCharacters")}
                />
                Maximum Characters
                {parameters.maximumCharacters && (
                    <input
                        type="number"
                        value={parameters.maximumCharactersValue}
                        onChange={(event) => handleParameterChange("maximumCharactersValue", event)}
                        style={{ marginLeft: "1rem" }}
                    />
                )}
            </label>
        </div>
    );
};

export default OpenTextSettings;
