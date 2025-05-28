export async function getAccessToken() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  const credentials = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error en getAccessToken:", errorText);
    throw new Error("No se pudo obtener el token de acceso");
  }

  const data = await res.json();
  return data.access_token;
}

export async function getPlaylist(playlistId) {
  console.log("llegue a getPlaylist en lib");
  const access_token = await getAccessToken();
console.log("playlistId:", playlistId); // Verifica que el ID de la playlist se pase correctamente
  console.log("Access Token:", access_token); // Verifica que el token se obtenga correctamente

  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  if (!res.ok) {
    const errorText = await res.text(); // esto te dará más info
    console.error("Error al obtener la playlist:", errorText);
    throw new Error("Error al obtener la playlist");
  }

  const data = await res.json();
  return data;
}

