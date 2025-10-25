Art Institute of Chicago - Artwork Gallery

This is a modern, responsive web application that allows users to browse through a collection of artworks from the Art Institute of Chicago. It fetches data from their public API and displays it in a feature-rich, paginated table. The app supports server-side pagination, cross-page selection persistence, and CSV export of selected or current-page artworks.

Live Demo

Live Demo
 – (Replace with your deployment URL)

### Note
> ⚡ Extra Feature: The CSV export functionality (exporting selected or all artworks on the current page) was implemented independently by me, in addition to the core assignment requirements.


Features
Core Features

Browse Artworks: Displays artworks with details like title, artist, origin, inscriptions, start year, and end year.

Server-Side Pagination: Efficiently loads artworks 10 at a time from the API. Each page fetch triggers a fresh API call.

Cross-Page Selection: Users can select artworks using checkboxes. Selection persists even when navigating between pages.

Selection Panel: Dedicated panel shows all selected artworks.

Remove Selection: Easily remove individual artworks from the selection panel.

Enhanced Features

localStorage Persistence: Selections are saved to localStorage, surviving page reloads.

Page-Level Selection Controls: Buttons to Select All / Deselect All artworks on the current page.

CSV Export:

Export only selected artworks to CSV.

Export all artworks on the current page to CSV.

Loading & Error States: Displays a spinner while fetching data and shows user-friendly error messages if the API fails.

Responsive Design: Works well across mobile, tablet, and desktop screens.

Tech Stack

React: UI library for building reactive interfaces.

Vite: Fast frontend tooling for modern React apps.

TypeScript: Ensures type safety and easier maintenance.

PrimeReact: UI component library.

DataTable, Column, Button, ProgressSpinner, Checkbox.

Axios: HTTP client for API requests.

Project Structure
my-art-gallery/
├── public/
└── src/
    ├── components/
    │   └── types.ts      # TypeScript type definitions
    ├── App.tsx           # Main application component
    ├── main.tsx          # Application entry point
    └── index.css         # Global styles

Getting Started
Prerequisites

Node.js v18+

npm v9+ (or compatible package manager)

Installation & Running Locally

Clone the repository

git clone https://your-repository-url.com/art-gallery.git
cd art-gallery


Install dependencies

npm install


Run the development server

npm run dev


Open in browser

http://localhost:5173

How to Use

Browse Artworks: The table displays artworks with pagination controls.

Select Artworks:

Click the checkbox next to an artwork to select it.

Navigate pages—previous selections remain.

Use Select All (This Page) to select all artworks on the current page.

Manage Selections:

See selected artworks in the panel below the table.

Remove individual items with the 'x' button.

Export Data:

Export Selected CSV: Download only selected artworks.

Export All CSV: Download all artworks on the current page.

Code Overview

App.tsx is the core component:

State Management: useState for artworks, pagination, and selections.

API Fetching: fetchArtworks function retrieves artworks from the API on page load and page change.

Pagination Handling: handlePageChange triggers server-side pagination.

Selection Management:

selectedRowsMap maintains cross-page selections using artwork id.

handleSelectionChange adds/removes items from selection.

removeFromSelection removes an artwork from selection.

UI Rendering: PrimeReact DataTable with columns for title, artist_display, place_of_origin, inscriptions, date_start, and date_end.

Extra Feature: CSV export of selected/all artworks.

main.tsx renders the App component and includes required PrimeReact CSS files.

Future Improvements

Search & Filter: Filter artworks by title, artist, or origin.

Detailed Artwork View: Modal or separate page with detailed info and image.

Unit & E2E Testing: Add Jest or Cypress for reliability.

CI/CD Pipeline: Automate testing and deployment.