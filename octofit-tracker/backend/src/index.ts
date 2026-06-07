import express from 'express';
import mongoose from 'mongoose';
import Activity from './models/Activity';

const app = express();
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit';

mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB on port 27017'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/activities', async (_req, res) => {
  const activities = await Activity.find().limit(20);
  res.json(activities);
});

app.post('/activities', async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

const port = 8000;
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
