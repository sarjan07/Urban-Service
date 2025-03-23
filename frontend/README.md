# Urban Services Frontend

This is the frontend application for the Urban Services project. It's built with Vite and React, providing a modern and responsive user interface for managing urban services and payments.

## Features

- Modern UI built with Material-UI
- Responsive design for mobile and desktop
- Payment method management (create, read, update, delete)
- Service showcase

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Getting Started

1. Clone the repository
2. Navigate to the frontend directory:

```bash
cd frontend
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. The application will be available at http://localhost:5173

## Backend Configuration

This frontend application connects to the backend API at `http://localhost:3000/api`. If your backend runs on a different URL, update the `API_BASE_URL` in `src/services/paymentService.js`.

## Build for Production

To build the application for production, run:

```bash
npm run build
```

The build will be created in the `dist` directory.

## Project Structure

- `/src`: Source code
  - `/components`: Reusable UI components
  - `/pages`: Page components
  - `/services`: API services
  - `/assets`: Static assets

## Dependencies

- React
- React Router
- Material-UI
- Axios

## License

This project is licensed under the MIT License.
