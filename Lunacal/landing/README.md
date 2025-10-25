Lunacal — Personal Landing Page

Lunacal is a responsive, single-page personal landing page built with React and Tailwind CSS. It acts as a modern digital business card, presenting personal details, experiences, and an interactive image gallery.

🧩 Technologies Used

Frontend: React (v18)

Styling: Tailwind CSS

Build Tool: Vite

Image Hosting: Cloudinary

Deployment: Ready for Netlify, Vercel, or GitHub Pages

✨ Features

Responsive Design: Fully adaptable layout for mobile, tablet, and desktop.

Animated Tab Navigation: Smooth transitions between “About Me,” “Experiences,” and “Recommended” sections with a sliding indicator.

Dynamic Content Rendering: Content loaded from structured JavaScript objects for easy updates.

Interactive Image Gallery:

Multi-image carousel with smooth transitions.

Navigation via "Previous" and "Next" buttons.

Pagination dots for quick navigation.

Hover animations for user engagement.

Clean UI Components: Minimal, accessible, and responsive components with hover and active states.

⚙️ How It Works

The main component (App.jsx) controls the layout, tab logic, and image gallery.

State Management

Using React’s useState:

activeTab: Tracks the currently selected tab.

currentImageSet: Tracks which image group is displayed in the gallery.

Data Structure

navContent: Object mapping tab titles to corresponding content.

galleryImages: 2D array containing Cloudinary URLs grouped by image sets.

🧱 Component Overview
Layout

Flexbox-based centered container.

Two-column layout on large screens; single-column on small devices.

Tab Navigation

Tabs generated dynamically from navContent keys.

Sliding indicator moves smoothly based on active tab index.

Content re-renders on tab change, using React’s key-based reconciliation for animations.

Image Gallery

Displays current image set based on currentImageSet.

Navigation controlled by handleNext and handlePrevious.

Pagination dots reflect and update the current view.

💡 Code Quality and Best Practices

Component-Based Design: Modular and maintainable structure.

Responsive Styling: Effective use of Tailwind’s responsive classes (sm:, lg:).

State Logic: Clear separation of UI and logic.

Dynamic Rendering: Data-driven UI using React mapping patterns.

Minimal Inline Styling: Inline styles reserved for dynamic values only.

🔧 Improvement Suggestion

Avoid using window.innerWidth for responsive padding. Instead:

Use Tailwind’s built-in responsive utilities, or

Implement a custom React hook for viewport-based adjustments.

This ensures better performance and maintainability in a React environment.