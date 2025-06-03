# Database Schema for Zerostack Platform

## 1. User
| Column Name            | Data Type      | Constraints                                                                 |
|-----------------------|---------------|-----------------------------------------------------------------------------|
| id                    | SERIAL        | PRIMARY KEY                                                                 |
| name                  | VARCHAR(100)  | NOT NULL                                                                    |
| email                 | VARCHAR(255)  | NOT NULL, UNIQUE                                                            |
| role                  | VARCHAR(20)   | NOT NULL, CHECK (role IN ('superadmin', 'builder', 'founder', 'intern'))    |
| profile               | TEXT          |                                                                             |
| verification_status   | BOOLEAN       | NOT NULL, DEFAULT FALSE                                                     |
| created_at            | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP                                         |

**Relationships:**
- One-to-one with Intern (if role = 'intern')
- One-to-one with Founder (if role = 'founder')
- One-to-many with Content (author)
- One-to-many with Membership
- One-to-many with CourseMembership
- One-to-many with EventRegistration

---

## 2. Membership
| Column Name            | Data Type      | Constraints                                                                 |
|-----------------------|---------------|-----------------------------------------------------------------------------|
| id                    | SERIAL        | PRIMARY KEY                                                                 |
| user_id               | INTEGER       | NOT NULL, FOREIGN KEY REFERENCES "User"(id)                                |
| type                  | VARCHAR(20)   | NOT NULL, CHECK (type IN ('foundational', 'growth'))                        |
| status                | VARCHAR(20)   | NOT NULL, DEFAULT 'active'                                                  |
| started_at            | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP                                         |
| expires_at            | TIMESTAMP     |                                                                             |
| created_at            | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP                                         |

**Relationships:**
- Many-to-one with User

---

## 3. Content
| Column Name | Data Type      | Constraints                                  |
|-------------|---------------|----------------------------------------------|
| id          | SERIAL        | PRIMARY KEY                                  |
| type        | VARCHAR(20)   | NOT NULL, CHECK (type IN ('case_study', 'blog', 'podcast')) |
| title       | VARCHAR(255)  | NOT NULL                                     |
| author_id   | INTEGER       | NOT NULL, FOREIGN KEY REFERENCES "User"(id)  |
| body        | TEXT          |                                              |
| tags        | VARCHAR(255)  |                                              |
| status      | VARCHAR(20)   | NOT NULL, DEFAULT 'draft'                    |
| created_at  | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP          |

**Relationships:**
- Many-to-one with User (author)

---

## 4. Intern
| Column Name      | Data Type      | Constraints                                 |
|------------------|---------------|---------------------------------------------|
| user_id          | INTEGER       | PRIMARY KEY, FOREIGN KEY REFERENCES "User"(id) |
| training_status  | VARCHAR(20)   | NOT NULL, DEFAULT 'not_started'             |
| performance_score| INTEGER       | DEFAULT 0                                   |
| is_listed        | BOOLEAN       | NOT NULL, DEFAULT FALSE                     |
| skills           | TEXT          |                                             |

**Relationships:**
- One-to-one with User

---

## 5. Founder
| Column Name        | Data Type      | Constraints                                 |
|--------------------|---------------|---------------------------------------------|
| user_id            | INTEGER       | PRIMARY KEY, FOREIGN KEY REFERENCES "User"(id) |
| startup_profile    | TEXT          |                                             |
| posted_opportunities| TEXT         |                                             |

**Relationships:**
- One-to-one with User

---

## 6. Course
| Column Name         | Data Type      | Constraints                                 |
|---------------------|---------------|---------------------------------------------|
| id                  | SERIAL        | PRIMARY KEY                                 |
| title               | VARCHAR(255)  | NOT NULL                                    |
| description         | TEXT          |                                             |
| author_id           | INTEGER       | NOT NULL, FOREIGN KEY REFERENCES "User"(id) |
| is_cohort_based     | BOOLEAN       | NOT NULL, DEFAULT FALSE                     |
| video_content       | TEXT          |                                             |
| live_sessions       | TEXT          |                                             |
| accessible_memberships | VARCHAR(50)[] | DEFAULT ARRAY['foundational']::VARCHAR(50)[]|
| created_at          | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP         |

**Relationships:**
- Many-to-one with User (author)
- One-to-many with Cohort
- One-to-many with CourseMembership

---

## 7. Cohort
| Column Name         | Data Type      | Constraints                                 |
|---------------------|---------------|---------------------------------------------|
| id                  | SERIAL        | PRIMARY KEY                                 |
| course_id           | INTEGER       | NOT NULL, FOREIGN KEY REFERENCES Course(id) |
| start_date          | DATE          | NOT NULL                                    |
| end_date            | DATE          | NOT NULL                                    |

**Relationships:**
- Many-to-one with Course
- One-to-many with CourseMembership

---

