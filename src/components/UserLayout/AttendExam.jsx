// // import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// // import AOS from "aos";
// // import "aos/dist/aos.css";

// // export default function AttendExam() {
// //   const [exams, setExams] = useState([]);
// //   const [selectedExam, setSelectedExam] = useState(null);
// //   const [answers, setAnswers] = useState({});
// //   const [submitted, setSubmitted] = useState(false);
// //   const [result, setResult] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //   const [fillHeight, setFillHeight] = useState(0);
// //   const fillRef = useRef(null);

// //   const studentId = localStorage.getItem("userId");

// //   // Initialize AOS
// //   useEffect(() => {
// //     AOS.init({
// //       duration: 1000,
// //       once: true,
// //     });
// //   }, []);

// //   // Animate the fill height when result is available
// //   useEffect(() => {
// //     if (result && fillRef.current) {
// //       // Reset fill height to 0
// //       setFillHeight(0);
      
// //       // Animate to the actual percentage after a small delay
// //       setTimeout(() => {
// //         setFillHeight(result.percentage);
// //       }, 100);
// //     }
// //   }, [result]);

// //   // Fetch all exams on load
// //   useEffect(() => {
// //     async function fetchExams() {
// //       try {
// //         setIsLoading(true);
// //         const res = await axios.get("https://ligand-software-solutions-63g6.onrender.com/api/exams");
// //         setExams(res.data);
// //       } catch (err) {
// //         console.error(err);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     }
// //     fetchExams();
// //   }, []);

// //   // Select an exam to attend
// //   const startExam = (exam) => {
// //     setSelectedExam(exam);
// //     setAnswers({});
// //     setSubmitted(false);
// //     setResult(null);
// //     setCurrentQuestionIndex(0);
// //     setFillHeight(0);
// //   };

// //   // Handle answer selection
// //   const handleAnswerChange = (qId, optionIndex) => {
// //     setAnswers({ ...answers, [qId]: optionIndex });
// //   };

// //   // Navigate to a specific question
// //   const goToQuestion = (index) => {
// //     setCurrentQuestionIndex(index);
// //   };

// //   // Navigate to previous question
// //   const goToPrevious = () => {
// //     if (currentQuestionIndex > 0) {
// //       setCurrentQuestionIndex(currentQuestionIndex - 1);
// //     }
// //   };

// //   // Navigate to next question
// //   const goToNext = () => {
// //     if (currentQuestionIndex < selectedExam.questions.length - 1) {
// //       setCurrentQuestionIndex(currentQuestionIndex + 1);
// //     }
// //   };

// //   // Submit exam
// //   const handleSubmit = async () => {
// //     try {
// //       setIsLoading(true);
// //       const payload = {
// //         examId: selectedExam._id,
// //         studentId: studentId,
// //         answers: selectedExam.questions.map((q) => ({
// //           questionId: q._id,
// //           chosenAnswer:
// //             answers[q._id] !== undefined ? q.options[answers[q._id]] : null,
// //         })),
// //       };

// //       const res = await axios.post(
// //         "https://ligand-software-solutions-63g6.onrender.com/api/attempts/submit",
// //         payload
// //       );

// //       setResult(res.data.attempt);
// //       setSubmitted(true);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error submitting exam!");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Back to exam list
// //   const backToList = () => {
// //     setSelectedExam(null);
// //     setSubmitted(false);
// //     setResult(null);
// //     setCurrentQuestionIndex(0);
// //     setFillHeight(0);
// //   };

// //   // ------------------ UI ------------------
// //   if (!selectedExam) {
// //     return (
// //       <div className="exam-container">
// //         <div className="exam-card">
// //           <div className="exam-header">
// //             <h2>📝 Available Exams</h2>
// //             <p>Select an exam to begin your test</p>
// //           </div>

// //           {isLoading ? (
// //             <div className="loading">Loading exams... ⏳</div>
// //           ) : exams.length === 0 ? (
// //             <p className="no-exams">No exams available at the moment</p>
// //           ) : (
// //             <div className="exams-grid">
// //               {exams.map((exam) => (
// //                 <div key={exam._id} className="exam-item" data-aos="fade-right">
// //                   <div className="exam-icon">📊</div>
// //                   <h3>{exam.examTitle || `Exam #${exam.examNumber}`}</h3>
// //                   <div className="exam-details">
// //                     <p>
// //                       <span>🔢 Exam Number:</span> {exam.examNumber}
// //                     </p>
// //                     <p>
// //                       <span>👁️ Visibility:</span> {exam.visibility}
// //                     </p>
// //                     <p>
// //                       <span>❓ Questions:</span> {exam.questions.length}
// //                     </p>
// //                   </div>
// //                   <button
// //                     className="primary-btn"
// //                     onClick={() => startExam(exam)}
// //                   >
// //                     Start Exam 🚀
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         <style jsx>{`
// //           .exam-container {
// //             display: flex;
// //             justify-content: center;
// //             align-items: flex-start;
// //             min-height: 100vh;
// //             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //             padding: 20px;
// //             font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
// //           }

// //           .exam-card {
// //             background: white;
// //             border-radius: 16px;
// //             box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
// //             padding: 30px;
// //             width: 100%;
// //             max-width: 1200px;
// //           }

// //           .exam-header {
// //             text-align: center;
// //             margin-bottom: 30px;
// //           }

// //           .exam-header h2 {
// //             color: #2c3e50;
// //             margin-bottom: 10px;
// //             font-weight: 700;
// //             font-size: 28px;
// //           }

// //           .exam-header p {
// //             color: #666;
// //             font-size: 16px;
// //           }

// //           .loading,
// //           .no-exams {
// //             text-align: center;
// //             padding: 20px;
// //             color: #666;
// //             font-size: 18px;
// //           }

// //           .exams-grid {
// //             display: grid;
// //             grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
// //             gap: 20px;
// //           }

// //           .exam-item {
// //             background: #f8f9fa;
// //             border-radius: 12px;
// //             padding: 20px;
// //             text-align: center;
// //             transition: transform 0.3s ease;
// //             border: 1px solid #e9ecef;
// //           }

// //           .exam-item:hover {
// //             transform: translateY(-5px);
// //             box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
// //           }

// //           .exam-icon {
// //             font-size: 40px;
// //             margin-bottom: 15px;
// //           }

// //           .exam-item h3 {
// //             color: #2c3e50;
// //             margin-bottom: 15px;
// //             font-size: 20px;
// //           }

// //           .exam-details {
// //             margin-bottom: 20px;
// //             text-align: left;
// //           }

// //           .exam-details p {
// //             margin: 8px 0;
// //             color: #555;
// //           }

// //           .exam-details span {
// //             font-weight: 600;
// //             color: #333;
// //           }

// //           .primary-btn {
// //             padding: 12px 20px;
// //             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //             color: white;
// //             border: none;
// //             border-radius: 8px;
// //             font-size: 16px;
// //             font-weight: 600;
// //             cursor: pointer;
// //             transition: all 0.3s ease;
// //             width: 100%;
// //           }

// //           .primary-btn:hover {
// //             transform: translateY(-2px);
// //             box-shadow: 0 7px 14px rgba(102, 126, 234, 0.4);
// //           }

// //           @media (max-width: 768px) {
// //             .exams-grid {
// //               grid-template-columns: 1fr;
// //             }

// //             .exam-card {
// //               padding: 20px;
// //             }
// //           }
// //         `}</style>
// //       </div>
// //     );
// //   }

// //   if (submitted && result) {
// //     return (
// //       <div className="result-container">
// //         <div className="result-card">
// //           <div className="result-header">
// //             <h2>📊 Exam Results</h2>
// //             <p>Here's how you performed on the exam</p>
// //           </div>

// //           <div className="score-summary">
// //             <div className="score-circle">
// //               <div 
// //                 ref={fillRef}
// //                 className="score-fill"
// //                 style={{ height: `${fillHeight}%` }}
// //               ></div>
// //               <div className="score-content">
// //                 <h2 style={{color:"white",textShadow:"0 0 10px rgba(114, 111, 111, 1)"}}> {result.percentage.toFixed(2)}%</h2>
// //                 {/* <p style={{color:"white", margin: 0,textShadow:"0 0 10px rgba(114, 111, 111, 1)"}}>
// //                   {result.score}/{result.totalQuestions}
// //                 </p> */}
// //               </div>
// //             </div>
// //             <p className="score-text">
// //               {result.percentage >= 80
// //                 ? "Excellent job! 🎉"
// //                 : result.percentage >= 60
// //                 ? "Good effort! 👍"
// //                 : "Keep practicing! 💪"}
// //             </p>
// //           </div>

