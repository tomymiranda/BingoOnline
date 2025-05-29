import { Suspense } from 'react';
import BoardPageClient from './BoardPageClient';

export default function BoardPage() {
  return (
    <Suspense fallback={<div>Cargando juego...</div>}>
      <BoardPageClient />
    </Suspense>
  );
}
