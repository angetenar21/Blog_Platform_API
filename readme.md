📚 Simple RESTful Blog API (Node.js + Express + MongoDB)

A clean, beginner-friendly REST API for a personal blogging platform. Supports full CRUD operations, search functionality, validation, and structured error handling.

This project is designed to help you learn:
	•	What RESTful APIs are
	•	How to use HTTP methods (GET, POST, PUT, DELETE)
	•	How to design proper API responses and status codes
	•	How to work with MongoDB + Mongoose
	•	How to build production-ready API architecture

⸻

🚀 Features

✔ Create blog posts (POST /posts)

✔ Get a single post (GET /posts/:id)

✔ Get all posts (GET /posts)

✔ Search posts with ?term=

✔ Update full post (PUT /posts/:id)

✔ Delete post (DELETE /posts/:id)

✔ Input validation (express-validator)

✔ Timestamps (createdAt, updatedAt)

✔ Error handling middleware

⸻

🗂 Tech Stack
	•	Node.js + Express – web framework
	•	MongoDB + Mongoose – database & ORM
	•	Express Validator – request validation
	•	Morgan – HTTP request logging
	•	CORS – enable cross-origin access
	•	Dotenv – environment variables
	•	Nodemon – auto-restart during development

⸻

📦 Installation

git clone <repo-url>
cd blog-api
npm install


⸻

⚙️ Environment Setup

Create a .env file in the project root:

PORT=4000
MONGODB_URI=mongodb://localhost:27017/blogapi

(Or use your MongoDB Atlas URI.)

⸻

▶️ Running the Server

Development mode (auto-reload):

npm run dev

Production mode:

npm start

Your server should be running at:

http://localhost:4000


⸻

📘 API Documentation

1. Create a Blog Post

POST /posts

{
  "title": "My First Blog Post",
  "content": "This is the content...",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}

Responses
	•	201 Created – returns created post
	•	400 Bad Request – validation errors

⸻

2. Get All Posts

GET /posts

Filter with search term:

GET /posts?term=tech

⸻

3. Get a Single Post

GET /posts/:id

Responses
	•	200 OK – post found
	•	404 Not Found – post does not exist

⸻

4. Update a Post

PUT /posts/:id

{
  "title": "Updated Title",
  "content": "Updated content...",
  "category": "Tech",
  "tags": ["Updated"]
}

Responses
	•	200 OK – updated successfully
	•	400 Bad Request – validation errors
	•	404 Not Found – post not found

⸻

5. Delete a Post

DELETE /posts/:id

Responses
	•	204 No Content – deleted successfully
	•	404 Not Found – post not found

⸻

🔍 Explanation of Dependencies

Package	Purpose
express	Build API routes
mongoose	Connect + model MongoDB data
express-validator	Validate request bodies
morgan	Log incoming HTTP requests
cors	Allow frontend access
dotenv	Manage environment variables
nodemon	Auto-restart during development


⸻

🧱 Project Structure

src/
  server.js
  config/
    db.js
  models/
    Post.js
  routes/
    posts.js
  middleware/
    errorHandler.js
.env
package.json


⸻

🧪 Testing with curl

Create a post:

curl -X POST http://localhost:4000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Body","category":"General"}'

Get all posts:

curl http://localhost:4000/posts


⸻

📌 Future Enhancements
	•	PATCH (partial updates)
	•	Pagination (?page=&limit=)
	•	Add user authentication (JWT)
	•	Rich text / media support
	•	Deploy to Render / Railway

⸻

🏁 Final Notes

This project is intentionally simple, clean, and perfect for beginners learning how to build REST APIs from scratch.

If you want, we can also add:
	•	TypeScript version
	•	SQL version (Postgres or SQLite)
	•	A frontend to consume this API
	•	Proper API documentation (Swagger / Postman)

Just let me know — happy to build more with you! 🚀

project url: https://roadmap.sh/projects/personal-blog