# Ethid (Ops OS)

Ethid is a comprehensive, production-ready Operations Operating System designed to streamline business processes, manage support requests, track financial health, and maintain security audit logs. Built with a modern tech stack, it offers a professional, responsive, and secure environment for teams.

## 🚀 Features

### 🖥️ **Dashboard**
- **Real-time Analytics**: Visual overview of revenue, subscriptions, sales, and active users.
- **Activity Feed**: Live updates of system events, logins, and data changes.
- **Interactive Charts**: Data visualization using Recharts for trend analysis.

### 🎫 **Requests Management**
- **Ticket System**: Full lifecycle management of support tickets and feature requests.
- **Filtering & Search**: Advanced search capabilities to find requests by subject, user, or ID.
- **Priority Tracking**: Color-coded status and priority indicators (Critical, High, Medium, Low).

### 🔒 **Security & Audit**
- **Audit Logs**: Comprehensive tracking of all user actions for compliance and security.
- **Role-Based Access**: Secure authentication flow with protected routes.
- **Session Management**: JWT-based authentication with secure session handling.

### 💰 **Payments & Finance**
- **Revenue Tracking**: Monitor financial performance with detailed transaction history.
- **Invoice Management**: Track outstanding and paid invoices.
- **Subscription Metrics**: Insights into active subscribers and churn rates.

### 📚 **Knowledge Base**
- **Documentation**: Centralized repository for internal guides and documentation.
- **Searchable Articles**: Quick access to information with instant search.

### 🔌 **Integrations**
- **Third-Party Connections**: Manage connections to external tools like Slack, Stripe, GitHub, and AWS.
- **Toggle Control**: Simple interface to enable/disable integrations.

### 🔔 **Notifications**
- **System Alerts**: Real-time notifications for critical events.
- **User Updates**: Personalized alerts for ticket updates and system messages.

---

## 🏗️ Architecture

Ethid is built as a monorepo using modern software engineering practices to ensure scalability, maintainability, and performance.

### **Frontend (`apps/web`)**
- **Framework**: [React 18](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) for lightning-fast development and optimized production builds.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first, responsive design system.
- **UI Components**: Custom component library inspired by shadcn/ui (using Radix UI primitives and Lucide icons).
- **State Management**: React Context API for global auth and theme state.
- **Routing**: React Router v6 for client-side navigation and protected routes.

### **Backend (`apps/api`)**
- **Server**: [Fastify](https://www.fastify.io/) for high-performance, low-overhead Node.js APIs.
- **Database ORM**: [Prisma](https://www.prisma.io/) for type-safe database access (SQLite for dev, easily switchable to PostgreSQL).
- **Authentication**: JWT (JSON Web Tokens) with secure password hashing.
- **Architecture**: Modular route structure with shared services for Auth, Audit, and Data access.

### **Infrastructure & Shared**
- **Monorepo**: Managed via npm workspaces.
- **Shared Packages**: Common utilities and types shared between frontend and backend.
- **Docker**: Containerization support for easy deployment.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Ops
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # Install web-specific dependencies if needed
    npm install -w apps/web
    ```

3.  **Database Setup**
    ```bash
    # Run migrations and seed the database
    cd apps/api
    npx prisma migrate dev --name init
    npx prisma db seed
    ```

4.  **Start Development Servers**
    ```bash
    # Start the Backend API (Port 4000)
    npm run dev -w apps/api

    # Start the Frontend App (Port 5173/3000)
    npm run dev -w apps/web
    ```

### Production Build

To build the application for production deployment:

```bash
# Build the web application
npm run build -w apps/web

# The output will be in apps/web/dist
```

---

## 🔐 Login Credentials (Demo)

For testing and demonstration purposes, use the following credentials:

- **Email**: `admin@ops.com`
- **Password**: *(Any password)*

---

## 📱 Responsiveness

The application is fully responsive, featuring:
- **Mobile-first navigation**: Collapsible sidebar for smaller screens.
- **Adaptive Grids**: Dashboard and list views that adjust columns based on screen width.
- **Touch-friendly interfaces**: Buttons and inputs sized for touch interaction.

---

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
