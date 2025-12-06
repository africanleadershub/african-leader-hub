Please create a .env.local file in the root directory with the following content:

EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
ADMIN_API_KEY=your-secure-api-key-here

## Getting Your Credentials

### Gmail App Password
1. Go to your Google Account settings
2. Enable 2-Step Verification if not already enabled
3. Go to App Passwords (under Security)
4. Generate a new app password for "Mail"
5. Copy the 16-character password (it may have spaces - keep them or remove them)

### MongoDB Connection String
1. Log in to your MongoDB Atlas account
2. Go to Database Access and create a database user
3. Go to Network Access and whitelist your IP (or 0.0.0.0/0 for development)
4. Go to Clusters and click "Connect"
5. Choose "Connect your application" and copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<database>` with your database name

### Admin API Key
The `ADMIN_API_KEY` is required to access the subscriber management endpoint (`GET /api/subscribe`). 
- Generate a strong, random API key (e.g., using `openssl rand -hex 32`)
- This key should be kept secret and only shared with authorized administrators
- When calling the endpoint, include it in the request header: `x-api-key: your-api-key`

**Security Note:** Never commit your .env.local file to version control. It is already included in .gitignore.
