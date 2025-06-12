# Frontend Implementation Task List

**Note:** All frontend code should reside in the `frontend/src/` directory. Use `frontend/reference` for design assets or UI inspiration as needed.

**Figma-to-React Generation:** For each main page, use MCP to generate the React component directly from the provided Figma link(s) in `frontend/reference/pages.mdc`. If MCP is not available, create the component manually based on the Figma design.

This is a living document. Tasks are grouped by page. Update as work progresses.

---

## Project Structure Setup

### FE-000: Set Up Frontend Directory Structure
- **Description:** Create the following directories for frontend code organization:
  - `frontend/src/` for all React code
  - `frontend/src/pages/` for page components
  - `frontend/src/components/` for reusable components
  - `frontend/tests/` for frontend tests
- **Dependencies:** None
- **Complexity:** Low
- **Acceptance Criteria:**
  - All listed directories exist in the project
  - Directory structure matches project standards
- **Status:** ✅ COMPLETED
  - Vite + React + TypeScript + Tailwind CSS boilerplate initialized. Tailwind configured and imported in entry points.

---

## Landing Page

### FE-001: Generate Landing Page Component from Figma
- **Description:** Use MCP to generate the main Landing Page React component from Figma. If MCP is not available, create manually based on the Figma design.
- **Figma Links:**
  - https://www.figma.com/design/JbZRq0M12YUHVraqvs0PH0/ZeroStack?node-id=1-36&t=2ICrL91jf8VCwm6H-4
  - https://www.figma.com/design/JbZRq0M12YUHVraqvs0PH0/ZeroStack?node-id=1-134&t=2ICrL91jf8VCwm6H-4
  - https://www.figma.com/design/JbZRq0M12YUHVraqvs0PH0/ZeroStack?node-id=1-165&t=2ICrL91jf8VCwm6H-4
- **Files/Components:** `frontend/src/pages/Landing.tsx`
- **Dependencies:** FE-000
- **Complexity:** Medium
- **Acceptance Criteria:**
  - Component matches Figma design
  - Responsive and accessible
  - All sections from Figma included
- **Status:** ✅ COMPLETED
  - Landing Page component created manually based on Figma structure, with Tailwind CSS and accessibility in mind.

#### FE-001-a: Set up routing for Landing Page
- Add route for `/` or `/landing` in the app's router to render `Landing.tsx`.
- **Dependencies:** FE-001
- **Status:** ✅ COMPLETED
  - React Router set up in App.tsx, route for '/' renders Landing page.

#### FE-001-b: Integrate Landing Page component into route
- Ensure the generated/manual component is rendered for the route.
- **Dependencies:** FE-001-a

#### FE-001-c: Add responsiveness and accessibility enhancements
- Review and enhance the page for mobile/tablet/desktop and WCAG 2.1 AA compliance.
- **Dependencies:** FE-001-b

#### FE-001-d: Connect data and populate all sections
- Populate all sections with static or dynamic data as per Figma.
- **Dependencies:** FE-001-c

#### FE-001-e: Write basic tests for rendering and accessibility
- Use React Testing Library to test rendering and accessibility. Place tests in `frontend/tests/`.
- **Dependencies:** FE-001-d

---

## Resources Page

### FE-002: Generate Resources Page Component from Figma
- **Description:** Use MCP to generate the Resources Page React component from Figma. If MCP is not available, create manually based on the Figma design.
- **Figma Link:** https://www.figma.com/design/JbZRq0M12YUHVraqvs0PH0/ZeroStack?node-id=4-2&t=2ICrL91jf8VCwm6H-4
- **Files/Components:** `frontend/src/pages/Resources.tsx`
- **Dependencies:** FE-000
- **Complexity:** Medium
- **Acceptance Criteria:**
  - Component matches Figma design
  - Responsive and accessible
- **Status:** ✅ COMPLETED
  - Resources page implemented with Figma-inspired design, responsive layout, accessibility, API integration, and tests.

#### FE-002-a: Set up routing for Resources Page
- Add route for `/resources` in the app's router to render `Resources.tsx`.
- **Dependencies:** FE-002
- **Status:** ✅ COMPLETED
  - Route added to App.tsx

