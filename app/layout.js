import './globals.css';

export const metadata = {
  title: 'Media Lab | Cloudinary + Next.js',
  description: 'A responsive image lab: compare crops, formats, and quality with Cloudinary and Next.js.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
