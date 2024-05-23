// // import React from 'react';
// // import { Question, Option, Survey } from '@/app/types';
// // import DynamicOptions from './DynamicOptions';
// // import OptionsEditor from './OptionsEditor';
// // import { useDynamicOptions } from '../hooks/useDynamicOptions';
// // import SubQuestionsEditor from './SubQuestions';
// // import TerminationLogicEditor from './TerminationLogicEditor';

// // interface ProgressiveGridEditorProps {
// //     question: Question;
// //     updateQuestion: (id: string, updatedQuestion: Partial<Question>) => void;
// //     addOptionToQuestion: (questionId: string, option: Omit<Option, 'id'>) => void;
// //     removeOptionFromQuestion: (questionId: string, optionId: string) => void;
// //     updateOptionInQuestion: (questionId: string, optionId: string, label: string) => void;
// //     allQuestions: Question[];
// //     survey: Survey;
// // }

// // const ProgressiveGridEditor: React.FC<ProgressiveGridEditorProps> = ({
// //     question,
// //     updateQuestion,
// //     addOptionToQuestion,
// //     removeOptionFromQuestion,
// //     updateOptionInQuestion,
// //     allQuestions,
// //     survey,
// // }) => {
// //     const { selectedDynamicQuestion, handleDynamicOptionsChange, handleDynamicOptionToggle } = useDynamicOptions(
// //         question,
// //         updateQuestion,
// //         allQuestions
// //     );

// //     const updateSubQuestion = (subQuestionId: string, updatedSubQuestion: Partial<Question>) => {
// //         const updatedSubQuestions = question.subQuestions?.map((subQuestion) =>
// //             subQuestion.id === subQuestionId ? { ...subQuestion, ...updatedSubQuestion } : subQuestion
// //         );
// //         updateQuestion(question.id, { subQuestions: updatedSubQuestions });
// //     };

// //     const handleCheckboxChange = (
// //         subQuestion: Question,
// //         optionId: string,
// //         logicKey: 'terminateIfSelectedOptionIds' | 'terminateIfNotSelectedOptionIds'
// //     ) => {
// //         const oppositeLogicKey = logicKey === 'terminateIfSelectedOptionIds' ? 'terminateIfNotSelectedOptionIds' : 'terminateIfSelectedOptionIds';

// //         const updatedLogic = {
// //             ...subQuestion.logic,
// //             [logicKey]: subQuestion.logic?.[logicKey]?.includes(optionId)
// //                 ? subQuestion.logic[logicKey].filter((id) => id !== optionId)
// //                 : [...(subQuestion.logic?.[logicKey] || []), optionId],
// //             [oppositeLogicKey]: subQuestion.logic?.[oppositeLogicKey]?.filter((id) => id !== optionId) || [],
// //         };

// //         updateSubQuestion(subQuestion.id, { logic: updatedLogic });
// //     };

// //     return (
// //         <div style={{ marginTop: '1rem' }}>
// //             <DynamicOptions
// //                 question={question}
// //                 allQuestions={allQuestions}
// //                 handleDynamicOptionsChange={handleDynamicOptionsChange}
// //                 handleDynamicOptionToggle={handleDynamicOptionToggle}
// //                 survey={survey}
// //             />

// //             <SubQuestionsEditor question={question} updateQuestion={updateQuestion} />

// //             <OptionsEditor
// //                 question={question}
// //                 addOptionToQuestion={addOptionToQuestion}
// //                 updateOptionInQuestion={updateOptionInQuestion}
// //                 removeOptionFromQuestion={removeOptionFromQuestion}
// //             />

