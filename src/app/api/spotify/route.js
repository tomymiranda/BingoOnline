import { getPlaylist } from "@/app/lib/spotify";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'Falta el id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    console.log("ID de la playlist:", id);
    const playlist = await getPlaylist(id);
    return new Response(JSON.stringify(playlist), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'No se pudo obtener la playlist' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
