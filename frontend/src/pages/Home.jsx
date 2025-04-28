import Banner from '../components/Banner'
import EventCard from '../components/EventCard'
import CategoryCard from '../components/CategoryCard'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
  const { events, loading } = useContext(AppContext)
  const categoryIcons = {
    Music: '🎵',
    Sports: '⚽',
    Arts: '🎨',
    Food: '🍽️',
    Technology: '💻',
    Business: '💼',
    Education: '📚',
    Entertainment: '🎭',
  }

  // Convert events object to array
  const eventArray = Object.values(events)

  // Create a map to count events per category
  const categoryMap = {}

  eventArray.forEach(event => {
    const categoryName = event.category || 'Unknown'
    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = { count: 1 }
    } else {
      categoryMap[categoryName].count++
    }
  })

  // Create array of categories
  const categories = Object.entries(categoryMap).map(([name, data], index) => ({
    id: index + 1,
    name,
    icon: categoryIcons[name] || '📌',
    eventCount: data.count
  }))

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
            {loading ? (
              // Loading skeleton for categories
              Array(8).fill(0).map((_, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <Skeleton height={40} width={40} circle className="mb-4" />
                  <Skeleton height={24} width={100} className="mb-2" />
                  <Skeleton height={20} width={60} />
                </div>
              ))
            ) : (
              categories.map(category => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                  eventCount={category.eventCount}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton for events
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton height={200} />
                  <div className="p-6">
                    <Skeleton height={28} width={200} className="mb-4" />
                    <Skeleton height={20} width={150} className="mb-2" />
                    <Skeleton height={20} width={100} className="mb-2" />
                    <Skeleton height={20} width={80} />
                  </div>
                </div>
              ))
            ) : (
              eventArray
                .slice()
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 3)
                .map(event => (
                  <EventCard
                    key={event._id}
                    id={event._id}
                    title={event.name}
                    date={event.date}
                    location={event.location}
                    image={event.image}
                    price={event.price}
                  />
                ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}