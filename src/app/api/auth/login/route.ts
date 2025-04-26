import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Mock authentication - in a real app, you'd validate against your database
    if (email && password) {
      const response = NextResponse.json({ success: true });

      // Set cookie that expires in 1 day
      response.cookies.set("isLoggedIn", "true", {
        maxAge: 60 * 60 * 24, // 1 day in seconds
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
