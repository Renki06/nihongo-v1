import React, { useState } from 'react';
import HomeView from './views/HomeView';
import ChapterDetailView from './views/ChapterDetailView';
import QuizView from './views/QuizView';
import ResultView from './views/ResultView';
import { courseData } from './data/courseData';

function App() {
  // Views: 'HOME', 'DETAIL', 'QUIZ', 'RESULT'
  const [view, setView] = useState('HOME');
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentScore, setCurrentScore] = useState({ score: 0, total: 0 });

  // Navigation Handlers
  const goHome = () => {
    setView('HOME');
    setSelectedChapter(null);
    setSelectedCategory(null);
  }

  const selectChapter = (chapter) => {
    setSelectedChapter(chapter);
    setView('DETAIL');
  };

  const startQuiz = (categoryId) => {
    const category = selectedChapter.categories.find(c => c.id === categoryId);
    setSelectedCategory(category);
    setView('QUIZ');
  };

  const finishQuiz = (score, total) => {
    setCurrentScore({ score, total });
    setView('RESULT');
  };

  const [retryCount, setRetryCount] = useState(0);

  const retryQuiz = () => {
    setRetryCount(c => c + 1);
    setView('QUIZ');
    // Using key in QuizView to force re-mount is simplest way to reset state
  };

  // View Router
  return (
    <div className="min-h-screen bg-background text-gray-800 font-sans selection:bg-blue-100">
      {view === 'HOME' && (
        <HomeView
          courseData={courseData}
          onSelectChapter={selectChapter}
        />
      )}

      {view === 'DETAIL' && (
        <ChapterDetailView
          chapter={selectedChapter}
          onBack={goHome}
          onStartMode={startQuiz}
        />
      )}

      {view === 'QUIZ' && (
        <QuizView
          key={`${selectedChapter?.id}-${selectedCategory?.id}-${retryCount}`} // Force reset on retry
          categoryData={selectedCategory}
          onFinish={finishQuiz}
          onAbort={() => setView('DETAIL')}
        />
      )}

      {view === 'RESULT' && (
        <ResultView
          score={currentScore.score}
          total={currentScore.total}
          onRetry={retryQuiz}
          onHome={goHome}
        />
      )}
    </div>
  );
}

export default App;
