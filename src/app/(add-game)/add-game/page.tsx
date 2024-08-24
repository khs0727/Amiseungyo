import ProtectedRoute from '@/components/protected-route';

export default function AddGame() {
  return (
    <ProtectedRoute>
      <div>Hi this is addGame page</div>
    </ProtectedRoute>
  );
}
