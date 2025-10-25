import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
      subsets: ['latin'],
      display: 'swap', // Recommended for better font loading experience
      variable: '--font-poppins', // Defines a CSS variable for easy use
      weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    });

export const metadata = {
  title: 'Ortel - Support Ticket Management system',
  description: 'ticket management is now easier to handle than ever before',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="min-h-screen bg-[#f9f9f9]">
          <div className="max-w-[1440px] mx-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}