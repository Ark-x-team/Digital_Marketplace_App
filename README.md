# Markstone

![App Screenshot](https://github.com/Ark-x-team/Digital_Marketplace_App/assets/102709884/753df85a-6ba5-4e73-8ca7-6f81c5541ffc)

Visit the web app [here](https://markstone.onrender.com/).

## Overview 💡

This web application serves as a versatile platform for digital products across a spectrum of categories. From educational resources like e-books and online courses to programming tools, graphic design assets, and multimedia content such as videos, music, and photography, the platform caters to a broad audience.

## Tech Stack ⚒️

**Client:** [React](https://react.dev/)([Vite.js](https://vitejs.dev/)), [Zustand](https://zustand-demo.pmnd.rs/), [Next UI](/), [TailwindCSS](https://tailwindcss.com/)

**Server:** [Node](https://nodejs.org/en/), [Express](https://expressjs.com/)

**Database:** [Mongo DB](https://www.mongodb.com/).

## Key Features ✨

- 🎨 **User Friendly Interface:** The platform is designed with a user-friendly interface, powered by [Tailwind CSS](https://tailwindcss.com/), and enhanced with [Next UI](https://nextui.org/), making digital assets easily accessible.
- 💳 **Secure Purchases:** Proceed to purchase for instant access to downloadable content with our secure transaction processes powered by [Stripe](https://stripe.com/), for testing purposes, you can use the credit card number 4242 4242 4242 4242.
- 🌐 **Multilingual Support:** French and English Translation: Choose your preferred language for a seamless browsing experience. Utilizing the power of `react-i18next`, our content is dynamically translated to provide you with a personalized experience in the language of your choice.
- 🌙 **Dark Mode:** Toggle between light and dark modes for a personalized viewing experience.
- 🔐 **Authentication:**
  - reCaptcha Integration: Ensure secure and reliable user authentication using [reCaptcha](https://www.google.com/recaptcha/about/). We leverage the capabilities of the `react-google-recaptcha` library to enhance the security of your interactions.
  - Google Authentication: Simplify user login processes with Google authentication. Utilize the power of Google OAuth by integrating [Google Authentication](URL_HERE) and the `@react-oauth/google` library to streamline and secure user logins.

## Security Config 🛡️

- **Refresh Token Mechanism:** Enables the issuance of short-lived access tokens and long-lived refresh tokens, and helps mitigate security risks associated with long-lived access tokens.
- **Helmet Middleware:** Utilizing the `Helmet` library, implemented to protect the application from common web vulnerabilities. This library enhances security by setting various HTTP headers to secure default values.
- **HTTP Parameter Pollution (HPP) Protection:** Implemented with the `hpp` library, guarding against HTTP Parameter Pollution attacks that may occur when multiple values are assigned to the same parameter.
- **Disable x-powered-by Header:** Implemented with the `x-powered-by` library, preventing the disclosure of information about the application's technology stack.
- **Express MongoDB Sanitization:** Implemented with the `express-mongo-sanitize` library, providing protection against NoSQL injection attacks by sanitizing user-supplied data.
- **Rate Limiting for Public APIs:** Implemented with the `express-rate-limit` library, mitigating the impact of abuse, intentional or accidental, by limiting repeated requests from the same IP address.
- **Disable React DevTools:** Enhanced security is achieved by utilizing the `@fvilers/disable-react-devtools` library. It disables React DevTools in production, mitigating potential security risks.

## Optimizations ⚡️

To enhance application performance, we've implemented the following optimizations:

- **Million.js Integration:** Leveraging the power of [Million.js](https://million.dev) to optimize client-side rendering and improve overall frontend performance.

- **Lazy Loading Components:** Implemented lazy loading for components to optimize the initial page load and reduce the time it takes for users to interact with the application.

## Environment Variables ⚙️

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

## Quick Start 🚀

Follow these steps to quickly get started with our Digital Marketplace Platform:

```bash
  git clone https://github.com/Ark-x-team/Digital_Marketplace_App.git
```

Go to the project directory

```bash
  cd my-project 
```

client 

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

server 

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Contributors 🤝

- [AAZA Seifeddine](https://github.com/seifaaza/)
- [RAMI Faiza](https://github.com/faizaRami/)
- [ARSALA Yassir](https://github.com/BHV-C/)

Thank you for using Markstone !
