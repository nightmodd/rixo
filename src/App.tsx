import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './routes/Root';
import ErrorPage from './routes/Error';
import HomePage from './routes/Home';
import LoginPage from './routes/Login';
import RegisterPage from './routes/Register';

import './App.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [{ index: true, element: <HomePage /> }],
    },
    {
        path: 'Login',
        element: <LoginPage />,
    },
    {
        path: 'Register',
        element: <RegisterPage />,
    },
]);
function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
