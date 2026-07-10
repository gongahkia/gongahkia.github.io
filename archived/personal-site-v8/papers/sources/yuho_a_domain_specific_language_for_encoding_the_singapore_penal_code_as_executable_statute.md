---
title: "Yuho: A Domain-Specific Language for Encoding the Singapore Penal Code as Executable Statute"
date: 1 May 2026
type: paper
source: zenodo
authors: "Gabriel Ong Zhe Mian"
zenodo: "https://zenodo.org/records/19935537"
doi: "10.5281/zenodo.19935537"
resource_type: "Publication"
version: "v5.1.0"
license: "CC-BY-4.0"
github: "https://github.com/gongahkia/yuho"
---

As someone in [SMU](https://www.smu.edu.sg/)'s [Computing and Law](https://computing.smu.edu.sg/bsc-computing-law) degree programme, something like this probably seemed inevitable.

Anyway, I recently released a [research paper](https://zenodo.org/records/19935537) covering [*Yuho*](https://github.com/gongahkia/yuho), a project I've spent the last 2 years *(and 1,912 commits)* building.

## Lore

While reading the law *(or [legalese](https://www.merriam-webster.com/dictionary/legalese) in general)* tends to be characterised as a boring affair, I'd wager most people simply haven't tried it. 

As someone who was *(sometimes)* forced to read legislation for the Law Modules I took at SMU, I've always thought that if reading the law is akin to reading a [Whodunit](https://en.wikipedia.org/wiki/Whodunit), then thinking *(and reasoning)* about the law is the closest thing we can get to a programming language for the humanities.

With that in mind, fresh out of my [Criminal Law Module](https://www.linkedin.com/in/iamazfer/), I got to work on *Yuho* in early May 2024.

## What is Yuho (in 2 parts)

*Yuho* is a [domain-specific language](https://en.wikipedia.org/wiki/Domain-specific_language) whose grammar *(or syntax, whatever floats your boat)* mirrors the way a *(Singapore)* criminal statute would be drafted. This application is then used to encode all ***524 sections*** of the [Singapore Penal Code 1871](https://sso.agc.gov.sg/act/pc1871). Alongside this encoding, I shipped a tree-sitter parser and reference graph resolver for the early iterations of *Yuho*.

That was where progress stopped in August 2024. 

Revisiting *Yuho* in late 2025 brought with it quite a few changes, the primary ones being user-facing utility that extended it beyond pure proof-of-concept. This meant things like introducing *(eight)* transpilers, a Z3/Alloy verification hookup, a Lean 4 mechanisation of the soundness theorem, an LSP, a MCP server *(hooray for Agentic AI)* and a rudimentary VS Code extension.

## Thoughts

As a [wise friend of mine](https://www.linkedin.com/in/zanechee/) once said, *"evals are hard"*.

A whole bulk of the work-to-iteration loop I spent my time on with *Yuho* revolved around building out the verification stack, eventually taking about as long as the actual encoding exercise.

Funnily enough, if I were to start over, I'd begin with building the verification stack. In the [TDD](https://en.wikipedia.org/wiki/Test-driven_development) spirit, more than half of the encoding bugs the verification harness eventually found would have been caught much earlier if I'd just started with runtime testing from the beginning.

## Closing

As always, incredibly thankful for the experience. *Yuho* has definitely been a passion-project of mine since I entered SMU, and this entire ordeal that led to me finally being able to put something out there that could act as useful reference for the future was incredibly cathartic for me.

[LegalTech](https://www.reddit.com/r/legaltech/) in early 2026 very much seems to be veering in the direction of in-house tooling for lawyer workflow automation, but if there ever arises the need for a more deterministic encoding and expression-based evaluation of legislation, I'd be super stoked for it.

If *Yuho* sounds like something you'd be interested in checking out, feel free to give it a read on Zenodo at [10.5281/zenodo.19935537](https://zenodo.org/records/19935537)