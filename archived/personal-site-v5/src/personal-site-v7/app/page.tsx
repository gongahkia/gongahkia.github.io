"use client"

import * as React from "react"
import { Github, Linkedin, Menu } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const bioLevels = [
  "Gabriel.",
  "Gabriel Ong. I write code and prose.",
  "Gabriel Ong. 2nd year BSc CnL at SMU. Self-taught programmer passionate about software and legal tech. I write code and prose.",
  "Gabriel Ong. 2nd year undergraduate reading BSc CnL at SMU. Self-taught programmer passionate about software and legal tech. I also write prose sometimes.",
  "Hello. I'm Gabriel Ong. I'm currently pursuing an undergraduate degree as a 2nd year student reading BSc CnL at SMU. I'm a self-taught programmer passionate about software and legal tech. Hobby-wise, I write code and prose.",
  "Hello. I'm Gabriel Ong. I'm currently pursuing an undergraduate degree as a 2nd year student reading BSc Computing and Law at Singapore Management University. I'm a self-taught programmer passionate about software and legal tech. As for what I do outside of work, I write code mostly and prose sometimes.",
  "Hello. I'm Gabriel Ong. I'm pursuing an undergraduate degree as a 2nd year student reading BSc Computing and Law at Singapore Management University and work at SMU's Centre for Digital Law where I develop AI agents for legal use. I like writing software mostly and prose sometimes.",
  "Hello. I'm Gabriel Ong. I'm pursuing an undergraduate degree as a 2nd year student reading BSc Computing and Law at Singapore Management University. I work at SMU's Centre for Digital Law, where I program adversarial AI agents for use in legal discourse. In my free time, I write software that benefits programmers, practising lawyers and law students. I also write prose.",
  "Hello. I'm Gabriel Ong. I'm a second-year student studying BSc Computing and Law at Singapore Management University. I also work at SMU's Centre for Digital Law, where I am currently developing multivariate AI agents for use in legal discourse. In my free time, I write software that benefits programmers, practising lawyers and law students. I also write prose for my blog. I am also developing an app.",
  "Hello. I'm Gabriel Ong. I'm a second-year undergraduate student reading Computing and Law at Singapore Management University. I work at SMU's Centre for Digital Law, which researches legal technology through computer science. There, I develop multivariate AI agents for use in debate of legal theory. I also copywrite and produce its documentation. In my free time, I enjoy writing software that benefits programmers, practising lawyers and law students. I also like to write prose on my blog. My latest efforts are in developing a cross-platform app for creatives.",
  "Hello. I'm Gabriel Ong. I'm a second-year undergraduate student reading Computing and Law at Singapore Management University. I work at the Centre for Digital Law based out of Singapore Management University, which researches legal technology through computer science. There, I work primarily on developing experimental, multivariate AI agents for use in debate of legal theory. I have also copywritten and produced its documentation. In my free time, I enjoy writing software that benefits programmers, practising lawyers and law students. I also like to write prose on my blog. My latest efforts are in developing a cross-platform app for creatives. I am interested in pursuing the entrepreneurship of legal technology in Singapore later in my career.",
  "Hello. I'm Gabriel Ong. I'm a second-year undergraduate student reading Computing and Law at Singapore Management University. I currently work as a research assistant at SMU's Centre for Digital Law, which researches legal technology and the specific applications of computer science in legal technology. There, I work primarily on developing experimental, multivariate, adversarial AI agents for use in debate of legal theory. I have also copywritten and produced its documentation. In my free time, I enjoy writing software that benefits programmers, practising lawyers and law students. Outside of programming, I spend my time learning, reading, watching films and drawing. As for hobbies, I enjoy bouldering and running. I aim to pursue the entrepreneurship of legal technology in Singapore later in my career.",
  "Hello. I'm Gabriel Ong. I'm a second-year undergraduate student reading Computing and Law at Singapore Management University. I currently work as a research assistant at SMU's Centre for Digital Law, which researches legal technology and its applications via computer science. There, I work primarily on developing experimental, multivariate, adversarial AI agents for use in debate of legal theory. I have also copywritten and produced its documentation. In my free time, I enjoy writing software that benefits programmers, practising lawyers and law students. Outside of programming, I spend my time learning, reading, watching films and drawing. My latest efforts are in running a startup that aims to create a cross-platform app for creatives to engage with content creation and consumption meaningfully. I aim to pursue the entrepreneurship of legal technology in Singapore later in my career.",
  "Hello. I'm Gabriel Ong. I'm a second-year undergraduate student reading Computing and Law at Singapore Management University. Alongside studying, I juggle working as a research assistant at SMU's Centre for Digital Law, which researches legal technology and the specific applications of computer science in legal technology. There, I work primarily on developing experimental, multivariate, adversarial AI agents for use in debate of legal theory. I have also copywritten and produced its documentation. In my free time, I enjoy writing software that benefits programmers, practising lawyers and law students. Outside of programming, I spend my time learning, reading, watching films and drawing. As for hobbies, I particularly enjoy bouldering and running. In fact, I've been bouldering for 3 years and running for 6 years. In the future, I aim to pursue the entrepreneurship of legal technology in Singapore.",
  "Hello. I'm Gabriel Ong. I'm a second-year undergraduate student reading Computing and Law at Singapore Management University. I currently work as a research assistant at SMU's Centre for Digital Law, which researches legal technology and its applications via computer science. There, I work primarily on developing experimental, multivariate, adversarial AI agents for use in debate of legal theory. I have also copywritten and produced its documentation. In my free time, I enjoy writing software that benefits programmers, practising lawyers and law students. Outside of programming, I spend my time learning, reading, watching films and drawing. As for hobbies, I boulder and run. My latest efforts are in running a startup that aims to create a cross-platform app for creatives to engage with content creation and consumption meaningfully. I aim to pursue the entrepreneurship of legal technology in Singapore later in my career.",
]

