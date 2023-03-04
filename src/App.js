import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import './App.css';


const QuestionDisplay = ({ question }) => {
    return (
        <div className='question-container'>
            <h1 id='question-heading'>{question.ChapterID}</h1>
            <MathJaxContext>
                <MathJax className='question'>{question.Question}</MathJax>
            </MathJaxContext>
        </div>
    );
};

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            const questionIds = [
                'AreaUnderTheCurve_901',
                'BinomialTheorem_901',
                'DifferentialCalculus2_901'
            ];

            const questionData = await Promise.all(
                questionIds.map(async (questionId) => {
                    const response = await axios.get(
                        `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionId}`
                    );

                    return response.data[0];
                })
            );

            setQuestions(questionData);
        };

        fetchQuestions();
    }, []);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    };

    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;
    console.log(questions);
    return (
        <div>
            {questions.length === 0 ? (
                <div>Loading...</div>
            ) : (
                <QuestionDisplay question={questions[currentQuestionIndex]} />
            )}

            <div className='navigation-buttons'>
                <button disabled={isFirstQuestion} onClick={handlePrevQuestion}>
                    Prev
                </button>
                <button disabled={isLastQuestion} onClick={handleNextQuestion}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default App;