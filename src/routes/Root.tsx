import MainNavigation from '../components/navbar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div>
            <MainNavigation />
            <Outlet />
        </div>
    );
};

export default RootLayout;
