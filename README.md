# Electron Vue Template

A template that comes with an Electron application bundled with VueJS 3.

## Why?

This project got inspired by [electron-vue](https://github.com/SimulatedGREG/electron-vue)

electron-vue-template uses updated Electron/Vue versions and build tools! 👍 The idea of this template is to keep it a really simple Electron application without unnecessary dependency overhead.

## About

This template uses [ViteJS](https://vitejs.dev) for the development server providing HMR (Hot Reload) while developing your Electron app.\
Building the Electron application is done by [Electron Builder](https://www.electron.build/), making your application cross-platform and easily distributable.

This template doesn't come with any unnecessary dependencies and is unopinionated, so you can start developing your Electron / Vue applications however you want.

## Get Started

To start developing your Electron application execute the following commands:

```bash
git clone https://github.com/Deluze/electron-vue-template
cd electron-vue-template
npm install
npm run dev
```

That's all!

## Commands

```bash
npm run dev # starts application with hot reload
npm run build # builds application

# OR

npm run build:win # uses windows as build target
npm run build:mac # uses mac as build target
npm run build:linux # uses linux as build target
```

Optional configuration options can be found in the [Electron Builder CLI docs](https://www.electron.build/cli.html).

## Project Structure

```bash
- root
  - config/
    - vite.js # ViteJS configuration
    - electron-builder.json # Electron Builder configuration
  - scripts/ # all the scripts used to build or serve your application, change as you like.
  - src/
    - main/ # Main thread (Electron application source)
    - renderer/ # Renderer thread (VueJS application source)
```
