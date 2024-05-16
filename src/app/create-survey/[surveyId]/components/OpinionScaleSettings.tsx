// components/OpinionScaleSettings.tsx
import React from 'react';
import { Parameters } from '@/app/types';

interface OpinionScaleSettingsProps {
    parameters: Parameters;
    updateParameterValue: (parameter: keyof Parameters, value: string) => void;
}

const OpinionScaleSettings: React.FC<OpinionScaleSettingsProps> = ({
    parameters,
    updateParameterValue,
}) => {
    const handleLabelChange = (parameter: keyof Parameters, event: React.ChangeEvent<HTMLInputElement>) => {
        updateParameterValue(parameter, event.target.value);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
                <label style={{ marginBottom: "0.5rem" }}>
                    Minimum Label
                    <input
                        type="text"
                        value={parameters.minimumRatingValue || ""}
                        onChange={(event) => handleLabelChange("minimumRatingValue", event)}
                        style={{ marginLeft: "1rem" }}
                    />
                </label>
                <label style={{ marginBottom: "0.5rem" }}>
                    Middle Label
                    <input
                        type="text"
                        value={parameters.middleRatingValue || ""}
                        onChange={(event) => handleLabelChange("middleRatingValue", event)}
                        style={{ marginLeft: "1rem" }}
                    />
                </label>
                <label style={{ marginBottom: "0.5rem" }}>
                    Maximum Label
                    <input
                        type="text"
                        value={parameters.maximumRatingValue || ""}
                        onChange={(event) => handleLabelChange("maximumRatingValue", event)}
                        style={{ marginLeft: "1rem" }}
                    />
                </label>
            </div>
        </div>
    );
};

export default OpinionScaleSettings;
