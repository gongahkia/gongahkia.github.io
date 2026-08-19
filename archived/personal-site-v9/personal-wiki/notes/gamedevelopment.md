---
category: Tech
---
# Game development

# `Game development`

Or at least, how [Randy](https://www.youtube.com/@randyprime) thinks you should go about learning it.

## The abbreviated guide

1. Learn C
2. Avoid modern C++ and figure out low-level C workarounds for C++ equivalents as far as possible *(eg. fixed length strings, flat arrays, etc.)*
3. Ignore OOP and prize functional programming
4. Focus on coding fundamentals
5. Run from [***engine brain***](https://youtu.be/uVvZlH5gPAU?si=hg8ZUTUfAN9wRN4q), it WILL waste your time and prevent you from making a game
6. Ask lots of questions, whether that's other people, google or LLMs
7. Write fast and break things
8. Chase the fun

## Useful things to learn

### Memory management

* [Memory Allocation Strategies - Part 1](https://www.gingerbill.org/article/2019/02/01/memory-allocation-strategies-001/) by gingerBill
* [Memory Allocation Strategies - Part 2](https://www.gingerbill.org/article/2019/02/08/memory-allocation-strategies-002/) by gingerBill
* [Untangling Lifetimes: The Arena Allocator](https://www.rfleury.com/p/untangling-lifetimes-the-arena-allocator) by Digital Grove

### Graphics

1. Don't learn graphics too early and for no reason, just use [sokol](https://github.com/floooh/sokol) and [sokol-gp](https://github.com/edubart/sokol_gp)
2. If you're sure you need to learn graphics, then learn these
  * [OpenGL](https://learnopengl.com/)
  * [A Trip through the Graphics Pipeline](https://alaingalvan.gitbook.io/a-trip-through-the-graphics-pipeline)
  * [DirectXTutorial](http://www.directxtutorial.com/Lesson.aspx?lessonid=11-4-1)
  * [LearnD3D11](https://graphicsprogramming.github.io/learnd3d11/)
  * [Minimal D3D11](https://gist.github.com/d7samurai/261c69490cce0620d0bfc93003cd1052) Github gist
  * [DirectXTK](https://github.com/Microsoft/DirectXTK/tree/main/Src/Shaders) Github repository
  * [HLSL reference documentation](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-reference)

### Audio

1. Don't learn audio, just use [FMOD](https://www.fmod.com/), its the most accesible option for just starting out
2. If you want to learn audio anyway, look at these
  * [Lessons learnt from a decade of audio programming](https://youtu.be/Vjm--AqG04Y?si=kDTQ3Qtb1BXbipT7) GDC 2015 talk
  * [Introduction to Sound Mixing](https://guide.handmadehero.org/code/day139/) as part of Handmade Hero
  * [Simple Lowpass Filter](https://dobrian.github.io/cmp/topics/filters/lowpassfilter.html)

### Networking

1. First read the [high-level overview of game network programming](https://pvigier.github.io/2019/09/08/beginner-guide-game-networking.html)
2. Then refer to [Steamworks API](https://partner.steamgames.com/doc/sdk/api) instead of fighting [NAT](https://tailscale.com/blog/how-nat-traversal-works) for no reason
3. Read [Beej's Guide to Network Programming](https://beej.us/guide/bgnet/) if you're feeling nerdy
4. Read [Beej's Guide to Networking Concepts](https://beej.us/guide/bgnet0/) if you're feeling courageous

### Multithreading

* [Handmade Hero Day 122 - Introduction to Multithreading](https://guide.handmadehero.org/code/day122/)
* [Handmade Hero Day 123 - Interlocked Operations](https://guide.handmadehero.org/code/day123/)
* [Handmade Hero Day 124 - Memory barriers and Semaphores](https://guide.handmadehero.org/code/day124/)

### Random

* [Why an ECS is complete bullshit 90% of the time for smaller games](https://youtu.be/UolgW-Ff4bA?si=wVS4zWAWdp7E2krR) by Randy
* [Easing functions cheatsheet](https://easings.net/)
* [Gaffer on Games](https://gafferongames.com/#posts)
* [Sokol](https://github.com/floooh/sokol) Github repository
* [Game Engine Programming](https://youtube.com/playlist?list=PLmV5I2fxaiCI9IAdFmGChKbIbenqRMi6Z&si=jO3rOFqYqeiBDTUj) playlist by Jonathan Blow
* [John Carmack on Functional Programming in C++](http://sevangelatos.com/john-carmack-on/)
* [A better point light attenuation function](https://lisyarus.github.io/blog/posts/point-light-attenuation.html) by lisyarus blog
* [Confronting Combinatorics](https://www.rfleury.com/p/ui-part-3-the-widget-building-language?open=false#%C2%A7confronting-combinatorics) by Ryan Fleury
* [UI Series](https://www.rfleury.com/p/ui-series-table-of-contents) by Ryan Fleury

## More on

* [Handmade Hero's introduction to C](https://guide.handmadehero.org/intro-to-c/) by Molly Rocket
* [Randy's Resources](https://randy.gg/res/) by randy.gg
* [The Way to Jai](https://github.com/Ivo-Balbaert/The_Way_to_Jai) Github repository
