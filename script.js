// ----- SETUP CODE -----

const config = {
    timeZone: "Asia/Singapore",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  },
  formatter = new Intl.DateTimeFormat([], config)

const currentYear = new Date().getFullYear()

// ----- ENCRYPTION -----

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
  b = b.length
  let d = ""
  for (let e = 0; e < a.length; e++) {
    const f = a.charCodeAt(e)
    if (f >= 65 && f <= 90) {
      d += String.fromCharCode(((f - 65 + b) % 26) + 65)
    } else if (f >= 97 && f <= 122) {
      d += String.fromCharCode(((f - 97 + b) % 26) + 97)
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

// ----- EXECUTION CODE -----

setInterval(() => {
  document.querySelector("#time").innerText = formatter.format(new Date())
}, 1000)

document.querySelector("#current-year").innerText = currentYear

const t = "If you decrypt this, send me the salt on LinkedIn."
const s = "gongahkia"
;(async () => (document.querySelector("#secret").innerText = await f(i(h(g(e(c(s + t)), s), s)))))()

// ----- PREVENTION CODE -----

document.addEventListener("contextmenu", (event) => event.preventDefault())
document.addEventListener("keydown", (event) => {
  if (
    event.key === "F12" ||
    (event.ctrlKey && event.shiftKey && event.key === "I") ||
    (event.ctrlKey && event.shiftKey && event.key === "J") ||
    (event.ctrlKey && event.shiftKey && event.key === "C") ||
    (event.ctrlKey && event.shiftKey && event.key === "K")
  ) {
    event.preventDefault()
    // window.location.href = "about:blank";
  }
})

const links = document.querySelectorAll("#links a")
links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    link.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) rotate(${Math.random() * 10 - 5}deg)`
  })
  link.addEventListener("mouseout", () => {
    link.style.transform = "none"
  })
})