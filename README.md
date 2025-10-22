# Forum-Dad
A discussion based online forum for first-time, inexperienced fathers to share insights with each other. 

## Description
The aim of this website is to provide a discussion board for new fathers. Through discourse and engagement, we hope to give young or inexperienced dads a place to share their excitement and their struggles as they grow alongside their children. 

# Purpose
This project is an all-encompassing fullstack web project. Users will be able to:
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


