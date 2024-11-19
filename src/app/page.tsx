'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)

  const streamingServices = [
    { name: "Netflix", image: "/images/BrandAssets_Logos_01-Wordmark.jpg" },
    { name: "HBOmax", image: "/images/ODTQHORBQZDOXORGKEN5EZAB2I.jpg" },
    { name: "Crunchyroll", image: "/images/1366_521.jpg" },
    { name: "Disney+", image: "/images/Disney-scaled.jpg" },
    { name: "Amazon Prime", image: "/images/6585c5c426a931289d4d1045.jpg" },
  ]

  const featuredMovies = [
    { id: 1, name: "Killer Sofa", image: "/images/unnamed.jpg" },
    { id: 2, name: "Rango", image: "/images/A-Foto-Portada-Rango.jpg" },
    { id: 3, name: "Winnie the pooh blood and honey", image: "/images/Winnie-the-Pooh-Blood-and-Honey-2.jpg" },
  ]

  const newsUpdates = [
    {
      date: "2024-11-15",
      title: "Se anuncia un spin-off de Breaking Bad",
      content: "AMC revela planes para una nueva serie del universo Breaking Bad."
    },
    {
      date: "2024-09-14",
      title: "Actualización de precios de Netflix",
      content: "Netflix anuncia nuevos niveles de suscripción y cambios de precios."
    },
    {
      date: "2024-06-13",
      title: "‘Uzumaki’: la oportunidad desperdiciada",
      content: "La nueva adaptación de Max desató una impresionante ola de comentarios negativos ante la caída de calidad"
    },
    {
      date: "2024-03-12",
      title: "Actualización sobre la fusión de Max",
      content: "Últimos detalles sobre la fusión de Warner Bros. y Discovery."
    },
    {
      date: "2024-01-11",
      title: "Nuevas adquisiciones de anime",
      content: "Crunchyroll anuncia nuevos títulos de anime exclusivos para 2024."
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % streamingServices.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== "") {
      router.push(`/movie-details?title=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleCarouselClick = () => {
    router.push('/streaming-comparison')
  }

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-4">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <Input 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full rounded-full bg-white py-6 pl-4 pr-12 text-black" 
          placeholder="Search..." 
        />
        <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] rounded-r-full">
          <Search className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto">
        <div className="flex-1 space-y-8">
          {/* Streaming Services Carousel */}
          <div className="w-full">
            <div className="relative h-80 overflow-hidden rounded-lg" onClick={handleCarouselClick}>
              {streamingServices.map((service, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                  <div className="absolute bottom-4 left-4 text-2xl font-bold">
                    {service.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              {streamingServices.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${
                    index === currentSlide ? 'bg-white' : 'bg-gray-500 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Featured Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Películas y Series destacadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredMovies.map((movie) => (
                <Card key={movie.id} className="bg-gray-800 border-0">
                  <CardContent className="aspect-video relative p-0">
                    <Image
                      src={movie.image}
                      alt={movie.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    <div className="absolute bottom-4 left-4 text-xl font-bold text-white">
                      {movie.name}            
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* News and Updates Section */}
        <div className="lg:w-80 flex-shrink-0">
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold">News & Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {newsUpdates.map((news, index) => (
                    <div
                      key={index}
                      className="pb-4 border-b border-white/20 last:border-0 cursor-pointer hover:bg-white/5 transition-colors duration-300 rounded-md p-2"
                      onClick={() => router.push(`/streaming-blog?title=${encodeURIComponent(news.title)}`)}
                    >
                      <div className="text-sm text-white/60 mb-1">{news.date}</div>
                      <h3 className="font-semibold mb-1">{news.title}</h3>
                      <p className="text-sm text-white/80">{news.content}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}