// //           <div className="answers-review">
// //             <h3>📋 Answers Review</h3>
// //             <div className="answers-list">
// //               <div className="custom-box">
// //                 <p>
// //                   Total Questions: <b>{result.totalQuestions}</b>{" "}
// //                 </p>
// //                 <p>
// //                   Correct Answer: <b>{result.score}</b>{" "}
// //                 </p>
// //               </div>
// //               {result.answers.map((a, idx) => {
// //                 const q = selectedExam.questions.find(
// //                   (q) => q._id === a.questionId
// //                 );
// //                 return (
// //                   <div key={idx} className="answer-item" data-aos="fade-up">
// //                     <p className="question-text">
// //                       <b>
// //                         Q{idx + 1}. {q?.questionText}
// //                       </b>
// //                     </p>
// //                     <div className="answer-details">
// //                       <div
// //                         className={`answer-row ${
// //                           a.isCorrect ? "correct" : "incorrect"
// //                         }`}
// //                       >
// //                         <span>Your Answer: </span>
// //                         {a.chosenAnswer || "Not answered"}
// //                         {a.isCorrect ? " ✅" : " ❌"}
// //                       </div>
// //                       {!a.isCorrect && (
// //                         <div className="answer-row correct">
// //                           <span>Correct Answer: </span>
// //                           {a.correctAnswer} ✅
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>

// //           <button className="primary-btn" onClick={backToList}>
// //             Back to Exams ↩️
// //           </button>
// //         </div>

// //         <style jsx>{`
// //           .result-container {
// //             display: flex;
// //             justify-content: center;
// //             align-items: flex-start;
// //             min-height: 100vh;
// //             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //             padding: 20px;
// //             font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
// //           }

// //           .result-card {
// //             background: white;
// //             border-radius: 16px;
// //             box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
// //             padding: 30px;
// //             width: 100%;
// //             max-width: 800px;
// //           }

// //           .result-header {
// //             text-align: center;
// //             margin-bottom: 30px;
// //           }

// //           .result-header h2 {
// //             color: #2c3e50;
// //             margin-bottom: 10px;
// //             font-weight: 700;
// //             font-size: 28px;
// //           }
// //           .custom-box {
// //             display: flex;
// //             justify-content: space-around;
// //             align-items: center;
// //             padding: 30px;
// //             background: #f8f9fa;
// //             margin: 15px;
// //             border-radius: 10px;
// //           }
// //           .result-header p {
// //             color: #666;
// //             font-size: 16px;
// //           }

// //           .score-summary {
// //             text-align: center;
// //             margin-bottom: 30px;
// //             padding: 20px;
// //             background: #f8f9fa;
// //             border-radius: 12px;
// //           }

// //           .score-circle {
// //             width: 150px;
// //             height: 150px;
// //             border-radius: 50%;
// //             background: #e0e0e0;
// //             margin: 0 auto 15px;
// //             position: relative;
// //             overflow: hidden;
// //             box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
// //           }

// //           .score-fill {
// //             position: absolute;
// //             bottom: 0;
// //             left: 0;
// //             width: 100%;
// //             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //             transition: height 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
// //             z-index: 1;
// //           }

// //           .score-content {
// //             position: absolute;
// //             top: 0;
// //             left: 0;
// //             width: 100%;
// //             height: 100%;
// //             display: flex;
// //             flex-direction: column;
// //             justify-content: center;
// //             align-items: center;
// //             z-index: 2;
// //           }

// //           .score-content h2 {
// //             font-size: 32px;
// //             margin: 0 0 5px 0;
// //             font-weight: 700;
// //           }

// //           .score-content p {
// //             font-size: 16px;
// //             margin: 0;
// //             opacity: 0.9;
// //           }

// //           .score-text {
// //             font-size: 18px;
// //             font-weight: 600;
// //             color: #2c3e50;
// //           }

// //           .answers-review {
// //             margin-bottom: 30px;
// //           }

// //           .answers-review h3 {
// //             color: #2c3e50;
// //             margin-bottom: 20px;
// //             font-size: 22px;
// //           }

// //           .answers-list {
// //             max-height: 400px;
// //             overflow-y: auto;
// //           }

// //           .answer-item {
// //             padding: 15px;
// //             border: 1px solid #e9ecef;
// //             border-radius: 8px;
// //             margin-bottom: 15px;
// //             background: #f8f9fa;
// //           }

// //           .question-text {
// //             margin-top: 0;
// //             color: #2c3e50;
// //           }

// //           .answer-details {
// //             margin-top: 10px;
// //           }

// //           .answer-row {
// //             padding: 8px;
// //             border-radius: 6px;
// //             margin-bottom: 8px;
// //           }

// //           .answer-row.correct {
// //             background: #d4edda;
// //             color: #155724;
// //           }

// //           .answer-row.incorrect {
// //             background: #f8d7da;
// //             color: #721c24;
// //           }

// //           .answer-row span {
// //             font-weight: 600;
// //           }

// //           .primary-btn {
// //             padding: 12px 20px;
// //             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //             color: white;
// //             border: none;
// //             border-radius: 8px;
// //             font-size: 16px;
// //             font-weight: 600;
// //             cursor: pointer;
// //             transition: all 0.3s ease;
// //             display: block;
// //             margin: 0 auto;
// //           }

// //           .primary-btn:hover {
// //             transform: translateY(-2px);
// //             box-shadow: 0 7px 14px rgba(102, 126, 234, 0.4);
// //           }

// //           @keyframes fillAnimation {
// //             from {
// //               height: 0%;
// //             }
// //             to {
// //               height: var(--fill-height);
// //             }
// //           }
// //         `}</style>
// //       </div>
// //     );
// //   }

// //   const currentQuestion = selectedExam.questions[currentQuestionIndex];

// //   return (
// //     <div className="exam-taking-container" data-aos="fade-up">
// //       <div className="exam-taking-card">
// //         <div className="exam-taking-header">
// //           <h2>
// //             📝 {selectedExam.examTitle || `Exam #${selectedExam.examNumber}`}
// //           </h2>
// //           <p>
// //             Question {currentQuestionIndex + 1} of{" "}
// //             {selectedExam.questions.length}
// //           </p>
// //         </div>

// //         <div className="exam-content">
          

// //           {/* Question Panel */}
// //           <div className="question-panel">
// //             <div className="question-card">
// //               <p className="question-text">
// //                 <b>
// //                   Q{currentQuestionIndex + 1}. {currentQuestion.questionText}
// //                 </b>
// //               </p>
// //               <div className="options-list">
// //                 {currentQuestion.options.map((opt, optIndex) => (
// //                   <div key={optIndex} className="option-item">
// //                     <input
// //                       type="radio"
// //                       id={`${currentQuestion._id}-${optIndex}`}
// //                       name={currentQuestion._id}
// //                       value={optIndex}
// //                       checked={answers[currentQuestion._id] === optIndex}
// //                       onChange={() =>
// //                         handleAnswerChange(currentQuestion._id, optIndex)
// //                       }
// //                       className="option-input"
// //                     />
// //                     <label
// //                       htmlFor={`${currentQuestion._id}-${optIndex}`}
// //                       className="option-label"
// //                     >
// //                       {opt}
// //                     </label>
// //                   </div>
// //                 ))}
// //               </div>

// //               <div className="navigation-buttons">
// //                 <button
// //                   className="nav-btn prev-btn"
// //                   onClick={goToPrevious}
// //                   disabled={currentQuestionIndex === 0}
// //                 >
// //                   ← Previous
// //                 </button>
// //                 <button
// //                   className="nav-btn next-btn"
// //                   onClick={goToNext}
// //                   disabled={
// //                     currentQuestionIndex === selectedExam.questions.length - 1
// //                   }
// //                 >
// //                   Next →
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Question Navigation Panel */}
// //           <div className="navigation-panel">
// //             <h3>Questions</h3>
// //             <div className="question-grid">
// //               {selectedExam.questions.map((_, index) => (
// //                 <button
// //                   key={index}
// //                   className={`question-number ${
// //                     currentQuestionIndex === index ? "active" : ""
// //                   } ${
// //                     answers[selectedExam.questions[index]._id] !== undefined
// //                       ? "answered"
// //                       : ""
// //                   }`}
// //                   onClick={() => goToQuestion(index)}
// //                 >
// //                   {index + 1}
// //                 </button>
// //               ))}
// //             </div>

