// DynamicOptions.tsx
import React, { use, useEffect } from 'react';
import { Option, Question, Survey } from '@/app/types';

interface DynamicOptionsProps {
    question: Question;
    allQuestions: Question[];
    handleDynamicOptionsChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleDynamicOptionToggle: (optionId: string) => void;
    survey: Survey;
}

const DynamicOptions: React.FC<DynamicOptionsProps> = ({
    question,
    allQuestions,
    handleDynamicOptionsChange,
    handleDynamicOptionToggle,
    survey,
}) => {
    const findQuestionById = (id: string): Question | undefined => {
        for (const q of survey.questions) {
            if (q.id === id) {
                return q;
            }
            if (q.subQuestions) {
                for (const subQ of q.subQuestions) {
                    if (subQ.id === id) {
                        return q;
                    }
                }
            }
        }
        return undefined;
    };

    const selectedDynamicQuestion = findQuestionById(question.dynamicOptionsId || '');

    useEffect(() => {
        console.log("DynamicOptions Component - Selected Dynamic Question:", selectedDynamicQuestion);
    }, [selectedDynamicQuestion]);

    useEffect(() => {
        console.log("DynamicOptions Component - Question:", question);
    }   , [question]);

    return (
        <div>
            <select
                value={question.dynamicOptionsId || ''}
                onChange={handleDynamicOptionsChange}
                style={{ marginBottom: '1rem' }}
            >
                <option value="">Select a question for dynamic options</option>
                {allQuestions
                    .filter(q => q.id !== question.id)
                    .map(q => (
                        <option key={q.id} value={q.id}>
                            {q.questionText || `Question ${q.id}`}
                        </option>
                    ))}
            </select>

            {selectedDynamicQuestion && (
                <div>
                    <h4>Dynamic Options</h4>
                    <ul>
                        {selectedDynamicQuestion.options.map(option => (
                            <li key={option.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={question.selectedDynamicOptionIds?.includes(option.id) || false}
                                        onChange={() => handleDynamicOptionToggle(option.id)}
                                    />
                                    {option.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DynamicOptions;
