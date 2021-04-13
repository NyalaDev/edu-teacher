# Barmaga.io Teacher Dashboard

Barmaga.io, an open source education/learning platform.
This is the teacher's dashboard. If you are looking for the main website or the back-end pelase check:

- Website(Front End): [edu-ui](https://github.com/NyalaDev/edu-backend)
- Backend (API): [edu-backend](https://github.com/NyalaDev/edu-backend)

This project is build with [React and TypeScript](https://create-react-app.dev/docs/adding-typescript/)

[![License](https://img.shields.io/:license-mit-blue.svg?style=flat-square)](https://badges.mit-license.org)

## Getting started

- Clone the repo
- install the dependencies

```
yarn install
```

- Make a copy of `.env.example` to `.env.development`

> Make sure to copy a valid token for a teacher from your running local instance of the frontend website (normally on http://localhost:8000) to `REACT_APP_AUTH_TOKEN` in `.env.development`. The value is in `localStorage` under `AuthToken`.

- Start the development server

```
yarn start
```
