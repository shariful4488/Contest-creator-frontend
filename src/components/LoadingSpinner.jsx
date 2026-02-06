const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)]">
            <span className="loading loading-bars loading-lg text-primary"></span>
            <p className="mt-4 text-slate-400 font-medium animate-pulse">
                Fetching Data...
            </p>
        </div>
    );
};

export default LoadingSpinner;