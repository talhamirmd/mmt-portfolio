# MMT Portfolio

My personal portfolio. I'm Mir Mohammed Talha, and I work in IT support and security in Riyadh.

**Live site:** https://talhamirmd.github.io/mmt-portfolio/

## What's on it

- **Experience, skills and projects.** The usual portfolio stuff, written the way I'd actually explain it.
- **SOC lab case study.** A home lab where I attack a Windows machine from Kali and try to catch myself in Wazuh.
- **Blogs.** Short write-ups from the lab and from work: brute-force triage, Nmap vs Nessus, spotting encoded PowerShell, and a couple of quick learning posts.
- **Quick Learning.** Small, practical tips, like how to check whether a website is actually secure.
- **Terminal.** A fake shell at the bottom of the page. Try `help`, `nmap talha` or `sudo hire talha`.
- **CTF.** A link to [MMT_CTF](https://mmt-ctf.onrender.com), a small capture-the-flag site I built with four missions.

## Built with

- [Next.js 15](https://nextjs.org/) (App Router, static export)
- React 19 and TypeScript
- Tailwind CSS 4
- Framer Motion for the animations
- Lucide for icons
- GitHub Pages for hosting, deployed with GitHub Actions

## Running it locally

You'll need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Don't run `npm run build` while `npm run dev` is running. They share the `.next` folder, and the dev server will lose its styles. If that happens, stop the server, delete `.next`, and start it again.

## Project layout

```
app/
  page.tsx              the main portfolio page
  layout.tsx            page title and description
  globals.css           base styles
  components/           tech stack, terminal, SOC lab summary, quick learning, CTF bar
  blogs/
    page.tsx            list of all stories
    [slug]/page.tsx     a single story
    stories.tsx         the stories themselves
    SocLabStory.tsx     the SOC lab case study
  lib/contact.ts        CV, WhatsApp and CTF links
public/
  cv.pdf                my CV
  blogs/                screenshots used in blog posts
```

## Adding a blog post

Every story lives in `app/blogs/stories.tsx`. Add a new entry to the `stories` list:

```ts
{
  slug: "my-new-post",          // becomes /blogs/my-new-post
  title: "My new post",
  tag: "Quick Learning",
  readTime: "3 min read",
  summary: "One line for the blog list.",
  body: [
    { type: "p", text: "A paragraph." },
    { type: "h", text: "A heading" },
    { type: "ul", items: ["A point", "Another point"] },
    { type: "code", text: "nmap -sV target" },
    { type: "img", src: "/blogs/screenshot.png", alt: "What the image shows", caption: "Optional caption" },
    { type: "link", href: "https://example.com", text: "A button link" },
  ],
},
```

The blog list, the post page and the "Next story" link all update on their own. Put any images in `public/blogs/`.

## Deployment

Pushing to `main` builds the site and publishes it to GitHub Pages through `.github/workflows/deploy.yml`. The `/mmt-portfolio` base path is only added when the build runs in GitHub Actions, so local development works at the root URL.

## Contact

- Email: talhamirmohd@gmail.com
- LinkedIn: [linkedin.com/in/mirmohdtalha](https://www.linkedin.com/in/mirmohdtalha)
- GitHub: [github.com/talhamirmd](https://github.com/talhamirmd)
