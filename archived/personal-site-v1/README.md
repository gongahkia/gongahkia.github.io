# personal portfolio site version 1

Built in Typescript, HTML and CSS.

## takeaways

* HTML, CSS animation and webpage structuring using flexboxes
* Typescript communication with Github API, rudimentary data parsing and display
* Intuitive UI UX web design
* Proper project structuring
* Deploying website to Github (and relevant restructuring) ++ why I pivoted from Vercel to Github 

### project structure

```console
personal-site
│
├── about.html
├── contact.html
├── index.html
├── css
│   └── main.css
├── ts
│   ├── about.ts
│   ├── contact.ts
│   └── main.ts
├── for-testing
│   ├── githubAPI.ts
│   └── tsconfig.json
├── README.md
├── assets
├── fonts
├── node_modules
├── package.json
├── package-lock.json
└── tsconfig.json
```

## implementation log

* [x] Handle movement of page to page, better signpost which page I'm currently on once clicked.
* [x] Add animations and transitions to the text options on `about.html` page
* [x] General theming of site to be very **code-like**, with references to code throughout.
* [x] Implement respective logic for each web page in their respective TS *(compiled to JS)* files.
* [x] Properly style the general look of the site (fonts, colorscheme, overall code theme in `main.css`.
* [x] CSS flexboxes
* [x] Github API
    * [x] Complete Github API code to sort and choose 3 repos by most recent updated date
    * [x] Render most recently updated github repos dynamically by referencing this article (https://stackoverflow.com/questions/12410895/changing-html-data-before-page-rendering), using Github API code in `for-testing/githubAPI.ts`
    * [x] DIY style a new flexbox div in the about page, to include relevant values (included in the Github repo display [Repo name, Repo desc, Repo language and associated emoji, embedded URL behind each clickable repo box]) => (maybe use dynamic cards display for this??) for latest 4 repos updated 
    * [x] properly style the text in the repos (title), (description), (language) and centre text accordingly
* [x] About page
    * [x] Add actual content referenced from **General structure** above
    * [x] Allow for emailing and telegram and other contact options to pop up in current tab
    * [x] Add CSS animation with keyframes and CSS transitions of the respective clickable buttons.
* [x] Contact page
   * [x] Add transparent background PNG of me that Bethel drew, add eyeballs that track the mouse based on https://youtu.be/TGe3pS5LqEw
