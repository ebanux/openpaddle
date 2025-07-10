# Changelog - Monetization Showcase

This document tracks the major features implemented in the application. For a list of planned future enhancements, see `TODOs.md`.

---

## 🚀 Implemented Features

### Core Architecture & UI/UX
- **Component-Based React App:** Built with React, TypeScript, and functional components.
- **Two-Panel Layout:** Features a powerful editor on the left and a responsive, live preview on the right.
- **Wizard-Style Editor:** The editor panel uses a clean, wizard-style stepper (`Page` -> `Checkout` -> `After Payment`, with a `Portal` step for subscriptions) for a focused and intuitive configuration experience.
- **Synchronized Preview Stepper:** The live preview panel mirrors the editor's wizard, allowing users to instantly view the corresponding step (`Page`, `Checkout`, `After Payment`, `Portal`) of the user journey.
- **Collapsible UI Sections:** Key areas of the editor, such as the template browser and sharing panel, are collapsible to maximize screen real estate for the main configuration forms.
- **Theming System:** A `PageStyleEditor` allows for applying various visual themes (e.g., Light, Dark, Ocean Breeze) that affect colors, fonts, and backgrounds across the live preview.
- **Modal System:** A robust modal system is in place for template previews, checkout, and user login simulations.

### Page Creation & Configuration
- **Diverse Monetization Use Cases:** Supports a wide array of monetization models, including:
  - Fundraising & Donations
  - Product Sales (Physical & Digital)
  - Subscriptions & Recurring Rentals
  - Timed Rentals (e.g., equipment)
  - Parking Sessions
  - Restaurant Bill Payments
  - Tips & Gratuity
  - Event Ticket Sales
  - Appointment Booking
  - Digital Content Access
  - Simple Invoicing
- **Template-Driven Workflow:** Users can select from a rich library of pre-configured templates for both primary pages and "after payment" pages to rapidly start a project.
- **Dynamic Forms:** Configuration forms are dynamically generated from a JSON schema, making it easy to manage and extend settings for each use case.
- **AI-Assisted Content:** Form fields are equipped with an "AI Generate" button, allowing users to leverage Gemini to create text content (like titles and descriptions) or generate placeholder images.

### Checkout & Payment Flow
- **Simulated Stripe Checkout:** Integrates a `CheckoutModal` using the Stripe.js React library to simulate a secure card payment flow.
- **Checkout Preview:** The "Checkout" step in the preview wizard displays a non-interactive mockup of the checkout modal, populated with data from the configured page.
- **Promotion Code Simulation:** The UI and logic support applying mock promotion codes that adjust the final price at checkout.

### After Payment & Session Management
- **Flexible After Payment Options:** Users can configure what happens after a successful payment:
  1.  A default confirmation screen.
  2.  A custom text message.
  3.  A redirect to an external URL.
  4.  A fully customizable "session page" using another template.
- **Custom After Payment Pages:** A library of "After Payment" templates is available, which can be configured independently.
- **Session Persistence:** Successfully completed payment flows generate a unique session ID, and the corresponding data is saved to `localStorage` to simulate persistence for session pages.

### Sharing & Publishing
- **Clean, Path-Based URLs:** Generates user-friendly, readable URLs that incorporate a user's subdomain and a customizable page slug (e.g., `https://alice.a-qr.link/my-fundraiser`).
- **QR Code Generation:** Automatically generates QR codes for both the main page URL and dynamic session URLs for easy mobile sharing and testing.
- **QR Code Downloads:** Users can download the generated QR codes as PNG files.
- **Native Web Sharing:** Integrates the `navigator.share` API to enable seamless sharing to social media, messaging apps, and contacts on supported devices.
- **Dynamic Session Links:** A "Get a new Section URL" button dynamically creates unique test links for post-payment session pages on demand.

### Customer Portal
- **Self-Service Portal for Subscriptions:** For subscription-based use cases, a new "Portal" configuration tab and preview step are available.
- **Branded Experience:** The portal's title, welcome message, and support information are fully customizable.
- **Feature-Rich Simulation:** The portal provides a simulated view for end-customers to:
  - View active and past subscriptions.
  - See their payment history.
  - Access (mock) buttons to cancel a subscription or update a payment method.