## 8. CourseMembership
| Column Name         | Data Type      | Constraints                                 |
|---------------------|---------------|---------------------------------------------|
| id                  | SERIAL        | PRIMARY KEY                                 |
| user_id             | INTEGER       | NOT NULL, FOREIGN KEY REFERENCES "User"(id) |
| course_id           | INTEGER       | NOT NULL, FOREIGN KEY REFERENCES Course(id) |
| cohort_id           | INTEGER       | FOREIGN KEY REFERENCES Cohort(id)           |
| status              | VARCHAR(20)   | NOT NULL, DEFAULT 'active'                  |
| joined_at           | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP         |

**Relationships:**
- Many-to-one with User
- Many-to-one with Course
- Many-to-one with Cohort (nullable)

---

## 9. Event
| Column Name               | Data Type      | Constraints                                 |
|--------------------------|---------------|---------------------------------------------|
| id                       | SERIAL        | PRIMARY KEY                                 |
| title                    | VARCHAR(255)  | NOT NULL                                    |
| description              | TEXT          |                                             |
| date                     | TIMESTAMP     | NOT NULL                                    |
| speakers                 | TEXT          |                                             |
| registration_required    | BOOLEAN       | NOT NULL, DEFAULT TRUE                      |
| payment_required         | BOOLEAN       | NOT NULL, DEFAULT FALSE                     |
| price                    | NUMERIC(10,2) | DEFAULT 0                                   |
| accessible_memberships   | VARCHAR(50)[] | DEFAULT ARRAY['foundational']::VARCHAR(50)[]|
| created_at               | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP         |

**Relationships:**
- One-to-many with EventRegistration

---

## 10. EventRegistration
| Column Name         | Data Type      | Constraints                                 |
|---------------------|---------------|---------------------------------------------|
| id                  | SERIAL        | PRIMARY KEY                                 |
| user_id             | INTEGER       | NOT NULL, FOREIGN KEY REFERENCES "User"(id) |
| event_id            | INTEGER       | NOT NULL, FOREIGN KEY REFERENCES Event(id)  |
| status              | VARCHAR(20)   | NOT NULL, DEFAULT 'registered'              |
| paid                | BOOLEAN       | NOT NULL, DEFAULT FALSE                     |
| registered_at       | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP         |

**Relationships:**
- Many-to-one with User
- Many-to-one with Event

---

## 11. Meetup
| Column Name         | Data Type      | Constraints                                 |
|---------------------|---------------|---------------------------------------------|
| id                  | SERIAL        | PRIMARY KEY                                 |
| title               | VARCHAR(255)  | NOT NULL                                    |
| description         | TEXT          |                                             |
| date                | DATE          | NOT NULL                                    |
| location            | VARCHAR(255)  |                                             |

**Relationships:**
- One-to-many with MeetupPhoto

---

## 12. MeetupPhoto
| Column Name         | Data Type      | Constraints                                 |
|---------------------|---------------|---------------------------------------------|
| id                  | SERIAL        | PRIMARY KEY                                 |
| meetup_id           | INTEGER       | NOT NULL, FOREIGN KEY REFERENCES Meetup(id) |
| photo_url           | VARCHAR(255)  | NOT NULL                                    |
| uploaded_at         | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP         |

**Relationships:**
- Many-to-one with Meetup

---

# SQL DDL Statements (PostgreSQL)
```sql
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('superadmin', 'builder', 'founder', 'intern')),
    profile TEXT,
    verification_status BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Membership (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES "User"(id),
    type VARCHAR(20) NOT NULL CHECK (type IN ('foundational', 'growth')),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Content (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('case_study', 'blog', 'podcast')),
    title VARCHAR(255) NOT NULL,
    author_id INTEGER NOT NULL REFERENCES "User"(id),
    body TEXT,
    tags VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Intern (
    user_id INTEGER PRIMARY KEY REFERENCES "User"(id),
    training_status VARCHAR(20) NOT NULL DEFAULT 'not_started',
    performance_score INTEGER DEFAULT 0,
    is_listed BOOLEAN NOT NULL DEFAULT FALSE,
    skills TEXT
);

CREATE TABLE Founder (
    user_id INTEGER PRIMARY KEY REFERENCES "User"(id),
    startup_profile TEXT,
    posted_opportunities TEXT
);

CREATE TABLE Course (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    author_id INTEGER NOT NULL REFERENCES "User"(id),
    is_cohort_based BOOLEAN NOT NULL DEFAULT FALSE,
    video_content TEXT,
    live_sessions TEXT,
    accessible_memberships VARCHAR(50)[] DEFAULT ARRAY['foundational']::VARCHAR(50)[],
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Cohort (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES Course(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE CourseMembership (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES "User"(id),
    course_id INTEGER NOT NULL REFERENCES Course(id),
    cohort_id INTEGER REFERENCES Cohort(id),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Event (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date TIMESTAMP NOT NULL,
    speakers TEXT,
    registration_required BOOLEAN NOT NULL DEFAULT TRUE,
    payment_required BOOLEAN NOT NULL DEFAULT FALSE,
    price NUMERIC(10,2) DEFAULT 0,
    accessible_memberships VARCHAR(50)[] DEFAULT ARRAY['foundational']::VARCHAR(50)[],
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE EventRegistration (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES "User"(id),
    event_id INTEGER NOT NULL REFERENCES Event(id),
    status VARCHAR(20) NOT NULL DEFAULT 'registered',
    paid BOOLEAN NOT NULL DEFAULT FALSE,
    registered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Meetup (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    location VARCHAR(255)
);

CREATE TABLE MeetupPhoto (
    id SERIAL PRIMARY KEY,
    meetup_id INTEGER NOT NULL REFERENCES Meetup(id),
    photo_url VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_content_type ON Content(type);
CREATE INDEX idx_intern_is_listed ON Intern(is_listed);
CREATE INDEX idx_course_author ON Course(author_id);
CREATE INDEX idx_event_date ON Event(date);
CREATE INDEX idx_meetup_date ON Meetup(date);
```

