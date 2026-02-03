import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function HomeView({ courseData, onSelectChapter }) {
    return (
        <div className="w-full max-w-md mx-auto p-6 space-y-6 animate-in fade-in duration-500">
            <header className="flex items-center justify-between mb-8 pt-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Nihongo Learn</h1>
                    <p className="text-gray-500 font-medium">Let's study Japanese!</p>
                </div>
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                    <span className="text-2xl" role="img" aria-label="Japan Flag">🇯🇵</span>
                </div>
            </header>

            <div className="space-y-4">
                {courseData.map((chapter) => (
                    <button
                        key={chapter.id}
                        onClick={() => onSelectChapter(chapter)}
                        className="w-full text-left bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all active:scale-95 group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${chapter.color || 'bg-gray-300'}`}></div>
                        <div className="pl-4 flex justify-between items-center z-10 relative">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                                    {chapter.title}
                                </h2>
                                <p className="text-sm font-medium text-gray-500 mb-1">{chapter.subtitle}</p>
                                <p className="text-xs text-gray-400 line-clamp-1">{chapter.description}</p>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
