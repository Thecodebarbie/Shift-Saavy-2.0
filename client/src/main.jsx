import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Landing from './pages/Landing.jsx'
import Authenticate from './pages/Authenticate.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CallOff from './pages/CallOff.jsx'
import Schedule from './pages/Schedule.jsx'






const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path:'/login',
        element: <Login />
      },
      {
        path:'/signup',
        element: <Signup />
      },
      {
        path:'/dashboard',
        element: <Dashboard />

      },
      {
        path:'/schedule',
        element: <Schedule />

      },
      {
        path:'/calloff/:id',
        element: <CallOff />

      },
      {
        path:'/calloff',
        element: <CallOff />

      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
