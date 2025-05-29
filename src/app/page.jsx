'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [playlistId, setPlaylistId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !playlistId.trim()) {
      alert('Por favor completa ambos campos');
      return;
    }

    router.push(`/board?name=${encodeURIComponent(name)}&playlistId=${encodeURIComponent(playlistId)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-800 to-blue-900 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        
         className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-gray-900"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Bingo Spotify</h1>

        <label className="block mb-4">
          <span className="block mb-1 font-semibold">Nombre del jugador</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded px-3 py-2 text-gray-900"
            placeholder="Tu nombre"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="block mb-1 font-semibold">ID de la Playlist de Spotify</span>
          <input
            type="text"
            value={playlistId}
            onChange={(e) => setPlaylistId(e.target.value)}
            className="w-full rounded px-3 py-2 text-gray-900"
            placeholder="Ej: 5BJzENxDtGG9RNHX3h6E0l"
            required
          />
        </label>

        <button
          type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-3 rounded-lg text-white font-semibold text-lg"

       >
          Ingresar
        </button>
      </form>
    </div>
  );
}
