import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context';
import RootLayout from './routes/root';
import ErrorPage from './routes/error';
import HomePage from './routes/home';
import LoginPage from './routes/login';
import RegisterPage from './routes/register';
import { ContextProvider } from './context/context';

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
        <ContextProvider>
            <AuthContextProvider>
                <RouterProvider router={router}></RouterProvider>
            </AuthContextProvider>
        </ContextProvider>
    );
}

export default App;
