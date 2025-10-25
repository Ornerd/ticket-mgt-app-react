import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Wavy Background */}
      <section className="relative text-[#1a1a1b] max-h-[800px]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-4 text-center flex flex-col items-center justify-center">
          <h1 className="text-9xl font-bold mb-2">Ortel</h1>
          <p className="text-l mb-8 max-w-[400px]">The support ticket management system that is truly streamlined.</p>
          <div className="space-x-4">
            <Link 
              href="/signup" 
              className="bg-[#163052] border-2 border-[#163052] text-[#ffffff] px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 inline-block"
            >
              Get Started
            </Link>

            <Link 
              href="/login" 
              className="border-2 border-[#163052] text-[#163052] px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 hover:text-[#ffffff] inline-block"
            >
              Login
            </Link>
          </div>
        </div>
        {/* Wavy Background */}
        <div className="relative top-0 left-0 w-full overflow-hidden">
          <svg width="1440" height="349" viewBox="0 0 1440 349" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56.2621 105.406C10.6233 2.84481 -47.5955 42.9488 -71 75.8209V312.5H1511V200.735C1508.07 191.969 1495.2 154.714 1467.12 75.8209C1432.01 -22.7955 1357.41 -22.7954 1311.33 75.8209C1265.25 174.437 1203.82 167.863 1131.41 75.8209C1059 -16.221 1063.39 -32.6571 966.845 75.8209C870.301 184.299 872.495 164.576 784.728 75.8209C696.961 -12.9338 626.748 49.5232 607 105.406C587.252 161.288 479.738 269.766 411.718 105.406C343.699 -58.9548 236.184 42.9488 225.214 105.406C214.243 167.863 113.311 233.607 56.2621 105.406Z" fill="#2A5791" stroke="black"/>
          <path d="M59.2621 141.406C13.6233 38.8448 -44.5955 78.9488 -68 111.821V348.5H1514V236.735C1511.07 227.969 1498.2 190.714 1470.12 111.821C1435.01 13.2045 1360.41 13.2046 1314.33 111.821C1268.25 210.437 1206.82 203.863 1134.41 111.821C1062 19.779 1066.39 3.34293 969.845 111.821C873.301 220.299 875.495 200.576 787.728 111.821C699.961 23.0662 629.748 85.5232 610 141.406C590.252 197.288 482.738 305.766 414.718 141.406C346.699 -22.9548 239.184 78.9488 228.214 141.406C217.243 203.863 116.311 269.607 59.2621 141.406Z" fill="#163052"/>
          </svg>

        </div>
        {/* Decorative Circle */}
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-blue-400 rounded-full opacity-10 z-0"></div>
        <div className="absolute -top-15 -left-8 w-80 h-80 bg-blue-400 rounded-full opacity-10 z-0"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#163052] -mt-8 -mb-4 min-h-[50vh]">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {['Easy Management', 'Real-time Updates', 'Secure & Reliable'].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{feature}</h3>
              <p className="text-gray-600">Manage your support tickets efficiently with our intuitive platform.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}