#### FE-002-b: Integrate Resources Page component into route
- Ensure the generated/manual component is rendered for the route.
- **Dependencies:** FE-002-a
- **Status:** ✅ COMPLETED
  - Component is rendered at /resources route

#### FE-002-c: Add responsiveness and accessibility enhancements
- Review and enhance the page for mobile/tablet/desktop and WCAG 2.1 AA compliance.
- **Dependencies:** FE-002-b
- **Status:** ✅ COMPLETED
  - Implemented responsive grid layout for different screen sizes
  - Added proper color contrast for accessibility
  - Included semantic HTML structure
  - Added hover states and transitions for better UX
  - Implemented proper heading hierarchy
  - Added descriptive text for all sections

#### FE-002-d: Connect data and populate all sections
- Populate all sections with static or dynamic data as per Figma.
- **Dependencies:** FE-002-c
- **Status:** ✅ COMPLETED
  - Connected to API endpoints for dynamic content
  - Loading and error states implemented

#### FE-002-e: Write basic tests for rendering and accessibility
- Use React Testing Library to test rendering and accessibility. Place tests in `frontend/tests/`.
- **Dependencies:** FE-002-d
- **Status:** ✅ COMPLETED
  - Created Resources.test.tsx with comprehensive test coverage
  - Tests for main heading, resource categories, featured resources
  - Tests for navigation and resource category links
  - Tests for call-to-action section
  - Tests for proper routing and component rendering

---

## How-to-Guides Page

### FE-003: Generate How-to-Guides Page Component from Figma
- **Description:** Use MCP to generate the How-to-Guides Page React component from Figma. If MCP is not available, create manually based on the Figma design.
- **Figma Link:** https://www.figma.com/design/JbZRq0M12YUHVraqvs0PH0/ZeroStack?node-id=5-23&t=2ICrL91jf8VCwm6H-4
- **Files/Components:** `frontend/src/pages/HowToGuides.tsx`
- **Dependencies:** FE-000
- **Complexity:** Medium
- **Acceptance Criteria:**
  - Component matches Figma design
  - Responsive and accessible
- **Status:** ✅ COMPLETED

#### FE-003-a: Set up routing for How-to-Guides Page
- Add route for `/how-to-guides` in the app's router to render `HowToGuides.tsx`.
- **Dependencies:** FE-003
- **Status:** ✅ COMPLETED

#### FE-003-b: Integrate How-to-Guides Page component into route
- Ensure the generated/manual component is rendered for the route.
- **Dependencies:** FE-003-a
- **Status:** ✅ COMPLETED

#### FE-003-c: Add responsiveness and accessibility enhancements
- Review and enhance the page for mobile/tablet/desktop and WCAG 2.1 AA compliance.
- **Dependencies:** FE-003-b
- **Status:** ✅ COMPLETED

#### FE-003-d: Connect data and populate all sections
- Populate all sections with static or dynamic data as per Figma.
- **Dependencies:** FE-003-c
- **Status:** ✅ COMPLETED

#### FE-003-e: Write basic tests for rendering and accessibility
- Use React Testing Library to test rendering and accessibility. Place tests in `frontend/tests/`.
- **Dependencies:** FE-003-d
- **Status:** ✅ COMPLETED

---

## Events Page

### FE-004: Generate Events Page Component from Figma
- **Description:** Use MCP to generate the Events Page React component from Figma. If MCP is not available, create manually based on the Figma design.
- **Figma Link:** https://www.figma.com/design/JbZRq0M12YUHVraqvs0PH0/ZeroStack?node-id=8-2&t=2ICrL91jf8VCwm6H-4
- **Files/Components:** `frontend/src/pages/Events.tsx`
- **Dependencies:** FE-000
- **Complexity:** Medium
- **Acceptance Criteria:**
  - Component matches Figma design
  - Responsive and accessible
- **Status:** ✅ COMPLETED

#### FE-004-a: Set up routing for Events Page
- Add route for `/events` in the app's router to render `Events.tsx`.
- **Dependencies:** FE-004
- **Status:** ✅ COMPLETED

#### FE-004-b: Integrate Events Page component into route
- Ensure the generated/manual component is rendered for the route.
- **Dependencies:** FE-004-a
- **Status:** ✅ COMPLETED

