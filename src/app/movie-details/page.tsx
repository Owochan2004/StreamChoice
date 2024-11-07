'use client'

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const similarMovies = [
    {
      title: "Spider-Man: No Way Home",
      image: "/images/I4WT6Y6NTROVRMT44WZUUK2WZY.jpg",
      availableOn: { name: "Prime Video", logo: "/images/6585c5c426a931289d4d1045.jpg" }
    },
    {
      title: "Spider-Man: Homecoming",
      image: "/images/scale.png",
      availableOn: { name: "Netflix", logo: "/images/BrandAssets_Logos_01-Wordmark.jpg" }
    },
    {
      title: "The Amazing Spider-Man",
      image: "/images/images (1).jpg",
      availableOn: { name: "Disney+", logo: "/images/Disney-scaled.jpg" }
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % similarMovies.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-4 space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Input 
          className="w-full rounded-full bg-white py-6 pl-4 pr-12 text-black" 
          placeholder="Search..." 
        />
        <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] rounded-r-full">
          <Search className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Movie Details */}
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Spider-Man: Into the Spider-Verse</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Movie Banner */}
          <div className="md:col-span-2">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/images/AAAABSNH3etouS0GoihwxBESCOoAtj9atRKccYRirAyD_e3c_Z9kCXjvVuCVu43SMWlvOqfn8O-brRAOAvIigK3i6z5M4cDxWJWu0xoS.jpg"
                alt="Spider-Man: Into the Spider-Verse"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Available On */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Disponible en:</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src="/images/BrandAssets_Logos_01-Wordmark.jpg"
                    alt="Netflix"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <span className="text-xl">Netflix</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src="/images/Disney-scaled.jpg  "
                    alt="Disney+"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <span className="text-xl">Disney+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Results - Vertical Carousel */}
      <div className="max-w-6xl mx-auto opacity-25">
        <h2 className="text-2xl font-semibold mb-6">Resultados similares</h2>
        <div className="relative h-[400px] overflow-hidden">
          {similarMovies.map((movie, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-semibold mb-4">{movie.title}</h3>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={movie.image}
                      alt={movie.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Disponible en:</h2>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={movie.availableOn.logo}
                        alt={movie.availableOn.name}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <span className="text-xl">{movie.availableOn.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}