// //             <div className="progress-section">
// //               <div className="progress-text">
// //                 Answered: {Object.keys(answers).length}/
// //                 {selectedExam.questions.length}
// //               </div>
// //               <div className="progress-bar">
// //                 <div
// //                   className="progress-fill"
// //                   style={{
// //                     width: `${
// //                       (Object.keys(answers).length /
// //                         selectedExam.questions.length) *
// //                       100
// //                     }%`,
// //                   }}
// //                 ></div>
// //               </div>
// //             </div>

// //             <button
// //               className="submit-exam-btn"
// //               onClick={handleSubmit}
// //               disabled={isLoading}
// //             >
// //               {isLoading ? "Submitting... ⏳" : "Submit Exam ✅"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         .exam-taking-container {
// //           display: flex;
// //           justify-content: center;
// //           align-items: flex-start;
// //           min-height: 100vh;
// //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //           padding: 20px;
// //           font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
// //         }

// //         .exam-taking-card {
// //           background: white;
// //           border-radius: 16px;
// //           box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
// //           padding: 30px;
// //           width: 100%;
// //           max-width: 1000px;
// //         }

// //         .exam-taking-header {
// //           text-align: center;
// //           margin-bottom: 30px;
// //           padding-bottom: 20px;
// //           border-bottom: 1px solid #e9ecef;
// //         }

// //         .exam-taking-header h2 {
// //           color: #2c3e50;
// //           margin-bottom: 10px;
// //           font-weight: 700;
// //           font-size: 28px;
// //         }

// //         .exam-taking-header p {
// //           color: #666;
// //           font-size: 16px;
// //           font-weight: 600;
// //         }

// //         .exam-content {
// //           display: flex;
// //           gap: 30px;
// //         }

// //         .navigation-panel {
// //           flex: 1;
// //           background: #f8f9fa;
// //           border-radius: 12px;
// //           padding: 20px;
// //           height: fit-content;
// //         }

// //         .navigation-panel h3 {
// //           color: #2c3e50;
// //           margin-bottom: 15px;
// //           text-align: center;
// //         }

// //         .question-grid {
// //           display: grid;
// //           grid-template-columns: repeat(5, 1fr);
// //           gap: 10px;
// //           margin-bottom: 20px;
// //         }

// //         .question-number {
// //           width: 40px;
// //           height: 40px;
// //           border: 2px solid #667eea;
// //           border-radius: 8px;
// //           background: white;
// //           color: #667eea;
// //           font-weight: 600;
// //           cursor: pointer;
// //           transition: all 0.3s ease;
// //         }

// //         .question-number:hover {
// //           background: #667eea;
// //           color: white;
// //         }

// //         .question-number.active {
// //           background: #667eea;
// //           color: white;
// //           transform: scale(1.1);
// //         }

// //         .question-number.answered {
// //           background: #4caf50;
// //           border-color: #4caf50;
// //           color: white;
// //         }

// //         .progress-section {
// //           margin-bottom: 20px;
// //         }

// //         .progress-text {
// //           text-align: center;
// //           margin-bottom: 8px;
// //           font-weight: 600;
// //           color: #2c3e50;
// //         }

// //         .progress-bar {
// //           width: 100%;
// //           height: 10px;
// //           background: #e9ecef;
// //           border-radius: 5px;
// //           overflow: hidden;
// //         }

// //         .progress-fill {
// //           height: 100%;
// //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //           border-radius: 5px;
// //           transition: width 0.3s ease;
// //         }

// //         .submit-exam-btn {
// //           padding: 12px;
// //           background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
// //           color: white;
// //           border: none;
// //           border-radius: 8px;
// //           font-size: 16px;
// //           font-weight: 600;
// //           cursor: pointer;
// //           transition: all 0.3s ease;
// //           width: 100%;
// //           animation: pulse 2s infinite;
// //         }

// //         @keyframes pulse {
// //           0% {
// //             transform: scale(1);
// //           }
// //           50% {
// //             transform: scale(1.05);
// //           }
// //           100% {
// //             transform: scale(1);
// //           }
// //         }

// //         .submit-exam-btn:hover:not(:disabled) {
// //           transform: translateY(-2px);
// //           box-shadow: 0 7px 14px rgba(76, 175, 80, 0.4);
// //         }

// //         .submit-exam-btn:disabled {
// //           opacity: 0.7;
// //           cursor: not-allowed;
// //           animation: none;
// //         }

// //         .question-panel {
// //           flex: 2;
// //         }

// //         .question-card {
// //           background: #f8f9fa;
// //           border-radius: 12px;
// //           padding: 25px;
// //           border: 1px solid #e9ecef;
// //         }

// //         .question-text {
// //           margin-top: 0;
// //           color: #2c3e50;
// //           font-size: 18px;
// //           line-height: 1.5;
// //         }

// //         .options-list {
// //           margin: 20px 0;
// //         }

// //         .option-item {
// //           margin-bottom: 15px;
// //           padding: 12px;
// //           border-radius: 8px;
// //           background: white;
// //           border: 1px solid #e9ecef;
// //           transition: all 0.3s ease;
// //         }

// //         .option-item:hover {
// //           border-color: #667eea;
// //           box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
// //         }

// //         .option-input {
// //           margin-right: 12px;
// //         }

// //         .option-label {
// //           cursor: pointer;
// //           font-size: 16px;
// //           color: #333;
// //         }

// //         .option-input:checked + .option-label {
// //           font-weight: 600;
// //           color: #667eea;
// //         }

// //         .navigation-buttons {
// //           display: flex;
// //           justify-content: space-between;
// //           margin-top: 25px;
// //         }

// //         .nav-btn {
// //           padding: 12px 20px;
// //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //           color: white;
// //           border: none;
// //           border-radius: 8px;
// //           font-size: 16px;
// //           font-weight: 600;
// //           cursor: pointer;
// //           transition: all 0.3s ease;
// //         }

// //         .nav-btn:hover:not(:disabled) {
// //           transform: translateY(-2px);
// //           box-shadow: 0 7px 14px rgba(102, 126, 234, 0.4);
// //         }

// //         .nav-btn:disabled {
// //           opacity: 0.5;
// //           cursor: not-allowed;
// //         }

// //         @media (max-width: 900px) {
// //           .exam-content {
// //             flex-direction: column;
// //           }

// //           .question-grid {
// //             grid-template-columns: repeat(4, 1fr);
// //           }
// //         }

// //         @media (max-width: 600px) {
// //           .question-grid {
// //             grid-template-columns: repeat(3, 1fr);
// //           }

// //           .navigation-buttons {
// //             flex-direction: column;
// //             gap: 10px;
// //           }

// //           .nav-btn {
// //             width: 100%;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }








// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AttendExam() {
//   const [exams, setExams] = useState([]);
//   const [selectedExam, setSelectedExam] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [result, setResult] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [reviewQuestions, setReviewQuestions] = useState([]);
//   const [timeoutMessage, setTimeoutMessage] = useState("");
//   const [alertShown, setAlertShown] = useState(false); // Track if alert has been shown

//   const studentId = localStorage.getItem("userId");
//   const studentName = localStorage.getItem("username") || "Student";

//   // Fetch all exams on load
//   useEffect(() => {
//     async function fetchExams() {
//       try {
//         const res = await axios.get("https://ligand-software-solutions-63g6.onrender.com/api/exams");
//         setExams(res.data);
//       } catch (err) {
//         console.error("Error fetching exams:", err);
//       }
//     }
//     fetchExams();
//   }, []);

//   // Timer countdown
//   useEffect(() => {
//     if (!selectedExam || submitted) return;

//     if (timeLeft <= 0) {
//       handleAutoSubmit();
//       return;
//     }

//     // Show alert when 10 seconds remain
//     if (timeLeft <= 10 && !alertShown) {
//       // alert("Only 10 seconds remaining!");
//       setAlertShown(true);
//     }

//     const timer = setInterval(() => {
//       setTimeLeft(timeLeft - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, selectedExam, submitted, alertShown]);

//   // Enter fullscreen when exam starts
//   useEffect(() => {
//     if (selectedExam && !submitted) {
//       enterFullScreen();
//     }
//   }, [selectedExam, submitted]);

