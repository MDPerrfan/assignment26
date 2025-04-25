import Banner from '../components/Banner'
import EventCard from '../components/EventCard'
import CategoryCard from '../components/CategoryCard'

export default function Home() {
  const categories = [
    { id: 1, name: 'Music', icon: '🎵', eventCount: 12 },
    { id: 2, name: 'Sports', icon: '⚽', eventCount: 8 },
    { id: 3, name: 'Arts', icon: '🎨', eventCount: 15 },
    { id: 4, name: 'Food', icon: '🍽️', eventCount: 10 },
  ]

  const events = [
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
      title: 'Tech Conference 2024',
      date: 'July 20, 2024',
      location: 'Convention Center, SF',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 199
    },
    {
      id: 3,
      title: 'Food & Wine Festival',
      date: 'August 5, 2024',
      location: 'Downtown, LA',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 45
    }
  ]

  return (
    <div>
      <Banner 
        title="Discover Amazing Events"
        subtitle="Find and book tickets for the best events in your area"
        backgroundImage="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
                eventCount={category.eventCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map(event => (
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
      </section>
    </div>
  )
}