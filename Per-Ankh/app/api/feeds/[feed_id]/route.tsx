export async function POST(request: Request) {
  try {
    const { username, email, bio, password, role } = await request.json();
    if (!username || !email || !bio || !password || !role) {
      return NextResponse.json({ error: "Oops you might have left one or more fields empty" }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const existingEmail = await kn('users').where("email", email);

    if (existingEmail.length > 0) {
      return NextResponse.json({ error: "This email already exists" }, { status: 409 });
    }

    const [createdUser] = await kn("users")
      .insert({ username, email, bio, password: hashPassword, role })
      .returning("*");

    return NextResponse.json({ message: "user created", user: createdUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}