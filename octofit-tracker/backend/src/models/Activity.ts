import { Schema, model, Document } from 'mongoose';

export interface ActivityDocument extends Document {
  name: string;
  duration: number;
  notes?: string;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true },
);

const Activity = model<ActivityDocument>('Activity', activitySchema);
export default Activity;