---

# Tortoise ORM Model Definitions (Python)
```python
from tortoise import fields, models

class User(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    email = fields.CharField(max_length=255, unique=True)
    role = fields.CharField(max_length=20)
    profile = fields.TextField(null=True)
    verification_status = fields.BooleanField(default=False)
    created_at = fields.DatetimeField(auto_now_add=True)

class Membership(models.Model):
    id = fields.IntField(pk=True)
    user = fields.ForeignKeyField('models.User', related_name='memberships')
    type = fields.CharField(max_length=20)
    status = fields.CharField(max_length=20, default='active')
    started_at = fields.DatetimeField(auto_now_add=True)
    expires_at = fields.DatetimeField(null=True)
    created_at = fields.DatetimeField(auto_now_add=True)

class Content(models.Model):
    id = fields.IntField(pk=True)
    type = fields.CharField(max_length=20)
    title = fields.CharField(max_length=255)
    author = fields.ForeignKeyField('models.User', related_name='contents')
    body = fields.TextField(null=True)
    tags = fields.CharField(max_length=255, null=True)
    status = fields.CharField(max_length=20, default='draft')
    created_at = fields.DatetimeField(auto_now_add=True)

class Intern(models.Model):
    user = fields.OneToOneField('models.User', pk=True, related_name='intern_profile')
    training_status = fields.CharField(max_length=20, default='not_started')
    performance_score = fields.IntField(default=0)
    is_listed = fields.BooleanField(default=False)
    skills = fields.TextField(null=True)

class Founder(models.Model):
    user = fields.OneToOneField('models.User', pk=True, related_name='founder_profile')
    startup_profile = fields.TextField(null=True)
    posted_opportunities = fields.TextField(null=True)

class Course(models.Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=255)
    description = fields.TextField(null=True)
    author = fields.ForeignKeyField('models.User', related_name='courses')
    is_cohort_based = fields.BooleanField(default=False)
    video_content = fields.TextField(null=True)
    live_sessions = fields.TextField(null=True)
    accessible_memberships = fields.JSONField(default=list)
    created_at = fields.DatetimeField(auto_now_add=True)

class Cohort(models.Model):
    id = fields.IntField(pk=True)
    course = fields.ForeignKeyField('models.Course', related_name='cohorts')
    start_date = fields.DateField()
    end_date = fields.DateField()

class CourseMembership(models.Model):
    id = fields.IntField(pk=True)
    user = fields.ForeignKeyField('models.User', related_name='course_memberships')
    course = fields.ForeignKeyField('models.Course', related_name='memberships')
    cohort = fields.ForeignKeyField('models.Cohort', related_name='memberships', null=True)
    status = fields.CharField(max_length=20, default='active')
    joined_at = fields.DatetimeField(auto_now_add=True)

class Event(models.Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=255)
    description = fields.TextField(null=True)
    date = fields.DatetimeField()
    speakers = fields.TextField(null=True)
    registration_required = fields.BooleanField(default=True)
    payment_required = fields.BooleanField(default=False)
    price = fields.DecimalField(max_digits=10, decimal_places=2, default=0)
    accessible_memberships = fields.JSONField(default=list)
    created_at = fields.DatetimeField(auto_now_add=True)

class EventRegistration(models.Model):
    id = fields.IntField(pk=True)
    user = fields.ForeignKeyField('models.User', related_name='event_registrations')
    event = fields.ForeignKeyField('models.Event', related_name='registrations')
    status = fields.CharField(max_length=20, default='registered')
    paid = fields.BooleanField(default=False)
    registered_at = fields.DatetimeField(auto_now_add=True)

class Meetup(models.Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=255)
    description = fields.TextField(null=True)
    date = fields.DateField()
    location = fields.CharField(max_length=255, null=True)

class MeetupPhoto(models.Model):
    id = fields.IntField(pk=True)
    meetup = fields.ForeignKeyField('models.Meetup', related_name='photos')
    photo_url = fields.CharField(max_length=255)
    uploaded_at = fields.DatetimeField(auto_now_add=True)
```
