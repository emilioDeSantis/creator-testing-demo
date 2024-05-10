import React from "react";

interface PublishButtonProps {
    onClick: () => void;
}

const PublishButton: React.FC<PublishButtonProps> = ({ onClick }) => {
    const [publishing, setPublishing] = React.useState(false);

    const handleClick = () => {
        setPublishing(true);
        onClick();
    }
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
                opacity: publishing ? 0.5 : 1,
            }}
        >
            {publishing ? "Publishing..." : "Publish Survey"}
        </div>
    );
};

export default PublishButton;
