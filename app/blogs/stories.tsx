import type { ComponentType } from "react";
import { publicAssetBasePath } from "../lib/contact";
import SocLabStory from "./SocLabStory";

type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "code"; text: string }
  | { type: "img"; src: string; alt: string; caption?: string };

// To add a story: add an entry to this list. Write the body as blocks
// (paragraphs, headings, lists, code), or point `component` at a custom
// component for stories that need diagrams or interactive bits.
export type Story = {
  slug: string;
  title: string;
  tag: string;
  readTime: string;
  summary: string;
  body?: Block[];
  component?: ComponentType;
};

export const stories: Story[] = [
  {
    slug: "soc-lab",
    title: "Building my own SOC lab",
    tag: "Case study",
    readTime: "5 min read",
    summary:
      "Kali on one side, a Windows machine on the other, Wazuh in the middle. I attacked myself and tried to catch it.",
    component: SocLabStory,
  },
  {
    slug: "is-this-website-secure",
    title: "How to check if a website is secure",
    tag: "Quick Learning",
    readTime: "3 min read",
    summary: "What HTTP and HTTPS actually mean, and the three clicks I use to check any site.",
    body: [
      {
        type: "p",
        text: "People ask me this a lot, usually right before they type a card number somewhere. The good news is your browser already does most of the checking. You just need to know where to look.",
      },
      { type: "h", text: "First, HTTP vs HTTPS" },
      {
        type: "p",
        text: "HTTP is how your browser and a website talk to each other. The problem with plain HTTP is that everything goes across in readable text. Anyone sitting on the same network, like on public Wi-Fi at a café, can see what you send, including passwords.",
      },
      {
        type: "p",
        text: "HTTPS is the same thing with an S for secure. It wraps the conversation in encryption (TLS), so anyone in the middle just sees scrambled data. It also proves the site is who it says it is, using a certificate that a trusted authority has signed.",
      },
      {
        type: "ul",
        items: [
          "HTTP: readable by anyone in between, and no proof of who you're talking to.",
          "HTTPS: encrypted, and the site has shown a valid certificate.",
        ],
      },
      { type: "h", text: "How to check, step by step" },
      {
        type: "p",
        text: "I'll use my own portfolio as the example. In Chrome, start with the small icon on the left of the address bar. It used to be a padlock and now looks like two little sliders.",
      },
      {
        type: "img",
        src: "/blogs/https-address-bar.png",
        alt: "Chrome address bar showing the site information icon next to talhamirmd.github.io",
        caption: "Step 1: the icon to the left of the web address.",
      },
      {
        type: "p",
        text: "Click it. If the site uses HTTPS properly, the first line says \"Connection is secure\".",
      },
      {
        type: "img",
        src: "/blogs/https-site-info.png",
        alt: "Chrome site information panel saying Connection is secure",
        caption: "Step 2: \"Connection is secure\" is what you want to see.",
      },
      {
        type: "p",
        text: "Click \"Connection is secure\" to go one level deeper. You should see \"Certificate is valid\". Click that too if you're curious. It shows who the certificate was issued to, who issued it, and when it expires.",
      },
      {
        type: "img",
        src: "/blogs/https-certificate.png",
        alt: "Chrome security panel showing Connection is secure and Certificate is valid",
        caption: "Step 3: a valid certificate means the site proved its identity.",
      },
      { type: "h", text: "Red flags" },
      {
        type: "ul",
        items: [
          "\"Not secure\" next to the address. The site is on plain HTTP, so don't type anything private into it.",
          "A full-page warning like \"Your connection is not private\". The certificate is broken, expired or fake. Go back, don't click through.",
          "A web address that's almost right, like paypa1.com or amaz0n-support.net. Check the spelling every time.",
        ],
      },
      { type: "h", text: "The catch" },
      {
        type: "p",
        text: "HTTPS means the connection is private. It doesn't mean the site is honest. Scam sites get free certificates too, so a scam can still show \"Connection is secure\". Use HTTPS as the minimum, then still check the web address and trust your gut.",
      },
    ],
  },
  {
    slug: "brute-force-triage",
    title: "What I check when a brute-force alert fires",
    tag: "SOC",
    readTime: "4 min read",
    summary: "My checklist for a pile of failed logins, and the one thing that actually matters.",
    body: [
      {
        type: "p",
        text: "The first time I triggered a brute-force alert in my lab, I stared at a few hundred failed logins and had no idea where to start. This is the order I work in now.",
      },
      {
        type: "ol",
        items: [
          "Figure out the scope. Which account, which machine, which IP, and over how long? One account getting hammered from one IP is a different problem to lots of accounts from one IP. That second one is password spraying.",
          "Look for a success. Search the same IP and account for a 4624 after all the 4625s. If there's a success at the end, that's the one I escalate.",
          "Check the logon type. Type 3 is over the network and type 10 is RDP, so both point to someone remote. Type 2 means someone sitting at the keyboard.",
          "Read the failure code. 0xC000006A means the account is real and the password was wrong. 0xC0000064 means the username doesn't exist, which usually means someone is guessing usernames.",
          "Lock it down and write it up. If I'm not sure, I reset the password and block the IP, then note down what I checked and what I ruled out.",
        ],
      },
      {
        type: "p",
        text: "Honestly, most of these turn out to be someone whose phone still has their old password saved. The checklist is for the one time it isn't.",
      },
    ],
  },
  {
    slug: "nmap-vs-nessus",
    title: "Nmap and Nessus aren't the same thing",
    tag: "VAPT",
    readTime: "3 min read",
    summary: "I used to treat them as interchangeable. They're not, and here's how I use them together.",
    body: [
      {
        type: "p",
        text: "The short version: Nmap tells you what's there, Nessus tells you what's wrong with it. I used to run one or the other and call it done. I don't anymore.",
      },
      { type: "h", text: "Nmap first" },
      { type: "code", text: "nmap -sV -sC -p- 192.168.56.0/24" },
      {
        type: "p",
        text: "All ports, service versions, default scripts. What I get back is basically an inventory: which machines are up, which ports are open, and what's listening on them. It's also how I spot things that shouldn't be there at all, like RDP open on a machine that has no reason to have it.",
      },
      { type: "h", text: "Then Nessus" },
      {
        type: "p",
        text: "Nessus takes that list and checks it against known problems: missing patches, weak TLS, default passwords. If you give it credentials it can log in and look at installed software too, which finds a lot more.",
      },
      { type: "h", text: "How I put them together" },
      {
        type: "ul",
        items: [
          "Nmap to confirm what's actually in scope, and to catch machines nobody told me about.",
          "Nessus on those machines, with credentials if I can get them.",
          "Check the high and critical findings by hand before reporting them. Scanners get things wrong.",
          "Once something's fixed, scan again to make sure it really is.",
        ],
      },
    ],
  },
  {
    slug: "encoded-powershell",
    title: "Catching sketchy PowerShell with Sysmon",
    tag: "Endpoint",
    readTime: "3 min read",
    summary: "Why Sysmon is the first thing I'd install on any Windows machine I care about.",
    body: [
      {
        type: "p",
        text: "Attackers love PowerShell because it's already on every Windows machine. Normal Windows logs will tell you PowerShell ran. Sysmon tells you what it ran, what started it, and what it did after.",
      },
      { type: "h", text: "Things that make me look twice" },
      {
        type: "ul",
        items: [
          "-EncodedCommand (or -enc). The command is base64, so you can't read it at a glance.",
          "-WindowStyle Hidden together with -NoProfile. It doesn't want you to see it.",
          "A weird parent. PowerShell started by Word or Excel is almost never a good sign.",
          "IEX with Net.WebClient or Invoke-WebRequest. That's something being downloaded and run straight away.",
        ],
      },
      { type: "h", text: "What I do next" },
      {
        type: "p",
        text: "Sysmon event 1 gives me the full command line, so I can decode the base64 and read it. Event 3 shows if it connected to anything, and event 11 shows if it dropped any files. Between those three I can usually decide whether the machine needs to come off the network.",
      },
      {
        type: "code",
        text: "[Text.Encoding]::Unicode.GetString([Convert]::FromBase64String('<payload>'))",
      },
    ],
  },
];

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "h":
      return (
        <h3 key={index} className="pt-2 text-base font-medium text-[#171411]">
          {block.text}
        </h3>
      );
    case "img":
      return (
        <figure key={index} className="py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${publicAssetBasePath}${block.src}`}
            alt={block.alt}
            loading="lazy"
            className="w-full max-w-md rounded-[16px] border border-[#171411]/10 bg-white shadow-sm"
          />
          {block.caption && (
            <figcaption className="mt-3 text-xs text-[#5c544d]">{block.caption}</figcaption>
          )}
        </figure>
      );
    case "code":
      return (
        <pre
          key={index}
          className="overflow-x-auto rounded-[14px] bg-[#171411] px-4 py-3 font-mono text-xs leading-6 text-[#f4efe9]/85"
        >
          <code>{block.text}</code>
        </pre>
      );
    case "ul":
    case "ol": {
      const List = block.type;
      return (
        <List key={index} className="space-y-3">
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex gap-3">
              <span className="shrink-0 text-[#8b6d5a]">
                {block.type === "ol" ? `${itemIndex + 1}.` : "—"}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </List>
      );
    }
    default:
      return <p key={index}>{block.text}</p>;
  }
}

export function StoryBody({ story }: { story: Story }) {
  if (story.component) {
    const Component = story.component;
    return <Component />;
  }

  return (
    <div className="max-w-2xl space-y-5 text-base leading-7 text-[#403a35]">
      {story.body?.map(renderBlock)}
    </div>
  );
}
