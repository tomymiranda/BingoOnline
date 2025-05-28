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

  React.useEffect(() => {
    if (!playlistId) {
      setError('No se proporcionó playlistId');
      setLoading(false);
      return;
    }

    async function fetchPlaylist() {
      try {
        console.log("ID de la playlist:", playlistId); // Verifica que el ID de la playlist se pase correctamente
        const res = await fetch(`/api/spotify?id=${playlistId}`);
        if (!res.ok) throw new Error('Error al obtener la playlist');
        const data = await res.json();

        const shuffledTracks = data.tracks.items.sort(() => Math.random() - 0.5);
        const random10 = shuffledTracks.slice(0, 10).map(p => p.track);
        setTracks(random10);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaylist();
  }, [playlistId]);

  if (loading) return <div className="text-center p-8 text-white">Cargando playlist...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-gray-100 p-8 sm:p-20 grid grid-rows-[auto_1fr_auto] gap-12 font-sans">
      <main className="row-start-2 max-w-5xl w-full mx-auto">
        <header className="row-start-1 flex flex-col items-center justify-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide drop-shadow-lg select-none mb-2">
            ¡Bienvenido, {name}!
          </h1>
          <p className="text-xl text-gray-300 select-none">Playlist seleccionada: <span className="font-semibold">{playlistId}</span></p>
        </header>
        <Board tracks={tracks} />
      </main>

      <footer className="row-start-3 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-300 select-none">
        © {new Date().getFullYear()} Todos los derechos reservados
      </footer>
    </div>
  );
}
