import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const EventListings = () => {
  const navigate = useNavigate()
  const { events, user, loading, error } = useApp()
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    sortBy: 'date',
  })

  const handleSaveEvent = async (eventId) => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      // TODO: Implement save event functionality in AppContext
      console.log('Save event:', eventId)
    } catch (err) {
      console.error('Failed to save event:', err)
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesCategory = !filters.category || event.category._id === filters.category
    const matchesSearch = !filters.search || 
      event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.description.toLowerCase().includes(filters.search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (filters.sortBy === 'date') {
      return new Date(a.date) - new Date(b.date)
    }
    if (filters.sortBy === 'price') {
      return a.price - b.price
    }
    return 0
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Events</h1>
      
      {/* Filters */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search events..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEvents.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-indigo-600 font-semibold">${event.price}</span>
                <button
                  onClick={() => handleSaveEvent(event._id)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventListings 