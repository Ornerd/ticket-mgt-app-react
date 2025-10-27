'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false)
  const [userName, setUserName] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0
  })
  const router = useRouter()

  useEffect(() => {
    
    // Check authentication on client side
    const isAuthenticated = localStorage.getItem('ticketapp_session')
    if (!isAuthenticated) {
      router.push('/login')
      return
    }else {setIsClient(true)}

     // Get user name from localStorage
     const userData = JSON.parse(isAuthenticated)
    setUserName(userData.name || 'User')

    // Load tickets and calculate real stats
    const savedTickets = localStorage.getItem('ticketapp_tickets')
    if (savedTickets) {
      const tickets = JSON.parse(savedTickets)
      calculateStats(tickets)
    }
  }, [router])

  const calculateStats = (tickets) => {
    const total = tickets.length
    const open = tickets.filter(ticket => ticket.status === 'open').length
    const inProgress = tickets.filter(ticket => ticket.status === 'in_progress').length
    const resolved = tickets.filter(ticket => ticket.status === 'closed').length

    setStats({
      total,
      open,
      inProgress,
      resolved
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('ticketapp_session')
    router.push('/')
  }

  const statCards = [
    { label: 'Total Tickets', value: stats.total, color: 'bg-blue-500' },
    { label: 'Open Tickets', value: stats.open, color: 'bg-green-500' },
    { label: 'In Progress', value: stats.inProgress, color: 'bg-amber-500' },
    { label: 'Resolved', value: stats.resolved, color: 'bg-gray-500' },
  ]

  if (!isClient) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <>
    <div className="min-h-screen bg-[#f9f9f9] py-8 px-4">
      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              Hello {userName}!
            </h1>
            <p className="text-gray-600 mt-1">Welcome to your dashboard</p>
          </div>
          <div className="space-x-4">
          
            <button 
              onClick={handleLogout}
              className="bg-red-950 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Logout ➡
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mb-4`}>
                <span className="text-white font-bold text-lg">{stat.value}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{stat.label}</h3>
            </div>
          ))}
        </div>

        {/* cta- manage tickets*/}
        <div class="mb-8 flex items-center justify-end">
              <Link 
              href="/tickets"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block"
            >
              Manage Tickets
            </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>New ticket #001 created</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Ticket #002 status updated to "In Progress"</span>
              <span className="text-sm text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Ticket #003 resolved</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/tickets"
              className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 block"
            >
              Create New Ticket
            </Link>
            <Link 
              href="/tickets"
              className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 block"
            >
              View Open Tickets
            </Link>
            <Link 
              href="/tickets"
              className="bg-amber-600 text-white p-4 rounded-lg text-center hover:bg-amber-700 block"
            >
              View In Progress
            </Link>
          </div>
        </div>
      </div>
    </div>
     {/* Decorative Circle */}
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-blue-400 rounded-full opacity-10 z-0"></div>
        <div className="absolute -top-15 -left-8 w-80 h-80 bg-blue-400 rounded-full opacity-10 z-0"></div>
    <Footer></Footer>
    </>
  )
}