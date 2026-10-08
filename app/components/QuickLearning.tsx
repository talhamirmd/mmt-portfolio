import Link from "next/link";
import { publicAssetBasePath } from "../lib/contact";

const shots = [
  {
    src: "/blogs/https-address-bar.png",
    alt: "The site information icon to the left of the web address in Chrome",
    position: "lg:left-0 lg:top-0 lg:w-[56%] -rotate-3",
  },
  {
    src: "/blogs/https-site-info.png",
    alt: "Chrome panel showing Connection is secure",
    position: "lg:right-0 lg:top-16 lg:w-[60%] rotate-[2.5deg]",
  },
  {
    src: "/blogs/https-certificate.png",
    alt: "Chrome panel showing Certificate is valid",
    position: "lg:left-[10%] lg:top-[250px] lg:w-[58%] -rotate-[1.5deg]",
  },
];

export default function QuickLearning() {
  return (
    <section id="quick-learning" className="mx-auto max-w-7xl px-5 py-20">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:pt-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#5c544d]">
            Quick Learning <span className="text-[#8b6d5a]">· tip 01</span>
          </p>

          <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.05em] text-[#171411] md:text-4xl">
            Before you type your password in, check this.
          </h2>

          <div className="mt-6 max-w-md space-y-4 text-base leading-7 text-[#403a35]">
            <p>
              Quick one. On a plain HTTP site, whatever you type travels as readable
              text. HTTPS scrambles it so nobody in between can read it.
            </p>
            <p>This is how I check, and it takes about five seconds:</p>
            <ol className="space-y-2">
              <li>
                <span className="mr-2 text-[#8b6d5a]">1.</span>
                Click the little icon just before the web address.
              </li>
              <li>
                <span className="mr-2 text-[#8b6d5a]">2.</span>
                You&apos;re hoping to see &ldquo;Connection is secure&rdquo;.
              </li>
              <li>
                <span className="mr-2 text-[#8b6d5a]">3.</span>
                Click it once more. &ldquo;Certificate is valid&rdquo; means the site
                proved who it is.
              </li>
            </ol>
          </div>

          <Link
            href="/blogs/is-this-website-secure"
            className="mt-8 inline-block text-sm font-medium text-[#171411] underline decoration-[#8b6d5a]/50 underline-offset-[6px] transition-colors hover:decoration-[#171411]"
          >
            The longer version, with the red flags I look for →
          </Link>
        </div>

        <div className="relative flex flex-col items-center gap-8 lg:block lg:h-[540px]">
          {shots.map((shot, index) => (
            <figure
              key={shot.src}
              className={`relative w-full max-w-sm rounded-[14px] border border-[#171411]/10 bg-white p-2 shadow-[0_14px_30px_rgba(23,20,17,0.10)] transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.03] lg:absolute lg:max-w-none ${shot.position}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${publicAssetBasePath}${shot.src}`}
                alt={shot.alt}
                loading="lazy"
                className="w-full rounded-[8px]"
              />
              <span className="absolute -left-3 -top-3 grid h-7 w-7 place-items-center rounded-full bg-[#171411] text-[11px] font-medium text-white">
                {index + 1}
              </span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
