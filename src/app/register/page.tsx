'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e, isPremium) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: name,
          email: email,
          contraseña: password,
          es_premium: isPremium ? 1 : 0, // 1 para premium, 0 para gratis
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Error al registrarse")
      }

      // Si el registro es exitoso, redirigir al login
      router.push("/login")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white flex justify-center items-center p-4">
      <div className="bg-white/10 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Crear Cuenta</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              placeholder="Ingrese su nombre"
            />
          </div>
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
          <div className="flex gap-4">
            <button
              type="button"
              onClick={(e) => handleRegister(e, false)} // Gratis
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              Crear cuenta gratis
            </button>
            <button
              type="button"
              onClick={(e) => handleRegister(e, true)} // Premium
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              $5.00 Premium
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
