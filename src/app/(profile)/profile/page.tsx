import ProtectedRoute from '@/components/protected-route';

export default function Profile() {
  return (
    <ProtectedRoute>
      <div>Hi this is profile page</div>
    </ProtectedRoute>
  );
}
