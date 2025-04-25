import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute 