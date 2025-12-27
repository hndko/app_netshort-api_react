<div align="center">

# 🎬 NetShort

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**A modern streaming platform for short drama series**

[Demo](#demo) • [Features](#-features) • [Installation](#-installation) • [API](#-api-endpoints) • [License](#-license)

</div>

---

## ✨ Features

| Feature             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| 🏠 **Home Page**    | Browse trending & popular dramas with beautiful hero section |
| 🎭 **Serial Drama** | Explore drama collections with infinite scroll pagination    |
| 🔍 **Search**       | Find dramas instantly by title or keyword                    |
| 📺 **Drama Detail** | Watch episodes with built-in video player                    |
| 🌗 **Dark Mode**    | Toggle between light and dark themes                         |
| 📱 **Responsive**   | Optimized for mobile, tablet, and desktop                    |

## 🖼️ Screenshots

<div align="center">
<table>
<tr>
<td><img src="docs/home.png" alt="Home Page" width="400"/></td>
<td><img src="docs/detail.png" alt="Drama Detail" width="400"/></td>
</tr>
<tr>
<td align="center"><b>Home Page</b></td>
<td align="center"><b>Drama Detail</b></td>
</tr>
</table>
</div>

## 🚀 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm or yarn

### Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/netshort.git
cd netshort

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── api/           # API service functions
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components
└── types/         # TypeScript interfaces
```

## 🔌 API Endpoints

This app consumes the [NetShort API](https://netshort.sansekai.my.id):

| Endpoint          | Description                      |
| ----------------- | -------------------------------- |
| `GET /theaters`   | Get drama categories & listings  |
| `GET /foryou`     | Get personalized recommendations |
| `GET /search`     | Search dramas by query           |
| `GET /allepisode` | Get all episodes of a drama      |

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Routing:** React Router DOM
- **Icons:** Material Icons

## 📄 Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=/api/netshort
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ using React & TypeScript**

⭐ Star this repo if you find it helpful!

</div>
