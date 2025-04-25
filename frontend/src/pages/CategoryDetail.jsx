import React from 'react'
import { useParams } from 'react-router-dom'
import EventCard from '../components/EventCard'
import { events } from '../assets/assets'

const CategoryDetail = () => {
  const { id } = useParams() // id is actually category name

  // Convert object to array
  const eventArray = Object.values(events)

  // Filter events by category name
  const categoryEvents = eventArray.filter(event => {
    const categoryName = typeof event.category === 'object' 
      ? event.category.name 
      : event.category

    return categoryName.toLowerCase() === id.toLowerCase()
  })

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">{id} Events</h1>
      {categoryEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoryEvents.map((event, index) => (
            <EventCard
              key={index}
              id={event.id || index}
              title={event.title}
              date={event.date}
              location={event.location}
              image={event.image}
              price={event.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-600">No events found in this category.</p>
      )}
    </div>
  )
}

export default CategoryDetail
