import React from 'react';

const GameFooter: React.FC = () => {
  return (
    <footer className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
      <p>
        📊 This site uses{' '}
        <a
          href="https://umami.is"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Umami
        </a>
        , a privacy-first analytics tool that tracks page views only — no personal data
        is collected.
      </p>
    </footer>
  );
};

export default GameFooter;