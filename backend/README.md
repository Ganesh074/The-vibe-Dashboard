# Vibe Dashboard - Backend API

Express.js REST API server for The Vibe Dashboard, connected to MongoDB Atlas for persistent data storage.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB Atlas account (connection string provided in `.env`)

### Installation & Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (already in .env)
# MongoDB URI and PORT are pre-configured

# 3. Seed database with sample data (optional)
npm run seed

# 4. Start the server
npm start

# Or development mode with auto-reload
npm run dev
```

Server will run on **http://localhost:5000**

## 📋 Available Scripts

```bash
# Start production server
npm start

# Start with auto-reload (development)
npm run dev

# Populate database with 10 sample items
npm run seed

# Clear all items from database
npm run cleardb
```

## 📁 Project Structure

```
backend/
├── index.js              # Main Express server & API routes
├── models/
│   └── Item.js          # MongoDB schema definition
├── scripts/
│   ├── seed.js          # Database seeding script
│   └── cleardb.js       # Database clearing script
├── .env                 # Environment variables (MongoDB URI)
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies & scripts
└── README.md            # This file
```

## 🌐 API Endpoints

### GET /api/items

Fetch all items with optional search filtering.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `search` | string | No | Search term (filters name & description, case-insensitive) |

**Example Requests:**

```bash
# Get all items
curl http://localhost:5000/api/items

# Search for lamps
curl "http://localhost:5000/api/items?search=lamp"

# Search for audio items
curl "http://localhost:5000/api/items?search=audio"
```

**Success Response (200):**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "id": 1,
    "name": "Aurora Lamp",
    "description": "Soft ambient lamp with glassmorphism style",
    "category": "Lighting",
    "createdAt": "2026-02-01T12:00:00.000Z",
    "__v": 0
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "id": 2,
    "name": "Nimbus Headphones",
    "description": "Comfortable over-ear headphones with deep bass",
    "category": "Audio",
    "createdAt": "2026-02-02T12:00:00.000Z",
    "__v": 0
  }
]
```

**Search Logic:**
- Case-insensitive regex matching
- Searches across `name` and `description` fields
- Returns items sorted by newest first
- Empty search returns all items

## 📊 Data Model

### Item Schema

```javascript
{
  _id: ObjectId,              // MongoDB auto-generated
  id: Number,                 // Custom ID (1-10)
  name: String,               // Product name (required)
  description: String,        // Product description (required)
  category: String,           // Category (required)
  createdAt: Date,            // ISO 8601 timestamp (default: now)
  __v: Number                 // Mongoose version field
}
```

### Sample Item

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "id": 1,
  "name": "Aurora Lamp",
  "description": "Soft ambient lamp with glassmorphism style",
  "category": "Lighting",
  "createdAt": "2026-02-01T12:00:00Z",
  "__v": 0
}
```

## 🗄️ Database Integration

### MongoDB Atlas Connection

**Connection String Format:**
```
mongodb+srv://[username]:[password]@[cluster].mongodb.net/?appName=[appname]
```

**Current Configuration (.env):**
```
MONGODB_URI=mongodb+srv://ganeshnakkina2004_db_user:Ganesh%408074@cluster0.ys8fhtr.mongodb.net/?appName=Cluster0
```

**Note:** Password is URL-encoded (`@` = `%40`)

### Connection Verification

The server logs connection status on startup:
```
✓ Connected to MongoDB Atlas
✓ Server running on port 5000
```

## 🔧 Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web server framework
- **Mongoose** - MongoDB ODM (Object Document Mapper)
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management
- **Nodemon** - Development auto-reload

## 🧪 Testing the API

### Using PowerShell
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/items" -UseBasicParsing
$response.Content | ConvertFrom-Json
```

### Using cURL
```bash
curl http://localhost:5000/api/items
curl "http://localhost:5000/api/items?search=lamp"
```

### Using Postman
1. Create new GET request
2. URL: `http://localhost:5000/api/items`
3. Add query param: `search=keyboard`
4. Send request

## 📝 Configuration

### Environment Variables (.env)

```ini
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/?appName=appname

# Server port
PORT=5000

# Environment
NODE_ENV=development
```

## 🔐 Security Features

- **CORS Enabled**: Allows frontend-backend communication
- **Input Sanitization**: Query parameters are validated
- **Environment Variables**: Secrets stored in `.env` (never in code)
- **MongoDB Schema Validation**: Mongoose enforces type checking
- **.gitignore**: Sensitive files excluded from version control

## 🚫 Error Handling

### Connection Errors

If MongoDB connection fails:
```
✗ MongoDB connection failed: [error message]
```

**Solutions:**
- Check MongoDB URI in `.env`
- Verify cluster is active in MongoDB Atlas
- Ensure IP whitelist includes your machine

### API Errors

**500 Internal Server Error**
```json
{ "error": "Internal server error" }
```

**Cause:** Database query failed
**Solution:** Check server logs for details

## 📈 Performance

- **Search Indexes**: Text indexes on `name` and `description` for fast queries
- **Query Optimization**: MongoDB sorting by `createdAt` (newest first)
- **Response Time**: Typically < 300ms for local queries
- **Scalability**: Handles 1000+ items efficiently

## 🚀 Deployment

### Environment-Specific Configuration

**Development:**
```bash
npm run dev        # Auto-reload enabled
NODE_ENV=development
```

**Production:**
```bash
npm start          # Regular Node.js
NODE_ENV=production
```

### Deploying to Render.com

1. Create Render account
2. Connect GitHub repository
3. Set environment variables in Render dashboard:
   - `MONGODB_URI` = your MongoDB connection string
   - `PORT` = 5000
   - `NODE_ENV` = production
4. Deploy (Render auto-runs `npm install` & `npm start`)

## 📚 Data Persistence

### ✅ Data Stored in MongoDB

All items are permanently stored in MongoDB Atlas. When the backend server is:
- **Stopped** → Data remains safe in MongoDB
- **Restarted** → Data is immediately available
- **Deleted from cache** → Data persists in database

### Sample Data

The database comes pre-loaded with 10 sample items:

1. Aurora Lamp (Lighting)
2. Nimbus Headphones (Audio)
3. Vibe Notebook (Stationery)
4. Sierra Backpack (Travel)
5. Pulse Keyboard (Electronics)
6. Glow Mug (Kitchen)
7. Orbit Lamp Pro (Lighting)
8. Echo Speaker (Audio)
9. Canvas Sneakers (Fashion)
10. Zen Planter (Home)

### Resetting Sample Data

If you want to refresh the database:

```bash
# Clear all items
npm run cleardb

# Reload sample data
npm run seed
```

## 🐛 Troubleshooting

### Server won't start

**Error:** `EADDRINUSE: address already in use :::5000`
```bash
# Kill process using port 5000
# Windows PowerShell:
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# Mac/Linux:
lsof -i :5000
kill -9 [PID]
```

### Can't connect to MongoDB

**Error:** `MongoDB connection failed: ...`
- Verify `.env` has correct `MONGODB_URI`
- Check MongoDB Atlas cluster is running
- Ensure IP address is whitelisted in MongoDB Atlas

### Search not working

- Verify backend is running
- Check query parameter format: `?search=term`
- Test directly: `curl "http://localhost:5000/api/items?search=lamp"`

## 📖 Documentation

- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [Express.js Guide](https://expressjs.com)
- [RESTful API Design](https://restfulapi.net)

## 📄 License

Open source - feel free to use and modify

## 🤝 Support

See root `README.md` for setup instructions and full project documentation.
