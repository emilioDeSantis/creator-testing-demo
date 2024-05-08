import React from 'react';

const PublishButton: React.FC = () => {
    return (
        <div
            style={{
                borderRadius: '1000px',
                paddingBlock: '0.8rem',
                paddingInline: '1.8rem',
                background: '#A259FF',
                color: 'white',
                fontWeight: 500,
                cursor: 'pointer',
            }}
        >
            Publish Survey
        </div>
    );
};

export default PublishButton;