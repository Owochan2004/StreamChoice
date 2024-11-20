'use client'

import { useRouter } from "next/navigation"

export default function SubscribePage() {
  const router = useRouter()

  const handleSubscribe = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) return router.push("/login")

    try {
      const res = await fetch(`http://localhost:3000/api/users/${user.id}/subscribe`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) throw new Error("Error al actualizar suscripción")

      const updatedUser = { ...user, es_premium: 1 }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      router.push("/")
    } catch (err) {
      console.error("Error al suscribirse:", err)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Hazte Premium</h1>
        <p className="mb-6">Disfruta de todas las funcionalidades por solo $5.00 al mes</p>
        <button
          onClick={handleSubscribe}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
        >
          Suscribirse
        </button>
      </div>
    </div>
  )
}