#### FE-004-c: Add responsiveness and accessibility enhancements
- Review and enhance the page for mobile/tablet/desktop and WCAG 2.1 AA compliance.
- **Dependencies:** FE-004-b
- **Status:** ✅ COMPLETED

#### FE-004-d: Connect data and populate all sections
- Populate all sections with static or dynamic data as per Figma.
- **Dependencies:** FE-004-c
- **Status:** ✅ COMPLETED

#### FE-004-e: Write basic tests for rendering and accessibility
- Use React Testing Library to test rendering and accessibility. Place tests in `frontend/tests/`.
- **Dependencies:** FE-004-d
- **Status:** ✅ COMPLETED

---

## Podcasts Page

### FE-005: Generate Podcasts Page Component from Figma
- **Description:** Use MCP to generate the Podcasts Page React component from Figma. If MCP is not available, create manually based on the Figma design.
- **Figma Link:** https://www.figma.com/design/JbZRq0M12YUHVraqvs0PH0/ZeroStack?node-id=8-120&t=2ICrL91jf8VCwm6H-4
- **Files/Components:** `frontend/src/pages/Podcasts.tsx`
- **Dependencies:** FE-000
- **Complexity:** Medium
- **Acceptance Criteria:**
  - Component matches Figma design
  - Responsive and accessible
- **Status:** ✅ COMPLETED

#### FE-005-a: Set up routing for Podcasts Page
- Add route for `/podcasts` in the app's router to render `Podcasts.tsx`.
- **Dependencies:** FE-005
- **Status:** ✅ COMPLETED

#### FE-005-b: Integrate Podcasts Page component into route
- Ensure the generated/manual component is rendered for the route.
- **Dependencies:** FE-005-a
- **Status:** ✅ COMPLETED

#### FE-005-c: Add responsiveness and accessibility enhancements
- Review and enhance the page for mobile/tablet/desktop and WCAG 2.1 AA compliance.
- **Dependencies:** FE-005-b
- **Status:** ✅ COMPLETED

#### FE-005-d: Connect data and populate all sections
- Populate all sections with static or dynamic data as per Figma.
- **Dependencies:** FE-005-c
- **Status:** ✅ COMPLETED

#### FE-005-e: Write basic tests for rendering and accessibility
- Use React Testing Library to test rendering and accessibility. Place tests in `frontend/tests/`.
- **Dependencies:** FE-005-d
- **Status:** ✅ COMPLETED

---

## Contact-us Page

### FE-006: Generate Contact-us Page Component from Figma
- **Description:** Use MCP to generate the Contact-us Page React component from Figma. If MCP is not available, create manually based on the Figma design.
- **Figma Link:** https://www.figma.com/design/JbZRq0M12YUHVraqvs0PH0/ZeroStack?node-id=8-251&t=2ICrL91jf8VCwm6H-4
- **Files/Components:** `frontend/src/pages/ContactUs.tsx`
- **Dependencies:** FE-000
- **Complexity:** Medium
- **Acceptance Criteria:**
  - Component matches Figma design
  - Responsive and accessible
- **Status:** ✅ COMPLETED

#### FE-006-a: Set up routing for Contact-us Page
- Add route for `/contact` in the app's router to render `ContactUs.tsx`.
- **Dependencies:** FE-006
- **Status:** ✅ COMPLETED

#### FE-006-b: Integrate Contact-us Page component into route
- Ensure the generated/manual component is rendered for the route.
- **Dependencies:** FE-006-a
- **Status:** ✅ COMPLETED

#### FE-006-c: Add responsiveness and accessibility enhancements
- Review and enhance the page for mobile/tablet/desktop and WCAG 2.1 AA compliance.
- **Dependencies:** FE-006-b
- **Status:** ✅ COMPLETED

#### FE-006-d: Connect data and populate all sections
- Populate all sections with static or dynamic data as per Figma.
- **Dependencies:** FE-006-c
- **Status:** ✅ COMPLETED

#### FE-006-e: Write basic tests for rendering and accessibility
- Use React Testing Library to test rendering and accessibility. Place tests in `frontend/tests/`.
- **Dependencies:** FE-006-d
- **Status:** ✅ COMPLETED

---

## About-us Page

