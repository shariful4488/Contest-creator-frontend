const SkeletonCard = () => {
    return (
        <div className="bg-base-200 animate-pulse rounded-[2rem] h-[450px] w-full">
            <div className="bg-base-300 h-56 rounded-t-[2rem]"></div>
            <div className="p-6 space-y-4">
                <div className="h-6 bg-base-300 rounded-full w-1/2"></div>
                <div className="h-8 bg-base-300 rounded-lg w-full"></div>
                <div className="h-16 bg-base-300 rounded-xl w-full"></div>
                <div className="h-12 bg-base-300 rounded-2xl w-full mt-4"></div>
            </div>
        </div>
    );
};
export default SkeletonCard;