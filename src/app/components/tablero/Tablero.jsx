"use client"; // Asegurate de tener esto si estás en App Router

import { useEffect, useState } from "react";
import Card from "../card/Card";

export default function Tablero() {
  const [songs, setSongs] = useState([]);
  const playlistId = "5BJzENxDtGG9RNHX3h6E0l";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
      const data = await res.json();

      if (data?.tracks?.items) {
        const shuffled = data.tracks.items.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        setSongs(selected);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="grid grid-cols-2 gap-8 row-start-2 w-full max-w-5xl">
      {songs.map(({ track }) => (
        <Card
          key={track.id}
          title={track.name}
          description={track.artists.map((a) => a.name).join(", ")}
          imageUrl={track.album.images?.[0]?.url || "/fallback.jpg"}
        />
      ))}
    </main>
  );
}