### FE-007: Generate About-us Page Component from Figma
- **Description:** Use MCP to generate the About-us Page React component from Figma. If MCP is not available, create manually based on the Figma design.
- **Figma Link:** https://www.figma.com/design/JbZRq0M12YUHVraqvs0PH0/ZeroStack?node-id=8-385&t=2ICrL91jf8VCwm6H-4
- **Files/Components:** `frontend/src/pages/AboutUs.tsx`
- **Dependencies:** FE-000
- **Complexity:** Medium
- **Acceptance Criteria:**
  - Component matches Figma design
  - Responsive and accessible

#### FE-007-a: Set up routing for About-us Page
- Add route for `/about-us` in the app's router to render `AboutUs.tsx`.
- **Dependencies:** FE-007

#### FE-007-b: Integrate About-us Page component into route
- Ensure the generated/manual component is rendered for the route.
- **Dependencies:** FE-007-a

#### FE-007-c: Add responsiveness and accessibility enhancements
- Review and enhance the page for mobile/tablet/desktop and WCAG 2.1 AA compliance.
- **Dependencies:** FE-007-b

#### FE-007-d: Connect data and populate all sections
- Populate all sections with static or dynamic data as per Figma.
- **Dependencies:** FE-007-c

#### FE-007-e: Write basic tests for rendering and accessibility
- Use React Testing Library to test rendering and accessibility. Place tests in `frontend/tests/`.
- **Dependencies:** FE-007-d

---

## General Instructions
- For each page, use MCP to generate the React component from the Figma link(s) provided. If MCP is not available, create the component manually based on the Figma design.
- All code should be placed in the `frontend/src/` directory.
- Reference `frontend/reference/pages.mdc` for Figma links and design mapping.
- Update this task list as work progresses or as new pages/components are added.

---

## Home / Landing Page

