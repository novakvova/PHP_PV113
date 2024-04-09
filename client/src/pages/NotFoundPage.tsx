import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <section className="mx-auto flex min-h-screen items-center justify-center">
            <div className="container flex flex-col items-center">
                <div className="flex flex-col gap-6 text-center"><h2
                    className="text-9xl font-extrabold text-gray-600 dark:text-gray-100">
                    <span className="sr-only">Error</span>404 </h2>
                    <p className="text-2xl md:text-3xl dark:text-gray-300">Sorry, we couldn't find this page.</p>
                    <Link to={"/"} className="underline">
                        Go to home </Link>
                </div>
            </div>
        </section>);
};
export default NotFoundPage;