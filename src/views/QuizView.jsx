import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { generateQuiz } from '../utils/quizUtils';
import confetti from 'canvas-confetti';

export default function QuizView({ categoryData, onFinish, onAbort }) {
    const [questions] = useState(() => {
        if (categoryData?.items) {
            return generateQuiz(categoryData.items);
        }
        return [];
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    if (questions.length === 0) return (
        <div className="min-h-screen flex items-center justify-center text-primary">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    const currentQ = questions[currentIndex];
    // Calculate progress based on completed questions (index)
    // Initially 0. After Q1 answered -> wait for Next. on Next -> index 1.
    // Display "Question 1/20"

    const handleChoice = (choice) => {
        if (isAnswered) return;

        setSelectedChoice(choice);
        setIsAnswered(true);

        if (choice.isCorrect) {
            setScore(s => s + 1);
            confetti({
                particleCount: 30,
                spread: 30,
                origin: { y: 0.8 },
                colors: ['#86EFAC', '#4ADE80'] // Green-ish
            });
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(c => c + 1);
            setIsAnswered(false);
            setSelectedChoice(null);
        } else {
            onFinish(score + (selectedChoice?.isCorrect ? 0 : 0), questions.length);
            // Note: score was already updated in handleChoice.
            onFinish(score, questions.length);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 min-h-screen flex flex-col justify-between">
            {/* Header */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <button onClick={onAbort} className="p-2 -ml-2 text-gray-400 hover:text-gray-600 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                    <div className="flex-1 mx-4">
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300 rounded-full"
                                style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <span className="text-xs font-bold text-gray-400 font-mono">
                        {currentIndex + 1}/{questions.length}
                    </span>
                </div>

                {/* Question Area */}
                <div className="mt-8 mb-12 text-center">
                    <h2 className="text-gray-400 font-bold uppercase tracking-wider text-sm mb-4">Meaning</h2>
                    <div className="text-4xl font-extrabold text-gray-800 break-words leading-tight">
                        {currentQ.question}
                    </div>
                </div>
            </div>

            {/* Choices Area */}
            <div className="space-y-3 mb-20">
                {currentQ.choices.map((choice, idx) => {
                    let statusClass = "bg-white border-gray-100 text-gray-700 hover:border-blue-200 hover:shadow-md";

                    if (isAnswered) {
                        if (choice.isCorrect) {
                            statusClass = "bg-green-50 border-green-400 text-green-700 shadow-sm ring-1 ring-green-400";
                        } else if (selectedChoice === choice) {
                            statusClass = "bg-red-50 border-red-400 text-red-700 ring-1 ring-red-400";
                        } else {
                            statusClass = "bg-gray-50 border-transparent text-gray-300 opacity-50";
                        }
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleChoice(choice)}
                            disabled={isAnswered}
                            className={`w-full p-4 rounded-2xl border-2 font-bold text-lg transition-all flex items-center justify-between group active:scale-98 ${statusClass}`}
                        >
                            <div>
                                <span className="block">{choice.text}</span>
                                {choice.sub && <span className="block text-xs font-normal opacity-70 mt-0.5">{choice.sub}</span>}
                            </div>

                            {isAnswered && choice.isCorrect && <CheckCircle className="w-6 h-6 text-green-500" />}
                            {isAnswered && selectedChoice === choice && !choice.isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                        </button>
                    );
                })}
            </div>

            {/* Next Button Footer - Fixed or just at bottom */}
            <div className={`fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white to-transparent transition-transform duration-300 ${isAnswered ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="max-w-md mx-auto">
                    <button
                        onClick={handleNext}
                        className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-400 active:scale-95 transition-all flex items-center justify-center space-x-2"
                    >
                        <span>{currentIndex === questions.length - 1 ? 'Finish' : 'Next Question'}</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
