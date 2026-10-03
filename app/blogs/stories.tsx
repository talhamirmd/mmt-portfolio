import type { ComponentType } from "react";
import SocLabStory from "./SocLabStory";

type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "code"; text: string };

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
