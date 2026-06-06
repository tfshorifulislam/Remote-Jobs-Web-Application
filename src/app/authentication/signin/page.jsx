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
                setEmail("");
                setPassword("");
            }

            console.log("Sign in with:", { email, password });
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12">
            <Card className="w-full max-w-md p-8 border border-zinc-800 bg-[#1B1B1C] shadow-2xl rounded-2xl">
                
                {/* Header */}
                <div className="flex flex-col items-center justify-center gap-2 pb-6 border-b border-zinc-800 mb-6 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-200">
                        Welcome back
                    </h1>
                    <p className="text-sm text-zinc-500">
                        Sign in to your <span className="font-semibold text-zinc-300">Remote</span> account
                    </p>
                </div>

                <form onSubmit={handleSignIn} className="flex flex-col gap-5">
                    
                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Email Address
                        </label>
                        <div className="flex items-center gap-2 border border-zinc-800 rounded-xl px-3 bg-zinc-900/50 focus-within:border-zinc-700 transition-all">
                            <At className="text-zinc-500" size={16} />
                            <input
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent py-2.5 text-sm outline-none text-zinc-200 placeholder:text-zinc-600"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Password
                        </label>
                        <div className="flex items-center gap-2 border border-zinc-800 rounded-xl px-3 bg-zinc-900/50 focus-within:border-zinc-700 transition-all">
                            <ShieldKeyhole className="text-zinc-500" size={16} />
                            <input
                                type={isVisible ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent py-2.5 text-sm outline-none text-zinc-200 placeholder:text-zinc-600"
                                required
                            />
                            <button
                                type="button"
                                onClick={toggleVisibility}
                                className="text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors"
                            >
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Remember me & Forgot password */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center sm:justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-zinc-700 accent-zinc-700 focus:ring-0 cursor-pointer"
                            />
                            <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">Remember me</span>
                        </label>
                        <Link href="/authentication/forgot-password" className="text-zinc-400 text-sm hover:text-zinc-200 hover:underline transition-colors">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="p-3 text-xs font-medium rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}

                    {/* Sign In Button */}
                    <Button
                        type="submit"
                        className="w-full font-semibold rounded-xl text-sm h-12 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 transition-all active:scale-[0.99] cursor-pointer"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Sign In
                    </Button>

                    {/* Footer Link to Signup */}
                    <div className="text-center pt-4 border-t border-zinc-800 text-sm text-zinc-500">
                        Don't have an account?{" "}
                        <Link href="/authentication/signup" className="font-medium text-zinc-400 hover:text-zinc-200 hover:underline transition-colors">
                            Create one now
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}