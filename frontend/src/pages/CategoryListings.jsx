import React from 'react'
import CategoryCard from '../components/CategoryCard'

const CategoryListings = () => {
  const categories = [
    { id: 1, name: 'Music', icon: '🎵', eventCount: 12 },
    { id: 2, name: 'Sports', icon: '⚽', eventCount: 8 },
    { id: 3, name: 'Arts', icon: '🎨', eventCount: 15 },
    { id: 4, name: 'Food', icon: '🍽️', eventCount: 10 },
    { id: 5, name: 'Technology', icon: '💻', eventCount: 6 },
    { id: 6, name: 'Business', icon: '💼', eventCount: 9 },
    { id: 7, name: 'Education', icon: '📚', eventCount: 7 },
    { id: 8, name: 'Entertainment', icon: '🎭', eventCount: 11 },
  ]

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