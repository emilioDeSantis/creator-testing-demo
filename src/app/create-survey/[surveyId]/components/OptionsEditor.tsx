// OptionsEditor.tsx
import React, { useRef, useEffect } from 'react';
import { Option, Question } from '@/app/types';

interface OptionsEditorProps {
    question: Question;
    addOptionToQuestion: (questionId: string, option: Omit<Option, 'id'>) => void;
    updateOptionInQuestion: (questionId: string, optionId: string, label: string) => void;
    removeOptionFromQuestion: (questionId: string, optionId: string) => void;
}

const OptionsEditor: React.FC<OptionsEditorProps> = ({
    question,
    addOptionToQuestion,
    updateOptionInQuestion,
    removeOptionFromQuestion,
}) => {
    const optionRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        optionRefs.current = optionRefs.current.slice(0, question.options.length);
    }, [question.options]);

    const handleOptionChange = (optionIndex: number, label: string) => {
        const option = question.options[optionIndex];
        updateOptionInQuestion(question.id, option.id, label);
    };

    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, optionIndex: number) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (optionIndex + 1 < question.options.length) {
                optionRefs.current[optionIndex + 1]?.focus();
            } else {
                addOptionToQuestion(question.id, { label: '' });
                setTimeout(() => {
                    optionRefs.current[question.options.length]?.focus();
                }, 0);
            }
        } else if (event.key === 'ArrowUp' && optionIndex > 0) {
            event.preventDefault();
            optionRefs.current[optionIndex - 1]?.focus();
        } else if (event.key === 'ArrowDown' && optionIndex + 1 < question.options.length) {
            event.preventDefault();
            optionRefs.current[optionIndex + 1]?.focus();
        }
    };

    return (
        <div>
            <h4>Options</h4>
            {question.options.map((option, optionIndex) => (
                <div key={option.id} style={{ display: 'flex', marginLeft: '1rem', marginBottom: '0.5rem' }}>
                    <div
                        style={{
                            height: '1rem',
                            width: '1rem',
                            borderRadius: '100%',
                            border: '1px solid black',
                            opacity: option.label === '' ? 0.6 : 1,
                        }}
                    />
                    <input
                        ref={el => {
                            optionRefs.current[optionIndex] = el;
                        }}
                        style={{
                            marginLeft: '0.6rem',
                            opacity: option.label === '' ? 0.6 : 1,
                            fontSize: '0.9rem',
                        }}
                        type='text'
                        placeholder='Type option label'
                        value={option.label}
                        onChange={event => handleOptionChange(optionIndex, event.target.value)}
                        onKeyDown={event => handleInputKeyPress(event, optionIndex)}
                    />
                    <button onClick={() => removeOptionFromQuestion(question.id, option.id)}>Remove</button>
                </div>
            ))}
            {question.parameters?.otherOption && (
                <div style={{ display: 'flex', marginLeft: '1rem' }}>
                    <div
                        style={{
                            height: '1rem',
                            width: '1rem',
                            borderRadius: '100%',
                            border: '1px solid black',
                            opacity: 0.8,
                        }}
                    />
                    <div style={{ marginLeft: '0.6rem', opacity: 0.8, fontSize: '0.9rem' }}>Other</div>
                </div>
            )}
            <button
                className='add-option-button'
                style={{
                    cursor: 'pointer',
                    background: 'transparent',
                    textDecoration: 'underline',
                    border: 'none',
                    display: 'flex',
                    paddingBlock: '0.6rem',
                    paddingInline: '1rem',
                    fontSize: '0.9rem',
                }}
                onClick={() => addOptionToQuestion(question.id, { label: '' })}
            >
                + Additional option
            </button>
        </div>
    );
};

export default OptionsEditor;
