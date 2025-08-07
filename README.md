# Forum-Dad
A discussion based online forum for first-time, inexperienced fathers to share insights with each other. 

## Description
The aim of this website is to provide a discussion board for new fathers. Through discourse and engagement, we hope to give young or inexperienced dads a place to share their excitement and their struggles as they grow alongside their children. 

# Purpose
This project is an all-encompassing fullstack web project that will allow me to learn 
how to build a website without relying on a framework. Users will be able to:
- Register and log in
- Create and view discussion threads
- Post comments on threads
- Be able to private message each other
- Create their own personal profile

# Tech Stack

**Frontend:**
- HTML5
- CSS3
- JavaScript

**Backend:**
- Node.js with Express
- SQLite (for development) -> PostgreSQL (deployment)

**Authentication:**
- bcrypy for password hashing
- Cookie-based sessions for login state

## Database Eschema (ERD)
### users
- id (PK)
- username (unique)
- password_hash
- created_at

### threads
- id (PK)
- title
- content
- author_id (FK -> users)
- created_at

### comments
- id (PK)
- thread_id (FK -> threads)
- author_id (FK -> users)
- content
- created_at

### messages
- id (PK)
- from_user_id (FK -> users)
- to_user_id (FK -> users)
- content
- created_at

## Planned API Routes

### Auth
- POST /signup - Register a new user
- POST /login - Authenticate and start session
- POST /logout - End session

### Threads
- GET /threads - List all threads
- POST /threads - Create a new thread
- GET /threads/:id - View a single thread with comments

### Comments
- POST /threads/:id/comments - Add a comment to a thread

### Messages
- GET /messages/inbox - Get received messages
- POST /messages - Send a message

## Folder Structure

/forumboard
│
├── /client         # HTML, CSS, JS
│   ├── index.html
│   ├── thread.html
│   ├── login.html
│   └── style.css
│
├── /server         # Express backend code
│   ├── routes/
│   ├── controllers/
│   ├── db.js
│   └── server.js
│
├── /db             # SQL schema and seed scripts
│   └── schema.sql
│
├── /docs           # ERD and planning diagrams
│   └── erd.png
│
└── README.md       # This document

## MVP Goals

- [ ] Users can sign up and log in
- [ ] Users can create threads
- [ ] Users can comment on threads
- [ ] Users can send and receive messages
- [ ] Clean, usable frontend (no frameworks)
- [ ] Fully functional backend with session auth

## Future Enhancements (Post-MVP)

- Thread categories or tags
- Profile pictures and bios
- Upvotes/downvotes on threads or comments
- Search or filter functionality


## Weekly Milestones

- Week 1: Project planning, database schema, API design ✅
- Week 2: Auth system (signup/login/logout)
- Week 3: Threads + comment APIs
- Week 4: Messaging system
- Week 5: Frontend static layout (HTML/CSS Primer)
- Week 6: JS + Backend integration (fetch, AJAX)
- Week 7: Session-based auth in frontend
- Week 8: Testing + MVP polish

