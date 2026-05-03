import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { getAdminFromCookie } from "@/lib/auth";
import { AppointmentModel } from "@/lib/models/Appointment";
import { UserModel } from "@/lib/models/User";

export async function GET() {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const [totalBookings, totalUsers, pending, confirmed, completed] = await Promise.all([
      AppointmentModel.countDocuments({}),
      UserModel.countDocuments({ role: "patient" }),
      AppointmentModel.countDocuments({ status: "pending" }),
      AppointmentModel.countDocuments({ status: "confirmed" }),
      AppointmentModel.countDocuments({ status: "completed" }),
    ]);

    return NextResponse.json({
      totalBookings,
      totalUsers,
      pending,
      confirmed,
      completed,
      estimatedRevenue: confirmed * 90 + completed * 120,
    });
  } catch (error) {
    console.error("Error loading stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
