// components/OpenTextEditor.tsx
import React from 'react';
import { Question } from '@/app/types';

interface OpenTextEditorProps {
    question: Question;
    updateQuestion: (id: string, updatedQuestion: Partial<Question>) => void;
}

const OpenTextEditor: React.FC<OpenTextEditorProps> = ({ question, updateQuestion }) => {
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateQuestion(question.id, { question: event.target.value });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '2rem' }}>
            <div
                style={{
                    width: '100%',
                    height: '5rem',
                    padding: '0.5rem',
                    fontSize: '1rem',
                    opacity: 0.5,
                }}
            >Response goes here</div>
        </div>
    );
};

export default OpenTextEditor;
