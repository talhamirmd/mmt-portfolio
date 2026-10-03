import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StoryBody, stories } from "../stories";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  return story
    ? { title: `${story.title} — Mir Mohammed Talha`, description: story.summary }
    : {};
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const index = stories.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const story = stories[index];
  const next = stories[(index + 1) % stories.length];

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-12 md:pt-16">
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#171411]/65 transition-colors hover:text-[#171411]"
      >
        <ArrowLeft size={14} />
        All stories
      </Link>

      <p className="mt-10 text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">
        <span className="text-[#8b6d5a]">{story.tag}</span>
        <span className="mx-2 text-[#171411]/25">/</span>
        {story.readTime}
      </p>
      <h1 className="mt-3 text-[2.25rem] font-semibold leading-[1] tracking-[-0.05em] text-[#171411] md:text-6xl">
        {story.title}
      </h1>

      <div className="mt-8">
        <StoryBody story={story} />
      </div>

      {stories.length > 1 && (
        <Link
          href={`/blogs/${next.slug}`}
          className="group mt-20 flex items-center justify-between gap-6 border-t border-[#171411]/10 pt-8"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">Next story</p>
            <p className="mt-2 text-lg font-medium tracking-[-0.03em] text-[#171411] transition-colors group-hover:text-[#8b6d5a] md:text-xl">
              {next.title}
            </p>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#171411]/15 bg-white text-[#171411]">
            <ArrowRight size={16} />
          </span>
        </Link>
      )}
    </div>
  );
}
