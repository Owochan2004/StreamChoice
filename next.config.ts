import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.example.com'], // Reemplaza con el dominio de las imágenes externas que usas
  },
};

export default nextConfig;
