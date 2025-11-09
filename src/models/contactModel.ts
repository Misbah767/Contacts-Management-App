// src/models/contactModel.ts

// Fake frontend model — similar to a Mongoose schema
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
