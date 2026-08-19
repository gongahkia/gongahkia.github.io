---
category: Tech
---
# Cordova

# `Cordova`

Write once deploy everywhere. *(Note this document covers [Apache Cordova](https://cordova.apache.org/).)*

## Purpose

1. Cross-platform Mobile Application Development Framework
2. Wraps your Web App in a native container *([WebView](https://en.wikipedia.org/wiki/WebView))*, allowing development with HTML, CSS, JavaScript *(and other frontend frameworks*)
3. Provides access to native device features through plugins

## Quickstart

Cordova projects generally take the following directory structure.

* `www/`: Web Application code *(HTML, CSS, JS, other frontend frameworks)*
* `platforms/`: Platform-specific code *(Android, IOS, etc.)*
* `plugins/`: Installed Cordova plugins
* `config.xml`: Main configuration file for Cordova App

```
example-cordova-app/
├── config.xml
├── hooks/
├── platforms/
├── plugins/
├── www/
│ ├── css/
│ ├── js/
│ └── index.html
├──...
```

## Cordova and [Vue.js](https://vuejs.org/)

1. Use Vue.js to build out the frontend of your Web App within Cordova's `www` directory.
2. Use Cordova to package your Web App as a mobile application.

## More on

* [Apache Cordova Core Documentation](https://cordova.apache.org/docs/en/latest/)
* [vue3cordova](https://github.com/waliente/vue3cordova)
* [Iaptic Cordova Documentation](https://www.iaptic.com/documentation/cordova)
* [WebView API Reference](https://developer.android.com/reference/android/webkit/WebView)
* [WKWebView Apple Developer Documentation](https://developer.apple.com/documentation/webkit/wkwebview)
