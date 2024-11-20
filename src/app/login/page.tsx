'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // Resetear el error

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contraseña: password }), // Asegúrate de usar "contraseña" porque el backend espera ese campo
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Error al iniciar sesión")
      }

      // Si es exitoso, redirigir al usuario a la página principal
      router.push("/")
    } catch (err: any) {
      setError(err.message)
    }
  }

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
              required // Asegúrate de que los campos sean requeridos
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
              required
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
  )
}
