import { Inter, Space_Grotesk } from 'next/font/google';
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata = {
  title: "ATOM | Studio & Agência",
  description: "Desenvolvemos o futuro do seu negócio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
