'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const streamingServices = [
    { name: "Netflix", image: "/images/BrandAssets_Logos_01-Wordmark.jpg" },
    { name: "HBOmax", image: "/images/ODTQHORBQZDOXORGKEN5EZAB2I.jpg" },
    { name: "Crunchyroll", image: "/images/1366_521.jpg" },
    { name: "Disney+", image: "/images/Disney-scaled.jpg" },
    { name: "Amazon Prime", image: "/images/6585c5c426a931289d4d1045.jpg" },
  ];

  const featuredMovies = [
    { id: 1, name: "Killer Sofa", image: "/images/unnamed.jpg" },
    { id: 2, name: "Rango", image: "/images/A-Foto-Portada-Rango.jpg" },
    { id: 3, name: "Winnie the pooh blood and honey", image: "/images/Winnie-the-Pooh-Blood-and-Honey-2.jpg" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % streamingServices.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== "") {
      // Redirect to /movie-details with the search term as a parameter
      router.push(`/movie-details?title=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle click on carousel image
  const handleCarouselClick = () => {
    router.push('/streaming-comparison'); // Navigate to streaming-comparison page
  };

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-4 space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
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

      {/* Streaming Services Carousel */}
      <div className="max-w-6xl mx-auto">
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
      <div className="max-w-6xl mx-auto">
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
  );
}
