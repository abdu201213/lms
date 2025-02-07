import dotenv from 'dotenv';
import db from './configure/db.configure';
dotenv.config();
const PORT = process.env.PORT || 5000;
import app from './app'
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`)
  db();
});