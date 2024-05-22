# MinlyLite Project
This is a media-sharing platform consisting of a backend server with CRUD operations, mobile applications, and a web application. The platform allows users to upload images or videos, view a list of all images and videos, and like/dislike them.

## Tech Stack used
- ### Frontend (Web)           
    -   React.js (Typescript)
    -   Firebase storage
- ### Frontend (Mobile) - not yet finished :(
    -   Flutter (Dart)
    -   Firebase storage
- ### Backend
    -   Node.js (Typescript)
    -   MongoDB as a Database
    -   JWT for auth
    -   Nodemailer for mails
- ### DevOps
    -   Docker (All apps are Dockerized except for flutter)
    -   Dockerhub (as our docker images registery)
    -   Docker-compose  for orchasteration
    -   ngnix as a web server (as a proxy)
    -   CICD using Github actions;

**CI is working and every push on main it push new images in Dockerhub.**


## Project setup

- In each project folder/app you will find a detailed instructions, how to run it and install its dependencies.

### To run the fully integrated project:
- Make sure to add .env file for each project name them .env_api for BE, .env_web for FE, in addition to .env including the redis pwd in the main directory for docker-compose


## Project Structure

```bash
.
├── .github
│  ├── workflows
│  │  └── main.yml         # for CICD
│
├── api/src
│  ├── constants
│  ├── contracts
│  ├── controllers
│  ├── dataSources
│  ├── guards
│  ├── i18n
│  ├── index.ts
│  ├── infrastructure
│  ├── mailer
│  ├── middlewares
│  ├── models
│  ├── routes
│  ├── services
│  ├── storage
│  ├── templates
│  ├── utils
│  └── validations
├── api/docker-compose.yml
├── api/Dockerfile
|
├── mobile_cross/lib
│  ├── components
│  ├── datamodels
│  ├── dependencyInjection.dart
│  ├── main.dart
│  ├── providers
│  ├── routing
│  ├── services
│  └── widgets
|
├── nginx/*.conf        # for proxy
|
├── web/src
│  ├── App.ts/App.css
│  ├── assets
│  ├── common
│  ├── components
│  ├── config
│  ├── index.ts/index.css
│  ├── pages
│  ├── services
│  ├── types
│  └── utils
├── web/Dockerfile
|
└── docker-compose.yml
```
