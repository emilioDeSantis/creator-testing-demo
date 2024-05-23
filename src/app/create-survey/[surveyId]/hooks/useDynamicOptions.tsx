import { useState, useEffect } from 'react';
import { Question } from '@/app/types';

export const useDynamicOptions = (
    question: Question,
    updateQuestion: (id: string, updatedQuestion: Partial<Question>) => void,
    allQuestions: Question[]
) => {
    const [selectedDynamicQuestion, setSelectedDynamicQuestion] = useState<Question | undefined>(undefined);

    useEffect(() => {
        if (!question.selectedDynamicOptionIds) {
            updateQuestion(question.id, { selectedDynamicOptionIds: [] });
        }

        if (allQuestions && question.dynamicOptionsId) {
            const selectedQuestion = allQuestions.find(q => q.id === question.dynamicOptionsId);
            setSelectedDynamicQuestion(selectedQuestion);
        }
    }, [question, updateQuestion, allQuestions]);

    const handleDynamicOptionsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedQuestion = allQuestions.find(q => q.id === event.target.value);
        if (selectedQuestion) {
            updateQuestion(question.id, {
                dynamicOptionsId: selectedQuestion.id,
                options: selectedQuestion.options,
                selectedDynamicOptionIds: selectedQuestion.options.map(option => option.id),
            });
        } else {
            updateQuestion(question.id, { dynamicOptionsId: '', options: [], selectedDynamicOptionIds: [] });
        }
    };

    const handleDynamicOptionToggle = (optionId: string) => {
        const selectedDynamicOptionIds = question.selectedDynamicOptionIds || [];
        const updatedSelectedDynamicOptionIds = selectedDynamicOptionIds.includes(optionId)
            ? selectedDynamicOptionIds.filter((id) => id !== optionId)
            : [...selectedDynamicOptionIds, optionId];

        updateQuestion(question.id, { selectedDynamicOptionIds: updatedSelectedDynamicOptionIds });
    };

    return {
        selectedDynamicQuestion,
        handleDynamicOptionsChange,
        handleDynamicOptionToggle,
    };
};