//   const enterFullScreen = () => {
//     // Get the exam container element instead of the entire document
//     const elem = document.getElementById("exam-container");
//     if (elem && elem.requestFullscreen) {
//       elem.requestFullscreen().catch(err => {
//         console.log("Fullscreen error:", err);
//       });
//     }
//     setIsFullScreen(true);
//   };

//   const exitFullScreen = () => {
//     if (document.exitFullscreen) {
//       document.exitFullscreen().catch(err => {
//         console.log("Exit fullscreen error:", err);
//       });
//     }
//     setIsFullScreen(false);
//   };

//   // Auto submit when time runs out
//   const handleAutoSubmit = () => {
//     setTimeoutMessage("Time's up! Your answers have been submitted automatically.");
//     handleSubmit();
//   };

//   // Select an exam to attend
//   const startExam = async (exam) => {
//     setSelectedExam(exam);
//     setAnswers({});
//     setSubmitted(false);
//     setResult(null);
//     setTimeLeft(1800); // change the time in seconds here
//     setCurrentQuestion(0);
//     setReviewQuestions([]);
//     setTimeoutMessage("");
//     setAlertShown(false); // Reset alert flag
//   };

//   // Handle answer selection
//   const handleAnswerChange = (qId, optionIndex) => {
//     setAnswers({ ...answers, [qId]: optionIndex });
    
//     // Remove from review if answered
//     setReviewQuestions(prev => prev.filter(id => id !== qId));
//   };

//   // Mark question for review
//   const markForReview = (qId) => {
//     if (!reviewQuestions.includes(qId)) {
//       setReviewQuestions([...reviewQuestions, qId]);
//     } else {
//       setReviewQuestions(reviewQuestions.filter(id => id !== qId));
//     }
//   };

//   // Navigate to question
//   const goToQuestion = (index) => {
//     setCurrentQuestion(index);
//   };

//   // Submit exam
//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         examId: selectedExam._id,
//         studentId: studentId,
//         answers: selectedExam.questions.map((q) => ({
//           questionId: q._id,
//           chosenAnswer: answers[q._id] !== undefined 
//             ? q.options[answers[q._id]]
//             : "NOT ANSWERED", 
//         })),
//       };

//       const res = await axios.post(
//         "https://ligand-software-solutions-63g6.onrender.com/api/attempts/submit",
//         payload
//       );

//       setResult(res.data.attempt);
//       setSubmitted(true);
//       exitFullScreen();
//     } catch (err) {
//       console.error("Error submitting exam:", err);
//       alert("Error submitting exam!");
//     }
//   };

//   // Back to exam list
//   const backToList = () => {
//     setSelectedExam(null);
//     setSubmitted(false);
//     setResult(null);
//     exitFullScreen();
//   };

//   // Format time (mm:ss)
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // ------------------ UI ------------------
//   if (!selectedExam) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.header}>
//           <h2 style={styles.title}>Available Exams</h2>
//           <p style={styles.welcome}>Welcome, {studentName}</p>
//         </div>
        
//         {exams.length === 0 ? (
//           <div style={styles.noExams}>
//             <p>No exams available at the moment</p>
//           </div>
//         ) : (
//           <div style={styles.examGrid}>
//             {exams.map((exam, index) => (
//               <div
//                 key={exam._id}
//                 style={styles.examCard}
//               >
//                 <div style={styles.examHeader}>
//                   <h3 style={styles.examTitle}>{exam.examTitle || `Exam #${exam.examNumber}`}</h3>
//                   <span style={{
//                     ...styles.visibilityBadge,
//                     ...(exam.visibility === 'public' ? styles.publicBadge : 
//                          exam.visibility === 'private' ? styles.privateBadge : 
//                          styles.draftBadge)
//                   }}>
//                     {exam.visibility}
//                   </span>
//                 </div>
//                 <p style={styles.examDetail}>Exam Number: {exam.examNumber}</p>
//                 <p style={styles.examDetail}>Questions: {exam.questions.length}</p>
//                 <p style={styles.examDetail}>Estimated Time:30 minutes</p>
//                 <button 
//                   style={styles.startButton}
//                   onClick={() => startExam(exam)}
//                 >
//                   Start Exam
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }

//   if (submitted && result) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.resultContainer}>
//           <h2 style={styles.resultTitle}>Exam Results</h2>
          
//           {timeoutMessage && (
//             <div style={styles.timeoutMessage}>
//               {timeoutMessage}
//             </div>
//           )}
          
//           <div style={styles.scoreContainer}>
//             <div style={styles.scoreCircle}>
//               <span style={styles.score}>{result.score}</span>
//               <span style={styles.scoreDivider}>/</span>
//               <span style={styles.totalScore}>{result.totalQuestions}</span>
//             </div>
//             <p style={styles.scoreText}>
//               {result.score === result.totalQuestions ? "Perfect Score! 🎉" : 
//                result.score >= result.totalQuestions * 0.7 ? "Great Job! 👍" : 
//                "Keep Practicing! 💪"}
//             </p>
//           </div>
          
//           <h3 style={styles.answersTitle}>Question Review</h3>
//           <div style={styles.answersList}>
//             {result.answers.map((a, idx) => {
//               const q = selectedExam.questions.find((q) => q._id === a.questionId);
//               return (
//                 <div 
//                   key={idx} 
//                   style={{
//                     ...styles.answerItem,
//                     borderLeft: a.isCorrect ? '4px solid #2ecc71' : '4px solid #e74c3c'
//                   }}
//                 >
//                   <p style={styles.questionText}><b>Q{idx + 1}:</b> {q.questionText}</p>
//                   <p style={styles.answerText}>
//                     Your Answer: <span style={a.isCorrect ? styles.correctText : styles.incorrectText}>
//                       {a.chosenAnswer !== null && a.chosenAnswer !== undefined && a.chosenAnswer !== "NULL" 
//                         ? a.chosenAnswer 
//                         : "Not answered"}
//                     </span>
//                   </p>
//                   <p style={styles.answerText}>
//                     Correct Answer: <span style={styles.correctText}>{a.correctAnswer}</span>
//                   </p>
//                   <div style={styles.statusIndicator}>
//                     {a.isCorrect ? (
//                       <span style={styles.correctIndicator}>✅ Correct</span>
//                     ) : (
//                       <span style={styles.incorrectIndicator}>❌ Incorrect</span>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <button style={styles.backButton} onClick={backToList}>
//             Back to Exams
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Exam in progress
//   const currentQ = selectedExam.questions[currentQuestion];
//   const answeredQuestions = Object.keys(answers).length;
//   const totalQuestions = selectedExam.questions.length;

//   return (
//     <div id="exam-container" style={styles.examContainer}>
//       {/* Exam Header */}
//       <div style={styles.examHeaderBar}>
//         <div style={styles.examInfo}>
//           <h2 style={styles.examName}>
//             {selectedExam.examTitle || `Exam #${selectedExam.examNumber}`}
//           </h2>
//           <p style={styles.studentInfo}>Student: {studentName}</p>
//         </div>
        
//         <div style={styles.timerContainer}>
//           <div style={{
//             ...styles.timer,
//             backgroundColor: timeLeft < 60 ? "#e74c3c" : "#3498db"
//           }}>
//             <span style={styles.timeText}>{formatTime(timeLeft)}</span>
//           </div>
//           {timeLeft < 60 && (
//             <span style={styles.timeWarning}>Hurry up!</span>
//           )}
//         </div>

//         <div style={styles.progressContainer}>
//           <span style={styles.progressText}>
//             {answeredQuestions}/{totalQuestions} answered
//           </span>
//           <div style={styles.progressBar}>
//             <div 
//               style={{
//                 ...styles.progressFill,
//                 width: `${(answeredQuestions / totalQuestions) * 100}%`
//               }} 
//             />
//           </div>
//         </div>
//       </div>

//       {/* Main Exam Content */}
//       <div style={styles.examContent}>
//         {/* Question Navigation */}
//         <div style={styles.navigationSidebar}>
//           <h4 style={styles.navTitle}>Questions</h4>
//           <div style={styles.questionGrid}>
//             {selectedExam.questions.map((q, index) => {
//               const isAnswered = answers[q._id] !== undefined;
//               const isMarked = reviewQuestions.includes(q._id);
//               const isCurrent = index === currentQuestion;
              
