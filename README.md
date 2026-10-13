> [!CAUTION]
> AethelPanel is in development for a while and is getting used by a few people, please wait an v2.0.0

# AethelPanel 🚀

**Streamlined Game Server Management**

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

[![License](https://img.shields.io/github/license/aethelreborn/AethelPanel)](https://github.com/aethelreborn/AethelPanel/blob/main/LICENSE)
[![Discord](https://img.shields.io/discord/1302020587316707420)](https://discord.gg/D8YbT9rDqz)

## 📖 Overview

AethelPanel is an advanced, open-source game server management platform designed to simplify server deployment, monitoring, and administration. With its powerful addon system, you can extend the functionality of the panel to suit your specific needs.

## 🛠 Prerequisites

- Node.js (v16+)
- npm (v8+)
- Git
- Supported Database (PostgreSQL/MySQL)

## 💾 Installation

### Quick install (recommended)

The repo ships an interactive installer that sets up Node.js, dependencies, the
database, and PM2 for you. Run it as root from an empty directory (it clones the
panel into a `panel/` subfolder):

```bash
curl -fsSL https://raw.githubusercontent.com/aethelreborn/AethelPanel/main/panel -o panel
chmod +x panel
./panel
```

Then pick `1` for the panel, `2` for a node, and `4`/`5` for a tunnel.

### Manual install

1. Clone the repository:
   ```bash
   git clone https://github.com/aethelreborn/AethelPanel.git panel
   cd panel
   ```

2. Install dependencies:
   ```bash
   npm install -g typescript
   npm install --omit=dev
   ```

3. Create your environment file and configure the Prisma database:
   ```bash
   cp example.env .env
   # edit .env — set NAME, DATABASE_URL, SESSION_SECRET, etc.
   npm run migrate:dev
   ```

4. Build the application:
   ```bash
   npm run build-ts
   ```

5. Run the application:
   ```bash
   npm run start
   ```

## Running with pm2 (Optional)

1. Install pm2:
   ```bash
   npm install pm2 -g
   ```

2. Start the application using pm2:
   ```bash
   pm2 start dist/app.js --name "panel"
   ```

3. Set up pm2 to auto-start on server reboot:
   ```bash
   pm2 save
   pm2 startup
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow TypeScript best practices
- Write unit tests for new features
- Maintain clean, readable code
- Update documentation

## 🧩 Addon System

AethelPanel features a powerful addon system that allows you to extend its functionality. Addons can add new features, modify existing ones, and integrate with external services.

### Creating Addons

To create an addon, follow these steps:

1. Create a new directory in the `panel/storage/addons/` folder with your addon's slug
2. Create a `package.json` file with your addon's metadata
3. Create an entry point file (default: `index.ts`)
4. Implement your addon's functionality

For more information, check out these resources:

- [Quick Start Guide](docs/addon-quickstart.md)
- [Complete Addon Documentation](docs/addons.md)
- [Database Migrations Guide](docs/addon-migrations.md)

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">

```
   ___        __  __         __   ____                   __
  /   | ___  / /_/ /_  ___  / /  / __ \____ _____  ___  / /
 / /| |/ _ \/ __/ __ \/ _ \/ /  / /_/ / __ `/ __ \/ _ \/ /
/ ___ /  __/ /_/ / / /  __/ /  / ____/ /_/ / / / /  __/ /
/_/  |_\___/\__/_/ /_/\___/_/  /_/    \__,_/_/ /_/\___/_/
```

**AethelPanel**

```
   ___        __  __         __
  /   | ___  / /_/ /_  ___  / /
 / /| |/ _ \/ __/ __ \/ _ \/ /
/ ___ /  __/ /_/ / / /  __/ /
/_/  |_\___/\__/_/ /_/\___/_/
```

**Aethel**

Made with ❤️ by Aethel
</div>
