@import "tailwindcss";

@theme {
  /* কাস্টম স্লো পালস অ্যানিমেশন */
  --animate-pulse-slow: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  
  /* কাস্টম স্লো বাউন্স অ্যানিমেশন */
  --animate-bounce-slow: bounce 3s infinite;
}

@utility animate-pulse-slow {
  animation: var(--animate-pulse-slow);
}

@utility animate-bounce-slow {
  animation: var(--animate-bounce-slow);
}