//               return (
//                 <button
//                   key={q._id || index}
//                   style={{
//                     ...styles.questionNumber,
//                     ...(isCurrent && styles.currentQuestion),
//                     ...(isAnswered && styles.answeredQuestion),
//                     ...(isMarked && styles.markedQuestion)
//                   }}
//                   onClick={() => goToQuestion(index)}
//                 >
//                   {index + 1}
//                   {isMarked && <span style={styles.markIcon}>📍</span>}
//                 </button>
//               );
//             })}
//           </div>
          
//           <div style={styles.legend}>
//             <div style={styles.legendItem}>
//               <div style={{...styles.legendColor, ...styles.answeredLegend}}></div>
//               <span>Answered</span>
//             </div>
//             <div style={styles.legendItem}>
//               <div style={{...styles.legendColor, ...styles.markedLegend}}></div>
//               <span>Marked</span>
//             </div>
//             <div style={styles.legendItem}>
//               <div style={{...styles.legendColor, ...styles.currentLegend}}></div>
//               <span>Current</span>
//             </div>
//           </div>
//         </div>

//         {/* Current Question */}
//         <div style={styles.questionContainer}>
//           <div style={styles.questionHeader}>
//             <h3 style={styles.questionNumberText}>
//               Question {currentQuestion + 1} of {totalQuestions}
//             </h3>
//             <button
//               style={styles.reviewButton}
//               onClick={() => markForReview(currentQ._id)}
//             >
//               {reviewQuestions.includes(currentQ._id) ? 'Unmark Review' : 'Mark for Review'}
//             </button>
//           </div>

//           <div style={styles.questionContent}>
//             <p style={styles.questionText}>{currentQ.questionText}</p>
            
//             <div style={styles.optionsContainer}>
//               {currentQ.options.map((opt, optIndex) => (
//                 <label
//                   key={optIndex}
//                   style={{
//                     ...styles.optionLabel,
//                     ...(answers[currentQ._id] === optIndex && styles.selectedOption)
//                   }}
//                 >
//                   <input
//                     type="radio"
//                     name={currentQ._id}
//                     value={optIndex}
//                     checked={answers[currentQ._id] === optIndex}
//                     onChange={() => handleAnswerChange(currentQ._id, optIndex)}
//                     style={styles.optionInput}
//                   />
//                   <span style={styles.optionText}>
//                     {String.fromCharCode(65 + optIndex)}. {opt}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div style={styles.navigationButtons}>
//             <button
//               style={{
//                 ...styles.navButton,
//                 ...(currentQuestion === 0 && styles.disabledButton)
//               }}
//               onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
//               disabled={currentQuestion === 0}
//             >
//               Previous
//             </button>
            
//             <button
//               style={styles.navButton}
//               onClick={() => {
//                 if (currentQuestion < totalQuestions - 1) {
//                   setCurrentQuestion(currentQuestion + 1);
//                 }
//               }}
//             >
//               {currentQuestion === totalQuestions - 1 ? 'Review Answers' : 'Next'}
//             </button>

//             {currentQuestion === totalQuestions - 1 && (
//               <button
//                 style={styles.submitButton}
//                 onClick={handleSubmit}
//               >
//                 Submit Exam
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Fullscreen warning */}
//       {isFullScreen && (
//         <div style={styles.fullscreenWarning}>
//           <p>You are in exam mode. Do not refresh or close this window.</p>
//         </div>
//       )}
//     </div>
//   );
// }



// const styles = {
//   container: {
//     padding: "20px",
//     fontFamily: "'Poppins', sans-serif",
//     maxWidth: "1200px",
//     margin: "0 auto",
//     minHeight: "100vh"
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "30px",
//     padding: "20px",
//     backgroundColor: "white",
//     borderRadius: "10px",
//     boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
//   },
//   title: {
//     color: "#2c3e50",
//     margin: 0,
//     fontSize: "2rem"
//   },
//   welcome: {
//     color: "#7f8c8d",
//     fontSize: "1.1rem",
//     margin: 0
//   },
//   noExams: {
//     textAlign: "center",
//     padding: "40px",
//     backgroundColor: "white",
//     borderRadius: "10px",
//     boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
//   },
//   examGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//     gap: "20px"
//   },
//   examCard: {
//     backgroundColor: "white",
//     padding: "25px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
//     transition: "transform 0.3s, box-shadow 0.3s"
//   },
//   examHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: "15px"
//   },
//   examTitle: {
//     color: "#2c3e50",
//     margin: "0 0 10px 0",
//     fontSize: "1.4rem"
//   },
//   visibilityBadge: {
//     padding: "5px 10px",
//     borderRadius: "20px",
//     fontSize: "12px",
//     fontWeight: "bold",
//     textTransform: "uppercase"
//   },
//   publicBadge: {
//     backgroundColor: "#e8f5e9",
//     color: "#2e7d32"
//   },
//   privateBadge: {
//     backgroundColor: "#ffebee",
//     color: "#c62828"
//   },
//   draftBadge: {
//     backgroundColor: "#fff3e0",
//     color: "#ef6c00"
//   },
//   examDetail: {
//     color: "#7f8c8d",
//     margin: "8px 0",
//     fontSize: "0.95rem"
//   },
//   startButton: {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#3498db",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     fontSize: "1rem",
//     fontWeight: "600",
//     cursor: "pointer",
//     marginTop: "15px",
//     transition: "background-color 0.3s"
//   },
  
//   // Result Screen
//   resultContainer: {
//     backgroundColor: "white",
//     padding: "30px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
//     maxWidth: "800px",
//     margin: "0 auto"
//   },
//   resultTitle: {
//     color: "#2c3e50",
//     textAlign: "center",
//     marginBottom: "30px",
//     fontSize: "2.2rem"
//   },
//   timeoutMessage: {
//     backgroundColor: "#fff3cd",
//     color: "#856404",
//     padding: "15px",
//     borderRadius: "5px",
//     marginBottom: "20px",
//     textAlign: "center",
//     border: "1px solid #ffeaa7"
//   },
//   scoreContainer: {
//     textAlign: "center",
//     marginBottom: "30px"
//   },
//   scoreCircle: {
//     display: "inline-flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "120px",
//     height: "120px",
//     borderRadius: "50%",
//     backgroundColor: "#f8f9fa",
//     border: "4px solid #3498db",
//     marginBottom: "15px"
//   },
//   score: {
//     fontSize: "2.5rem",
//     fontWeight: "bold",
//     color: "#3498db"
//   },
//   scoreDivider: {
//     fontSize: "2rem",
//     color: "#7f8c8d",
//     margin: "0 5px"
//   },
//   totalScore: {
//     fontSize: "1.8rem",
//     color: "#7f8c8d"
//   },
//   scoreText: {
//     fontSize: "1.2rem",
//     color: "#7f8c8d",
//     fontWeight: "500"
//   },
//   answersTitle: {
//     color: "#2c3e50",
//     marginBottom: "20px",
//     fontSize: "1.6rem"
//   },
//   answersList: {
//     marginBottom: "30px"
//   },
//   answerItem: {
//     backgroundColor: "#f8f9fa",
//     padding: "20px",
//     borderRadius: "5px",
//     marginBottom: "15px"
//   },
//   questionText: {
//     margin: "0 0 15px 0",
//     color: "#2c3e50",
//     fontSize: "1.1rem"
//   },
//   answerText: {
//     margin: "8px 0",
//     color: "#34495e"
//   },
//   correctText: {
//     color: "#27ae60",
//     fontWeight: "600"
//   },
//   incorrectText: {
//     color: "#e74c3c",
//     fontWeight: "600"
//   },
//   statusIndicator: {
//     marginTop: "10px"
//   },
//   correctIndicator: {
//     color: "#27ae60",
//     fontWeight: "600"
//   },
//   incorrectIndicator: {
//     color: "#e74c3c",
//     fontWeight: "600"
//   },
//   backButton: {
//     padding: "12px 25px",
//     backgroundColor: "#3498db",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     fontSize: "1rem",
//     fontWeight: "600",
//     cursor: "pointer",
//     display: "block",
//     margin: "0 auto",
//     transition: "background-color 0.3s"
//   },
  
