// components/OpinionScaleEditor.tsx
import React from 'react';
import { Question, Parameters } from '@/app/types';

interface OpinionScaleEditorProps {
    question: Question;
}

const OpinionScaleEditor: React.FC<OpinionScaleEditorProps> = ({ question }) => {


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "1rem" }}>
                {Array.from({ length: 11 }, (_, i) => (
                    <div
                        key={i}
                        style={{
                            width: "2rem",
                            height: "2rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            margin: "0 0.2rem"
                        }}
                    >
                        {i}
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {question.parameters.minimumRatingValue}
                </label>
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {question.parameters.middleRatingValue}
                </label>
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {question.parameters.maximumRatingValue}
                </label>
            </div>
        </div>
    );
};

export default OpinionScaleEditor;
