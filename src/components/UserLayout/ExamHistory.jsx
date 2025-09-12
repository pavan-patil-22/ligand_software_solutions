import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExamHistory() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedAttempt, setExpandedAttempt] = useState(null);

  const studentId = localStorage.getItem("userId");
  const student = localStorage.getItem("username");
  const usn = localStorage.getItem("usn");
  console.log(usn)
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    async function fetchHistory() {
      try {
        const res = await axios.get(
          `https://ligand-software-solutions-63g6.onrender.com/api/attempts/student/${studentId}`
        );
        // Filter out today's exams
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const filtered = res.data.filter(attempt => {
          const attemptDate = new Date(attempt.createdAt);
          attemptDate.setHours(0, 0, 0, 0);
          return attemptDate.getTime() !== today.getTime();
        });
        setAttempts(filtered);
        console.log("Exam attempts (excluding today):", filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [studentId]);

  const toggleAttempt = (attemptId) => {
    if (expandedAttempt === attemptId) {
      setExpandedAttempt(null);
    } else {
      setExpandedAttempt(attemptId);
    }
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "#4CAF50";
    if (percentage >= 60) return "#FF9800";
    return "#F44336";
  };

  const getScoreEmoji = (percentage) => {
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "👍";
    return "💪";
  };

  // Download exam as PDF
  const handleDownload = (attempt) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Exam Attempt Report", 14, 15);

    doc.setFontSize(12);
    doc.text(`Student Name: ${student || "N/A"}`, 14, 30);
    doc.text(`USN: ${usn || "N/A"}`, 14, 38);
    doc.text(
      `Exam: ${attempt.exam?.examTitle || `Exam #${attempt.exam?.examNumber}`}`,
      14,
      46
    );
    doc.text(
      `Date: ${new Date(attempt.createdAt).toLocaleString()}`,
      14,
      54
    );
    doc.text(
      `Score: ${attempt.score}/${attempt.totalQuestions} (${attempt.percentage.toFixed(
        2
      )}%)`,
      14,
      62
    );

    autoTable(doc, {
      startY: 70,
      head: [["#", "Question", "Your Answer", "Correct Answer", "Status"]],
      body: attempt.answers.map((a, i) => [
        i + 1,
        a.questionText,
        a.chosenAnswer || "Not answered",
        a.correctAnswer,
        a.isCorrect ? "Correct" : "Incorrect",
      ]),
      styles: { fontSize: 10, cellWidth: "wrap" },
      headStyles: { fillColor: [102, 126, 234] },
      columnStyles: {
        1: { cellWidth: 70 },
        2: { cellWidth: 35 },
        3: { cellWidth: 35 },
        4: { cellWidth: 25 },
      },
    });

    doc.save(
      `Exam_${attempt.exam?.examTitle || attempt.exam?.examNumber}_${
        student || "student"
      }.pdf`
    );
  };

  if (loading)
    return (
      <div className="exam-history-container">
        <div className="exam-history-card">
          <div className="loading">Loading exam history... ⏳</div>
        </div>
      </div>
    );

  if (attempts.length === 0) {
    return (
      <div className="exam-history-container">
        <div className="exam-history-card">
          <div className="exam-history-header">
            <h2>📊 Exam History</h2>
            <p>Your past exam attempts will appear here</p>
          </div>
          <div className="no-attempts">
            <div className="no-attempts-icon">📝</div>
            <h3>No Exam Attempts Yet</h3>
            <p>
              You haven't taken any exams yet. Start your first exam to see your
              history here!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-history-container">
      <div className="exam-history-card">
        <div className="exam-history-header">
          <h2>📊 Exam History</h2>
          <p>Review your past exam performances and track your progress</p>
          {/* Show student name and USN */}
          <div
            style={{
              marginTop: "10px",
              fontWeight: 500,
              color: "#2c3e50",
            }}
          >
            Student Name:{" "}
            <span style={{ color: "#667eea" }}>{student}</span>
            {" | "}
            USN: <span style={{ color: "#667eea" }}>{usn}</span>
          </div>
        </div>

        <div className="attempts-list">
          {attempts.map((attempt, idx) => (
            <div
              key={attempt._id || idx}
              className="attempt-card"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div
                className="attempt-header"
                onClick={() => toggleAttempt(attempt._id)}
              >
                <div className="attempt-title">
                  <h3>
                    {attempt.exam?.examTitle ||
                      `Exam #${attempt.exam?.examNumber}`}
                  </h3>
                  <p className="attempt-date">
                    {new Date(attempt.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="attempt-score">
                  <div
                    className="score-circle"
                    style={{
                      backgroundColor: getScoreColor(attempt.percentage),
                      borderColor: getScoreColor(attempt.percentage),
                    }}
                  >
                    <span>{attempt.percentage.toFixed(2)}%</span>
                  </div>
                  <div className="score-details">
                    <p>
                      {attempt.score}/{attempt.totalQuestions} correct
                    </p>
                    <p className="score-emoji">
                      {getScoreEmoji(attempt.percentage)}
                    </p>
                  </div>
                </div>

                <div className="expand-icon">
                  {expandedAttempt === attempt._id ? "▲" : "▼"}
                </div>
                {/* Download button */}
                <button
                  className="download-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(attempt);
                  }}
                  title="Download this exam as PDF"
                >
                  ⬇️ Download
                </button>
              </div>

              {expandedAttempt === attempt._id && (
                <div className="attempt-details">
                  <div className="answers-summary">
                    <div className="summary-item correct">
                      <span className="summary-count">{attempt.score}</span>
                      <span className="summary-label">Correct</span>
                    </div>
                    <div className="summary-item incorrect">
                      <span className="summary-count">
                        {attempt.totalQuestions - attempt.score}
                      </span>
                      <span className="summary-label">Incorrect</span>
                    </div>
                    <div className="summary-item total">
                      <span className="summary-count">
                        {attempt.totalQuestions}
                      </span>
                      <span className="summary-label">Total</span>
                    </div>
                  </div>

                  <h4>Detailed Answers:</h4>
                  <div className="answers-list">
                    {attempt.answers.map((a, i) => (
                      <div
                        key={i}
                        className={`answer-item ${
                          a.isCorrect ? "correct" : "incorrect"
                        }`}
                      >
                        <div className="question-header">
                          <span className="question-number">
                            Q{i + 1}: {a.questionText}
                          </span>
                          <span className="answer-status">
                            {a.isCorrect ? "✅ Correct" : "❌ Incorrect"}
                          </span>
                        </div>

                        <div className="answer-comparison">
                          <div className="answer-row">
                            <span className="answer-label">Your Answer:</span>
                            <span
                              className={`answer-value ${
                                a.isCorrect ? "correct" : "incorrect"
                              }`}
                            >
                              {a.chosenAnswer || "Not answered"}
                            </span>
                          </div>
                          {!a.isCorrect && (
                            <div className="answer-row">
                              <span className="answer-label">
                                Correct Answer:
                              </span>
                              <span className="answer-value correct">
                                {a.correctAnswer}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .exam-history-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          padding: 20px;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .exam-history-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          padding: 30px;
          width: 100%;
          max-width: 900px;
        }

        .exam-history-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .exam-history-header h2 {
          color: #2c3e50;
          margin-bottom: 10px;
          font-weight: 700;
          font-size: 28px;
        }

        .exam-history-header p {
          color: #666;
          font-size: 16px;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: #666;
          font-size: 18px;
        }

        .no-attempts {
          text-align: center;
          padding: 40px 20px;
          color: #666;
        }

        .no-attempts-icon {
          font-size: 60px;
          margin-bottom: 20px;
        }

        .no-attempts h3 {
          color: #2c3e50;
          margin-bottom: 10px;
          font-size: 22px;
        }

        .attempts-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .attempt-card {
          background: #f8f9fa;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid #e9ecef;
        }

        .attempt-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .attempt-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .attempt-header:hover {
          background-color: #e9ecef;
        }

        .attempt-title h3 {
          color: #2c3e50;
          margin-bottom: 5px;
          font-size: 18px;
        }

        .attempt-date {
          color: #666;
          font-size: 14px;
          margin: 0;
        }

        .attempt-score {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .score-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: 700;
          font-size: 16px;
          border: 3px solid;
        }

        .score-details {
          text-align: center;
        }

        .score-details p {
          margin: 0;
          color: #2c3e50;
          font-size: 14px;
        }

        .score-emoji {
          font-size: 16px;
        }

        .expand-icon {
          font-size: 18px;
          color: #667eea;
        }

        .attempt-details {
          padding: 20px;
          background: white;
          border-top: 1px solid #e9ecef;
        }

        .answers-summary {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
        }

        .summary-item.correct {
          color: #4caf50;
        }

        .summary-item.incorrect {
          color: #f44336;
        }

        .summary-item.total {
          color: #667eea;
        }

        .summary-count {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .summary-label {
          font-size: 14px;
          font-weight: 600;
        }

        .attempt-details h4 {
          color: #2c3e50;
          margin-bottom: 15px;
          font-size: 18px;
        }

        .answers-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-height: 400px;
          overflow-y: auto;
          padding-right: 10px;
        }

        .answer-item {
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid;
        }

        .answer-item.correct {
          background: #d4edda;
          border-left-color: #4caf50;
        }

        .answer-item.incorrect {
          background: #f8d7da;
          border-left-color: #f44336;
        }

        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .question-number {
          font-weight: 700;
          color: #2c3e50;
        }

        .answer-status {
          font-weight: 600;
          font-size: 14px;
        }

        .answer-comparison {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .answer-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .answer-label {
          font-weight: 600;
          color: #2c3e50;
          min-width: 120px;
        }

        .answer-value {
          font-weight: 500;
        }

        .answer-value.correct {
          color: #4caf50;
        }

        .answer-value.incorrect {
          color: #f44336;
        }

        .download-btn {
          background: #667eea;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 6px 14px;
          font-size: 14px;
          font-weight: 600;
          margin-left: 18px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .download-btn:hover {
          background: #4c51bf;
        }

        @media (max-width: 768px) {
          .attempt-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .attempt-score {
            width: 100%;
            justify-content: space-between;
          }

          .answers-summary {
            flex-direction: column;
            gap: 15px;
          }

          .answer-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }

          .answer-label {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
}