//   // Exam Screen
//   examContainer: {
//     fontFamily: "'Poppins', sans-serif",
//     backgroundColor: "#f8f9fa",
//     minHeight: "100vh",
//     color: "#2c3e50"
//   },
//   examHeaderBar: {
//     backgroundColor: "white",
//     padding: "15px 25px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//     position: "sticky",
//     top: 0,
//     zIndex: 100
//   },
//   examInfo: {
//     flex: 1
//   },
//   examName: {
//     margin: "0 0 5px 0",
//     fontSize: "1.4rem"
//   },
//   studentInfo: {
//     margin: 0,
//     color: "#7f8c8d",
//     fontSize: "0.9rem"
//   },
//   timerContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     margin: "0 20px"
//   },
//   timer: {
//     color: "white",
//     padding: "10px 15px",
//     borderRadius: "5px",
//     fontWeight: "bold",
//     fontSize: "1.2rem",
//     minWidth: "80px",
//     textAlign: "center",
//     transition: "background-color 0.3s"
//   },
//   timeText: {
//     fontFamily: "'Courier New', monospace"
//   },
//   timeWarning: {
//     color: "#e74c3c",
//     fontSize: "0.8rem",
//     marginTop: "5px",
//     fontWeight: "600"
//   },
//   progressContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-end",
//     minWidth: "120px"
//   },
//   progressText: {
//     margin: "0 0 5px 0",
//     fontSize: "0.9rem",
//     color: "#7f8c8d"
//   },
//   progressBar: {
//     width: "100%",
//     height: "8px",
//     backgroundColor: "#ecf0f1",
//     borderRadius: "4px",
//     overflow: "hidden"
//   },
//   progressFill: {
//     height: "100%",
//     backgroundColor: "#2ecc71",
//     transition: "width 0.3s ease"
//   },
  
//   // Exam Content
//   examContent: {
//     display: "flex",
//     minHeight: "calc(100vh - 80px)"
//   },
//   navigationSidebar: {
//     width: "250px",
//     backgroundColor: "white",
//     padding: "20px",
//     borderRight: "1px solid #ecf0f1"
//   },
//   navTitle: {
//     margin: "0 0 15px 0",
//     color: "#2c3e50",
//     fontSize: "1.1rem"
//   },
//   questionGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(5, 1fr)",
//     gap: "8px",
//     marginBottom: "20px"
//   },
//   questionNumber: {
//     width: "35px",
//     height: "35px",
//     borderRadius: "5px",
//     border: "2px solid #bdc3c7",
//     backgroundColor: "white",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//     fontSize: "0.9rem",
//     fontWeight: "600",
//     transition: "all 0.2s",
//     position: "relative"
//   },
//   currentQuestion: {
//     borderColor: "#3498db",
//     backgroundColor: "#3498db",
//     color: "white"
//   },
//   answeredQuestion: {
//     borderColor: "#2ecc71",
//     backgroundColor: "#2ecc71",
//     color: "white"
//   },
//   markedQuestion: {
//     borderColor: "#f39c12"
//   },
//   markIcon: {
//     position: "absolute",
//     top: "-5px",
//     right: "-5px",
//     fontSize: "12px"
//   },
//   legend: {
//     marginTop: "20px"
//   },
//   legendItem: {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "8px",
//     fontSize: "0.8rem"
//   },
//   legendColor: {
//     width: "15px",
//     height: "15px",
//     borderRadius: "3px",
//     marginRight: "8px"
//   },
//   answeredLegend: {
//     backgroundColor: "#2ecc71"
//   },
//   markedLegend: {
//     backgroundColor: "#f39c12"
//   },
//   currentLegend: {
//     backgroundColor: "#3498db"
//   },
  
//   // Question Container
//   questionContainer: {
//     flex: 1,
//     padding: "30px",
//     backgroundColor: "white",
//     margin: "20px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
//   },
//   questionHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "25px",
//     paddingBottom: "15px",
//     borderBottom: "1px solid #ecf0f1"
//   },
//   questionNumberText: {
//     margin: 0,
//     color: "#2c3e50",
//     fontSize: "1.3rem"
//   },
//   reviewButton: {
//     padding: "8px 15px",
//     backgroundColor: "transparent",
//     color: "#f39c12",
//     border: "1px solid #f39c12",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "0.9rem",
//     transition: "all 0.2s"
//   },
//   questionContent: {
//     marginBottom: "30px"
//   },
//   questionText: {
//     fontSize: "1.1rem",
//     lineHeight: 1.6,
//     marginBottom: "25px",
//     color: "#2c3e50"
//   },
//   optionsContainer: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px"
//   },
//   optionLabel: {
//     display: "flex",
//     alignItems: "center",
//     padding: "15px",
//     border: "2px solid #ecf0f1",
//     borderRadius: "8px",
//     cursor: "pointer",
//     transition: "all 0.2s"
//   },
//   selectedOption: {
//     borderColor: "#3498db",
//     backgroundColor: "#ebf5fb"
//   },
//   optionInput: {
//     marginRight: "12px",
//     width: "18px",
//     height: "18px",
//     cursor: "pointer"
//   },
//   optionText: {
//     fontSize: "1rem",
//     color: "#34495e"
//   },
  
//   // Navigation Buttons
//   navigationButtons: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingTop: "20px",
//     borderTop: "1px solid #ecf0f1"
//   },
//   navButton: {
//     padding: "12px 25px",
//     backgroundColor: "#3498db",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     fontSize: "1rem",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "background-color 0.3s"
//   },
//   disabledButton: {
//     backgroundColor: "#bdc3c7",
//     cursor: "not-allowed"
//   },
//   submitButton: {
//     padding: "12px 25px",
//     backgroundColor: "#2ecc71",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     fontSize: "1rem",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "background-color 0.3s"
//   },
  
//   // Fullscreen Warning
//   fullscreenWarning: {
//     position: "fixed",
//     bottom: "20px",
//     left: "50%",
//     transform: "translateX(-50%)",
//     backgroundColor: "#e74c3c",
//     color: "white",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     fontSize: "0.9rem",
//     zIndex: 1000
//   }
// };

























