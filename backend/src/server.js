require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const { FRONTEND_URL, PORT } = require('./config/appConfig');

// Import routes
const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const careerRoutes = require('./routes/careerRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

// Initialize express
const app = express();

// Connect to Database
connectDB();

// 1. Security Headers via Helmet
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allows uploaded images to be viewed by the client
  contentSecurityPolicy: false, // Managed by reverse proxy or frontend Vite build
}));

// 2. HTTP Response Compression (Gzip / Deflate)
app.use(compression());

// 3. CORS Configuration
const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests or matched origins
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      return callback(null, true);
    }
    return callback(new Error('Blocked by CORS policy: Origin not permitted'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}));

// 4. Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Max 1000 requests per 15 mins per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes.' },
});
app.use('/api', globalLimiter);

const formSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // Max 30 submissions per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Submission limit reached for this IP. Please try again later.' },
});

// 5. Body Parsers with tight payload size bounds
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 6. Serve Static Uploads with Security Headers & Browser Caching
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads'), {
  maxAge: '7d',
  setHeaders: (res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
  },
}));

// 7. Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/inquiries', formSubmissionLimiter, inquiryRoutes);
app.use('/api/applications', formSubmissionLimiter, applicationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Talent Carpet API is running smoothly', timestamp: new Date().toISOString() });
});

// Unknown API routes fallback (returns clean JSON 404)
app.all('/api/*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Production: Serve React frontend static files if present in frontend/dist
const frontendDistPath = path.join(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  // Any non-API route serves index.html so React Router displays custom NotFound page
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// 8. Error handling middleware (zero internal stack leaks in production)
app.use((err, req, res, next) => {
  if (err && (err.code === 'LIMIT_FILE_SIZE' || err.message === 'File too large')) {
    return res.status(400).json({
      message: 'Image size exceeds the 3MB limit. Please upload an image 3MB or smaller.',
    });
  }

  console.error('[SERVER ERROR]:', err);

  const isProduction = process.env.NODE_ENV === 'production';
  res.status(err.status || 500).json({
    message: isProduction ? 'An unexpected server error occurred.' : (err.message || 'An unexpected server error occurred'),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
