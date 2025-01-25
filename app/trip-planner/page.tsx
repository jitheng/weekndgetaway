import React from 'react'
import { MapPin, Cloud } from 'lucide-react'

// If you see any errors after this import, we'll need to install it
console.log("Icons loaded:", !!MapPin, !!Cloud)

const popularDestinations = [
  {
    name: "Nandi Hills",
    distance: "60 km",
    duration: "1 day",
    difficulty: "Easy",
    bestTime: "Early morning for sunrise",
    description: "Famous sunrise point and weekend getaway with ancient temples and cycling trails.",
  },
  {
    name: "Skandagiri",
    distance: "70 km",
    duration: "1 day",
    difficulty: "Moderate",
    bestTime: "Night trek for sunrise",
    description: "Popular night trekking destination with ruins of an ancient fortress.",
  },
  {
    name: "Savandurga",
    distance: "50 km",
    duration: "1 day",
    difficulty: "Moderate to Hard",
    bestTime: "Early morning",
    description: "Asia's largest monolith hill, perfect for rock climbing and trekking.",
  },
  {
    name: "Ramanagara",
    distance: "55 km",
    duration: "1 day",
    difficulty: "Varies",
    bestTime: "Early morning",
    description: "Rock climbing paradise and location of the famous movie Sholay.",
  }
]

export default function TripPlanner() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bengaluru Trip Planner</h1>
      
      {/* Quick Tips Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Essential Trip Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="font-bold mb-2">Best Time to Visit</h3>
            <p>October to February offers pleasant weather for outdoor activities</p>
          </div>
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="font-bold mb-2">Transportation</h3>
            <p>Early morning starts recommended to avoid Bengaluru traffic</p>
          </div>
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="font-bold mb-2">What to Pack</h3>
            <p>Water, snacks, sunscreen, hat, and comfortable hiking shoes</p>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Popular Trekking Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularDestinations.map((dest) => (
            <div key={dest.name} className="border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">{dest.name}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-semibold">Distance:</span> {dest.distance}
                </div>
                <div>
                  <span className="font-semibold">Duration:</span> {dest.duration}
                </div>
                <div>
                  <span className="font-semibold">Difficulty:</span> {dest.difficulty}
                </div>
                <div>
                  <span className="font-semibold">Best Time:</span> {dest.bestTime}
                </div>
              </div>
              <p className="text-muted-foreground">{dest.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trip Planning Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Plan Your Trip</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Weather Forecast</h3>
            <p className="mb-4">Check the weather before planning your trek:</p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded">
              Check Weather
            </button>
          </div>
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Route Planning</h3>
            <p className="mb-4">Plan your route and get directions:</p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded">
              Open Maps
            </button>
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Safety Guidelines</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Always trek in groups and inform someone about your plans</li>
          <li>Carry sufficient water and energy snacks</li>
          <li>Check weather conditions before starting your trek</li>
          <li>Carry basic first aid supplies</li>
          <li>Start early to avoid afternoon heat and traffic</li>
        </ul>
      </section>
    </div>
  )
} 