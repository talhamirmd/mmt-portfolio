import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title:"MMT — Mir Mohammed Talha",
 description:"IT Support Specialist, Backend Developer and Cybersecurity-focused technology professional."
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><body>{children}</body></html>;
}