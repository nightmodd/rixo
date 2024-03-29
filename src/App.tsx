import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context';
import RootLayout from './routes/root';
import ErrorPage from './routes/error';
import HomePage, { getData } from './routes/home';
import LoginPage from './routes/login';
import RegisterPage from './routes/register';
import Products, { getCollectionData } from './routes/products';

import Product, { getProductData } from './routes/product';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: getData },
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
        loader: getCollectionData,
      },

      {
        path: '/collections/:id/:title',
        element: <Product />,
        loader: getProductData,
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
