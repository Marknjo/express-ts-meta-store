# Turex Meta

## :balloon: Overview

A Typescript Metadate library for express that uses ES6.

## :anger: Requirement

- Nodejs
- Typescript
- Expressjs

## :scroll: QuickStart

1. Clone this repo or download the latest release. Rename it to whichever project name you want.
2. `cd <project name>`
3. Run `npm install`
4. **YOU ARE READY TO GO**

## :volcano: Modes

- `start:clean`: rm -rf build
- `start:build`: tsc -w
- `start:dev`: nodemon build/app -e js,ts,css,env
- `start`: concurrently npm:start:build npm:start:dev
