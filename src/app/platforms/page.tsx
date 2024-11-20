"use client";

import { useEffect, useState } from "react";
import { getPlatforms } from "../../api";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const Platforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const data = await getPlatforms();
        setPlatforms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatforms();
  }, []);

  if (loading) return <p className="text-center text-blue-500">Cargando plataformas...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-6">Plataformas de Streaming</h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.id_plataforma} className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">{platform.nombre}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-32 rounded-lg overflow-hidden">
                <img
                  src={platform.logo_url}
                  alt={platform.nombre}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <p className="text-white/80">
                Precio: <span className="font-bold">${platform.precio}</span>
              </p>
              <p className="text-white/80">Calidad: {platform.calidad}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Platforms;