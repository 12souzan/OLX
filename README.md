## 📋 Table of Contents
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Setup](#database-setup)
  - [Development](#development)

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** - React framework without App Router
- **TypeScript** - Type-safe development

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.20.2 or >=20.9.0
- **NPM** 9 or 10

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/12souzan/OLX.git
   cd OLX
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   touch .env.local
   ```

### Environment Setup

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_BASE_URL=https://www.olx.com.lb
```

### Development

1. **Start the development server**

   ```bash
   npm run dev
   ```

2. **Access the application**
   - Frontend Home Page: <http://localhost:3000>
   - Frontend Post Page: <http://localhost:3000/post>
