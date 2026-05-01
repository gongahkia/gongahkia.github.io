---
title: "Chiyoda: Entropy-Guided Information Control for Hazard-Coupled Pedestrian Evacuation"
date: 30 Apr 2026
type: paper
source: zenodo
authors: "Gabriel Ong Zhe Mian"
zenodo: "https://zenodo.org/records/19905070"
doi: "10.5281/zenodo.19905069"
resource_type: "Publication"
version: "v1"
license: "CC-BY-4.0"
github: "https://github.com/gongahkia/chiyoda"
---

I recently published the first version of *Chiyoda* on [Zenodo](https://doi.org/10.5281/zenodo.19905070).

## Lore

As my first self-directed "proper" research paper, getting it into a form that could be read, cited *(and possibly criticised)* felt very different from shipping a normal
software project. 

While I originally began *Chiyoda* as a side-project in 2024, this process of drafting a paper about it really forced me to scope down its claims to those sustantiated by clear evidence. Presently *(in April 2026)* at least, *Chiyoda* is a research toolkit for studying emergency evacuation as an information problem. 

## Problem

Most evacuation systems implicitly make the assumption that communicating the hazard will always be helpful, predicated on the notion that better warnings informs the crowd to effect better decisions.

## What Chiyoda does different

In *Chiyoda*, agents do not move through a perfect map of the world. Instead, they carry pre-existing beliefs *(about exits, hazards, congestion, and danger etc.*) and can 
actively observe their surroundings, receive messages *(via beacons)*, hear from emergency responders and pass distorted local gossip to each other. 

These imperfect notions then direct how the agents route through the world.

That distinction: that a message can both be correct and nonetheless remain "risky" information was what interested me in 2024 and what continues to drive the writing of this paper in 2026.

***TlDR***: When does communication of a risk improve belief and safety holistically, and when does it creates harmful convergence *(in a physical medium)*?

If this sounds interesting to you, feel free to check it out on Zenodo at [10.5281/zenodo.19905070](https://zenodo.org/records/19905070)

## Thoughts

Result reproducibility was a way larger part of drafting the research paper than I initially expected.

In terms of possible angles for further unexplored scope, LLM-bounded and generated evacuation messages remains an area the paper touches on only briefly.

## Closing

Either way, v1 of *Chiyoda* is the iteration I'm happiest with right now. Really grateful for the experience, and I also extend my thanks to anyone who does take the time to read it and give me their feedback.