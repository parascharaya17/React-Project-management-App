import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from "@/firebase"

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export function LoginForm({
  className,
  ...props
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus("Logging in...")

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setStatus(`Logged in as ${userCredential.user.email}`)
    } catch (error) {
      setStatus(error.message || "Login failed")
    }
  }

  const handleGoogleLogin = async () => {
    setStatus("Signing in with Google...")

    try {
      const userCredential = await signInWithPopup(auth, provider)
      setStatus(`Logged in as ${userCredential.user.email}`)
    } catch (error) {
      setStatus(error.message || "Google login failed")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin}>
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
          {status ? <p className="mt-4 text-sm text-center text-muted-foreground">{status}</p> : null}
        </CardContent>
      </Card>
    </div>
  )
}