// //             {question.subQuestions && question.subQuestions.length > 0 ? (
// //                 <div style={{ marginTop: '1rem' }}>
// //                     <h4>Sub-Question Termination Logic</h4>
// //                     <div
// //                         style={{
// //                             display: 'grid',
// //                             gridTemplateColumns: `repeat(${question.subQuestions.length + 1}, auto)`,
// //                             gap: '1rem',
// //                             marginBottom: '1rem',
// //                         }}
// //                     >
// //                         <div></div>
// //                         {question.subQuestions.map((subQuestion) => (
// //                             <div key={subQuestion.id} style={{ fontWeight: 'bold' }}>
// //                                 {subQuestion.questionText}
// //                             </div>
// //                         ))}
// //                         {question.options.map((option) => (
// //                             <React.Fragment key={option.id}>
// //                                 <div style={{ fontWeight: 'bold' }}>{option.label}</div>
// //                                 {question.subQuestions.map((subQuestion) => (
// //                                     <div key={subQuestion.id}>
// //                                         <input
// //                                             type="checkbox"
// //                                             checked={subQuestion.logic?.terminateIfSelectedOptionIds?.includes(option.id) || false}
// //                                             onChange={() =>
// //                                                 handleCheckboxChange(subQuestion, option.id, 'terminateIfSelectedOptionIds')
// //                                             }
// //                                         />
// //                                         <input
// //                                             type="checkbox"
// //                                             checked={subQuestion.logic?.terminateIfNotSelectedOptionIds?.includes(option.id) || false}
// //                                             onChange={() =>
// //                                                 handleCheckboxChange(subQuestion, option.id, 'terminateIfNotSelectedOptionIds')
// //                                             }
// //                                         />
// //                                     </div>
// //                                 ))}
// //                             </React.Fragment>
// //                         ))}
// //                     </div>
// //                 </div>
// //             ) : (
// //                 // <TerminationLogicEditor
// //                 //     question={question}
// //                 //     survey={survey}
// //                 //     updateQuestion={updateQuestion}
// //                 //     allQuestions={allQuestions}
// //                 // />
// //             )}
// //         </div>
// //     );
// // };

// // export default ProgressiveGridEditor;







// export default MultipleChoiceEditor;

// import React from 'react';
// import { Option, Question, Survey } from '@/app/types';
// import { useDynamicOptions } from '../hooks/useDynamicOptions';

// interface TerminationLogicEditorProps {
//     question: Question;
//     updateQuestion: (id: string, updatedQuestion: Partial<Question>) => void;
//     isSubQuestion: boolean;
//     allQuestions: Question[];
// }

// const TerminationLogicEditor: React.FC<TerminationLogicEditorProps> = ({
//     question,
//     updateQuestion,
//     isSubQuestion,
//     allQuestions,
// }) => {
//     const { selectedDynamicQuestion } = useDynamicOptions(question, updateQuestion, allQuestions);

//     const dynamicOptions = selectedDynamicQuestion ? selectedDynamicQuestion.options : question.options;

//     const handleCheckboxChange = (optionId: string, terminateIfSelected: boolean) => {
//         const logicKey = terminateIfSelected
//             ? 'terminateIfSelectedOptionIds'
//             : 'terminateIfNotSelectedOptionIds';
//         const oppositeLogicKey = terminateIfSelected
//             ? 'terminateIfNotSelectedOptionIds'
//             : 'terminateIfSelectedOptionIds';

//         const updatedLogic = {
//             ...question.logic,
//             [logicKey]: question.logic?.[logicKey]?.includes(optionId)
//                 ? question.logic[logicKey].filter((id) => id !== optionId)
//                 : [...(question.logic?.[logicKey] || []), optionId],
//             [oppositeLogicKey]: question.logic?.[oppositeLogicKey]?.filter((id) => id !== optionId) || [],
//         };

//         updateQuestion(question.id, { logic: updatedLogic });
//     };

//     const renderCheckmarks = (terminateIfSelected: boolean) => {
//         const logicKey = terminateIfSelected
//             ? 'terminateIfSelectedOptionIds'
//             : 'terminateIfNotSelectedOptionIds';
//         return dynamicOptions.map((option) => (
//             <div key={option.id}>
//                 <label>
//                     <input
//                         type="checkbox"
//                         checked={question.logic?.[logicKey]?.includes(option.id) || false}
//                         onChange={() => handleCheckboxChange(option.id, terminateIfSelected)}
//                     />
//                     {option.label}
//                 </label>
//             </div>
//         ));
//     };

//     return (
//         <div>
//             <h4>{isSubQuestion ? 'Sub-Question' : 'Question'} Termination Logic</h4>
//             <div>
//                 <h5>Terminate If Selected</h5>
//                 {renderCheckmarks(true)}
//             </div>
//             <div>
//                 <h5>Terminate If Not Selected</h5>
//                 {renderCheckmarks(false)}
//             </div>
//         </div>
//     );
// };

// export default TerminationLogicEditor;





// import React from 'react';
// import { Question, Option, Survey } from '@/app/types';
// import DynamicOptions from './DynamicOptions';
// import OptionsEditor from './OptionsEditor';
// import { useDynamicOptions } from '../hooks/useDynamicOptions';
// import SubQuestionsEditor from './SubQuestions';
// import TerminationLogicEditor from './TerminationLogicEditor';

// interface ProgressiveGridEditorProps {
//     question: Question;
//     updateQuestion: (id: string, updatedQuestion: Partial<Question>) => void;
//     addOptionToQuestion: (questionId: string, option: Omit<Option, 'id'>) => void;
//     removeOptionFromQuestion: (questionId: string, optionId: string) => void;
//     updateOptionInQuestion: (questionId: string, optionId: string, label: string) => void;
//     allQuestions: Question[];
//     survey: Survey;
// }

