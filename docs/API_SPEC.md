# API Specification

## Users

### Create User
- **Endpoint:** `POST /users`
- **Description:** Register a new user.
- **Auth:** None
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "string",         // required
    "email": "string",        // required
    "role": "builder|founder|intern", // required
    "profile": "string"       // optional
  }
  ```
- **Success Response:** 201
  ```json
  { "id": 1, "name": "...", "email": "...", "role": "...", "profile": "...", "verification_status": false, "created_at": "..." }
  ```
- **Error Responses:** 400 (validation), 409 (email exists)
- **Security Notes:** Validate email uniqueness, input types.

---

### Get User (by ID)
- **Endpoint:** `GET /users/{id}`
- **Description:** Get user details by ID.
- **Auth:** JWT Required (user or admin or superadmin)
- **Path Parameters:** `id` (integer, required)
- **Success Response:** 200
- **Error Responses:** 404 (not found), 401 (unauthorized)

---

### List Users
- **Endpoint:** `GET /users`
- **Description:** List users (with pagination, filtering).
- **Auth:** JWT Required (admin, superadmin, or self)
- **Query Parameters:** `limit` (int), `offset` (int), `role` (string)
- **Success Response:** 200, array of users

---

### Update User
- **Endpoint:** `PATCH /users/{id}`
- **Description:** Update user profile.
- **Auth:** JWT Required (self, admin, or superadmin)
- **Request Body:** Any updatable fields (name, profile, etc.)
- **Success Response:** 200
- **Error Responses:** 400, 401, 403, 404

---

### Delete User
- **Endpoint:** `DELETE /users/{id}`
- **Description:** Delete a user.
- **Auth:** JWT Required (admin, superadmin, or self)
- **Success Response:** 204
- **Error Responses:** 401, 403, 404

---

## Memberships

### Create Membership
- **Endpoint:** `POST /memberships`
- **Description:** Create a new membership for a user.
- **Auth:** JWT Required (superadmin only)
- **Request Body:**
  ```json
  {
    "user_id": 1,                // required
    "type": "foundational|growth" // required
  }
  ```
- **Success Response:** 201, membership object
- **Error Responses:** 400, 401, 403

---

### List Memberships (for user)
- **Endpoint:** `GET /users/{user_id}/memberships`
- **Description:** List all memberships for a user.
- **Auth:** JWT Required (self, admin, or superadmin)
- **Success Response:** 200, array of memberships

---

### Update Membership
- **Endpoint:** `PATCH /memberships/{id}`
- **Description:** Update membership status, type, or expiry.
- **Auth:** JWT Required (superadmin only)
- **Request Body:** Any updatable fields
- **Success Response:** 200

---

### Delete Membership
- **Endpoint:** `DELETE /memberships/{id}`
- **Description:** Cancel or remove a membership.
- **Auth:** JWT Required (superadmin only)
- **Success Response:** 204

---

## Content (Blogs, Case Studies, Podcasts)

### List Content
- **Endpoint:** `GET /content`
- **Description:** List all content (blogs, case studies, podcasts).
- **Auth:** None
- **Query Parameters:** `type` (string), `limit`, `offset`, `tags`
- **Success Response:** 200, array

---

### Get Content
- **Endpoint:** `GET /content/{id}`
- **Description:** Get content by ID.
- **Auth:** None
- **Success Response:** 200

---

### Create Content
- **Endpoint:** `POST /content`
- **Description:** Create new content (superadmin or admin/moderator only).
- **Auth:** JWT Required (admin, superadmin)
- **Request Body:** type, title, body, tags, etc.
- **Success Response:** 201

---

### Update Content
- **Endpoint:** `PATCH /content/{id}`
- **Description:** Update content.
- **Auth:** JWT Required (admin, superadmin)
- **Success Response:** 200

---

### Delete Content
- **Endpoint:** `DELETE /content/{id}`
- **Description:** Delete content.
- **Auth:** JWT Required (admin, superadmin)
- **Success Response:** 204

---

## Interns

### Get Intern Profile
- **Endpoint:** `GET /interns/{user_id}`
- **Description:** Get intern profile by user ID.
- **Auth:** JWT Required (self, founder, admin, or superadmin)
- **Success Response:** 200

---

### List Star Interns
- **Endpoint:** `GET /interns?is_listed=true`
- **Description:** List all star interns.
- **Auth:** JWT Required (founder, admin, or superadmin)
- **Success Response:** 200

---

## Founders

### Get Founder Profile
- **Endpoint:** `GET /founders/{user_id}`
- **Description:** Get founder profile by user ID.
- **Auth:** JWT Required (self, admin, or superadmin)
- **Success Response:** 200

---

## Courses

### List Courses
- **Endpoint:** `GET /courses`
- **Description:** List all courses (with access control).
- **Auth:** JWT Optional (membership checked for access)
- **Query Parameters:** `accessible_membership` (string), `limit`, `offset`
- **Success Response:** 200

---

### Get Course
- **Endpoint:** `GET /courses/{id}`
- **Description:** Get course details.
- **Auth:** JWT Optional (membership checked for access)
- **Success Response:** 200

---

### Enroll in Course
- **Endpoint:** `POST /courses/{id}/enroll`
- **Description:** Enroll user in a course (creates CourseMembership).
- **Auth:** JWT Required (member)
- **Request Body:** `{ "cohort_id": int (optional) }`
- **Success Response:** 201

---

### Create Course
- **Endpoint:** `POST /courses`
- **Description:** Create a new course.
- **Auth:** JWT Required (superadmin only)
- **Request Body:**
  ```json
  {
    "title": "string", // required
    "description": "string", // optional
    "author_id": int, // required
    "is_cohort_based": boolean, // required
    "video_content": "string", // optional
    "live_sessions": "string", // optional
    "accessible_memberships": ["foundational", "growth"] // required
  }
  ```
- **Success Response:** 201
- **Error Responses:** 400, 401, 403

---

## Cohorts

### List Cohorts for Course
- **Endpoint:** `GET /courses/{course_id}/cohorts`
- **Description:** List cohorts for a course.
- **Auth:** JWT Optional
- **Success Response:** 200

---

### Create Cohort
- **Endpoint:** `POST /courses/{course_id}/cohorts`
- **Description:** Create a new cohort for a course.
- **Auth:** JWT Required (superadmin only)
- **Request Body:**
  ```json
  {
    "start_date": "YYYY-MM-DD", // required
    "end_date": "YYYY-MM-DD" // required
  }
  ```
- **Success Response:** 201
- **Error Responses:** 400, 401, 403

---

## CourseMemberships

### List User's Course Memberships
- **Endpoint:** `GET /users/{user_id}/course-memberships`
- **Description:** List all course memberships for a user.
- **Auth:** JWT Required (self, admin, or superadmin)
- **Success Response:** 200

---

## Events

### List Events
- **Endpoint:** `GET /events`
- **Description:** List all events (with access control).
- **Auth:** JWT Optional (membership checked for access)
- **Query Parameters:** `accessible_membership` (string), `limit`, `offset`
- **Success Response:** 200

---

### Get Event
- **Endpoint:** `GET /events/{id}`
- **Description:** Get event details.
- **Auth:** JWT Optional (membership checked for access)
- **Success Response:** 200

---

### Create Event
- **Endpoint:** `POST /events`
- **Description:** Create a new event.
- **Auth:** JWT Required (superadmin only)
- **Request Body:**
  ```json
  {
    "title": "string", // required
    "description": "string", // optional
    "date": "YYYY-MM-DDTHH:MM:SSZ", // required
    "speakers": "string", // optional
    "registration_required": boolean, // required
    "payment_required": boolean, // required
    "price": number, // optional
    "accessible_memberships": ["foundational", "growth"] // required
  }
  ```
- **Success Response:** 201
- **Error Responses:** 400, 401, 403

---

### Register for Event
- **Endpoint:** `POST /events/{id}/register`
- **Description:** Register user for an event (creates EventRegistration).
- **Auth:** JWT Required
- **Request Body:** `{ "paid": boolean (optional) }`
- **Success Response:** 201

---

## Meetups

### List Meetups
- **Endpoint:** `GET /meetups`
- **Description:** List all meetups.
- **Auth:** None
- **Success Response:** 200

---

### Get Meetup
- **Endpoint:** `GET /meetups/{id}`
- **Description:** Get meetup details.
- **Auth:** None
- **Success Response:** 200

---

### Create Meetup
- **Endpoint:** `POST /meetups`
- **Description:** Create a new meetup.
- **Auth:** JWT Required (superadmin only)
- **Request Body:**
  ```json
  {
    "title": "string", // required
    "description": "string", // optional
    "date": "YYYY-MM-DD", // required
    "location": "string" // optional
  }
  ```
- **Success Response:** 201
- **Error Responses:** 400, 401, 403

---

### Upload Meetup Photo
- **Endpoint:** `POST /meetups/{id}/photos`
- **Description:** Upload a photo to a meetup gallery.
- **Auth:** JWT Required (superadmin only)
- **Request Body:**
  - `multipart/form-data` with image file
- **Success Response:** 201
- **Error Responses:** 400, 401, 403

---

### List Meetup Photos
- **Endpoint:** `GET /meetups/{id}/photos`
- **Description:** List all photos for a meetup.
- **Auth:** None
- **Success Response:** 200

---

## Security Notes
- All endpoints with sensitive data or write access require JWT authentication.
- SuperAdmin role is required for event creation, meetup management, and membership management.
- Input validation and type checking on all endpoints.
- Rate limiting and abuse prevention recommended for public endpoints.
- Role-based access control for admin/moderator/superadmin actions. 