@import "tailwindcss";

@theme {
  --animate-pulse-slow: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-bounce-slow: bounce 3s infinite;
}

@utility animate-pulse-slow {
  animation: var(--animate-pulse-slow);
}

@utility animate-bounce-slow {
  animation: var(--animate-bounce-slow);
}
