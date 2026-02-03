import React from 'react';
import { ArrowLeft, BookA, AlignLeft } from 'lucide-react';

export default function ChapterDetailView({ chapter, onBack, onStartMode }) {
    if (!chapter) return null;

    return (
        <div className="w-full max-w-md mx-auto p-6 min-h-screen flex flex-col animate-in slide-in-from-right duration-300">
            <button
                onClick={onBack}
                className="self-start p-3 -ml-3 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors mb-2"
                aria-label="Back"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="mt-2 mb-10">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-4 shadow-sm ${chapter.color}`}>
                    {chapter.title}
                </span>
                <h1 className="text-4xl font-extrabold text-gray-800 mb-3 tracking-tight">{chapter.subtitle}</h1>
                <p className="text-gray-500 leading-relaxed font-medium">{chapter.description}</p>
            </div>

            <div className="space-y-4 flex-1">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 ml-1">Select Learning Mode</h3>

                {chapter.categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onStartMode(cat.id)}
                        className="w-full bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all active:scale-95 flex items-center space-x-5 group"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-colors ${cat.id === 'vocab' ? 'bg-blue-50 text-blue-500 group-hover:bg-blue-100' : 'bg-pink-50 text-pink-500 group-hover:bg-pink-100'}`}>
                            {cat.id === 'vocab' ? <BookA className="w-7 h-7" /> : <AlignLeft className="w-7 h-7" />}
                        </div>
                        <div className="text-left flex-1">
                            <h3 className="font-bold text-xl text-gray-800 group-hover:text-primary transition-colors">{cat.title}</h3>
                            <p className="text-sm text-gray-400 font-medium">{cat.items.length} Questions</p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all duration-300">
                            <ArrowLeft className="w-5 h-5 text-gray-300 rotate-180" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
