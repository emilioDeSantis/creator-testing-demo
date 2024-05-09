import React from "react";

interface PublishButtonProps {
    onClick: () => void;
}

const PublishButton: React.FC<PublishButtonProps> = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                borderRadius: "1000px",
                paddingBlock: "0.8rem",
                paddingInline: "1.8rem",
                background: "#A259FF",
                color: "white",
                fontWeight: 500,
                cursor: "pointer",
            }}
        >
            Publish Survey
        </div>
    );
};

export default PublishButton;
