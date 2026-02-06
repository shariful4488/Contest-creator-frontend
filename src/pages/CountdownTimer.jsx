import { useState, useEffect } from "react";

const CountdownTimer = ({ deadline }) => {
    const [timeLeft, setTimeLeft] = useState("Calculating...");

    useEffect(() => {
        // যদি ডেডলাইন না থাকে তবে ক্যালকুলেট করবে না
        if (!deadline) return;

        const calculateTime = () => {
            const target = new Date(deadline).getTime();
            const now = new Date().getTime();
            const diff = target - now;

            if (isNaN(target)) {
                setTimeLeft("Invalid Date");
                return;
            }

            if (diff <= 0) {
                setTimeLeft("Contest Ended");
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        };

        const timer = setInterval(calculateTime, 1000);
        calculateTime(); // মাউন্ট হওয়ার সাথে সাথে রান হবে

        return () => clearInterval(timer);
    }, [deadline]);

    return (
        <div className="flex items-center gap-2 text-primary font-bold bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
            <span className={`w-2 h-2 rounded-full ${timeLeft === "Contest Ended" ? "bg-red-500" : "bg-primary animate-pulse"}`}></span>
            <span className="font-mono">{timeLeft}</span>
        </div>
    );
};

export default CountdownTimer;