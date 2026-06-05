"use client";

import { useState } from "react";
import { Card, Button, Link } from "@heroui/react";
import { At, ShieldKeyhole, Eye, EyeSlash } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const { data, error: authError } = await signIn.email({
                email,
                password,
            });

            if (authError) {
                setError(authError.message || "Something went wrong during sign in.");
            } else {
                setSuccess("Signed in successfully! Welcome.");
                setEmail("");
                setPassword("");
            }

            console.log("Sign in with:", { email, password });

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // On success, redirect or show success message
            // router.push("/dashboard");
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
            <Card className="w-full max-w-md p-8 shadow-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-2xl">
                <div className="flex flex-col items-center justify-center gap-2 pb-6 border-b border-zinc-100 dark:border-zinc-800/80 mb-6 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                        Welcome back
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Sign in to your <span className="font-semibold text-primary">Remote</span> account
                    </p>
                </div>

                <form onSubmit={handleSignIn} className="flex flex-col gap-5">
                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Email Address
                        </label>
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

                    {/* Password Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Password
                        </label>
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
                            <button
                                type="button"
                                onClick={toggleVisibility}
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                            >
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Remember me & Forgot password */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center sm:justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary/20"
                            />
                            <span className="text-zinc-600 dark:text-zinc-400">Remember me</span>
                        </label>
                        <Link href="/authentication/forgot-password" className="text-primary text-sm hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="p-3 text-xs font-medium rounded-xl bg-danger-50 dark:bg-danger-950/30 text-danger border border-danger-200">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}

                    {/* Sign In Button */}
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full font-bold rounded-xl text-sm h-12 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.99]"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Sign In
                    </Button>

                    {/* Footer Link to Signup */}
                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-sm text-zinc-500">
                        Don't have an account?{" "}
                        <Link href="/authentication/signup" className="font-semibold text-primary hover:underline">
                            Create one now
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}