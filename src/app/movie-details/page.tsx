'use client'

import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState(null)
  const [similarResults, setSimilarResults] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return

    try {
      const res = await fetch(`http://localhost:3000/api/content/search?query=${encodeURIComponent(searchQuery.trim())}`)
      if (!res.ok) throw new Error("Error al buscar contenido")

      const data = await res.json()
      setSearchResult(data[0])
      setSimilarResults(data.slice(1, 4)) // Get up to 3 similar results
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  useEffect(() => {
    if (similarResults.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % similarResults.length);
      }, 5000);
  
      return () => clearInterval(timer);
    }
  }, [similarResults]);

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-4 space-y-8">
      {/* Header with buttons */}
      <header className="flex justify-between items-center mb-6">
        <Link href="/">
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
            Ir a Inicio
          </button>
        </Link>
        <h1 className="text-3xl font-bold">Detalles de la Película</h1>
        <Link href="/platforms">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Ver Plataformas
          </button>
        </Link>
      </header>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-full bg-white py-6 pl-4 pr-12 text-black"
          placeholder="Buscar contenido..."
          aria-label="Buscar contenido"
        />
        <button 
          onClick={handleSearch}
          className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] rounded-r-full"
          aria-label="Buscar"
        >
          <Search className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Title */}
          <h2 className="text-4xl font-bold">{searchResult.titulo}</h2>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Movie Banner */}
            <div className="lg:col-span-2">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={searchResult.imagen_url || "/images/default-image.jpg"}
                  alt={searchResult.titulo}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Description and Platforms */}
            <div className="space-y-4">
              <p className="text-lg">{searchResult.descripcion}</p>

              <h3 className="text-2xl font-semibold">Disponible en:</h3>
              <div className="space-y-4">
                {searchResult.plataformas && searchResult.logos ? (
                  searchResult.plataformas.split(",").map((platform, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={searchResult.logos.split(",")[index] || "/images/default-logo.jpg"}
                          alt={platform}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <span className="text-xl">{platform}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No disponible en ninguna plataforma.</p>
                )}
              </div>
            </div>
          </div>

          {/* Similar Results - Vertical Carousel */}
          <div className="opacity-25 mt-12">
            <h3 className="text-2xl font-semibold mb-4">Resultados similares</h3>
            <div className="relative h-[400px] overflow-hidden">
              {similarResults.map((result, index) => (
                <Card
                  key={index}
                  className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                  } bg-white/10 border-white/20`}
                >
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={result.imagen_url || "/images/default-image.jpg"}
                            alt={result.titulo}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="text-xl font-semibold mb-2">{result.titulo}</h4>
                        <p className="text-sm text-white/80 mb-2">{result.descripcion}</p>
                        <div className="flex flex-wrap gap-2">
                          {result.plataformas && result.logos && 
                            result.plataformas.split(",").map((platform, i) => (
                              <div key={i} className="flex items-center bg-white/20 rounded px-2 py-1">
                                <div className="w-6 h-6 relative mr-2">
                                  <Image
                                    src={result.logos.split(",")[i] || "/images/default-logo.jpg"}
                                    alt={platform}
                                    layout="fill"
                                    objectFit="contain"
                                  />
                                </div>
                                <span className="text-xs">{platform}</span>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {!searchResult && (
        <p className="text-center text-gray-400">Ingresa un título para buscar contenido.</p>
      )}
    </div>
  )
}