// const ProgressiveGridEditor: React.FC<ProgressiveGridEditorProps> = ({
//     question,
//     updateQuestion,
//     addOptionToQuestion,
//     removeOptionFromQuestion,
//     updateOptionInQuestion,
//     allQuestions,
//     survey,
// }) => {
//     const {handleDynamicOptionsChange, handleDynamicOptionToggle } = useDynamicOptions(
//         question,
//         updateQuestion,
//         allQuestions
//     );

//     const updateSubQuestion = (subQuestionId: string, updatedSubQuestion: Partial<Question>) => {
//         const updatedSubQuestions = question.subQuestions?.map((subQuestion) =>
//             subQuestion.id === subQuestionId ? { ...subQuestion, ...updatedSubQuestion } : subQuestion
//         );
//         updateQuestion(question.id, { subQuestions: updatedSubQuestions });
//     };

//     return (
//         <div style={{ marginTop: '1rem' }}>
//             <DynamicOptions
//                 question={question}
//                 allQuestions={allQuestions}
//                 handleDynamicOptionsChange={handleDynamicOptionsChange}
//                 handleDynamicOptionToggle={handleDynamicOptionToggle}
//                 survey={survey}
//             />

//             <SubQuestionsEditor question={question} updateQuestion={updateQuestion} />

//             <OptionsEditor
//                 question={question}
//                 addOptionToQuestion={addOptionToQuestion}
//                 updateOptionInQuestion={updateOptionInQuestion}
//                 removeOptionFromQuestion={removeOptionFromQuestion}
//             />

//             {question.subQuestions && question.subQuestions.length > 0 ? (
//                 <div style={{ marginTop: '1rem' }}>
//                     <h4>Sub-Question Termination Logic</h4>
//                     <div
//                         style={{
//                             display: 'grid',
//                             gridTemplateColumns: `repeat(${question.subQuestions.length + 1}, auto)`,
//                             gap: '1rem',
//                             marginBottom: '1rem',
//                         }}
//                     >
//                         <div></div>
//                         {question.subQuestions.map((subQuestion) => (
//                             <div key={subQuestion.id} style={{ fontWeight: 'bold' }}>
//                                 {subQuestion.questionText}
//                             </div>
//                         ))}
//                         {question.options.map((option) => (
//                             <React.Fragment key={option.id}>
//                                 <div style={{ fontWeight: 'bold' }}>{option.label}</div>
//                                 {question.subQuestions.map((subQuestion) => (
//                                     <div key={subQuestion.id}>
//                                         <input
//                                             type="checkbox"
//                                             checked={subQuestion.logic?.terminateIfSelectedOptionIds?.includes(option.id) || false}
//                                             onChange={() =>
//                                                 handleCheckboxChange(subQuestion, option.id, 'terminateIfSelectedOptionIds')
//                                             }
//                                         />
//                                         <input
//                                             type="checkbox"
//                                             checked={subQuestion.logic?.terminateIfNotSelectedOptionIds?.includes(option.id) || false}
//                                             onChange={() =>
//                                                 handleCheckboxChange(subQuestion, option.id, 'terminateIfNotSelectedOptionIds')
//                                             }
//                                         />
//                                     </div>
//                                 ))}
//                             </React.Fragment>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 <TerminationLogicEditor
//                     question={question}
//                     updateQuestion={updateQuestion}
//                     isSubQuestion={false}
//                 />
//             )}
//         </div>
//     );

//     function handleCheckboxChange(
//         subQuestion: Question,
//         optionId: string,
//         logicKey: 'terminateIfSelectedOptionIds' | 'terminateIfNotSelectedOptionIds'
//     ) {
//         const oppositeLogicKey = logicKey === 'terminateIfSelectedOptionIds' ? 'terminateIfNotSelectedOptionIds' : 'terminateIfSelectedOptionIds';

//         const updatedLogic = {
//             ...subQuestion.logic,
//             [logicKey]: subQuestion.logic?.[logicKey]?.includes(optionId)
//                 ? subQuestion.logic[logicKey].filter((id) => id !== optionId)
//                 : [...(subQuestion.logic?.[logicKey] || []), optionId],
//             [oppositeLogicKey]: subQuestion.logic?.[oppositeLogicKey]?.filter((id) => id !== optionId) || [],
//         };

//         updateSubQuestion(subQuestion.id, { logic: updatedLogic });
//     }
// };

// export default ProgressiveGridEditor;
