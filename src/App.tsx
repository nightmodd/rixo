import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context';
import RootLayout from './routes/root';
import ErrorPage from './routes/error';
import HomePage from './routes/home';
import LoginPage from './routes/login';
import RegisterPage from './routes/register';

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
