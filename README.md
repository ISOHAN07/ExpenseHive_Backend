💸 ExpenseHive Backend

The backend service for ExpenseHive, a personal finance tracker that helps users manage expenses, budgets, and categories efficiently.
Built using Node.js, Express, and MongoDB with secure JWT authentication.

⚙️ Setup Instructions

Follow the steps below to set up and run the backend locally.

1️⃣ Clone the Repository
git clone [https://github.com/yourusername/expensehive.git](https://github.com/ISOHAN07/ExpenseHive_Backend.git)
cd ExpenseHive_Backend

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in the backend root folder with the following values:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/expensehive
JWT_SECRET=your_super_secret_key
NODE_ENV=development


4️⃣ Start the Server
npm run start


Once started, your server will run on:
👉 http://localhost:5000

🔑 Key Features

🔐 JWT Authentication: Secure user signup and login with password hashing.

💰 Expense Management: Create, update, delete, and fetch user-specific expenses.

🗂️ Category Management: Add, edit, and manage custom categories with color coding.

📅 Monthly Budgets: Support for different budgets per category for each month.

📊 Analytics & Reports: View total expenses, trends, and insights over time.

🧠 RESTful API Design: Clean and scalable architecture following REST standards.

🛡️ Protected Routes: Middleware ensures only authenticated users access their data.

🩺 Health Check: /api/ping endpoint keeps backend awake and ensures uptime.

🌐 API Endpoints Overview

Below are the main endpoints provided by the backend API.

🔐 Authentication Routes

Base URL: /api/auth

Method	Endpoint	Description
POST	/signup	Register a new user
POST	/login	Log in an existing user and get JWT token
GET	/me	Get the currently authenticated user’s details
💸 Expense Routes

Base URL: /api/expenses

Method	Endpoint	Description
GET	/	Get all expenses for the authenticated user
POST	/	Create a new expense
GET	/:id	Get expense by ID
PATCH	/:id	Update an existing expense
DELETE	/:id	Delete an expense
🗂️ Category Routes

Base URL: /api/categories

Method	Endpoint	Description
GET	/	Get all categories for the logged-in user
POST	/	Create a new category with name, color, and monthly budget
GET	/:id	Get category details by ID
PATCH	/:id	Update category name, color, or budget
DELETE	/:id	Delete a category (only if no expenses exist in it)
📊 Analytics Routes


🩺 Health Check Route
Method	Endpoint	Description
GET	/api/ping	Health check endpoint to verify backend is awake
