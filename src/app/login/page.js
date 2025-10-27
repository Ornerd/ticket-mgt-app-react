'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate authentication
    if (formData.email === 'test@test.com' && formData.password === '1234567') {
      const userData = {
        user: formData.email,
        name: 'HNG Instructor'
      }

      localStorage.setItem('ticketapp_session', JSON.stringify(userData))
      router.push('/dashboard')

    } else {
      setErrors({ general: 'Invalid username or password' })
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] py-12 px-4">

        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg relative z-10">
          <div className='flex justify-end mb-6'>
              <Link 
              href="/"
              className=" text-[#1a1a1b] rounded-lg hover:text-blue-700 inline-block"
              >
              <span className='underline ml-2 text-m'>Back to Homepage</span>
              </Link>
          </div>
           

          <h2 className="text-3xl font-bold text-center mb-8">Login to Ortel</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {errors.general && (
              <p className="text-red-600 text-sm text-center">{errors.general}</p>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#163052] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>


         {/* Decorative Circle */}
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-blue-400 rounded-full opacity-10 z-0"></div>
        <div className="absolute -top-15 -left-8 w-80 h-80 bg-blue-400 rounded-full opacity-10 z-0"></div>

      </div>
      <Footer/>
    </>
    
  )
}