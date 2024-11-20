'use client'

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState(null)

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return

    try {
      const res = await fetch(`http://localhost:3000/api/content/search?query=${encodeURIComponent(searchQuery.trim())}`)
      if (!res.ok) throw new Error("Error al buscar contenido")

      const data = await res.json()
      setSearchResult(data[0]) // Solo mostramos el primer resultado para mantener el diseño
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-4 space-y-8">
      {/* Header with buttons */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <Link href="/">
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
              Ir a Inicio
            </button>
          </Link>
        </div>
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
          className="w-full rounded-full bg-white py-6 pl-4 pr-12 text-black"
          placeholder="Buscar contenido..."
        />
        <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] rounded-r-full">
          <button onClick={handleSearch}>
            <Search className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Title */}
          <h1 className="text-4xl font-bold">{searchResult.titulo}</h1>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Movie Banner */}
            <div className="md:col-span-2">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                {searchResult.imagen_url ? (
                  <Image
                    src={searchResult.imagen_url} // Usa el campo "imagen_url" de tu base de datos
                    alt={searchResult.titulo}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                ) : (
                  <img
                    src="/images/default-image.jpg" // Imagen por defecto si no hay imagen_url
                    alt="Imagen no disponible"
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Description and Platforms */}
            <div className="space-y-4">
              {/* Description */}
              <p className="text-lg">{searchResult.descripcion}</p>

              <h2 className="text-2xl font-semibold">Disponible en:</h2>
              <div className="space-y-4">
                {searchResult.plataformas && searchResult.logos ? (
                  searchResult.plataformas.split(",").map((platform, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={searchResult.logos.split(",")[index] || "/images/default-logo.jpg"} // Aquí usamos el índice para obtener el logo correspondiente
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
        </div>
      )}

      {!searchResult && (
        <p className="text-center text-gray-400">Ingresa un título para buscar contenido.</p>
      )}
    </div>
  )
}
