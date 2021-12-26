# Pokedex App

Small web application with HTML, CSS, and JavaScript that loads a list of data from an external/public API and enables the viewing of more details for a given data item on demand.

### Key Features

* Load data from an external source (RESTful PokeAPI v2)
* View a list of items (Pokemon)
* View details for that item on user action (e.g., by clicking on a list item): Image, Height, Weight, Types

## Built with
* HTML5
* CSS3
* JavaScript ES6

## Dependencies
* PokeAPI v2
* jQuery 3.3.1
* Popper 1.14.7
* Bootstrap 4.3.1

## ESLint rules
`{
  "env": {
    "es6": true,
    "browser": true,
    "jquery": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "rules": {
    "quotes": ["error", "single"]
  }
}
`

This project was built as part of the CareerFoundry Full-Stack Web Development Program / Achievement 1 / Introduction to JavaScript.
