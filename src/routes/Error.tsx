import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent';

const ErrorPage = () => {
    const title = 'An Error Occurred';
    const errorMessage = 'Something went wrong!';

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{errorMessage}</p>
            </PageContent>
        </>
    );
};

export default ErrorPage;
