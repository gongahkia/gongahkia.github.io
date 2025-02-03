// ASCII Art World
const trees = [
  {
    art: `
  /\\
 /  \\
/____\\
  ||
`,
    color: "green",
  },
  {
    art: `
   /\\
  /  \\
 /    \\
/______\\
   ||
`,
    color: "darkgreen",
  },
  {
    art: `
    /\\
   /  \\
  /    \\
 /      \\
/________\\
    ||
`,
    color: "forestgreen",
  },
  {
    art: `
   (\\
  (  \\
 (    \\
(______\\
   ||
`,
    color: "olivedrab",
  },
  {
    art: `
   ^
  / \\
 /   \\
/_____\\
  |_|
`,
    color: "seagreen",
  },
]

const lakes = [
  `
  ~~~~~~
 ~~~~~~~~
~~~~~~~~~~
 ~~~~~~~~
  ~~~~~~
`,
  `
   ~~~~
 ~~~~~~~~
~~~~~~~~~~~
 ~~~~~~~~
   ~~~~
`,
]

const villages = [
  {
    art: `
   _    _
  /=\\ /=\\
 /===\\===\\
 |   ||   |
 |___||___|
`,
    color: "brown",
  },
  {
    art: `
    _
 __/_\\__
 \\_____/
  |    |
  |____|
`,
    color: "darkred",
  },
  {
    art: `
   __
  /  \\
 /    \\
/______\\
  |  |
`,
    color: "purple",
  },
  {
    art: `
  /\\  /\\
 /  \\/  \\
/________\\
 |  []  |  
`,
    color: "darkgreen",
  },
  {
    art: `
  _____
 /     \\
/  ___  \\
| |   | |
|_|___|_|
`,
    color: "sienna",
  },
  {
    art: `
   /\\
__/  \\__
\\      /
 \\____/
  |   |
`,
    color: "saddlebrown",
  },
]

const castles = [
  {
    art: `
    /\\
 __/  \\__
/  |  |  \\
|  |  |  |
|__|__|__|
`,
    color: "gray",
  },
  {
    art: `
   /\\  /\\
  /  \\/  \\
 /  /\\    \\
/  /  \\    \\
|_/_/\\_\\___|
`,
    color: "darkgray",
  },
  {
    art: `
    []
 ___||___
/  _||_  \\
| |    | |
|_|____|_|
`,
    color: "slategray",
  },
]

const grassPatches = [
  `
,',,,
''','
,',''
''','
`,
  `
 , , ,
' ' ' '
, , , ,
 ' ' '
`,
]

const peopleGroups = ["o", "Ö", "ö", "O", "^", "v", "|", "?", "!", "@", "~", "&", "#", "$", "%", "*", "+", "="];

const entities = []

function createElement(type, x, y) {
  const element = document.createElement("div")
  element.className = "ascii-element"
  element.style.left = x + "px"
  element.style.top = y + "px"
  const scale = Math.random() * 0.5 + 0.5
  element.style.transform = `scale(${scale})`

  let width, height, color, art

  switch (type) {
    case "tree":
      const tree = trees[Math.floor(Math.random() * trees.length)]
      art = tree.art
      color = tree.color
      width = height = 50
      break
    case "lake":
      art = lakes[Math.floor(Math.random() * lakes.length)]
      color = "royalblue"
      width = height = 100
      break
    case "village":
      const village = villages[Math.floor(Math.random() * villages.length)]
      art = village.art
      color = village.color
      element.dataset.villagers = Math.floor(Math.random() * 5) + 1
      width = height = 80
      break
    case "castle":
      const castle = castles[Math.floor(Math.random() * castles.length)]
      art = castle.art
      color = castle.color
      width = height = 120
      break
    case "grass":
      art = grassPatches[Math.floor(Math.random() * grassPatches.length)]
      color = "limegreen"
      width = height = 40
      break
    case "people":
      art = peopleGroups[Math.floor(Math.random() * peopleGroups.length)]
      color = ["red", "blue", "orange", "pink"][Math.floor(Math.random() * 4)]
      width = height = 20
      break
  }

  element.textContent = art
  element.style.color = color
  document.getElementById("ascii-world").appendChild(element)

  if (type !== "village" && type !== "castle" && type !== "people") {
    setTimeout(
      () => {
        element.remove()
        entities.splice(entities.indexOf(entity), 1)
      },
      15000 + Math.random() * 10000,
    )
  }

  const entity = { type, element, x, y, width, height }
  entities.push(entity)

  return entity
}

