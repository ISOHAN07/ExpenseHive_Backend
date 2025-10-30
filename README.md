# 💸 ExpenseHive Backend

The backend service for ExpenseHive, a personal finance tracker that helps users manage expenses, budgets, and categories efficiently. Built using Node.js, Express, and MongoDB with secure JWT authentication.

---

## 🔑 Key Features

1. **JWT Authentication: Secure user signup and login with password hashing.**  

2. **Expense Management: Create, update, delete, and fetch user-specific expenses.**  

3. **Category Management: Add, edit, and manage custom categories with color coding.**  

4. **Monthly Budgets: Support for different budgets per category for each month.**  

5. **Analytics & Reports: View total expenses, trends, and insights over time.**  

6. **Protected Routes: Middleware ensures only authenticated users access their data.**  

---

## ⚙️ Setup Instructions

1. **Clone this repository**  
   ```bash
   git clone https://github.com/ISOHAN07/ExpenseHive_Backend.git
   cd ExpenseHive_Backend
   
2. **Install Dependencies**
   ```bash
   npm install

3. **Configure Environment Variables**
   ```bash
   MONGO_URL = ""
   PORT = ""
   JWT_SECRET = ""
   JWT_EXPIRES_IN = ""      
   BCRYPT_SALT_ROUNDS = ""
   NODE_ENV = ""

4. **Start the Server**
   ```bash
   npm run start
