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
  metadataBase: new URL('https://atomstudio.com.br'),
  title: {
    default: "ATOM 2.0 | Studio de Desenvolvimento Web, Landing Pages & Sistemas",
    template: "%s | ATOM 2.0"
  },
  description: "Engenharia digital de elite para marcas de alta performance. Criamos Landing Pages de alta conversão, Sites Institucionais, E-commerce e Sistemas Web sob medida.",
  keywords: [
    "desenvolvimento web",
    "agência de criação de sites",
    "landing page alta conversão",
    "desenvolvimento de sistemas web",
    "estúdio web premium",
    "next.js agência",
    "design de interface ui ux",
    "atom 2.0 studio"
  ],
  authors: [{ name: "ATOM Studio", url: "https://atomstudio.com.br" }],
  creator: "ATOM Studio",
  publisher: "ATOM Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://atomstudio.com.br',
  },
  openGraph: {
    title: "ATOM 2.0 | Studio de Desenvolvimento Web, Landing Pages & Sistemas",
    description: "Engenharia digital de elite. Criamos Landing Pages de alta conversão, Sites Institucionais e Sistemas Web sob medida.",
    url: 'https://atomstudio.com.br',
    siteName: 'ATOM 2.0 Studio',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'ATOM Studio - Engenharia Digital & Desenvolvimento Web',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "ATOM 2.0 | Studio de Desenvolvimento Web",
    description: "Engenharia digital de elite para marcas de alta performance.",
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "ATOM 2.0 Studio & Agência",
  "url": "https://atomstudio.com.br",
  "logo": "https://atomstudio.com.br/icon.png",
  "image": "https://atomstudio.com.br/icon.png",
  "description": "Studio de desenvolvimento web sob medida, focado em landing pages de alta conversão, sites institucionais e sistemas web de elite.",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR"
  },
  "offers": {
    "@type": "OfferCatalog",
    "name": "Serviços de Engenharia Digital & Web",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Landing Pages de Alta Conversão"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sites Institucionais Sob Medida"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sistemas Web e Dashboards Administrativos"
        }
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
