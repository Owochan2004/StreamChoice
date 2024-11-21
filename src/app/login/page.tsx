'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault(); // Evitar recarga de la página

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contraseña: password }), // Usar `password` como `contraseña`
      });

      if (!response.ok) throw new Error("Error al iniciar sesión");

      const data = await response.json();

      // Guardar en localStorage (solo disponible en el cliente)
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Redirigir al inicio
      router.push("/");
    } catch (error) {
      console.error("Error en el login:", error);
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white flex justify-center items-center p-4">
      <div className="bg-white/10 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Iniciar Sesión</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              placeholder="Ingrese su correo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              placeholder="Ingrese su contraseña"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
