"use client";

import { useState } from "react";
import { Card, Button, Link } from "@heroui/react";
import { Eye, EyeSlash, Person, At, ShieldKeyhole } from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("seeker");

  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
        role,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Something went wrong during signup.");
      } else {
        setSuccess("Account created successfully! Welcome.");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
      <Card className="w-full max-w-lg p-8 shadow-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 pb-6 border-b border-zinc-100 dark:border-zinc-800/80 mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Create an account
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Join <span className="font-semibold text-primary">Remote</span> today and start your journey
          </p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Full Name</label>
            <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900/50 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <Person className="text-zinc-400" size={16} />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent py-2.5 text-sm outline-none text-zinc-900 dark:text-zinc-100"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Email Address</label>
            <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900/50 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <At className="text-zinc-400" size={16} />
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent py-2.5 text-sm outline-none text-zinc-900 dark:text-zinc-100"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Password</label>
            <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900/50 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <ShieldKeyhole className="text-zinc-400" size={16} />
              <input
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent py-2.5 text-sm outline-none text-zinc-900 dark:text-zinc-100"
                required
              />
              <button type="button" onClick={toggleVisibility} className="text-zinc-400 hover:text-zinc-600">
                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Confirm Password</label>
            <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900/50 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <ShieldKeyhole className="text-zinc-400" size={16} />
              <input
                type={isConfirmVisible ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent py-2.5 text-sm outline-none text-zinc-900 dark:text-zinc-100"
                required
              />
              <button type="button" onClick={toggleConfirmVisibility} className="text-zinc-400 hover:text-zinc-600">
                {isConfirmVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Role Selection - plain radio */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Join as a</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex-1 cursor-pointer has-[:checked]:border-primary">
                <input
                  type="radio"
                  name="role"
                  value="seeker"
                  checked={role === "seeker"}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-4 h-4 text-primary"
                />
                <span>Job Seeker</span>
              </label>
              <label className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex-1 cursor-pointer has-[:checked]:border-primary">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={role === "recruiter"}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-4 h-4 text-primary"
                />
                <span>Recruiter</span>
              </label>
            </div>
          </div>

          {/* Error & Success */}
          {error && (
            <div className="p-3 text-xs font-medium rounded-xl bg-danger-50 dark:bg-danger-950/30 text-danger border border-danger-200">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}
          {success && (
            <div className="p-3 text-xs font-medium rounded-xl bg-success-50 dark:bg-success-950/30 text-success border border-success-200">
              <span className="font-bold">Success:</span> {success}
            </div>
          )}

          <Button
            type="submit"
            color="primary"
            className="w-full font-bold rounded-xl text-sm h-12 shadow-lg shadow-primary/20"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Create Account
          </Button>

          <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-sm text-zinc-500">
            Already have an account?{" "}
            <Link href="/authentication/signin" className="font-semibold text-primary hover:underline">
              Sign in instead
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}