function moveVillagers() {
  entities.forEach((entity) => {
    if (entity.type === "village" || entity.type === "castle") {
      const villagers = Number.parseInt(entity.element.dataset.villagers)
      if (Math.random() < 0.2) {
        if (Math.random() < 0.5 && villagers > 1) {
          entity.element.dataset.villagers = villagers - 1
        } else if (villagers < 10) {
          entity.element.dataset.villagers = villagers + 1
        }
      }

      if (Math.random() < 0.05) {
        const dx = (Math.random() - 0.5) * 20
        const dy = (Math.random() - 0.5) * 20
        const newX = entity.x + dx
        const newY = entity.y + dy
        if (!isOverlapping(newX, newY, entity.width, entity.height)) {
          entity.x = newX
          entity.y = newY
          entity.element.style.left = entity.x + "px"
          entity.element.style.top = entity.y + "px"
        }
      }

      if (Math.random() < 0.05) {
        const angle = Math.random() * 2 * Math.PI
        const distance = 50
        const peopleX = entity.x + Math.cos(angle) * distance
        const peopleY = entity.y + Math.sin(angle) * distance
        if (!isOverlapping(peopleX, peopleY, 20, 20)) {
          const people = createElement("people", peopleX, peopleY)
          people.targetX = peopleX
          people.targetY = peopleY
        }
      }
    }
  })
}

function movePeople() {
  entities.forEach((entity) => {
    if (entity.type === "people") {
      if (!entity.targetX || !entity.targetY || Math.random() < 0.05) {
        const settlements = entities.filter((e) => e.type === "village" || e.type === "castle")
        if (settlements.length > 0 && Math.random() < 0.7) {
          const targetSettlement = settlements[Math.floor(Math.random() * settlements.length)]
          entity.targetX = targetSettlement.x
          entity.targetY = targetSettlement.y
        } else {
          const angle = Math.random() * 2 * Math.PI
          const distance = Math.max(window.innerWidth, window.innerHeight)
          entity.targetX = window.innerWidth / 2 + Math.cos(angle) * distance
          entity.targetY = window.innerHeight / 2 + Math.sin(angle) * distance
        }
      }

      const dx = entity.targetX - entity.x
      const dy = entity.targetY - entity.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 5) {
        if (entity.x < 0 || entity.x > window.innerWidth || entity.y < 0 || entity.y > window.innerHeight) {
          entity.element.remove()
          entities.splice(entities.indexOf(entity), 1)
        }
      } else {
        const speed = 2
        entity.x += (dx / distance) * speed
        entity.y += (dy / distance) * speed
        entity.element.style.left = entity.x + "px"
        entity.element.style.top = entity.y + "px"
      }
    }
  })
}

function isOverlapping(x, y, width, height) {
  return entities.some(
    (entity) =>
      x < entity.x + entity.width && x + width > entity.x && y < entity.y + entity.height && y + height > entity.y,
  )
}

function spawnEntity(type) {
  let x, y
  const maxAttempts = 50
  let attempts = 0
  let width, height

  switch (type) {
    case "tree":
      width = height = 50
      break
    case "lake":
      width = height = 100
      break
    case "village":
      width = height = 80
      break
    case "castle":
      width = height = 120
      break
    case "grass":
      width = height = 40
      break
  }

  do {
    x = Math.random() * (window.innerWidth - width)
    y = Math.random() * (window.innerHeight - height)
    attempts++
  } while (isOverlapping(x, y, width, height) && attempts < maxAttempts)

  if (attempts < maxAttempts) {
    createElement(type, x, y)
  }
}

setInterval(() => spawnEntity("tree"), 1750)
setInterval(() => spawnEntity("lake"), 5000)
setInterval(() => spawnEntity("village"), 10000)
setInterval(() => spawnEntity("castle"), 15000)
setInterval(() => spawnEntity("grass"), 2500)
setInterval(moveVillagers, 1000)
setInterval(movePeople, 50)

const pageContent = document.getElementById("page-content")
const navButtons = document.querySelectorAll("nav button")
const title = document.getElementById("title")

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")
    loadPage(button.dataset.page)
  })
})

