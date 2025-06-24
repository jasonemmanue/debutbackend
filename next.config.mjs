// /next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      // Domaines existants
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      // [AJOUTÉ] Liste complète des domaines pour les logos d'entreprises
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'suindependent.com' },
      { protocol: 'https', hostname: 'news.microsoft.com' },
      { protocol: 'https', hostname: 'global.toyota' },
      { protocol: 'https', hostname: 'www.carrefour.com' },
      { protocol: 'https', hostname: 'media.lesechos.com' },
      { protocol: 'https', hostname: 'assets.new.siemens.com' },
      { protocol: 'https', hostname: 'images.samsung.com' },
      { protocol: 'https', hostname: 'www.lvmh.fr' },
      { protocol: 'https', hostname: 'www.nestle.com' },
      { protocol: 'https', hostname: 'www.dangote.com' },
      { protocol: 'https', hostname: 'investiraucameroun.com' },
      { protocol: 'https', hostname: 'www.lesbrasseriesducameroun.com' },
      { protocol: 'https', hostname: 'www.digitalbusiness.africa' },
      { protocol: 'https', hostname: 'eneocameroon.cm' },
      { protocol: 'https', hostname: 'www.afrilandfirstbank.com' },
      { protocol: 'http', hostname: 'www.scdp.cm' }, // Note: ce domaine utilise HTTP
      { protocol: 'https', hostname: 'chococam.com' },
      { protocol: 'https', hostname: 'group.jumia.com' },
      { protocol: 'https', hostname: 'african.business' },
      { protocol: 'https', hostname: 'www.safaricom.co.ke' },
      { protocol: 'https', hostname: 'www.ocpgroup.ma' },
      { protocol: 'https', hostname: 'corporate.ethiopianairlines.com' },
      { protocol: 'https', hostname: 'www.standardbank.com' },
      { protocol: 'https', hostname: 'sonatrach.com' },
      { protocol: 'https', hostname: 'www.shopriteholdings.co.za' },
      { protocol: 'https', hostname: 'corporateandinvestment.standardbank.com' },
      { protocol: 'https', hostname: 'ecobank.com' },
      { protocol: 'https', hostname: 'www.togofirst.com' },
      { protocol: 'https', hostname: 'www.cevital.com' },
      { protocol: 'https', hostname: 'www.cihbank.ma' },
      { protocol: 'https', hostname: 'kcbgroup.com' },
    ],
  },
};

export default nextConfig;