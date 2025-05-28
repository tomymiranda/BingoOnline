'use client';

export default function SuccessCard({ message }) {
  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg animate-bounce z-50">
      <strong>{message}</strong>
    </div>
  );
}