const linkMap = {
  software: "https://github.com/gongahkia",
  code: "https://github.com/gongahkia",
  prose: "https://gongzm.wordpress.com/",
  drawing: "https://gongzm.wordpress.com/",
  learning: "https://github.com/gongahkia/personal-wiki",
  films: "https://letterboxd.com/gongtalksfilm/",
}

function createLinkedBio(text: string) {
  const words = Object.keys(linkMap).join("|")
  const regex = new RegExp(`\\b(${words})\\b`, "gi")
  const linkedWords = new Set()

  return text.replace(regex, (match) => {
    const lowerMatch = match.toLowerCase()
    if (linkedWords.has(lowerMatch)) {
      return match
    }
    linkedWords.add(lowerMatch)
    return `<a href="${linkMap[lowerMatch]}" target="_blank" rel="noopener noreferrer" class="font-bold underline hover:text-gray-300 transition-colors">${match}</a>`
  })
}

export default function Home() {
  const middleIndex = Math.floor(bioLevels.length / 2)
  const [sliderValue, setSliderValue] = React.useState([middleIndex])
  const currentYear = new Date().getFullYear()

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between bg-black text-white">
      {/* Header */}
      <div className="flex w-full items-center justify-between p-4 sm:p-6">
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

      {/* Main Content */}
      <div className="flex max-w-3xl flex-1 items-center px-4 sm:px-6">
        <p
          className="text-base font-light leading-relaxed transition-all duration-500 ease-in-out sm:text-lg md:text-xl"
          dangerouslySetInnerHTML={{
            __html: createLinkedBio(bioLevels[Math.min(Math.floor(sliderValue[0]), bioLevels.length - 1)]),
          }}
        />
      </div>

      {/* Footer */}
      <div className="w-full px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="mb-4 flex items-center justify-between text-xs text-white/50 italic sm:text-sm">
          <span>Say less</span>
          <span>Tell me more</span>
        </div>
        <Slider
          defaultValue={[middleIndex]}
          max={bioLevels.length - 1}
          step={1}
          value={sliderValue}
          onValueChange={setSliderValue}
          className="mb-8 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-white/50 [&_[role=slider]]:bg-white [&>[data-disabled]]:opacity-50 [&_[data-orientation=horizontal]]:h-2 [&_[data-orientation=horizontal]]:bg-white/20 [&_[data-orientation=horizontal]>[data-orientation=horizontal]]:bg-white"
        />
        <div className="text-center text-xs text-white/50 sm:text-sm">
          © 2023-{currentYear} • Gabriel Ong • All rights reserved
        </div>
      </div>
    </main>
  )
}