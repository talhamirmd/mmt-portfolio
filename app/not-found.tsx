import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f4efe9] px-5 text-[#171411]">
      <div className="max-w-md text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#5c544d]">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
          Nothing here.
        </h1>
        <p className="mt-5 text-base leading-7 text-[#403a35]">
          The page you&apos;re looking for doesn&apos;t exist, or it moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#171411] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.14em] !text-white transition-transform duration-200 hover:-translate-y-0.5"
        >
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
