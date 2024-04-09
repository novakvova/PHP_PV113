import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <section className="flex h-screen items-center">
            <div className="container flex flex-col items-center ">
                <div className="flex max-w-md flex-col gap-6 text-center">
                    <h2 className="text-9xl font-extrabold text-gray-600 dark:text-gray-100">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl md:text-3xl dark:text-gray-300">Sorry, we couldn't find this page.</p>
                    <Link to={"/"}>
                        <p className="underline">Go to home</p>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFoundPage;