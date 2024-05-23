// SubQuestionsEditor.tsx
import React from 'react';
import { Question } from '@/app/types';
import { v4 as uuidv4 } from 'uuid';

interface SubQuestionsEditorProps {
    question: Question;
    updateQuestion: (id: string, updatedQuestion: Partial<Question>) => void;
}

const SubQuestionsEditor: React.FC<SubQuestionsEditorProps> = ({ question, updateQuestion }) => {
    const handleSubQuestionTextChange = (index: number, text: string) => {
        const updatedSubQuestions = question.subQuestions ? [...question.subQuestions] : [];
        updatedSubQuestions[index] = { ...updatedSubQuestions[index], questionText: text };
        updateQuestion(question.id, { subQuestions: updatedSubQuestions });
    };

    const handleAddSubQuestion = () => {
        const newSubQuestion: Question = {
            id: uuidv4(),
            questionText: '',
            type: question.type,
            options: [],
        };
        updateQuestion(question.id, {
            subQuestions: [...(question.subQuestions || []), newSubQuestion],
        });
    };

    const handleRemoveSubQuestion = (index: number) => {
        const updatedSubQuestions = question.subQuestions
            ? question.subQuestions.filter((_, i) => i !== index)
            : [];
        updateQuestion(question.id, { subQuestions: updatedSubQuestions });
    };

    return (
        <div>
            <h4>Sub-Questions</h4>
            {question.subQuestions &&
                question.subQuestions.map((subQuestion, index) => (
                    <div key={subQuestion.id} style={{ marginBottom: '0.5rem' }}>
                        <input
                            type='text'
                            placeholder='Sub-question text'
                            value={subQuestion.questionText}
                            onChange={e => handleSubQuestionTextChange(index, e.target.value)}
                        />
                        <button onClick={() => handleRemoveSubQuestion(index)}>Remove</button>
                    </div>
                ))}
            <button onClick={handleAddSubQuestion}>Add Sub-Question</button>
        </div>
    );
};

export default SubQuestionsEditor;
