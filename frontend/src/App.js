import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Pages/register';
import Login from './Pages/Login';
import Home from './Pages/Home';

function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element : <div> home page </div>

    },
    {
      path : '/login',
      element : <Login></Login>

    },
    {
      path : '/register',
      element : <Register></Register>

    },
    {
      path : '/home',
      element : <Home></Home>

    }
  ])
  return (
   <>
   <RouterProvider router={router}></RouterProvider>
   </>
  );
}

export default App;