import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AttendExam() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [timeoutMessage, setTimeoutMessage] = useState("");
  const [alertShown, setAlertShown] = useState(false);
  const [loading, setLoading] = useState({
    exams: true,
    submission: false,
    examStart: false
  });

  const studentId = localStorage.getItem("userId");
  const studentName = localStorage.getItem("username") || "Student";

  // Fetch all exams on load
  useEffect(() => {
    async function fetchExams() {
      try {
        setLoading(prev => ({...prev, exams: true}));
        const res = await axios.get("https://ligand-software-solutions-63g6.onrender.com/api/exams");
        setExams(res.data);
      } catch (err) {
        console.error("Error fetching exams:", err);
      } finally {
        setLoading(prev => ({...prev, exams: false}));
      }
    }
    fetchExams();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!selectedExam || submitted) return;

    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    // Show alert when 10 seconds remain
    if (timeLeft <= 10 && !alertShown) {
      alert("Only 10 seconds remaining!");
      setAlertShown(true);
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, selectedExam, submitted, alertShown]);

  // Enter fullscreen when exam starts
  useEffect(() => {
    if (selectedExam && !submitted) {
      enterFullScreen();
    }
  }, [selectedExam, submitted]);

  const enterFullScreen = () => {
    const elem = document.getElementById("exam-container");
    if (elem && elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => {
        console.log("Fullscreen error:", err);
      });
    }
    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(err => {
        console.log("Exit fullscreen error:", err);
      });
    }
    setIsFullScreen(false);
  };

  // Auto submit when time runs out
  const handleAutoSubmit = () => {
    setTimeoutMessage("Time's up! Your answers have been submitted automatically.");
    handleSubmit();
  };

  // Select an exam to attend
  const startExam = async (exam) => {
    try {
      setLoading(prev => ({...prev, examStart: true}));
      setSelectedExam(exam);
      setAnswers({});
      setSubmitted(false);
      setResult(null);
      setTimeLeft(exam.duration || 1800); // Use exam duration if available, default to 30 minutes
      setCurrentQuestion(0);
      setReviewQuestions([]);
      setTimeoutMessage("");
      setAlertShown(false);
    } catch (error) {
      console.error("Error starting exam:", error);
    } finally {
      setLoading(prev => ({...prev, examStart: false}));
    }
  };

  // Handle answer selection
  const handleAnswerChange = (qId, optionIndex) => {
    setAnswers({ ...answers, [qId]: optionIndex });
    
    // Remove from review if answered
    setReviewQuestions(prev => prev.filter(id => id !== qId));
  };

  // Mark question for review
  const markForReview = (qId) => {
    if (!reviewQuestions.includes(qId)) {
      setReviewQuestions([...reviewQuestions, qId]);
    } else {
      setReviewQuestions(reviewQuestions.filter(id => id !== qId));
    }
  };

  // Navigate to question
  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  // Submit exam
  const handleSubmit = async () => {
    try {
      setLoading(prev => ({...prev, submission: true}));
      const payload = {
        examId: selectedExam._id,
        studentId: studentId,
        answers: selectedExam.questions.map((q) => ({
          questionId: q._id,
          chosenAnswer: answers[q._id] !== undefined 
            ? q.options[answers[q._id]]
            : "NOT ANSWERED", 
        })),
      };

      const res = await axios.post(
        "https://ligand-software-solutions-63g6.onrender.com/api/attempts/submit",
        payload
      );

      setResult(res.data.attempt);
      setSubmitted(true);
      exitFullScreen();
    } catch (err) {
      console.error("Error submitting exam:", err);
      alert("Error submitting exam!");
    } finally {
      setLoading(prev => ({...prev, submission: false}));
    }
  };

  // Back to exam list
  const backToList = () => {
    setSelectedExam(null);
    setSubmitted(false);
    setResult(null);
    exitFullScreen();
  };

  // Format time (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format time in minutes for display
  const formatMinutes = (seconds) => {
    return `${Math.floor(seconds / 60)} minutes`;
  };

  // ------------------ UI ------------------
  if (loading.exams) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Loading exams...</p>
        </div>
      </div>
    );
  }

  if (!selectedExam) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Available Exams</h2>
          <p style={styles.welcome}>Welcome, {studentName}</p>
        </div>
        
        {exams.length === 0 ? (
          <div style={styles.noExams}>
            <p>No exams available at the moment</p>
          </div>
        ) : (
          <div style={styles.examGrid}>
            {exams.map((exam, index) => (
              <div
                key={exam._id}
                style={styles.examCard}
              >
                <div style={styles.examHeader}>
                  <h3 style={styles.examTitle}>{exam.examTitle || `Exam #${exam.examNumber}`}</h3>
                  <span style={{
                    ...styles.visibilityBadge,
                    ...(exam.visibility === 'public' ? styles.publicBadge : 
                         exam.visibility === 'private' ? styles.privateBadge : 
                         styles.draftBadge)
                  }}>
                    {exam.visibility}
                  </span>
                </div>
                <p style={styles.examDetail}>Exam Number: {exam.examNumber}</p>
                <p style={styles.examDetail}>Questions: {exam.questions.length}</p>
                <p style={styles.examDetail}>Time: {formatMinutes(exam.duration || 1800)}</p>
                <button 
                  style={{
                    ...styles.startButton,
                    ...(loading.examStart && styles.disabledButton)
                  }}
                  onClick={() => startExam(exam)}
                  disabled={loading.examStart}
                >
                  {loading.examStart ? 'Starting...' : 'Start Exam'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (submitted && result) {
    return (
      <div style={styles.container}>
        <div style={styles.resultContainer}>
          <h2 style={styles.resultTitle}>Exam Results</h2>
          
          {timeoutMessage && (
            <div style={styles.timeoutMessage}>
              {timeoutMessage}
            </div>
          )}
          
          <div style={styles.scoreContainer}>
            <div style={styles.scoreCircle}>
              <span style={styles.score}>{result.score}</span>
              <span style={styles.scoreDivider}>/</span>
              <span style={styles.totalScore}>{result.totalQuestions}</span>
            </div>
            <p style={styles.scoreText}>
              {result.score === result.totalQuestions ? "Perfect Score! 🎉" : 
               result.score >= result.totalQuestions * 0.7 ? "Great Job! 👍" : 
               "Keep Practicing! 💪"}
            </p>
          </div>
          
          <h3 style={styles.answersTitle}>Question Review</h3>
          <div style={styles.answersList}>
            {result.answers.map((a, idx) => {
              const q = selectedExam.questions.find((q) => q._id === a.questionId);
              return (
                <div 
                  key={idx} 
                  style={{
                    ...styles.answerItem,
                    borderLeft: a.isCorrect ? '4px solid #2ecc71' : '4px solid #e74c3c'
                  }}
                >
                  <p style={styles.questionText}><b>Q{idx + 1}:</b> {q.questionText}</p>
                  <p style={styles.answerText}>
                    Your Answer: <span style={a.isCorrect ? styles.correctText : styles.incorrectText}>
                      {a.chosenAnswer !== null && a.chosenAnswer !== undefined && a.chosenAnswer !== "NULL" 
                        ? a.chosenAnswer 
                        : "Not answered"}
                    </span>
                  </p>
                  <p style={styles.answerText}>
                    Correct Answer: <span style={styles.correctText}>{a.correctAnswer}</span>
                  </p>
                  <div style={styles.statusIndicator}>
                    {a.isCorrect ? (
                      <span style={styles.correctIndicator}>✅ Correct</span>
                    ) : (
                      <span style={styles.incorrectIndicator}>❌ Incorrect</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <button style={styles.backButton} onClick={backToList}>
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  // Exam in progress
  const currentQ = selectedExam.questions[currentQuestion];
  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = selectedExam.questions.length;

  return (
    <div id="exam-container" style={styles.examContainer}>
      {/* Exam Header */}
      <div style={styles.examHeaderBar}>
        <div style={styles.examInfo}>
          <h2 style={styles.examName}>
            {selectedExam.examTitle || `Exam #${selectedExam.examNumber}`}
          </h2>
          <p style={styles.studentInfo}>Student: {studentName}</p>
        </div>
        
        <div style={styles.timerContainer}>
          <div style={{
            ...styles.timer,
            backgroundColor: timeLeft < 60 ? "#e74c3c" : "#3498db"
          }}>
            <span style={styles.timeText}>{formatTime(timeLeft)}</span>
          </div>
          {timeLeft < 60 && (
            <span style={styles.timeWarning}>Hurry up!</span>
          )}
        </div>

        <div style={styles.progressContainer}>
          <span style={styles.progressText}>
            {answeredQuestions}/{totalQuestions} answered
          </span>
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${(answeredQuestions / totalQuestions) * 100}%`
              }} 
            />
          </div>
        </div>
      </div>

      {/* Main Exam Content */}
      <div style={styles.examContent}>
        {/* Question Navigation */}
        <div style={styles.navigationSidebar}>
          <h4 style={styles.navTitle}>Questions</h4>
          <div style={styles.questionGrid}>
            {selectedExam.questions.map((q, index) => {
              const isAnswered = answers[q._id] !== undefined;
              const isMarked = reviewQuestions.includes(q._id);
              const isCurrent = index === currentQuestion;
              
              return (
                <button
                  key={q._id || index}
                  style={{
                    ...styles.questionNumber,
                    ...(isCurrent && styles.currentQuestion),
                    ...(isAnswered && styles.answeredQuestion),
                    ...(isMarked && styles.markedQuestion)
                  }}
                  onClick={() => goToQuestion(index)}
                >
                  {index + 1}
                  {isMarked && <span style={styles.markIcon}>📍</span>}
                </button>
              );
            })}
          </div>
          
          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, ...styles.answeredLegend}}></div>
              <span>Answered</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, ...styles.markedLegend}}></div>
              <span>Marked</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, ...styles.currentLegend}}></div>
              <span>Current</span>
            </div>
          </div>
        </div>

        {/* Current Question */}
        <div style={styles.questionContainer}>
          <div style={styles.questionHeader}>
            <h3 style={styles.questionNumberText}>
              Question {currentQuestion + 1} of {totalQuestions}
            </h3>
            <button
              style={styles.reviewButton}
              onClick={() => markForReview(currentQ._id)}
            >
              {reviewQuestions.includes(currentQ._id) ? 'Unmark Review' : 'Mark for Review'}
            </button>
          </div>

          <div style={styles.questionContent}>
            <p style={styles.questionText}>{currentQ.questionText}</p>
            
            <div style={styles.optionsContainer}>
              {currentQ.options.map((opt, optIndex) => (
                <label
                  key={optIndex}
                  style={{
                    ...styles.optionLabel,
                    ...(answers[currentQ._id] === optIndex && styles.selectedOption)
                  }}
                >
                  <input
                    type="radio"
                    name={currentQ._id}
                    value={optIndex}
                    checked={answers[currentQ._id] === optIndex}
                    onChange={() => handleAnswerChange(currentQ._id, optIndex)}
                    style={styles.optionInput}
                  />
                  <span style={styles.optionText}>
                    {String.fromCharCode(65 + optIndex)}. {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div style={styles.navigationButtons}>
            <button
              style={{
                ...styles.navButton,
                ...(currentQuestion === 0 && styles.disabledButton)
              }}
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            
            <button
              style={styles.navButton}
              onClick={() => {
                if (currentQuestion < totalQuestions - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                }
              }}
            >
              {currentQuestion === totalQuestions - 1 ? 'Review Answers' : 'Next'}
            </button>

            {currentQuestion === totalQuestions - 1 && (
              <button
                style={{
                  ...styles.submitButton,
                  ...(loading.submission && styles.disabledButton)
                }}
                onClick={handleSubmit}
                disabled={loading.submission}
              >
                {loading.submission ? 'Submitting...' : 'Submit Exam'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen warning */}
      {isFullScreen && (
        <div style={styles.fullscreenWarning}>
          <p>You are in exam mode. Do not refresh or close this window.</p>
        </div>
      )}

      {/* Loading overlay for submission */}
      {loading.submission && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingContent}>
            <div style={styles.spinner}></div>
            <p>Submitting your exam...</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    minHeight: "100vh"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
  },
  title: {
    color: "#2c3e50",
    margin: 0,
    fontSize: "2rem"
  },
  welcome: {
    color: "#7f8c8d",
    fontSize: "1.1rem",
    margin: 0
  },
  noExams: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
  },
  examGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px"
  },
  examCard: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    transition: "transform 0.3s, box-shadow 0.3s"
  },
  examHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px"
  },
  examTitle: {
    color: "#2c3e50",
    margin: "0 0 10px 0",
    fontSize: "1.4rem"
  },
  visibilityBadge: {
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  publicBadge: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32"
  },
  privateBadge: {
    backgroundColor: "#ffebee",
    color: "#c62828"
  },
  draftBadge: {
    backgroundColor: "#fff3e0",
    color: "#ef6c00"
  },
  examDetail: {
    color: "#7f8c8d",
    margin: "8px 0",
    fontSize: "0.95rem"
  },
  startButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "15px",
    transition: "background-color 0.3s"
  },
  disabledButton: {
    backgroundColor: "#bdc3c7",
    cursor: "not-allowed"
  },
  
  // Loading styles
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh"
  },
  loadingOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000
  },
  loadingContent: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  spinner: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
    marginBottom: "15px"
  },
  
  // Result Screen
  resultContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    maxWidth: "800px",
    margin: "0 auto"
  },
  resultTitle: {
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "2.2rem"
  },
  timeoutMessage: {
    backgroundColor: "#fff3cd",
    color: "#856404",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "20px",
    textAlign: "center",
    border: "1px solid #ffeaa7"
  },
  scoreContainer: {
    textAlign: "center",
    marginBottom: "30px"
  },
  scoreCircle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: "#f8f9fa",
    border: "4px solid #3498db",
    marginBottom: "15px"
  },
  score: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#3498db"
  },
  scoreDivider: {
    fontSize: "2rem",
    color: "#7f8c8d",
    margin: "0 5px"
  },
  totalScore: {
    fontSize: "1.8rem",
    color: "#7f8c8d"
  },
  scoreText: {
    fontSize: "1.2rem",
    color: "#7f8c8d",
    fontWeight: "500"
  },
  answersTitle: {
    color: "#2c3e50",
    marginBottom: "20px",
    fontSize: "1.6rem"
  },
  answersList: {
    marginBottom: "30px"
  },
  answerItem: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "5px",
    marginBottom: "15px"
  },
  questionText: {
    margin: "0 0 15px 0",
    color: "#2c3e50",
    fontSize: "1.1rem"
  },
  answerText: {
    margin: "8px 0",
    color: "#34495e"
  },
  correctText: {
    color: "#27ae60",
    fontWeight: "600"
  },
  incorrectText: {
    color: "#e74c3c",
    fontWeight: "600"
  },
  statusIndicator: {
    marginTop: "10px"
  },
  correctIndicator: {
    color: "#27ae60",
    fontWeight: "600"
  },
  incorrectIndicator: {
    color: "#e74c3c",
    fontWeight: "600"
  },
  backButton: {
    padding: "12px 25px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "block",
    margin: "0 auto",
    transition: "background-color 0.3s"
  },
  
  // Exam Screen
  examContainer: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    color: "#2c3e50"
  },
  examHeaderBar: {
    backgroundColor: "white",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  examInfo: {
    flex: 1
  },
  examName: {
    margin: "0 0 5px 0",
    fontSize: "1.4rem"
  },
  studentInfo: {
    margin: 0,
    color: "#7f8c8d",
    fontSize: "0.9rem"
  },
  timerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 20px"
  },
  timer: {
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: "1.2rem",
    minWidth: "80px",
    textAlign: "center",
    transition: "background-color 0.3s"
  },
  timeText: {
    fontFamily: "'Courier New', monospace"
  },
  timeWarning: {
    color: "#e74c3c",
    fontSize: "0.8rem",
    marginTop: "5px",
    fontWeight: "600"
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    minWidth: "120px"
  },
  progressText: {
    margin: "0 0 5px 0",
    fontSize: "0.9rem",
    color: "#7f8c8d"
  },
  progressBar: {
    width: "100%",
    height: "8px",
    backgroundColor: "#ecf0f1",
    borderRadius: "4px",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2ecc71",
    transition: "width 0.3s ease"
  },
  
  // Exam Content
  examContent: {
    display: "flex",
    minHeight: "calc(100vh - 80px)"
  },
  navigationSidebar: {
    width: "250px",
    backgroundColor: "white",
    padding: "20px",
    borderRight: "1px solid #ecf0f1"
  },
  navTitle: {
    margin: "0 0 15px 0",
    color: "#2c3e50",
    fontSize: "1.1rem"
  },
  questionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "8px",
    marginBottom: "20px"
  },
  questionNumber: {
    width: "35px",
    height: "35px",
    borderRadius: "5px",
    border: "2px solid #bdc3c7",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: "all 0.2s",
    position: "relative"
  },
  currentQuestion: {
    borderColor: "#3498db",
    backgroundColor: "#3498db",
    color: "white"
  },
  answeredQuestion: {
    borderColor: "#2ecc71",
    backgroundColor: "#2ecc71",
    color: "white"
  },
  markedQuestion: {
    borderColor: "#f39c12"
  },
  markIcon: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    fontSize: "12px"
  },
  legend: {
    marginTop: "20px"
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    fontSize: "0.8rem"
  },
  legendColor: {
    width: "15px",
    height: "15px",
    borderRadius: "3px",
    marginRight: "8px"
  },
  answeredLegend: {
    backgroundColor: "#2ecc71"
  },
  markedLegend: {
    backgroundColor: "#f39c12"
  },
  currentLegend: {
    backgroundColor: "#3498db"
  },
  
  // Question Container
  questionContainer: {
    flex: 1,
    padding: "30px",
    backgroundColor: "white",
    margin: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
  },
  questionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    paddingBottom: "15px",
    borderBottom: "1px solid #ecf0f1"
  },
  questionNumberText: {
    margin: 0,
    color: "#2c3e50",
    fontSize: "1.3rem"
  },
  reviewButton: {
    padding: "8px 15px",
    backgroundColor: "transparent",
    color: "#f39c12",
    border: "1px solid #f39c12",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "all 0.2s"
  },
  questionContent: {
    marginBottom: "30px"
  },
  questionText: {
    fontSize: "1.1rem",
    lineHeight: 1.6,
    marginBottom: "25px",
    color: "#2c3e50"
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    border: "2px solid #ecf0f1",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  selectedOption: {
    borderColor: "#3498db",
    backgroundColor: "#ebf5fb"
  },
  optionInput: {
    marginRight: "12px",
    width: "18px",
    height: "18px",
    cursor: "pointer"
  },
  optionText: {
    fontSize: "1rem",
    color: "#34495e"
  },
  
  // Navigation Buttons
  navigationButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "20px",
    borderTop: "1px solid #ecf0f1"
  },
  navButton: {
    padding: "12px 25px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s"
  },
  submitButton: {
    padding: "12px 25px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s"
  },
  
  // Fullscreen Warning
  fullscreenWarning: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "0.9rem",
    zIndex: 1000
  }
};

// Add CSS animation for the spinner
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);