# Tailwind CSS

# `Tailwind CSS`

Powerful inline styling with CSS classes.

## Introduction

* no CSS rules, instead pre-defined utility classes are applied to style each HTML element
* each Tailwind CSS class corresponds to a single CSS property (or group of related properties) via atomic classes affording minute tweaks in styling
* responsive design is built-in
* supports rapid iteration and flexible development
* stay within your HTML file throughout production

## Example

```
<!-- --- EXAMPLE --- -->
  <!-- each use of inline Tailwind CSS has annotations underneath -->

<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>watermelon Tailwind CSS pineapple</title>
  <script src="https://cdn.tailwindcss.com"></script> <!-- include Tailwind CSS play CDN for quick development, not for final production -->
</head>

<body class="bg-gray-100"> 
<!-- bg-gray-100 => sets the background color of the body to a light gray -->

  <header class="bg-blue-500 text-white p-4">
  <!-- bg-blue-500 => sets the background color of the header to a medium blue -->
  <!-- text-white => sets the text color to white -->
  <!-- p-4 => adds padding of 1rem on all sides -->

    <h1 class="text-3xl font-bold">Welcome to Tailwind CSS</h1>
    <!-- text-3xl => sets the font size to 1.875rem -->
    <!-- font-bold => sets the font weight to bold -->

  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <!-- grid => creates a CSS grid container -->
  <!-- grid-cols-1 => specifies the creation of one column for mobile devices -->
  <!-- md:grid-cols-2 => specifies the creation of two columns for medium-sized screens and up -->
  <!-- gap-4 => adds a gap of 1rem between grid items -->

    <div class="bg-green-200 p-4 rounded">
    <!-- bg-green-200 => sets a light green background color -->
    <!-- p-4 => adds padding of 1rem on all sides -->
    <!-- rounded => applies a small border radius to the HTML element -->

      <p class="text-green-800 font-medium">Easy to learn</p>
      <!-- text-green-800 => sets the text color to a dark green -->
      <!-- font-medium => sets the font weight to medium -->

    </div>

  </div>

  <button class="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
  <!-- mt-6 => adds a top margin of 1.5rem -->
  <!-- bg-blue-500 => sets the background color to medium blue -->
  <!-- hover:bg-blue-600 => changes the background color to a darker blue on hover -->
  <!-- text-white => sets the text color to white -->
  <!-- font-bold => sets the font weight to bold -->
  <!-- py-2 => adds vertical padding of 0.5rem -->
  <!-- px-4 => adds horizontal padding of 1rem -->
  <!-- rounded => applies a small border radius -->
  <!-- transition duration-300 => adds a smooth transition effect over 300ms -->

    Learn More
  </button>

</body>
</html>
```

## More on

* [purgecss](https://purgecss.com/)
* [tailwindcss.com](https://tailwindcss.com/)
* [tailwind css documentation](https://tailwindcss.com/docs/installation)
* [going into production with tailwind css](https://tailwindcss.com/docs/optimizing-for-production)
* [why use tailwind css](https://www.reddit.com/r/webdev/comments/p4sfrh/why_is_tailwind_so_popular/)
* [what component libraries do you use](https://www.reddit.com/r/nextjs/comments/1f1d8gp/what_component_libraries_do_you_use/)

## Tailwind component libraries for use with [Next.js](https://nextjs.org/)

* [aceternity](https://ui.aceternity.com/)
* [shadcn](https://ui.shadcn.com/)
* [animata](https://animata.design/)
* [magicui](https://magicui.design/)
* [cultui](https://www.cult-ui.com/)
* [syntaxui](https://syntaxui.com/)
* [mui](https://mui.com/)
* [mantine](https://mantine.dev/)
* [chakraui](https://v2.chakra-ui.com/)
* [flowbite](https://flowbite.com/)
* [tailwindui](https://tailwindui.com/)
* [daisyui](https://daisyui.com/)
* [hyperui](https://www.hyperui.dev/)
* [preline](https://preline.co/)
* [framer](https://www.framer.com/motion/)
* [radixui](https://www.radix-ui.com/)
* [primereact](https://primereact.org/)
* [ant](https://ant.design/)
* [react bootstrap](https://react-bootstrap.github.io/)
* [nextui](https://nextui.org/)
* [rsuitejs](https://rsuitejs.com/)
* [blueprintjs](https://blueprintjs.com/)
* [parkui](https://park-ui.com/)
* [grommet](https://v2.grommet.io/)
* [tailus](https://ui.tailus.io/)
* [plumeui](https://plumeui.com/)
* [orbit](https://orbit.kiwi/)
* [tremor](https://tremor.so/)
* [pageui](https://pageui.shipixen.com/)
* [floatui](https://floatui.com/)
* [cloudscape](https://cloudscape.design/)
* [naiveui](https://www.naiveui.com/)
* [nyxbui](https://nyxbui.design/)
* [neobrutalism](https://www.neobrutalism.dev/)
