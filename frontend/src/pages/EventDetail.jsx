import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EventDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    const foundEvent = events.find(e => e._id === id)
    if (foundEvent) {
      setEvent(foundEvent)
    }
  }, [events, id])

  const handleSaveEvent = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      // TODO: Implement save event functionality in AppContext
      console.log('Save event:', id)
    } catch (err) {
      console.error('Failed to save event:', err)
    }
  }

  const handleDeleteEvent = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return
    }

    try {
      // TODO: Implement delete event functionality in AppContext
      console.log('Delete event:', id)
      navigate('/dashboard')
    } catch (err) {
      console.error('Failed to delete event:', err)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!event) {
    return <div>Event not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-600 mb-6">{event.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold text-indigo-600">${event.price}</span>
            <div className="space-x-4">
              <button
                onClick={handleSaveEvent}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Save Event
              </button>
              {user && user._id === event.organizer?._id && (
                <button
                  onClick={handleDeleteEvent}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete Event
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail 