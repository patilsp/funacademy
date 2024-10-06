"use client";

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const sportsData = {
  indoor: [
    {
      name: "Table Tennis",
      history: "Table tennis, also known as ping-pong, originated in Victorian England as an after-dinner parlour game.",
      topPlayers: ["Ma Long", "Fan Zhendong", "Xu Xin", "Zhang Jike", "Lin Gaoyuan", "Timo Boll", "Dimitrij Ovtcharov", "Hugo Calderano", "Tomokazu Harimoto", "Liang Jingkun"]
    },
    {
      name: "Badminton",
      history: "Badminton developed from a game called battledore and shuttlecock played in ancient Greece, China, and India.",
      topPlayers: ["Kento Momota", "Viktor Axelsen", "Chen Long", "Chou Tien-chen", "Anders Antonsen", "Anthony Sinisuka Ginting", "Jonatan Christie", "Shi Yuqi", "Lee Zii Jia", "Kidambi Srikanth"]
    },
    {
      name: "Basketball",
      history: "Basketball was invented in 1891 by Dr. James Naismith, a physical education instructor in Springfield, Massachusetts.",
      topPlayers: ["LeBron James", "Kevin Durant", "Stephen Curry", "Giannis Antetokounmpo", "Kawhi Leonard", "James Harden", "Luka Doncic", "Nikola Jokic", "Joel Embiid", "Damian Lillard"]
    },
    {
      name: "Volleyball",
      history: "Volleyball was invented in 1895 by William G. Morgan, a YMCA physical education director in Holyoke, Massachusetts.",
      topPlayers: ["Wilfredo Leon", "Earvin N'Gapeth", "Bartosz Kurek", "Bruno Rezende", "Yuji Nishida", "Facundo Conte", "Maxim Mikhaylov", "Matt Anderson", "Osmany Juantorena", "Yoandy Leal"]
    },
    {
      name: "Squash",
      history: "Squash originated in London around 1830, evolving from the game of racquets.",
      topPlayers: ["Ali Farag", "Mohamed ElShorbagy", "Paul Coll", "Tarek Momen", "Marwan ElShorbagy", "Diego Elias", "Fares Dessouky", "Joel Makin", "Mostafa Asal", "Karim Abdel Gawad"]
    }
  ],
  outdoor: [
    {
      name: "Soccer",
      history: "Modern soccer has its roots in England in the mid-19th century, but earlier versions of the game existed much earlier.",
      topPlayers: ["Lionel Messi", "Cristiano Ronaldo", "Neymar", "Kylian Mbappé", "Kevin De Bruyne", "Erling Haaland", "Mohamed Salah", "Harry Kane", "Robert Lewandowski", "Virgil van Dijk"]
    },
    {
      name: "Tennis",
      history: "Tennis evolved from a 12th-century French handball game called 'paume' (palm).",
      topPlayers: ["Novak Djokovic", "Rafael Nadal", "Carlos Alcaraz", "Casper Ruud", "Stefanos Tsitsipas", "Holger Rune", "Andrey Rublev", "Taylor Fritz", "Jannik Sinner", "Felix Auger-Aliassime"]
    },
    {
      name: "Cricket",
      history: "Cricket originated in south-east England in the late 16th century and became the national sport in the 18th century.",
      topPlayers: ["Virat Kohli", "Steve Smith", "Kane Williamson", "Joe Root", "Babar Azam", "Ben Stokes", "Rohit Sharma", "Pat Cummins", "Jasprit Bumrah", "Kagiso Rabada"]
    },
    {
      name: "Golf",
      history: "Golf originated in 15th-century Scotland, with the first written record dating back to 1457.",
      topPlayers: ["Scottie Scheffler", "Jon Rahm", "Rory McIlroy", "Patrick Cantlay", "Xander Schauffele", "Cameron Smith", "Justin Thomas", "Collin Morikawa", "Will Zalatoris", "Matt Fitzpatrick"]
    },
    {
      name: "Athletics",
      history: "Athletics, which includes track and field events, has roots in ancient Greek and Roman competitions.",
      topPlayers: ["Usain Bolt", "Allyson Felix", "Mo Farah", "Shelly-Ann Fraser-Pryce", "Eliud Kipchoge", "Mondo Duplantis", "Karsten Warholm", "Elaine Thompson-Herah", "Ryan Crouser", "Neeraj Chopra"]
    }
  ]
}

export default function SportsPage() {
  const [activeTab, setActiveTab] = useState("indoor")
  const [selectedSport, setSelectedSport] = useState(null)

  return (
    <div className="container mx-auto max-w-xl p-4">
      <h1 className="mb-6 text-3xl font-bold">Sports</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 px-1">
          <TabsTrigger value="indoor">Indoor</TabsTrigger>
          <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
        </TabsList>
        <TabsContent value="indoor">
          <SportsList sports={sportsData.indoor} onSelectSport={setSelectedSport} />
        </TabsContent>
        <TabsContent value="outdoor">
          <SportsList sports={sportsData.outdoor} onSelectSport={setSelectedSport} />
        </TabsContent>
      </Tabs>
      {selectedSport && (
        <SportDetails sport={selectedSport} />
      )}
    </div>
  )
}

function SportsList({ sports, onSelectSport }) {
  return (
    <ul className="mt-4 space-y-2">
      {sports.map((sport) => (
        <li key={sport.name} className="flex cursor-pointer items-center justify-between rounded-lg bg-secondary p-2 hover:bg-secondary/80" onClick={() => onSelectSport(sport)}>
          <span>{sport.name}</span>
          <ChevronRight className="size-5" />
        </li>
      ))}
    </ul>
  )
}

function SportDetails({ sport }) {
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h2 className="mb-4 text-2xl font-bold">{sport.name}</h2>
        <h3 className="mb-2 text-xl font-semibold">History</h3>
        <p className="mb-4">{sport.history}</p>
        <h3 className="mb-2 text-xl font-semibold">Top 10 Players</h3>
        <ol className="list-inside list-decimal">
          {sport.topPlayers.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}