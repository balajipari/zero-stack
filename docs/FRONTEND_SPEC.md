# Frontend Architecture Specification

## Overall Purpose and Proposed Tech Stack

The Zerostack frontend will deliver a modern, responsive, and accessible user experience for aspiring tech/product builders, founders, interns, and SuperAdmins. The application will be built using:
- **React** (functional components, hooks)
- **Redux** (for global state management)
- **React Query** (for API data fetching, caching, and mutations)
- **Tailwind CSS** (for utility-first, responsive styling)
- **React Router** (for client-side routing)

---

## Screens/Pages

1. **Home / Landing Page**
   - Overview, value proposition, featured content, and CTAs.
2. **Auth Pages**
   - Login, Register, Forgot Password, Reset Password.
3. **User Dashboard**
   - Personalized overview, quick links to courses, events, memberships, etc.
4. **Content Hub**
   - List and detail views for blogs, case studies, podcasts (free access).
5. **Courses**
   - Course catalog (with filters), course detail, cohort selection/enrollment, video/live session player.
6. **Events**
   - Event listing, event detail, registration/payment, calendar view.
7. **Meetups**
   - Meetup list, meetup detail, photo gallery.
8. **Intern Marketplace**
   - Star intern list, intern profile detail (for founders), application/hiring flow (founder only).
9. **Membership Management**
   - View/upgrade/downgrade/cancel membership, membership status.
10. **Admin/SuperAdmin Dashboard**
    - User management, membership management, content moderation, event/meetup/course creation and management, analytics.
11. **Profile & Settings**
    - User profile view/edit, password change, notification preferences.
12. **Error Pages**
    - 404 Not Found, 403 Forbidden, 500 Server Error, etc.

---

## Key Reusable Components

- **Button**
  - Props: `type`, `variant`, `onClick`, `disabled`, `children`
  - Behavior: Accessible, keyboard navigable, loading state
- **Card**
  - Props: `title`, `description`, `image`, `actions`, `children`
  - Behavior: Used for content previews, course/event/intern cards
- **Modal**
  - Props: `isOpen`, `onClose`, `title`, `children`, `footer`
  - Behavior: Focus trap, accessible, dismiss on overlay click/esc
- **UserForm**
  - Props: `initialValues`, `onSubmit`, `fields`, `submitLabel`
  - Behavior: Used for registration, profile edit, admin user management
- **ContentList**
  - Props: `items`, `type`, `onSelect`, `pagination`
  - Behavior: List of blogs, podcasts, case studies
- **CourseCard / EventCard / MeetupCard**
  - Props: `data`, `onClick`, `actions`
- **MembershipStatus**
  - Props: `membership`, `onUpgrade`, `onDowngrade`
- **Avatar**
  - Props: `src`, `alt`, `size`
- **Notification**
  - Props: `type`, `message`, `onClose`
- **LoadingSpinner**
  - Props: `size`, `color`
- **ErrorMessage**
  - Props: `message`, `retryAction`
- **Table**
  - Props: `columns`, `data`, `actions`
- **FileUpload**
  - Props: `onUpload`, `accept`, `multiple`

---

## State Management Strategy

- **Redux** for global state: user authentication, user profile, membership status, notifications, theme.
- **React Query** for server state: fetching, caching, and updating API data (users, content, courses, events, etc.).
- **Local state** (React useState/useReducer) for form inputs, modal visibility, UI toggles.
- **Optimistic updates** for actions like event registration, membership changes, and content moderation.

---

## API Integration (Screen/Component Mapping)

- **Auth Pages:** `/users`, `/users/{id}` (register, login, profile fetch)
- **Content Hub:** `/content`, `/content/{id}` (list, detail)
- **Courses:** `/courses`, `/courses/{id}`, `/courses/{id}/enroll`, `/courses/{course_id}/cohorts`
- **Events:** `/events`, `/events/{id}`, `/events/{id}/register`
- **Meetups:** `/meetups`, `/meetups/{id}`, `/meetups/{id}/photos` (list, detail, upload)
- **Intern Marketplace:** `/interns?is_listed=true`, `/interns/{user_id}`
- **Membership Management:** `/users/{user_id}/memberships`, `/memberships` (CRUD)
- **Admin/SuperAdmin Dashboard:** All endpoints for user, membership, content, event, course, and meetup management
- **Profile & Settings:** `/users/{id}` (view/edit), `/users/{user_id}/memberships`

---

## Data Input/Output

- **Forms:** All forms use controlled components, client-side validation, and display server-side errors. Required fields are clearly marked.
- **Data Display:** Use tables, cards, and lists for displaying collections. Detail pages for single resource views.
- **User Interactions:** Accessible buttons, links, and modals. Confirmation dialogs for destructive actions. Inline feedback for actions (success/error).
- **File Uploads:** For meetup photo uploads, use drag-and-drop or file picker, with progress indication.

---

## UI/UX Considerations

- **Responsiveness:** All screens/pages are fully responsive (mobile, tablet, desktop) using Tailwind CSS breakpoints.
- **Loading States:** Use LoadingSpinner and skeleton loaders for async data fetches.
- **Error Handling:** Show ErrorMessage component for API/client errors, with retry options where appropriate.
- **Accessibility:** All interactive elements are keyboard accessible, use semantic HTML, and meet WCAG 2.1 AA standards. Modals use focus trap. Forms have proper labels and ARIA attributes.
- **Optimistic Updates:** For event registration, membership changes, and content moderation, update UI optimistically and roll back on error.
- **Notifications:** Use Notification component for success, error, and info messages.

---

## Routing Strategy

- **React Router** for client-side routing.
- **Public Routes:** Home, Auth, Content Hub, Meetups, Event/Course/Content detail pages.
- **Protected Routes:** User Dashboard, Profile, Membership Management, Course Enrollment, Event Registration, Intern Marketplace.
- **Admin/SuperAdmin Routes:** Dashboards and management screens for users, memberships, content, events, courses, meetups.
- **Route Guards:** Use authentication and role-based guards to restrict access to protected/admin/superadmin routes.
- **404/403/500 Error Pages:** Catch-all and error-specific routes for user-friendly error handling. 