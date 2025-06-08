# Frontend Architecture Specification

## Overall Purpose and Proposed Tech Stack

Zerostack's frontend delivers a modern, accessible, and responsive experience for aspiring tech/product builders, founders, interns, and SuperAdmins. The application will be built using:
- **React** (functional components, hooks)
- **Redux** (for global state management)
- **React Query** (for API data fetching, caching, and mutations)
- **Tailwind CSS** (utility-first, responsive styling)
- **React Router** (client-side routing)

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
   - Star intern list, intern profile detail (for founders), hiring flow (founder only).
9. **Membership Management**
   - View/upgrade/downgrade/cancel membership, membership status.
10. **Admin/SuperAdmin Dashboard**
    - User, membership, content, event, meetup, and course management; analytics.
11. **Profile & Settings**
    - User profile view/edit, password change, notification preferences.
12. **Error Pages**
    - 404 Not Found, 403 Forbidden, 500 Server Error, etc.

---

## Key Reusable Components

- **Button**
  - Props: `type`, `variant`, `onClick`, `disabled`, `children`
  - Accessible, keyboard navigable, loading state
- **Card**
  - Props: `title`, `description`, `image`, `actions`, `children`
  - Used for content previews, course/event/intern cards
- **Modal**
  - Props: `isOpen`, `onClose`, `title`, `children`, `footer`
  - Focus trap, accessible, dismiss on overlay click/esc
- **UserForm**
  - Props: `initialValues`, `onSubmit`, `fields`, `submitLabel`
  - Used for registration, profile edit, admin user management
- **ContentList**
  - Props: `items`, `type`, `onSelect`, `pagination`
  - List of blogs, podcasts, case studies
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

- **Redux** for global state: authentication, user profile, membership status, notifications, theme, and role-based access.
- **React Query** for server state: fetching, caching, and updating API data (users, content, courses, events, meetups, interns, memberships, etc.).
- **Local state** (React useState/useReducer) for form inputs, modal visibility, UI toggles.
- **Optimistic updates** for actions like event registration, membership changes, and content moderation, with rollback on error.

---

## API Integration (Screen/Component Mapping)

- **Auth Pages:**
  - `POST /users` (register)
  - `GET /users/{id}` (profile fetch)
  - `PATCH /users/{id}` (profile update)
- **Content Hub:**
  - `GET /content` (list)
  - `GET /content/{id}` (detail)
- **Courses:**
  - `GET /courses` (catalog)
  - `GET /courses/{id}` (detail)
  - `POST /courses/{id}/enroll` (enrollment)
  - `GET /courses/{course_id}/cohorts` (cohort selection)
- **Events:**
  - `GET /events` (listing)
  - `GET /events/{id}` (detail)
  - `POST /events/{id}/register` (registration/payment)
- **Meetups:**
  - `GET /meetups` (list)
  - `GET /meetups/{id}` (detail)
  - `GET /meetups/{id}/photos` (gallery)
  - `POST /meetups/{id}/photos` (photo upload, SuperAdmin)
- **Intern Marketplace:**
  - `GET /interns?is_listed=true` (star intern list)
  - `GET /interns/{user_id}` (intern profile)
- **Membership Management:**
  - `GET /users/{user_id}/memberships` (view)
  - `POST /memberships` (create, SuperAdmin)
  - `PATCH /memberships/{id}` (update, SuperAdmin)
  - `DELETE /memberships/{id}` (cancel, SuperAdmin)
- **Admin/SuperAdmin Dashboard:**
  - All endpoints for user, membership, content, event, course, and meetup management
- **Profile & Settings:**
  - `GET /users/{id}` (view)
  - `PATCH /users/{id}` (edit)
  - `GET /users/{user_id}/memberships` (membership status)

---

## Data Input/Output

- **Forms:** Controlled components, client-side validation, display server-side errors, required fields marked, accessible labels.
- **Data Display:** Use tables, cards, and lists for collections; detail pages for single resources.
- **User Interactions:** Accessible buttons, links, and modals; confirmation dialogs for destructive actions; inline feedback for actions (success/error).
- **File Uploads:** For meetup photo uploads, use drag-and-drop or file picker, with progress indication and error handling.

---

## UI/UX Considerations

- **Responsiveness:** All screens/pages are fully responsive (mobile, tablet, desktop) using Tailwind CSS breakpoints.
- **Loading States:** Use LoadingSpinner and skeleton loaders for async data fetches.
- **Error Handling:** Show ErrorMessage component for API/client errors, with retry options where appropriate.
- **Accessibility:** All interactive elements are keyboard accessible, use semantic HTML, and meet WCAG 2.1 AA standards. Modals use focus trap. Forms have proper labels and ARIA attributes.
- **Optimistic Updates:** For event registration, membership changes, and content moderation, update UI optimistically and roll back on error.
- **Notifications:** Use Notification component for success, error, and info messages.
- **Role-based UI:** Show/hide features and navigation based on user role (intern, founder, superadmin, etc.).

---

## Routing Strategy

- **React Router** for client-side routing.
- **Public Routes:** Home, Auth, Content Hub, Meetups, Event/Course/Content detail pages.
- **Protected Routes:** User Dashboard, Profile, Membership Management, Course Enrollment, Event Registration, Intern Marketplace.
- **Admin/SuperAdmin Routes:** Dashboards and management screens for users, memberships, content, events, courses, meetups.
- **Route Guards:** Use authentication and role-based guards to restrict access to protected/admin/superadmin routes.
- **Error Pages:** 404/403/500 error pages as catch-all and for user-friendly error handling. 