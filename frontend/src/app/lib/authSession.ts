import "server-only"
import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.JWT_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: JWTPayload | undefined) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
  const { payload } = await jwtVerify(session, encodedKey, {
    algorithms: ["HS256"],
  })
  return payload
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}
