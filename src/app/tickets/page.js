'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function TicketManagement() {
  const [isClient, setIsClient] = useState(false)
  const [tickets, setTickets] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingTicket, setEditingTicket] = useState(null)
  const router = useRouter()

  // Sample initial tickets
  // Replace the initialTickets array with this:
const initialTickets = [
  {
    id: 1,
    title: 'Login issue on mobile',
    description: 'Users cannot login on mobile app',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Dashboard loading slow',
    description: 'Dashboard takes more than 5 seconds to load',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    title: 'Update user profile feature',
    description: 'Add ability to update profile picture',
    status: 'closed',
    priority: 'low',
    createdAt: '2024-01-10'
  },
  {
    id: 4,
    title: 'Password reset not working',
    description: 'Users not receiving password reset emails',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-13'
  },
  {
    id: 5,
    title: 'Add dark mode support',
    description: 'Implement dark mode across the application',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-01-12'
  },
  {
    id: 6,
    title: 'Fix typo in welcome message',
    description: 'Correct spelling error on landing page',
    status: 'closed',
    priority: 'low',
    createdAt: '2024-01-11'
  },
  {
    id: 7,
    title: 'Mobile menu not closing',
    description: 'Navigation menu stays open on mobile devices',
    status: 'open',
    priority: 'medium',
    createdAt: '2024-01-09'
  },
  {
    id: 8,
    title: 'Issues with HNG',
    description: 'Dem wan kill me ehh',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2025-10-24'
  }
]

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('ticketapp_session')
    if (!isAuthenticated) {
      router.push('/login')
      return
    }else { setIsClient(true) }
    
    // Load tickets from localStorage or use initial tickets
    const savedTickets = localStorage.getItem('ticketapp_tickets')
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets))
    } else {
      setTickets(initialTickets)
      localStorage.setItem('ticketapp_tickets', JSON.stringify(initialTickets))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('ticketapp_session')
    router.push('/')
  }

  const handleCreateTicket = (ticketData) => {
    const newTicket = {
      id: Date.now(),
      ...ticketData,
      createdAt: new Date().toISOString().split('T')[0]
    }
    const updatedTickets = [...tickets, newTicket]
    setTickets(updatedTickets)
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets))
    setShowCreateForm(false)
  }

  const handleUpdateTicket = (updatedTicket) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    )
    setTickets(updatedTickets)
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets))
    setEditingTicket(null)
  }

  const handleDeleteTicket = (ticketId) => {
    if (confirm('Are you sure you want to delete this ticket?')) {
      const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId)
      setTickets(updatedTickets)
      localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-amber-100 text-amber-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!isClient) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
    
            <Link 
              href="/dashboard"
              className=" text-[#1a1a1b] rounded-lg hover:text-blue-700 inline-block"
            >
             ⬅<span className='underline ml-2 text-xl'>Back to Dashboard</span>
            </Link>

            <button 
              onClick={handleLogout}
              className="bg-red-950 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Logout ➡
            </button>
        
        </div>

        {/* Create Ticket Form */}
        {showCreateForm && (
          <CreateTicketForm 
            onSave={handleCreateTicket}
            onCancel={() => setShowCreateForm(false)}
          />
        )}

        {/* Edit Ticket Form */}
        {editingTicket && (
          <EditTicketForm 
            ticket={editingTicket}
            onSave={handleUpdateTicket}
            onCancel={() => setEditingTicket(null)}
          />
        )}

        {/* Tickets List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4'>
             <h2 className="text-xl font-semibold">All Tickets ({tickets.length})</h2>
            <button 
                onClick={() => setShowCreateForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Create New Ticket
            </button>
          </div>
         
          {tickets.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No tickets yet. Create your first ticket!</p>
          ) : (
            <div className="grid gap-4">
              {/* Added slice.reverse mthothds to ensure that newer tickets appear above in the list, while preserving the original ticket data */}
              {tickets.slice().reverse().map((ticket) => (
                <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{ticket.title}</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setEditingTicket(ticket)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteTicket(ticket.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{ticket.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority} priority
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Created: {ticket.createdAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Decorative Circle */}
          <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-blue-400 rounded-full opacity-10 z-0"></div>
          <div className="absolute -top-15 -left-8 w-80 h-80 bg-blue-400 rounded-full opacity-10 z-0"></div>
    </div>
    <Footer/>
    </>
  )
}

// Create Ticket Form Component
function CreateTicketForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.status) newErrors.status = 'Status is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave(formData)
    setFormData({ title: '', description: '', status: 'open', priority: 'medium' })
    setErrors({})
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">Create New Ticket</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Create Ticket
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

// Edit Ticket Form Component
function EditTicketForm({ ticket, onSave, onCancel }) {
  const [formData, setFormData] = useState(ticket)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.status) newErrors.status = 'Status is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave(formData)
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">Edit Ticket</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Update Ticket
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}