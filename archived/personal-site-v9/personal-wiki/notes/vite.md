---
category: Tech
---
# Vite

# `Vite`

Elite JavaScript build tool.

## Introduction

* opinionated JavaScript build tool with sane defaults for speed and simplicity
* leverages on native ES modules in the browser to load web code at blazingly fast speeds regardless of application size
* built-in hot module replacement
* serves a local development server
* bundles JavaScript, CSS and other source files for production
* pairs excellently with first-class support for the JavaScript front-end framework Vue

## Quickstart

A basic Vite project has the following structure.

```
my-watermelon-and-vite-powered-app/
├── index.html
├── src/
│   ├── main.js
│   └── App.vue
├── package.json
└── vite.config.js
```

* `vite.config.js`: Vite configuration file that specifies project behavior and defines custom functionality *(plugins, build rollup options, server configuration, import aliases, environment variables, library integration)*
* `main.js`: entry point of a Vite project that bootstraps your application by importing necessary modules and mounting root components to DOM elements, allowing the app to be rendered in the browser

### an example `vite.config.js`

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()]
})
```

### an example `main.js`

```
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

## More on

* [vitejs.dev](https://vitejs.dev/)
* [install vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
* [vite documentation](https://devdocs.io/vite/)
* [what's the hype with vite](https://www.reddit.com/r/webdev/comments/z4rbe4/whats_the_hype_with_vite/)
* [vuejs.org](https://vuejs.org/)
* [webpack.js.org](https://webpack.js.org/)
* [rollupjs.org](https://rollupjs.org/)
