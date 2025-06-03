# Product Requirements Document (PRD)

## 1. Introduction

### Project Vision
Zerostack aims to become the go-to platform for aspiring tech and product builders, as well as startup founders, by providing a trusted space to learn, get inspired, and act. The platform bridges the gap between underutilized student talent and real startup opportunities, fostering mutual growth and hands-on experience.

### Goals
- Empower individuals passionate about technology, product, and startups with curated, actionable knowledge and inspiration.
- Create a structured, noise-free environment for learning and growth.
- Connect trained, high-potential interns with startups and indie builders for real-world collaboration.

### Overview
Zerostack offers a blend of curated stories, practical learning resources, and a vetted intern marketplace, enabling both personal and professional growth for its users.

---

## 2. Target Audience

### Persona 1: Aspiring Tech/Product Builder
- **Profile:** Students, early professionals, or career switchers exploring product/startup roles.
- **Needs:** Clear learning paths, relatable stories, practical experience, and networking opportunities.
- **Pain Points:** Overwhelmed by scattered resources, lack of real-world exposure, difficulty finding trusted communities.

### Persona 2: Startup Founder & Indie Builder
- **Profile:** Founders, solo builders, and small teams seeking to accelerate execution.
- **Needs:** Access to actionable insights, case studies, growth playbooks, and a pool of ready-to-hire, trained interns.
- **Pain Points:** Difficulty finding reliable talent, lack of time to train interns, need for proven frameworks and inspiration.

### Persona 3: SuperAdmin
- **Profile:** Platform owner or trusted operator with the highest level of access.
- **Needs:** Ability to manage all platform resources, including users, memberships, events, meetups, and content moderation.
- **Pain Points:** Need for secure, auditable, and efficient management tools; risk of unauthorized access.

---

## 3. Core Features

### 1. Knowledge & Inspiration Hub
- **Case Studies:** Real-world stories of product building and growth.
- **Blogs & Articles:** Insights from experienced operators, founders, and product thinkers.
- **Podcasts:** Candid conversations on tech, startups, and the builder's mindset.
- **Free Access:** All users, including non-members, can access blogs, case studies, and podcasts for free.

### 2. Membership Plans
- **Foundational Membership:** Access to foundational courses, basic networking, and community events.
- **Growth Membership:** Includes all Foundational benefits plus access to advanced courses and exclusive networking.
- **Membership Management:** Users can purchase, upgrade, or downgrade membership plans. Membership is optional; users can use the platform without a membership.
- **SuperAdmin Control:** Only SuperAdmins can create, update, or delete memberships for users.

### 3. Courses
- **Video Content & Live Sessions:** Courses are delivered by authors or groups of authors, may be cohort-based.
- **Membership-Based Access:** Each course specifies accessible_memberships (e.g., Foundational, Growth) that can access it.
- **Cohort Management:** Courses may be run in batches/cohorts with specific start/end dates.
- **SuperAdmin Control:** Only SuperAdmins can create or manage courses and cohorts.

### 4. Events
- **Live Sessions:** Events are live, may require registration and/or payment.
- **Flexible Access:** Some events are free, some are paid; each event specifies accessible_memberships (e.g., Foundational, Growth) that can access it for free or at a discount.
- **Speaker Management:** Events feature speakers and may have multiple sessions.
- **SuperAdmin Control:** Only SuperAdmins can create or manage events.

### 5. Meetups
- **Offline Gatherings:** Regular in-person meetups.
- **Photo Gallery:** Each meetup has a gallery of photos, but no other digital content.
- **SuperAdmin Control:** Only SuperAdmins can create meetups and upload photos to galleries.

### 6. Intern Marketplace
- **Founder-Driven Hiring:** Founders browse and hire interns based on skills; interns cannot apply for jobs.
- **Student Training Program:** Interns undergo Zerostack's in-house training to ensure quality.
- **Star List:** Only top-performing interns are listed and made available to startups.

