'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Search } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const streamingServices = [
    { name: "Netflix", image: "/placeholder.svg?height=192&width=384" },
    { name: "HBOmax", image: "/placeholder.svg?height=192&width=384" },
    { name: "Crunchyroll", image: "/placeholder.svg?height=192&width=384" },
    { name: "Disney+", image: "/placeholder.svg?height=192&width=384" },
    { name: "Amazon Prime", image: "/placeholder.svg?height=192&width=384" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % streamingServices.length)
    }, 3000) // Change slide every 3 seconds

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

      {/* Streaming Services Carousel */}
      <div className="max-w-6xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {streamingServices.map((service, index) => (
              <CarouselItem key={index} className="basis-full">
                <Card className="bg-transparent border-0">
                  <CardContent className="relative h-48 p-0">
                    <Image
                      src={service.image}
                      alt={service.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    <div className="absolute bottom-4 left-4 text-2xl font-bold">
                      {service.name}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center mt-4">
          {streamingServices.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentSlide ? 'bg-white' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Películas y Series destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="bg-gray-800 border-0">
              <CardContent className="aspect-video relative p-0">
                <Image
                  src={`/placeholder.svg?height=270&width=480`}
                  alt={`Película ${index}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute bottom-4 left-4 text-xl font-bold">
                  Película {index}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}