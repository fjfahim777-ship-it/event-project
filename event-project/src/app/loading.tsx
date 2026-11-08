const Loading = () => {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <button className="btn bg-base-200">
                <span className="loading loading-spinner"></span>
                Loading...
            </button>
        </main>
    );
};

export default Loading;