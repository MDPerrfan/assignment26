import React from 'react'
import { useParams } from 'react-router-dom'
import EventCard from '../components/EventCard'

const CategoryDetail = () => {
  const { id } = useParams()
  
  // This would typically come from an API
  const categoryEvents = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: 'June 15, 2024',
      location: 'Central Park, NY',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 75
    },
    {
      id: 2,
      title: 'Jazz Night',
      date: 'June 20, 2024',
      location: 'Blue Note, NY',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 45
    },
    {
      id: 3,
      title: 'Rock Concert',
      date: 'June 25, 2024',
      location: 'Madison Square Garden, NY',
      image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 120
    }
  ]

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Music Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categoryEvents.map(event => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            image={event.image}
            price={event.price}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryDetail 