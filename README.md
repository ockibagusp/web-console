# angular2-agri-hub
Agrihub Client; code with Angular2 and ❤

## Features
1. Full SPA (Single Page Application).
2. Authenticated Using JWT (JSON Web Token).
3. User credentials and token store on browser cookie (raw).
4. Access control per page, thanks to my own [AuthenticateService](https://github.com/OckiFals/angular2-agri-hub/blob/dev/dev/core/authenticate/authenticate.service.ts) and [AuthenticateComponent](https://github.com/OckiFals/angular2-agri-hub/blob/dev/dev/core/authenticate/authenticate.component.ts) class.
5. Using Bootstrap Component UI, thanks to [ng-bootsrap](https://ng-bootstrap.github.io/#/home).

# Cons
1. Storing raw data on browser cookie is very risk, inseccure, and bad-practice; i will fix this problem later...

# Instruction
1. Install NodeJS
2. Install NPM
3. Clone Repository
`$ git clone https://github.com/OckiFals/angular2-agri-hub.git`
4. Change directory
`$ cd angular2-agri-hub`
5. Install Dependencies (Angular2, TypeScript, RxJS, etc.)
`$ npm install`
6. Serve...
`$ npm start`
