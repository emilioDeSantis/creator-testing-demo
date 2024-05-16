import React from "react";

interface HeavyHitterButtonProps {
    text: string;
    onClick: () => void;
    isProcessing?: boolean;
}

const HeavyHitterButton: React.FC<HeavyHitterButtonProps> = ({ text, onClick, isProcessing = false }) => {
    const handleClick = () => {
        onClick();
    };

    return (
        <div
            onClick={handleClick}
            style={{
                borderRadius: "1000px",
                paddingBlock: "0.8rem",
                paddingInline: "1.8rem",
                background: "#A259FF",
                color: "white",
                fontWeight: 500,
                cursor: "pointer",
                opacity: isProcessing ? 0.5 : 1,
            }}
        >
            {isProcessing ? "Processing..." : text}
        </div>
    );
};

export default HeavyHitterButton;