### FE-001: Home Page Layout & Navigation
- **User Story:** [As a user, I want to access blogs, case studies, and podcasts for free, even if I am not a member.](docs/PROJECT_PRD.md#4-user-stories--flows)
- **Description:** Build the main landing page with value proposition, featured content, and clear CTAs. Integrate navigation to all major sections. Reference `frontend/reference/landing-page.png` for design.
- **Files/Components:** `frontend/src/pages/Home.tsx`, `frontend/src/components/Navbar.tsx`, `frontend/src/components/Footer.tsx`, `frontend/src/components/FeaturedContent.tsx`
- **Dependencies:** FE-010 (ContentList), FE-011 (Button)
- **Complexity:** Medium
- **Estimated Time:** 1.5 days
- **Acceptance Criteria:**
  - Responsive layout with Tailwind
  - Navigation to all major sections
  - Featured content visible
  - Passes accessibility checks

---

## Auth Pages

### FE-002: User Registration & Login
- **User Story:** [As a user, I want to register and log in.](docs/PROJECT_PRD.md#4-user-stories--flows)
- **Description:** Implement registration and login forms, validation, and API integration (`POST /users`, `GET /users/{id}` for profile fetch).
- **Files/Components:** `frontend/src/pages/auth/Register.tsx`, `frontend/src/pages/auth/Login.tsx`, `frontend/src/components/UserForm.tsx`, `frontend/redux/authSlice.ts`
- **Dependencies:** FE-011 (Button), FE-012 (ErrorMessage), API `/users`
- **Complexity:** Medium
- **Estimated Time:** 2 days
- **Acceptance Criteria:**
  - Registration and login forms with validation
  - Error and loading states handled
  - User redirected on success
  - JWT/token stored securely

### FE-003: Password Reset Flow
- **User Story:** [As a user, I want to reset my password.](docs/PROJECT_PRD.md#4-user-stories--flows)
- **Description:** Implement forgot/reset password UI (API endpoint TBD).
- **Files/Components:** `frontend/src/pages/auth/ForgotPassword.tsx`, `frontend/src/pages/auth/ResetPassword.tsx`, `frontend/src/components/UserForm.tsx`
- **Dependencies:** FE-011 (Button), FE-012 (ErrorMessage)
- **Complexity:** Low
- **Estimated Time:** 1 day
- **Acceptance Criteria:**
  - Forms for requesting and setting new password
  - Success/error feedback

---

## User Dashboard

### FE-004: Dashboard Overview
- **User Story:** [As a member, I want to access courses and networking opportunities based on my membership plan.](docs/PROJECT_PRD.md#4-user-stories--flows)
- **Description:** Personalized dashboard with quick links to courses, events, memberships, and recent activity.
- **Files/Components:** `frontend/src/pages/Dashboard.tsx`, `frontend/src/components/DashboardCard.tsx`, `frontend/redux/userSlice.ts`
- **Dependencies:** FE-002 (Auth), FE-010 (ContentList), FE-013 (MembershipStatus)
- **Complexity:** Medium
- **Estimated Time:** 1.5 days
- **Acceptance Criteria:**
  - Shows personalized info and quick links
  - Responsive and accessible

---

## Content Hub

### FE-005: Content List & Detail Views
- **User Story:** [As a user, I want to access blogs, case studies, and podcasts for free.](docs/PROJECT_PRD.md#4-user-stories--flows)
- **Description:** List and detail pages for blogs, case studies, and podcasts. Integrate with `/content` and `/content/{id}`.
- **Files/Components:** `frontend/src/pages/content/ContentList.tsx`, `frontend/src/pages/content/ContentDetail.tsx`, `frontend/src/components/ContentList.tsx`, `frontend/src/components/Card.tsx`
- **Dependencies:** FE-010 (ContentList), FE-011 (Button), API `/content`
- **Complexity:** Medium
- **Estimated Time:** 2 days
- **Acceptance Criteria:**
  - Lists and filters content by type
  - Detail view for each content item
  - Loading and error states
  - Accessible and responsive

---

## Courses

### FE-006: Course Catalog & Detail
- **User Story:** [As a member, I want to access courses based on my membership plan.](docs/PROJECT_PRD.md#4-user-stories--flows)
- **Description:** Course catalog with filters, course detail page, cohort selection, and enrollment. Integrate with `/courses`, `/courses/{id}`, `/courses/{id}/enroll`, `/courses/{course_id}/cohorts`.
- **Files/Components:** `frontend/src/pages/courses/CourseCatalog.tsx`, `frontend/src/pages/courses/CourseDetail.tsx`, `frontend/src/components/CourseCard.tsx`, `frontend/src/components/EnrollmentModal.tsx`
- **Dependencies:** FE-002 (Auth), FE-011 (Button), FE-012 (ErrorMessage), API `/courses`
- **Complexity:** High
- **Estimated Time:** 3 days
- **Acceptance Criteria:**
  - Catalog with filters and search
  - Detail and enrollment flow
  - Membership-based access control
  - Loading, error, and success feedback

---

## Events

### FE-007: Event Listing, Detail & Registration
- **User Story:** [As a user, I want to register for events, pay if required, and attend live sessions.](docs/PROJECT_PRD.md#4-user-stories--flows)
- **Description:** Event list, detail, registration/payment UI. Integrate with `/events`, `/events/{id}`, `/events/{id}/register`.
- **Files/Components:** `frontend/src/pages/events/EventList.tsx`, `frontend/src/pages/events/EventDetail.tsx`, `frontend/src/components/EventCard.tsx`, `frontend/src/components/RegistrationModal.tsx`
- **Dependencies:** FE-002 (Auth), FE-011 (Button), FE-012 (ErrorMessage), API `/events`
- **Complexity:** High
- **Estimated Time:** 2.5 days
- **Acceptance Criteria:**
  - List and detail for events
  - Registration/payment flow
  - Membership-based access and pricing
  - Loading, error, and success feedback
  - Responsive and accessible
- **Status:** ✅ COMPLETED

#### FE-007-a: Event List Page
- Implement event list page with API integration and responsive design.
- **Status:** ✅ COMPLETED

#### FE-007-b: Event Detail Page
- Implement event detail page with registration modal and API integration.
- **Status:** ✅ COMPLETED

#### FE-007-c: Registration Modal
- Implement registration/payment modal with feedback and accessibility.
- **Status:** ✅ COMPLETED

#### FE-007-d: Tests
- Add tests for event list, detail, and registration modal.
- **Status:** ✅ COMPLETED

---

## Meetups

### FE-008: Meetup List, Detail & Photo Gallery
- **User Story:** [As a community member, I want to attend offline meetups and view photo galleries.](docs/PROJECT_PRD.md#4-user-stories--flows)
- **Description:** List and detail for meetups, photo gallery, and upload (SuperAdmin only). Integrate with `/meetups`, `/meetups/{id}`, `/meetups/{id}/photos`, `/meetups/{id}/photos` (POST).
- **Files/Components:** `frontend/src/pages/meetups/MeetupList.tsx`, `frontend/src/pages/meetups/MeetupDetail.tsx`, `frontend/src/components/MeetupCard.tsx`, `frontend/src/components/PhotoGallery.tsx`, `frontend/src/components/FileUpload.tsx`
- **Dependencies:** FE-002 (Auth), FE-011 (Button), FE-014 (FileUpload), API `/meetups`
- **Complexity:** Medium
- **Estimated Time:** 2 days
- **Acceptance Criteria:**
  - List and detail for meetups
  - Photo gallery with upload (SuperAdmin)
  - Loading, error, and success feedback
  - Responsive and accessible
- **Status:** ✅ COMPLETED

#### FE-008-a: Meetup List Page
- Implement meetup list page with API integration and responsive design.
- **Status:** ✅ COMPLETED

#### FE-008-b: Meetup Detail Page
- Implement meetup detail page with photo gallery and API integration.
- **Status:** ✅ COMPLETED

#### FE-008-c: Photo Gallery Component
- Implement photo gallery component for meetups.
- **Status:** ✅ COMPLETED

#### FE-008-d: File Upload Component
- Implement file upload for SuperAdmin photo uploads.
- **Status:** ✅ COMPLETED

#### FE-008-e: Tests
- Add tests for meetup list, detail, photo gallery, and file upload.
- **Status:** ✅ COMPLETED

---

## Intern Marketplace

### FE-009: Star Intern List & Profile (Founder Only)
- **User Story:** [As a founder, I want to browse a vetted list of interns and hire them based on their skills and training status.](docs/PROJECT_PRD.md#4-user-stories--flows)
- **Description:** List of star interns, intern profile detail, and hiring flow (founder only). Integrate with `/interns?is_listed=true`, `/interns/{user_id}`.
- **Files/Components:** `frontend/src/pages/interns/InternList.tsx`, `frontend/src/pages/interns/InternProfile.tsx`, `frontend/src/components/InternCard.tsx`
- **Dependencies:** FE-002 (Auth), FE-011 (Button), API `/interns`
- **Complexity:** Medium
- **Estimated Time:** 2 days
- **Acceptance Criteria:**
  - List and detail for star interns
  - Hiring flow for founders
  - Access control (founder only)

---

## Membership Management

### FE-010: Membership Status & Management
- **User Story:** [As a member, I want to view/upgrade/downgrade/cancel my membership.](docs/PROJECT_PRD.md#4-user-stories--flows)
- **Description:** View, upgrade, downgrade, or cancel membership. Integrate with `/users/{user_id}/memberships`, `/memberships` (CRUD).
- **Files/Components:** `frontend/src/pages/membership/MembershipStatus.tsx`, `frontend/src/components/MembershipStatus.tsx`
- **Dependencies:** FE-002 (Auth), FE-011 (Button), API `/memberships`
- **Complexity:** Medium
- **Estimated Time:** 1.5 days
- **Acceptance Criteria:**
  - View and manage membership
  - Membership actions update UI optimistically
  - Error and loading states

---

## Admin/SuperAdmin Dashboard

### FE-011: Admin Dashboard & Resource Management
- **User Story:** [As a SuperAdmin, I want to create and manage memberships, events, meetups, courses, and content.](docs/PROJECT_PRD.md#4-user-stories--flows)
- **Description:** Dashboard for SuperAdmin to manage users, memberships, content, events, meetups, and courses. Integrate with all relevant CRUD endpoints.
- **Files/Components:** `frontend/src/pages/admin/AdminDashboard.tsx`, `frontend/src/components/AdminTable.tsx`, `frontend/src/components/Modal.tsx`, `frontend/redux/adminSlice.ts`
- **Dependencies:** FE-002 (Auth), FE-012 (ErrorMessage), FE-013 (Table), API (all management endpoints)
- **Complexity:** High
- **Estimated Time:** 4 days
- **Acceptance Criteria:**
  - CRUD for all resources
  - Role-based access (SuperAdmin only)
  - Optimistic UI updates
  - Error and loading states

---

## Profile & Settings

### FE-012: User Profile & Settings
- **User Story:** [As a user, I want to view and edit my profile and notification preferences.](docs/PROJECT_PRD.md#4-user-stories--flows)
- **Description:** Profile view/edit, password change, notification preferences. Integrate with `/users/{id}`, `/users/{user_id}/memberships`.
- **Files/Components:** `frontend/src/pages/profile/Profile.tsx`, `frontend/src/components/UserForm.tsx`, `frontend/src/components/Avatar.tsx`
- **Dependencies:** FE-002 (Auth), FE-011 (Button), API `/users/{id}`
- **Complexity:** Medium
- **Estimated Time:** 1.5 days
- **Acceptance Criteria:**
  - View and edit profile
  - Change password and notification preferences
  - Error and loading states

---

## Error Pages & Routing

### FE-013: Error Pages & Route Guards
- **User Story:** N/A
- **Description:** Implement 404, 403, 500 error pages and route guards for protected/admin routes.
- **Files/Components:** `frontend/src/pages/errors/NotFound.tsx`, `frontend/src/pages/errors/Forbidden.tsx`, `frontend/src/pages/errors/ServerError.tsx`, `frontend/src/components/RouteGuard.tsx`
- **Dependencies:** FE-002 (Auth)
- **Complexity:** Low
- **Estimated Time:** 1 day
- **Acceptance Criteria:**
  - Error pages display for relevant errors
  - Route guards restrict access based on auth/role

---

## Reusable Components

### FE-014: Core UI Components
- **User Story:** N/A
- **Description:** Build and document core reusable components: Button, Card, Modal, UserForm, ContentList, CourseCard, EventCard, MeetupCard, MembershipStatus, Avatar, Notification, LoadingSpinner, ErrorMessage, Table, FileUpload.
- **Files/Components:** `frontend/src/components/Button.tsx`, `frontend/src/components/Card.tsx`, `frontend/src/components/Modal.tsx`, `frontend/src/components/UserForm.tsx`, `frontend/src/components/ContentList.tsx`, `frontend/src/components/CourseCard.tsx`, `frontend/src/components/EventCard.tsx`, `frontend/src/components/MeetupCard.tsx`, `frontend/src/components/MembershipStatus.tsx`, `frontend/src/components/Avatar.tsx`, `frontend/src/components/Notification.tsx`, `frontend/src/components/LoadingSpinner.tsx`, `frontend/src/components/ErrorMessage.tsx`, `frontend/src/components/Table.tsx`, `frontend/src/components/FileUpload.tsx`
- **Dependencies:** None
- **Complexity:** Medium
- **Estimated Time:** 3 days
- **Acceptance Criteria:**
  - All components are accessible, responsive, and documented
  - Pass visual and functional tests

---

## State Management & API Integration

### FE-015: Redux & React Query Setup
- **User Story:** N/A
- **Description:** Set up Redux store, slices, and React Query for API data fetching, caching, and mutations. Implement optimistic updates where needed.
- **Files/Components:** `frontend/src/redux/store.ts`, `frontend/src/redux/authSlice.ts`, `frontend/src/redux/userSlice.ts`, `frontend/src/redux/adminSlice.ts`, `frontend/src/api/index.ts`, `frontend/src/api/hooks.ts`
- **Dependencies:** FE-002 (Auth), FE-014 (Core UI Components)
- **Complexity:** Medium
- **Estimated Time:** 2 days
- **Acceptance Criteria:**
  - Redux and React Query integrated
  - API hooks for all major resources
  - Optimistic updates for key actions

---

## General

### FE-016: Accessibility & Responsiveness Audit
- **User Story:** N/A
- **Description:** Audit and fix accessibility (WCAG 2.1 AA) and responsiveness issues across all pages and components.
- **Files/Components:** All in `frontend/src/`
- **Dependencies:** All feature tasks
- **Complexity:** Medium
- **Estimated Time:** 1.5 days
- **Acceptance Criteria:**
  - Passes accessibility audit (keyboard, ARIA, color contrast, etc.)
  - Fully responsive on mobile, tablet, desktop

---

## Task Legend
- **FE-xxx:** Frontend task number
- **Dependencies:** Other FE tasks or API endpoints/components
- **Complexity:** Low / Medium / High (or use story points if preferred)
- **Acceptance Criteria:** Visual and functional, testable conditions 