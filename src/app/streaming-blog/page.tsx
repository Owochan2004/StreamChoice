'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Info, MessageCircle, X } from 'lucide-react'

const articles = [
  {
    title: "‘Uzumaki’: la oportunidad desperdiciada",
    content: "¿Desastre en espiral? Productor de 'Uzumaki' responde a las críticas por la pésima animación de la serie.",
    image: "/images/UZUMAKI_1.jpg",
    streamingInfo: {
      status: "Disponible en",
      platforms: ["Max"]
    },
    comments: [
      { user: "User1", text: "Tan fiel al manga que hasta la calidad va en espiral" },
      { user: "User2", text: "Para lo que se tardaron y vendieron con los minutos de animacion en el teaser, no le hacen justicia a esta joya del terror surrealista. Se quedaron re cortos en cuanto a calidad de animacion. Quedate con el manga que alcanza y sobra." }
    ]
  },
  {
    title: "La temporada 4 de The Mandalorian no se llevará a cabo",
    content: "El informe dice que la película de Mandalorian y Grogu reemplazará la temporada 4 de The Mandalorian, en lugar de unirse a ella.",
    image: "/images/0x0.webp",
    streamingInfo: {
      status: "Disponible en",
      platforms: ["Disney+"]
    },
    comments: [
      { user: "User3", text: "¿Es Disney malo en Star Wars?." },
      { user: "User4", text: "Sentí que la temporada 3 dejó claro que se habían quedado sin cosas que hacer con Din Djarin y empezaron a centrarse en los Mandalorianos como grupo, lo que se sintió como una historia diferente." }
    ]
  },
  {
    title: "'Dragon Ball Daima', anime que no reinventa la rueda pero deja un fantástico homenaje a Akira Toriyama",
    content: "El regreso al anime de Goku y la última serie en la que trabajó Akira Toriyama antes de dejarnos.",
    image: "/images/873406-1.jpg",
    streamingInfo: {
      status: "Disponible en",
      platforms: ["Max", "Crunchyroll", "Netflix"]
    },
    comments: [
      { user: "User5", text: "Realmente me está gustando hasta ahora. Me da toques del Dragonball de la vieja escuela." },
      { user: "User6", text: "Me lo estoy pasando genial. Es lindo, es dulce, la animación es hermosa y me encanta tener teorías reales que discutir sobre Dragon Ball." }
    ]
  },
  {
    title: "Mindhunter oficialmente cancelado: petición de los fans para el renacimiento",
    content: "A pesar de las buenas críticas, Netflix ha decidido no seguir adelante con una tercera temporada. Los fans están pidiendo su regreso.",
    image: "/images/AAAABQegMBe-lBNxDna5rcilKo_dghCzEzoYi4kLlzbm6iqq8L5z59Z2eJNhNcsswu6KTK6OFp0EciMr8tr37W9rM3UDZWUTzhOVOLYUa8gTj25eYUUiPcuHhaVNHKg-b67YXw4KYA.jpg",
    streamingInfo: {
      status: "Cancelled",
      platforms: ["Netflix"]
    },
    comments: [
      { user: "User7", text: "Es una verdadera decepción. Mindhunter era uno de los mejores programas de Netflix." },
      { user: "User8", text: "Espero que otro servicio de streaming la retome. Se merece un final apropiado." }
    ]
  }
]

const streamingServices = {
  "Netflix": "/images/apps.56161.9007199266246365.1d5a6a53-3c49-4f80-95d7-78d76b0e05d0.png",
  "Disney+": "/images/channels4_profile (1).jpg",
  "Max": "/images/channels4_profile.jpg",
  "Crunchyroll": "/images/images.png",
  "Amazon Prime Video": "/images/channels4_profile.jpg"
}

export default function Component() {
  const [expandedComments, setExpandedComments] = useState<number | null>(null)
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({})

  const toggleComments = (index: number) => {
    setExpandedComments(expandedComments === index ? null : index)
  }

  const handleCommentChange = (index: number, value: string) => {
    setNewComments(prev => ({ ...prev, [index]: value }))
  }

  const addComment = (index: number) => {
    if (newComments[index]?.trim()) {
      articles[index].comments.push({ user: "You", text: newComments[index].trim() })
      setNewComments(prev => ({ ...prev, [index]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-6">Streaming News & Updates</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {articles.map((article, index) => (
          <Card key={index} className="bg-white/10 border-white/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl font-bold text-white">{article.title}</CardTitle>
                <Popover>
                  <PopoverTrigger>
                    <Info className="h-6 w-6 text-white/60 hover:text-white transition-colors" />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto bg-[#2a1f3e] border-white/20">
                    <div className="text-white">
                      <p className="font-semibold mb-2">{article.streamingInfo.status}</p>
                      <div className="flex space-x-2">
                        {article.streamingInfo.platforms.map((platform) => (
                          <Image
                            key={platform}
                            src={streamingServices[platform]}
                            alt={platform}
                            width={50}
                            height={50}
                            className="rounded"
                          />
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <p className="text-white/80">{article.content}</p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="text-white border-white/20 hover:bg-white/10"
                  onClick={() => toggleComments(index)}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {expandedComments === index ? 'Hide' : 'Show'} Comments ({article.comments.length})
                </Button>
                {expandedComments === index && (
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-4">
                      <ScrollArea className="h-[200px] w-full pr-4">
                        {article.comments.map((comment, commentIndex) => (
                          <div key={commentIndex} className="mb-4 pb-4 border-b border-white/10 last:border-0">
                            <p className="font-semibold">{comment.user}</p>
                            <p className="text-white/80">{comment.text}</p>
                          </div>
                        ))}
                      </ScrollArea>
                      <div className="mt-4 flex space-x-2">
                        <Input
                          className="flex-grow bg-white/10 border-white/20 text-white placeholder-white/50"
                          placeholder="Add a comment..."
                          value={newComments[index] || ''}
                          onChange={(e) => handleCommentChange(index, e.target.value)}
                        />
                        <Button onClick={() => addComment(index)}>Post</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}