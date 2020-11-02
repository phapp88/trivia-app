# Trivia Crush

Trivia Crush is an application that lets users practice their trivia skills. Each round of trivia is 10 questions, and users have 30 seconds to answer each question. If they answer a question correctly, their score for the round increases by the number of seconds left remaining to answer the question. Once the user has answered every question, the number of questions they answered correctly and their total score is displayed.

## Installation

Running this app locally requires Git, Node, and npm to be installed on your machine.

First, clone this repository and install the dependencies:

```bash
git clone https://github.com/phapp88/trivia-app
cd trivia-app
npm install
```

To run a development build of the application:

```bash
npm start
```

To create a production build in the `build` directory:

```bash
npm run build
```

The production build is ready to be deployed to a server. One way to deploy the build on a static server is by using [serve](https://github.com/vercel/serve):

```bash
npm install -g serve
serve -s build
```