### 7. Platform Administration
- **SuperAdmin Dashboard:** SuperAdmins have access to a dashboard for managing users, memberships, content, events, meetups, and platform settings.

---

## 4. User Stories / Flows

- **As a user,** I want to access blogs, case studies, and podcasts for free, even if I am not a member.
- **As a member,** I want to access courses and networking opportunities based on my membership plan so that I can learn and connect at my level.
- **As a Growth Member,** I want to access advanced courses and exclusive networking so that I can connect with top industry leaders.
- **As a founder,** I want to browse a vetted list of interns and hire them based on their skills and training status.
- **As a user,** I want to register for events, pay if required, and attend live sessions.
- **As a member,** I want to access paid events for free or at a discount, depending on my membership plan and event rules.
- **As a community member,** I want to attend offline meetups and view photo galleries from past meetups.
- **As a SuperAdmin,** I want to create and manage memberships, events, meetups, courses, and content so that the platform runs smoothly and securely.

---

## 5. Business Rules

- Interns cannot apply for jobs; only founders can initiate hiring based on intern skills and training status.
- Membership is optional. Users can access free content without a membership.
- Memberships are managed in a separate table and can be upgraded, downgraded, or expired. Only SuperAdmins can create, update, or delete memberships.
- Courses and events specify accessible_memberships (array) to control access for different membership types. Only SuperAdmins can create or manage courses and events.
- Meetups are offline and only have photo galleries as digital content. Only SuperAdmins can create meetups and upload photos.
- Content (case studies, blogs, podcasts) must be curated and approved by platform moderators or SuperAdmins.
- Interns and founders must have verified profiles to participate in the marketplace.
- SuperAdmins have full access to platform administration and management features.

---

## 6. Data Models / Entities (High-Level)

- **User** (id, name, email, role [superadmin, builder, founder, intern], profile, verification status, created_at)
- **Membership** (id, user_id, type [foundational, growth], status, started_at, expires_at, created_at)
- **Content** (id, type [case study, blog, podcast], title, author, body, tags, status, created_at)
- **Intern** (user_id, training_status, performance_score, is_listed, skills)
- **Founder** (user_id, startup_profile, posted_opportunities)
- **Course** (id, title, description, author_id, is_cohort_based, video_content, live_sessions, accessible_memberships [array: foundational, growth], created_at)
- **Cohort** (id, course_id, start_date, end_date)
- **CourseMembership** (id, user_id, course_id, cohort_id, status, joined_at)
- **Event** (id, title, description, date, speakers, registration_required, payment_required, price, accessible_memberships [array: foundational, growth], created_at)
- **EventRegistration** (id, user_id, event_id, status, paid, registered_at)
- **Meetup** (id, title, description, date, location)
- **MeetupPhoto** (id, meetup_id, photo_url, uploaded_at)

---

## 7. Non-Functional Requirements

- **Performance:** Pages should load within 2 seconds under normal load.
- **Scalability:** Platform should support growth to thousands of users and content pieces.
- **Security:** User data must be encrypted; authentication and authorization are required for sensitive actions. SuperAdmin actions must be strictly protected and auditable.
- **Usability:** Intuitive navigation, clear CTAs, and mobile responsiveness are essential.
- **Accessibility:** WCAG 2.1 AA compliance for all user-facing features.

---

## 8. Success Metrics (Optional)

- Number of active users (builders, founders, interns)
- Engagement rates with content (views, likes, comments)
- Number of successful intern hires
- Membership plan upgrades and retention rates
- Course completion rates by membership type
- Event attendance and registration rates by membership type
- User satisfaction (NPS, feedback surveys)

---

## 9. Future Considerations (Optional)

- AI-driven content recommendations and personalized learning paths
- Gamification elements (badges, leaderboards)
- Integration with external job boards and startup communities
- Advanced analytics for founders and interns
- Mobile app for on-the-go access 