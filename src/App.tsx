import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context';
import RootLayout from './routes/root';
import ErrorPage from './routes/error';
import HomePage from './routes/home';
import LoginPage from './routes/login';
import RegisterPage from './routes/register';
import Products from './routes/products';
import Product from './routes/product';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/Login',
        element: <LoginPage />,
      },
      {
        path: '/Register',
        element: <RegisterPage />,
      },
      {
        path: '/collections/:id',
        element: <Products />,
      },
      {
        path: '/collections/:id/:title',
        element: <Product />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  );
}

export default App;
