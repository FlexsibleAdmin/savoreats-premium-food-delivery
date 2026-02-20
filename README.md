# SavorEats - Premium Food Delivery

[aureliabutton]

SavorEats is a visually breathtaking, feature-rich food delivery platform designed to provide a premium, frictionless ordering experience. Built with a focus on visual excellence and interactive polish, it offers real-time cart management, dynamic restaurant filtering, and a seamless end-to-end ordering journey.

## 🌟 Key Features

* **Discovery & Filtering:** A dynamic home feed featuring high-quality restaurant presentations, horizontal scrolling category pills, and real-time filtering by cuisine, rating, delivery time, and price.
* **Immersive Restaurant Menus:** Beautiful restaurant pages with full-width hero banners, sticky category navigation, and quick 'add-to-cart' micro-interactions.
* **Real-time Cart Management:** A persistent, slide-out cart drawer powered by Zustand that calculates subtotals, taxes, and delivery fees on the fly.
* **Checkout & Order Tracking:** A clean, distraction-free checkout flow followed by a beautiful post-purchase order tracking interface with visual progress timelines.

## 🛠️ Technology Stack

**Frontend:**
* React 18 & React Router 6
* Tailwind CSS & Shadcn UI (Radix Primitives)
* Framer Motion (Animations & Micro-interactions)
* Zustand (Global State Management)
* Vite (Build Tool)
* TypeScript

**Backend & Infrastructure:**
* Cloudflare Workers
* Cloudflare Durable Objects (Single GlobalDurableObject pattern)
* Hono (Lightweight Web Framework)

## 🏗️ Architecture

The application utilizes a modern, edge-first architecture:
* **Client:** React frontend managing local UI state and optimistic cart updates via Zustand.
* **API Layer:** Hono Worker providing a fast, RESTful API.
* **Persistence:** A single Cloudflare Durable Object (`GlobalDurableObject`) wrapped to support multiple entities (Restaurants, Orders, Users) transactionally, ensuring consistent state management and real-time capabilities.

## 🚀 Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed on your system.

### Installation

1. Clone the repository and navigate to the project directory.
2. Install the dependencies using Bun:

```bash
bun install
```

### Development

Start the local development server (Vite frontend + local Cloudflare Worker environment):

```bash
bun run dev
```

The application will be available at `http://localhost:3000` (or the port specified in your terminal).

To build the project and preview the production build locally:

```bash
bun run preview
```

## ☁️ Deployment

SavorEats is designed to be deployed seamlessly to Cloudflare's edge network.

### One-Click Deploy

Deploy the application instantly using the Aurelia deployment integration:

[aureliabutton]

### Manual Deployment

To deploy manually using Wrangler, ensure you are authenticated with Cloudflare (`bunx wrangler login`), then run:

```bash
bun run deploy
```

This command will build the Vite frontend and deploy the Hono Worker alongside the required Durable Object bindings to your Cloudflare account.

## 📝 License

This project is proprietary and created for demonstration and rapid-delivery purposes.