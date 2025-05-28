'use client';

import { useState, useEffect, useRef } from 'react';
import Card from '../card/Card';
import CardBingoFull from '../CardBingoFull/CardBingoFull';
import CardColumnComplete from '../CardColumnComplete/CardColumnComplete';

export default function Board({ tracks }) {
  const [marked, setMarked] = useState(Array(tracks.length).fill(false));
  const [alertType, setAlertType] = useState('');
  const [columnShown, setColumnShown] = useState(false);
  const [bingoShown, setBingoShown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const timeoutRef = useRef(null);

  const handleToggle = (index) => {
    const updated = [...marked];
    updated[index] = !updated[index];
    setMarked(updated);
  };

  const showAlert = (type, duration) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAlertType(type);
    timeoutRef.current = setTimeout(() => {
      setAlertType('');
      timeoutRef.current = null;
    }, duration);
  };

  useEffect(() => {
    const col1Full = marked.filter((_, i) => i % 2 === 0).every(Boolean);
    const col2Full = marked.filter((_, i) => i % 2 === 1).every(Boolean);
    const allFull = marked.every(Boolean);

    if (allFull && !bingoShown) {
      showAlert('bingo', 5000);
      setBingoShown(true);
    } else if ((col1Full || col2Full) && !columnShown && !allFull) {
      showAlert('column', 3000);
      setColumnShown(true);
    }
  }, [marked]);

  // ✅ Aplica la clase 'dark' al <html> cuando cambia darkMode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="relative w-full max-w-3xl mx-auto min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 transition-colors">

      {/* Alert Card */}
      {alertType && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          {alertType === 'bingo' && <CardBingoFull />}
          {alertType === 'column' && <CardColumnComplete />}
        </div>
      )}

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-2 gap-8 mt-8">
        {tracks.map((track, i) => (
          <div key={track.id} onClick={() => handleToggle(i)}>
            <Card title={track.name} active={marked[i]} />
          </div>
        ))}
      </div>
    </div>
  );
}
