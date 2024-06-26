import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Home from './components/Homepage.jsx'
import Profile from './components/Profile.jsx'
import Browse from './components/Browse.jsx'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <App />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/', element: <Home />, index: true},
      { path: '/profile', element: <Profile />},
      { path: '/browse', element: <Browse />}
    ],
    errorElement: <h1>404 Not Found</h1>
   },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  < RouterProvider router={router} />
)
