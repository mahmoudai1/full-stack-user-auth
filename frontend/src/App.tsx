import './index.css'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { ProtectedRoute } from './routes/ProtectedRoute'

function App() {
  const { signOut } = useAuth();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            {(user) => (
              <div>
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                  <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
                      Welcome, {user.name}!
                    </h2>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <a
                        href="#"
                        onClick={handleLogout}
                        className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        Logout &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ProtectedRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <ProtectedRoute requireAuth={false}>
            {() => <SignIn />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute requireAuth={false}>
            {() => <SignUp />}
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
