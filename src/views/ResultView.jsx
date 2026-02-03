import React, { useEffect } from 'react';
import { RefreshCw, Home, Trophy, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResultView({ score, total, onRetry, onHome }) {
    const percentage = Math.round((score / total) * 100);

    let message = "Good effort!";
    let icon = <Star className="w-12 h-12 text-yellow-400" />;

    if (percentage === 100) {
        message = "Perfect!!";
        icon = <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />;
    } else if (percentage >= 80) {
        message = "Great Job!";
        icon = <Trophy className="w-12 h-12 text-yellow-500" />;
    } else if (percentage >= 60) {
        message = "Nice Try!";
    }

    useEffect(() => {
        if (percentage >= 80) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, [percentage]);

    return (
        <div className="w-full max-w-md mx-auto p-6 min-h-screen flex flex-col items-center justify-center animate-in zoom-in duration-300">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full text-center mb-8">
                <div className="flex justify-center mb-6">
                    <div className="bg-yellow-50 p-6 rounded-full ring-8 ring-yellow-50/50">
                        {icon}
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-2">{message}</h2>
                <p className="text-gray-400 font-medium mb-6">You scored</p>

                <div className="text-6xl font-black text-primary mb-2">
                    {score}<span className="text-3xl text-gray-300 font-normal">/{total}</span>
                </div>

                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-2">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ${percentage >= 80 ? 'bg-accent' : 'bg-primary'}`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <p className="text-right text-xs font-bold text-gray-400">{percentage}% Accuracy</p>
            </div>

            <div className="w-full space-y-4">
                <button
                    onClick={onRetry}
                    className="w-full bg-primary text-white p-4 rounded-2xl font-bold shadow-lg hover:bg-blue-400 hover:shadow-blue-200/50 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                    <RefreshCw className="w-5 h-5" />
                    <span>Try Again</span>
                </button>

                <button
                    onClick={onHome}
                    className="w-full bg-white text-gray-600 p-4 rounded-2xl font-bold border-2 border-transparent hover:border-gray-200 transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                    <Home className="w-5 h-5" />
                    <span>Back to Home</span>
                </button>
            </div>
        </div>
    );
}
