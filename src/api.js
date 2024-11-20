const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Función para obtener contenido disponible en una plataforma
export const getContentByPlatform = async (id_plataforma) => {
    const response = await fetch(`${API_URL}/availability/platform/${id_plataforma}`);
    if (!response.ok) {
        throw new Error(`Error al obtener contenido: ${response.statusText}`);
    }
    return response.json();
};

// Función para obtener plataformas de un contenido
export const getPlatformsByContent = async (id_contenido) => {
    const response = await fetch(`${API_URL}/availability/content/${id_contenido}`);
    if (!response.ok) {
        throw new Error(`Error al obtener plataformas: ${response.statusText}`);
    }
    return response.json();
};

// Función para obtener todas las plataformas
export const getPlatforms = async () => {
    const response = await fetch(`${API_URL}/platforms`);
    if (!response.ok) {
        throw new Error(`Error al obtener plataformas: ${response.statusText}`);
    }
    return response.json();
};

// Función para obtener todo el contenido
export const getContent = async () => {
    const response = await fetch(`${API_URL}/content`);
    if (!response.ok) {
        throw new Error(`Error al obtener contenido: ${response.statusText}`);
    }
    return response.json();
};
