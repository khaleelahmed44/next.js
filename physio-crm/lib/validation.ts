import { z } from "zod";

export const appointmentCreateSchema = z.object({
  patientName: z.string().trim().min(2).max(120),
  patientEmail: z.string().trim().email(),
  patientPhone: z.string().trim().min(7).max(25),
  appointmentDate: z.string().trim().min(4),
  appointmentTime: z.string().trim().min(3),
  service: z.string().trim().min(2).max(120),
  description: z.string().trim().max(1000).optional().default(""),
});

export const appointmentUpdateSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
  patientName: z.string().trim().min(2).max(120).optional(),
  patientEmail: z.string().trim().email().optional(),
  patientPhone: z.string().trim().min(7).max(25).optional(),
  appointmentDate: z.string().trim().min(4).optional(),
  appointmentTime: z.string().trim().min(3).optional(),
  service: z.string().trim().min(2).max(120).optional(),
  description: z.string().trim().max(1000).optional(),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
});

export const userCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(25).optional().default(""),
});
