import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { stories } from "./stories";

export const metadata: Metadata = {
  title: "Blogs — Mir Mohammed Talha",
  description: "Stories from my lab and from work, mostly about security.",
};

export default function BlogsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-16 md:pt-24">
      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5c544d]">Blogs</p>
      <h1 className="text-[2.5rem] font-semibold leading-[0.95] tracking-[-0.06em] text-[#171411] md:text-6xl">
        Things I&apos;ve built, broken and figured out.
      </h1>
      <p className="mt-6 max-w-xl text-base leading-7 text-[#403a35]">
        Mostly security stuff from my lab and from work, written the way I&apos;d
        explain it to a friend.
      </p>

      <div className="mt-14 border-t border-[#171411]/10">
        {stories.map((story) => (
          <article
            key={story.slug}
            className="grid gap-4 border-b border-[#171411]/10 py-8 md:grid-cols-[1fr_auto] md:items-center md:gap-10"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">
                <span className="text-[#8b6d5a]">{story.tag}</span>
                <span className="mx-2 text-[#171411]/25">/</span>
                {story.readTime}
              </p>
              <h2 className="mt-2 text-xl font-medium tracking-[-0.04em] text-[#171411] md:text-2xl">
                {story.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#403a35]">{story.summary}</p>
            </div>

            <Link
              href={`/blogs/${story.slug}`}
              className="inline-flex items-center gap-2 self-start rounded-full border border-[#171411]/15 bg-white px-5 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[#171411] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:self-auto"
            >
              Read more
              <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
