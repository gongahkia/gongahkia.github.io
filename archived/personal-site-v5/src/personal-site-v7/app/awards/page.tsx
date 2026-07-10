"use client"
import { Github, Linkedin, Menu } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const awards = [
  {
    title: "People's Choice Award for HackOMania 2025",
    issuer: "GeeksHacking",
    date: "Feb 2025",
    description:
      "The Geek Connect: Find Your Tribe IRL category posed the challenge of developing a platform that encouraged real-world connections within the GeeksHacking community. Focusing on fostering in-person engagement, my team developed Sidequest, an all-in-one platform that hackathon organizers can plug and play into their pre-existing participant dashboards. It features QR-code first matchmaking, a dynamic leaderboard, and a player-versus-player adversarial Wordle, built with Expo, React Native, Firebase and Clerk.",
  },
  {
    title: "Champion of YouthxHack 2024 - Digital Defence",
    issuer: "Cyber Youth Singapore",
    date: "Sep 2024",
    description:
      "The Digital Defence category posed a question about how the general public could easily verify the legitimacy and security of digital content and confidently distinguish between trustworthy and malicious interactions across various communication channels. Focusing on countering phishing attacks where scammers impersonate a legitimate company, my team developed a secure, encrypted token system that organizations can implement through our API-first solution, ensuring genuine and secure customer connections. The system allows consumers and companies to sign up for our program, where customers receive a special verifying token authenticated by their email client. This ensures all communication received is 100% from a validated company, eliminating the many risks posed by phishing scams.",
  },
  {
    title: "SMU Global Impact Scholarship Award",
    issuer: "Singapore Management University",
    date: "Aug 2023",
    description:
      "The SMU Global Impact Scholarship Award is a premier flagship scholars' award that is dedicated to nurture a new generation of leaders, committed to helping to solve complex global and local challenges, thus making an impact on society.",
  },
  {
    title: "Edusave Award for Achievement, Good Leadership and Service (EAGLES)",
    issuer: "Singapore Ministry of Education",
    date: "Jan 2020",
    description:
      "Awarded for demonstrating leadership qualities, service to community and schools, excellence in non-academic activities, and good conduct.",
  },
  {
    title: "Deans List",
    issuer: "Anglo-Chinese School (Independent)",
    date: "Nov 2019",
    description: "HL Economics, HL Literature",
  },
  {
    title: "Edusave Scholarship for Academic Excellence",
    issuer: "Singapore Ministry of Education",
    date: "Jan 2019",
    description:
      "Awarded to students who are within the top 10% of their school's level and course in terms of academic performance, and have demonstrated good conduct.",
  },
]

export default function Awards() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex w-full items-center justify-between mb-8">
        <Link href="/" className="text-lg font-bold sm:text-xl hover:text-white/80 transition-colors">
          GABRIEL ONG
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] bg-black text-white">
            <div className="mt-8 flex flex-col items-center gap-4">
              <Button variant="ghost" className="w-full justify-center text-white hover:text-white/80" asChild>
                <Link href="/projects">Projects</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-center text-white hover:text-white/80" asChild>
                <Link href="https://github.com/gongahkia/resume/blob/main/output/main.pdf" target="_blank">
                  CV
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-center text-white hover:text-white/80" asChild>
                <Link href="/awards">Awards</Link>
              </Button>
            </div>
            <Separator className="my-8 bg-white/20" />
            <div className="flex justify-center gap-4">
              <Button variant="ghost" size="icon" asChild className="text-white hover:text-white/80">
                <Link href="https://linkedin.com" target="_blank">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="text-white hover:text-white/80">
                <Link href="https://github.com" target="_blank">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 space-y-2 text-center text-sm text-white/70">
              <p>Singapore</p>
              <p>+65 81239863</p>
              <p>gabrielzmong@gmail.com</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <h1 className="text-3xl font-bold mb-8">Awards and Achievements</h1>

      <div className="space-y-12">
        {awards.map((award, index) => (
          <div key={index} className="border-l-2 border-white/20 pl-4">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 rounded-full bg-white mr-2"></div>
              <span className="text-sm text-white/50">{award.date}</span>
            </div>
            <h3 className="text-xl font-medium mb-1">{award.title}</h3>
            <p className="text-white/70 mb-2">Issued by {award.issuer}</p>
            <p className="text-white/90">{award.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}