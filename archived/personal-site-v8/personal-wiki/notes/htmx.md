---
category: Tech
---
# htmx

# `htmx`

JavaScript library that enables access to modern browser features directly from HTML.

## Introduction

* lightweight library that integrates AJAX, CSS Transitions, WebSockets and Server-Sent Events (SSEs)
* used to build dynamic, interactive web apps without the weight of a full client-side framework
* behaviour is defined with HTML attributes

## Quickstart

```
<!-- ----- QUICKSTART ----- -->
    <!-- htmx interacts with  -->
        <!-- server-side data structures (JavaScript objects like JSON) --> 
        <!-- client-side DOM structure (standard HTML elements) -->
        <!-- eg. use JSON data returned from the server to update DOM elements -->
    <!-- below is an annotated example of html incorporating htmx behaviours -->

<!-- --- HTMX SYNTAX OVERVIEW --- -->

<!-- - CORE ATTRIBUTES - -->
    <!-- htmx is included within the <script> tags of your HTML file under the specified src attribute -->
    <!-- hx-get => issues a GET request to the specified URL -->
    <!-- hx-post => issues a POST request to the specified URL -->
    <!-- hx-put => issues a PUT request -->
    <!-- hx-delete => issues a DELETE request -->
    <!-- hx-swap => specifies how a given response should be swapped into the DOM to replace an existing DOM element -->
    <!-- hx-trigger => specifies an event that triggers the given request -->
    <!-- hx-target => specifies the target HTML element where a given response should be assigned -->

<script src="https://unpkg.com/htmx.org"></script>

<button hx-get="/example" hx-trigger="click">Click me</button> <!-- this button sends a GET request when clicked -->

<form hx-post="/submit" hx-trigger="submit" hx-target="#response"> <!-- the hx-target attribute specifies the response will be placed in the HTML element with id="response" -->
    <input type="text" name="data" placeholder="Enter some data">
    <button type="submit">Submit</button> <!-- this form sends a POST request when submitted -->
</form>

<div hx-get="/content" hx-swap="innerHTML" hx-trigger="load"> <!-- this div swaps its content with the response from a GET request -->
    Loading content...
</div>

<button hx-get="/data" hx-trigger="click" hx-target="#data-container">Load Data</button>
<div id="data-container"></div> <!-- this updates the DOM element with id="data-container" using JSON data from the server -->
```

## More on

* [htmx.org](https://htmx.org/)
* [htmx documentation](https://htmx.org/docs/)
* [full introduction to htmx using golang](https://youtu.be/x7v6SNIgJpE?si=QCnZhdS9RhaC1612)
* [htmx and hyperview with hypermedia systems](https://hypermedia.systems/)
* [from react to htmx](https://youtu.be/wIzwyyHolRs?si=InF9hOtViCNj0Z9K)
* [r/htmx](https://www.reddit.com/r/htmx/)
* [learn html in y minutes](https://learnxinyminutes.com/docs/html/)
