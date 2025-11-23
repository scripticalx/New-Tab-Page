# SORA - Custom New Tab Page

A modern, aesthetic New Tab Page built with React and Vite.

## Features

### Core
*   **Clock & Date**: Bilingual support (English/Indonesian) with toggleable seconds.
*   **Search Bar**: Minimalist search bar integrated with Google, DuckDuckGo, Bing, or Yandex.
*   **Bookmarks**: Drag-and-drop bookmarks with automatic favicon retrieval.
*   **Notes**: Quick notes panel with auto-save to LocalStorage.

### Multimedia
*   **Radio Player**: Integrated Prambors Radio streamer with live track metadata and album art.
*   **Music Visualizer**: Dynamic, randomized audio visualizer that reacts when music is playing.

### Customization
*   **Backgrounds**: Support for solid colors, images, and video backgrounds.
*   **Visual Effects**: Adjustable blur and darken intensity for better readability.
*   **Persistence**: All settings are saved locally using `useLocalStorage`.
<img width="1917" height="997" alt="image" src="https://github.com/user-attachments/assets/d915a722-ae61-42e1-884f-9ea4a333bc73" />

## Tech Stack

*   **Framework**: React + Vite
*   **Styling**: Tailwind CSS (v4)
*   **Icons**: Lucide React
*   **Utilities**: `canvas-confetti`, `@dnd-kit/core`

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## License

MIT
