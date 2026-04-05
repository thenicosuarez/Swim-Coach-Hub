import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">This lane is closed.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
      >
        Swim Back Home
      </Link>
    </div>
  );
}