title.addEventListener("click", () => {
  navButtons.forEach((btn) => btn.classList.remove("active"))
  loadPage("home")
})

function loadPage(page) {
  switch (page) {
    case "home":
      pageContent.innerHTML = ""
      break
    case "about":
      pageContent.innerHTML = `
        <h2>ABOUT</h2>
        <div class="about-content">
            <img src="./asset/profile/nov_2024.jpg" alt="photo of Gabriel Ong" class="profile-image">
            <div class="about-text">
                <p>
                    Gabriel Ong is a second-year undergraduate student reading Computing and
                    Law at Singapore Management University.
                </p>
                <p>
                    Gabriel works at the Centre for Digital Law
                    based out of Singapore Management University, which researches
                    legal technology. Here, Gabriel develops experimental AI agents 
                    for use in legal theory. 
                </p>
                <p>
                    In his free time, Gabriel enjoys writing software that benefits
                    programmers, practising lawyers and law students.
                </p>
                <p>
                    Gabriel is interested in pursuing the entrepreneurship of
                    legal technology in Singapore later in his career.
                </p>
            </div>
        </div>
    `
      break
    case "secret":
      pageContent.innerHTML = `
                <h2>SECRET</h2>
                <p id="secret">Hash.</p>
            `
      generateSecret()
      break
    case "contact":
      pageContent.innerHTML = `
                <h2>CONTACT</h2>
                <p>If I miss your e-mail, please contact me on LinkedIn.</p>
                <h3>E-mail</h3>
                <p>
                    Business: <a href="mailto:gabrielzmong@gmail.com"><i>gabrielzmong@gmail.com</i></a><br>
                    School: <a href="mailto:gabriel.ong.2023@scis.smu.edu.sg"><i>gabriel.ong.2023@scis.smu.edu.sg</i></a>
                </p>
                <h3>LinkedIn</h3>
                <p>
                    <a href="https://www.linkedin.com/in/gabriel-zmong" target="_blank"><i>https://www.linkedin.com/in/gabriel-zmong</i></a>
                </p>
            `
      break
  }
}

function updateTime() {
  const now = new Date()
  const options = { timeZone: "Asia/Singapore", hour: "2-digit", minute: "2-digit", second: "2-digit" }
  document.getElementById("current-time").textContent = now.toLocaleTimeString("en-US", options)
}

setInterval(updateTime, 1000)
updateTime()

document.getElementById("current-year").textContent = new Date().getFullYear()

async function generateSecret() {
  const t = "If you decrypt this, send me the salt on LinkedIn."
  const s = "gongahkia"
  const result = await f(i(h(g(e(c(s + t)), s), s)))
  document.getElementById("secret").textContent = result
}

function a(b) {
  return Array.from(new Uint8Array(b))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function c(d) {
  let e = ""
  for (const a of d) {
    e += a.charCodeAt(0).toString()
  }
  return e
}

function e(a) {
  const c = Math.ceil(Math.sqrt(a.length))
  const d = []
  for (let e = 0; e < c; e++) {
    d[e] = []
    for (let f = 0; f < c; f++) {
      const g = e * c + f
      if (g < Math.sqrt(a.length)) {
        d[e][f] = a[g]
      } else {
        d[e][f] = ""
      }
    }
  }
  let h = ""
  for (let f = 0; f < c; f++) {
    for (let e = 0; e < c; e++) {
      if (d[e][f]) {
        h += d[e][f]
      }
    }
  }
  return h
}

function g(a, b) {
  const c = a.split("").reverse().join("")
  const d = b.length
  const e = c.slice(-d) + c.slice(0, -d)
  const f = b + e + b
  return f
}

function h(a, b) {
  const bLength = b.length
  let d = ""
  for (let e = 0; e < a.length; e++) {
    const f = a.charCodeAt(e)
    if (f >= 65 && f <= 90) {
      d += String.fromCharCode(((f - 65 + bLength) % 26) + 65)
    } else if (f >= 97 && f <= 122) {
      d += String.fromCharCode(((f - 97 + bLength) % 26) + 97)
    } else {
      d += a[e]
    }
  }
  return d
}

function i(j) {
  return j + Date.now()
}

async function f(t) {
  const e = new TextEncoder()
  return a(await window.crypto.subtle.digest("SHA-256", e.encode(t)))
}

loadPage("home")