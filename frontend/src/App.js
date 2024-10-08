import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Pages/register';

function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element : <div> home page </div>

    },
    {
      path : '/register',
      element : <Register></Register>

    }
  ])
  return (
   <>
   <RouterProvider router={router}></RouterProvider>
   </>
  );
}

export default App;
