'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X } from "lucide-react"
import Image from "next/image"

const streamingServices = [
  {
    name: 'Netflix',
    catalog: 'Gran selección de películas y programas de televisión, incluidos los originales.',
    price: 'S/ 28.90 - S/ 52.90/mes',
    quality: 'Hasta 4K HDR',
    availability: 'Disponible en +190 paises',
    image: '/images/BrandAssets_Logos_01-Wordmark.jpg'
  },
  {
    name: 'Disney+',
    catalog: 'Contenido de Disney, Pixar, Marvel, Star Wars, y National Geographic',
    price: 'S/ 38.90 - S/ 55.90/mes o S/ 326.90 - S/ 469.90/año',
    quality: 'Hasta 4K HDR',
    availability: 'Disponible en +60 paises',
    image: '/images/Disney-scaled.jpg'
  },
  {
    name: 'Amazon Prime Video',
    catalog: 'Películas, programas de televisión y Amazon Originals',
    price: 'S/ 25,90/mes',
    quality: 'Hasta 4K HDR',
    availability: 'Disponible en +200 paises',
    image: '/images/6585c5c426a931289d4d1045.jpg'
  },
  {
    name: 'Crunchyroll',
    catalog: 'Series y peliculas anime, videos musicales, y conciertos',
    price: 'S/ 15.00 - S/ 19.00/mes o S/ 190.00/año',
    quality: 'Hasta 4K',
    availability: 'Casi todo el mundo (execpto algunos lugares de Asia, Bielorrusia y Rusia)',
    image: '/images/1366_521.jpg'
  },
  {
    name: 'HBO Max',
    catalog: 'Contenido de HBO, películas de Warner Bros. y Max Originals',
    price: 'S/ 23.90 - S/ 47.90/mes',
    quality: 'Hasta 4K HDR',
    availability: 'Disponible en +60 paises',
    image: '/images/ODTQHORBQZDOXORGKEN5EZAB2I.jpg'
  }
]

export default function Component() {
  const [selectedServices, setSelectedServices] = useState(['Netflix', 'Disney+', 'Amazon Prime Video'])

  useEffect(() => {
    if (selectedServices.length < 3) {
      const availableServices = streamingServices
        .filter(service => !selectedServices.includes(service.name))
        .map(service => service.name)
      const newServices = [...selectedServices]
      while (newServices.length < 3 && availableServices.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableServices.length)
        newServices.push(availableServices[randomIndex])
        availableServices.splice(randomIndex, 1)
      }
      setSelectedServices(newServices)
    }
  }, [selectedServices])

  const handleServiceChange = (index: number, value: string) => {
    setSelectedServices(prev => {
      const newServices = [...prev]
      if (newServices.includes(value)) {
        const existingIndex = newServices.indexOf(value)
        newServices[existingIndex] = newServices[index]
      }
      newServices[index] = value
      return newServices
    })
  }

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-6">Streaming Service Comparison</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-6xl mx-auto">
        {[0, 1, 2].map((index) => (
          <Select 
            key={index} 
            onValueChange={(value) => handleServiceChange(index, value)} 
            value={selectedServices[index]}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent className="bg-[#2a1f3e] text-white">
              {streamingServices.map((service) => (
                <SelectItem 
                  key={service.name} 
                  value={service.name}
                  disabled={selectedServices.includes(service.name) && selectedServices[index] !== service.name}
                >
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      <div className="overflow-x-auto max-w-6xl mx-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-white/20">
              <TableHead className="w-[150px] text-white">Feature</TableHead>
              {selectedServices.map((service) => (
                <TableHead key={service} className="text-white">{service}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {['catalog', 'price', 'quality', 'availability'].map((feature) => (
              <TableRow key={feature} className="border-b border-white/20">
                <TableCell className="font-medium capitalize text-white">{feature}</TableCell>
                {selectedServices.map((service) => {
                  const serviceData = streamingServices.find(s => s.name === service)
                  return (
                    <TableCell key={`${service}-${feature}`} className="text-white/80">
                      {serviceData ? serviceData[feature] : 'N/A'}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {selectedServices.map((service) => {
          const serviceData = streamingServices.find(s => s.name === service)
          return serviceData ? (
            <div key={service} className="space-y-4">
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">{serviceData.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-white/80">
                      <Check className="mr-2 h-4 w-4 text-green-400" />
                      Gran biblioteca de contenidos
                    </li>
                    <li className="flex items-center text-white/80">
                      <Check className="mr-2 h-4 w-4 text-green-400" />
                      Transmisión de alta calidad
                    </li>
                    <li className="flex items-center text-white/80">
                      {serviceData.name !== 'Hulu' ? (
                        <Check className="mr-2 h-4 w-4 text-green-400" />
                      ) : (
                        <X className="mr-2 h-4 w-4 text-red-400" />
                      )}
                      Disponibilidad internacional
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <div className="relative w-full h-40 rounded-lg overflow-hidden">
                <Image
                  src={serviceData.image}
                  alt={`${serviceData.name} logo`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          ) : null
        })}
      </div>
    </div>
  )
}