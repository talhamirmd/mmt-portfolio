import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title:"MMT — Mir Mohammed Talha",
 description:"Mir Mohammed Talha. IT support and security in Riyadh, plus lab write-ups and quick security tips."
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><body>{children}</body></html>;
}