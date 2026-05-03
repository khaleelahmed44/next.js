import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { AppointmentModel } from "@/lib/models/Appointment";
import { UserModel } from "@/lib/models/User";
import { getAdminFromCookie } from "@/lib/auth";
import { appointmentCreateSchema } from "@/lib/validation";

export async function GET() {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const appointments = await AppointmentModel.find({})
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = appointmentCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const payload = parsed.data;

    const patient = await UserModel.findOneAndUpdate(
      { email: payload.patientEmail.toLowerCase() },
      {
        $setOnInsert: {
          name: payload.patientName,
          email: payload.patientEmail.toLowerCase(),
          phone: payload.patientPhone,
          role: "patient",
          isActive: true,
        },
      },
      { upsert: true, new: true }
    );

    const saved = await AppointmentModel.create({
      ...payload,
      createdBy: patient?._id,
      status: "pending",
    });

    return NextResponse.json(
      { message: "Appointment booked successfully", appointment: saved },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
