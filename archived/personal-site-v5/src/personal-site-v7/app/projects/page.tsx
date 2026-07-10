"use client"
import { Github, Linkedin, Menu } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const projects = [
  {
    name: "Jikai",
    description: "Centralised platform for the generation, review and practise of law hypotheticals.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
  },
  {
    name: "Yuho",
    description: "DSL providing a programmatic representation of Singapore Criminal Law.",
    technologies: ["Rust", "ANTLR", "Legal Tech"],
  },
  {
    name: "Skill Hunter",
    description: "Browser extension that optimizes SSO legislation for absorption by sanitising legalese.",
    technologies: ["JavaScript", "Chrome API", "Natural Language Processing"],
  },
  {
    name: "Piranesi",
    description: "Full-stack web application that translates your physical book collections into your online spaces.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    name: "Imaya",
    description: "Mobile and web application that takes a less-is-more approach to task prioritisation.",
    technologies: ["React Native", "Expo", "Firebase"],
  },
  {
    name: "Owl",
    description: "Google editor suite extension for monitoring and collating tags.",
    technologies: ["JavaScript", "Google Apps Script", "Chrome Extension"],
  },
  {
    name: "DC4U",
    description: "Drafts legal charges by transpiling a human-readable markup language to multiple target formats.",
    technologies: ["Python", "Legal Tech", "Document Automation"],
  },
  {
    name: "Feeder",
    description: "Statistical visualization of the length of judicial rulings, scraped live from eLitigation.",
    technologies: ["D3.js", "Python", "Web Scraping"],
  },
]

export default function Projects() {
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

      <h2 className="text-2xl font-semibold mb-6">Projects</h2>
      <div className="grid gap-6 max-w-3xl mx-auto">
        {projects.map((project, index) => (
          <div key={index} className="border border-white/20 p-4 rounded-lg hover:border-white/40 transition-colors">
            <h3 className="text-xl font-medium mb-2">{project.name}</h3>
            <p className="text-white/70 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="inline-block bg-white/10 text-sm px-2 py-1 rounded hover:bg-white/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}