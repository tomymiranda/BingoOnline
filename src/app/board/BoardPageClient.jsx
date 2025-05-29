'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Board from '../components/board/Board.jsx';

export default function BoardPageClient() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Jugador';
  const playlistId = searchParams.get('playlistId') || '';

  const [tracks, setTracks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [namePlaylist, setNamePlaylist] = React.useState('');

  const fetchPlaylist = React.useCallback(async () => {
    if (!playlistId) {
      setError('No se proporcionó playlistId');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("ID de la playlist:", playlistId);
      const res = await fetch(`/api/spotify?id=${playlistId}`);
      if (!res.ok) throw new Error('Error al obtener la playlist');
      const data = await res.json();
      console.log("Datos de la playlist:", data);
      setNamePlaylist(data.name);
      const shuffledTracks = data.tracks.items.sort(() => Math.random() - 0.5);
      const random10 = shuffledTracks.slice(0, 10).map(p => p.track);
      setTracks(random10);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [playlistId]);

  React.useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white mb-6"></div>
        <h2 className="text-2xl font-semibold">Cargando playlist...</h2>
        <p className="text-gray-300 mt-2">Preparando tu juego, {name}...</p>
      </div>
    );
  }

  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-gray-100 p-8 sm:p-20 grid grid-rows-[auto_1fr_auto] gap-12 font-sans">
      <main className="row-start-2 max-w-5xl w-full mx-auto">
        <header className="row-start-1 flex flex-col items-center justify-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide drop-shadow-lg select-none mb-2">
            ¡Bienvenido, {name}!
          </h1>
          <p className="text-xl text-gray-300 select-none">
            Playlist seleccionada: <span className="font-semibold">{namePlaylist}</span>
          </p>
          <button
            onClick={fetchPlaylist}
            className="mt-4 px-4 py-2 bg-amber-50 hover:bg-blue-200 rounded-lg shadow-md text-black font-semibold transition-all"
          >
            🔄 Volver a jugar
          </button>
        </header>
        <Board tracks={tracks} />
      </main>

      <footer className="row-start-3 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-300 select-none">
        TM producciones © {new Date().getFullYear()} Todos los derechos reservados
      </footer>
    </div>
  );
}
