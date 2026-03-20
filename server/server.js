import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import { initSocket } from './src/socket/socketHandler.js';
import patientRoutes from './src/routes/patients.js';
import authRoutes from './src/routes/auth.js';
import adminRoutes from './src/routes/admin.js';
import reportRoutes from './src/routes/reports.js';
import { errorHandler } from './src/middleware/errorHandler.js';

dotenv.config({ path: '../.env' });

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);
app.use(errorHandler);

initSocket(io);

const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
  console.log(`MediTree server running on port ${PORT}`);
  connectDB();
});
