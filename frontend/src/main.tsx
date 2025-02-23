import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router'
import CreateRoom from './pages/CreateRoom.tsx'
import JoinRoom from './pages/JoinRoom.tsx'
import Home from './pages/Home.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/createroom',
    element: <CreateRoom />,
  },
  {
    path: '/joinroom',
    element: <JoinRoom />,
  },
  {
    path: '/room/:id',
    element: <App />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
