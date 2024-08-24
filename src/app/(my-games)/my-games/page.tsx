import ProtectedRoute from '@/components/protected-route';

export default function MyGames() {
  return (
    <ProtectedRoute>
      <div>Hi this is myGames page</div>
    </ProtectedRoute>
  );
}
