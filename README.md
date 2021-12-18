# web-console
Agrihub Cloud Platform Web Console; code with Angular4, CoreUI and ❤ (Undergraduate Thesis).

## Features
1. Full SPA (Single Page Application).
2. Authenticated Using JWT (JSON Web Token).
3. User credentials and token store on browser cookie (raw).
4. Access control per page, thanks to Angular [CanActive](https://angular.io/api/router/CanActivate) guards and my own [AuthenticateService](https://github.com/OckiFals/web-console/blob/master/src/app/views/core/authenticate/authenticate.service.ts) class.
5. Using Bootstrap Component UI, thanks to [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/).

# Cons
1. Storing raw data on browser cookie is very risk, inseccure, and bad-practice; i will fix this problem later...

# Instruction
1. Install NodeJS
2. Install NPM
3. Clone Repository
`$ git clone https://github.com/OckiFals/web-console.git`
4. Change directory
`$ cd web-console`
5. Install Dependencies (Angular4, TypeScript, RxJS, etc.)
`$ npm install`
6. Serve...
`$ npm start`
7. Or Build...
`$ npm run build`

Output bundle in /dist directory
