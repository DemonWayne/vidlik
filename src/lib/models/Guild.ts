import { Schema, model } from 'mongoose';

export interface IGuild {
  _id: string;
  language: string;
}

const GuildSchema = new Schema<IGuild>(
  {
    _id: { type: String },
    language: { type: String, default: 'uk' },
  },
  { _id: false, versionKey: false },
);

export default model<IGuild>('guilds', GuildSchema);
