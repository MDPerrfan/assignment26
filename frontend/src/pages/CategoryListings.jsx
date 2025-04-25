import React from 'react'
import CategoryCard from '../components/CategoryCard'
import { events } from '../assets/assets'

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

const CategoryListings = () => {
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
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">All Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
  )
}



export default CategoryListings 