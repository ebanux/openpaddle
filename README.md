# MonetizePro: A Monetization Showcase Application

This project is a high-fidelity, interactive prototype designed to demonstrate a wide array of monetization models in a single, cohesive application. It serves as a showcase for advanced UI/UX patterns, complex state management in React, and integration with third-party services like Stripe.js and the Google Gemini API.

The application is built as a single-page React application using TypeScript, with a focus on a clean, component-based architecture and a great developer experience.

---

## 🚀 Key Features

This application is packed with features that simulate a real-world SaaS product for creating payment pages.

*   **Multi-Use-Case Platform:** Supports a wide variety of monetization strategies:
    *   Fundraising & Donations
    *   Product Sales (Physical & Digital)
    *   Subscriptions & Recurring Rentals
    *   Timed Rentals (e.g., equipment)
    *   Parking Sessions
    *   ...and many more.

*   **Powerful Two-Panel Editor:** A side-by-side view with a configuration panel on the left and a live, responsive mobile preview on the right.

*   **Wizard-Style Configuration:** Both the editor and the preview use a synchronized wizard stepper (`Page` -> `Checkout` -> `After Payment`, with a `Portal` step for subscriptions) for an intuitive and guided user experience.

*   **Template-Driven Workflow:** Users can kickstart projects by selecting from a rich library of pre-configured templates for both primary pages and post-payment experiences.

*   **Dynamic, Schema-Driven Forms:** The UI for editing page configurations is generated dynamically from a JSON schema, making the application highly extensible and maintainable.

*   **AI-Assisted Content Generation:** Leverages the **Google Gemini API** to help users generate text content (like titles and descriptions) and placeholder images directly within the editor.

*   **Simulated Stripe Payments:** Integrates the Stripe.js React library to provide a realistic, secure checkout modal for simulating card payments.

*   **Customizable Customer Portal:** A simulated, brandable customer portal is available for subscription-based models, allowing end-users to manage their (mock) subscriptions and view payment history.

*   **Advanced Sharing & Publishing:**
    *   Generates clean, path-based URLs with user subdomains (e.g., `https://alice.a-qr.link/my-fundraiser`).
    *   Automatically creates QR codes for both page and session URLs.
    *   Supports QR code downloads and native web sharing on compatible devices.

For a detailed list of all implemented features and a roadmap for future development, please see the [**CHANGELOG.md**](CHANGELOG.md).

---

## 🛠️ Technology Stack

*   **Frontend Framework:** [React](https://react.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Payment Simulation:** [Stripe.js](https://stripe.com/docs/js) & [@stripe/react-stripe-js](https://github.com/stripe/react-stripe-js)
*   **AI Integration:** [Google Gemini API](https://ai.google.dev/) via the `@google/genai` SDK.
*   **Module System:** ES Modules with an `importmap` in `index.html` for dependency management without a build step.

---

## 📂 Project Structure

The project is organized to separate concerns, making it easier to navigate and extend.

```
/
├── components/           # Reusable React components (forms, modals, layout, etc.)
├── pages/                # Top-level page components for each use case and the after-payment displays.
├── CHANGELOG.md          # Tracks implemented and future features.
├── README.md             # This file.
├── App.tsx               # The main application component, handling state and logic.
├── constants.ts          # Mock data, theme definitions, and application-wide constants.
├── index.html            # The main HTML entry point.
├── index.tsx             # The React application root.
├── metadata.json         # Project metadata.
├── schemas.ts            # JSON schema definitions for all dynamic forms.
├── templates.ts          # All pre-configured page and after-payment templates.
└── types.ts              # Core TypeScript type and interface definitions.
```