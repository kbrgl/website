export default function NotFound() {
    return (
        <>
            <section className="mt-24 mb-8 grid gap-2">
                <h1 className="text-4xl font-medium font-title dark:text-white max-w-xl">
                    This page could not be found.
                </h1>
                <p className="text-gray-600 dark:text-gray-300 markdown max-w-xl mt-5">
                    I usually maintain redirects for moved URLs, so a missing page
                    probably means I took it down. Reach out to me if you think this
                    was an error.
                </p>
            </section>
        </>
    );
}
