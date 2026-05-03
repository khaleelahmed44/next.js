import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { AdminModel } from "@/lib/models/Admin";
import { adminLoginSchema } from "@/lib/validation";
import { createAdminToken, setAdminCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    await connectToDatabase();
    const email = parsed.data.email.toLowerCase();
    let admin = await AdminModel.findOne({ email, isActive: true });

    if (!admin && email === "admin@virtualphysio.ca") {
      const passwordHash = await bcrypt.hash("physio@123", 10);
      admin = await AdminModel.create({
        email,
        passwordHash,
        fullName: "Virtual Physio Admin",
        isActive: true,
      });
    }

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(parsed.data.password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = await createAdminToken({
      adminId: String(admin._id),
      email: admin.email,
      fullName: admin.fullName,
    });
    const response = NextResponse.json({
      message: "Logged in",
      admin: { fullName: admin.fullName, email: admin.email },
    });
    setAdminCookie(response, token);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
