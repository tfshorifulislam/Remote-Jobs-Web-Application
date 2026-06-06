"use client";

import { useState } from "react";
import { Card, Button, Link } from "@heroui/react";
import { Eye, EyeSlash, Person, At, ShieldKeyhole } from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
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
                
                // Redirect user on successful auth
                router.push("/");
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12">
            <Card className="w-full max-w-lg p-8 border border-zinc-800 bg-[#1B1B1C] shadow-2xl rounded-2xl">
                
                {/* Header */}
                <div className="flex flex-col items-center justify-center gap-2 pb-6 border-b border-zinc-800 mb-6 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-200">
                        Create an account
                    </h1>
                    <p className="text-sm text-zinc-500">
                        Join <span className="font-semibold text-zinc-300">Remote</span> today and start your journey
                    </p>
                </div>

                <form onSubmit={handleSignup} className="flex flex-col gap-5">
                    
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Full Name</label>
                        <div className="flex items-center gap-2 border border-zinc-800 rounded-xl px-3 bg-zinc-900/50 focus-within:border-zinc-700 transition-all">
                            <Person className="text-zinc-500" size={16} />
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent py-2.5 text-sm outline-none text-zinc-200 placeholder:text-zinc-600"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Email Address</label>
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

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Password</label>
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
                            <button type="button" onClick={toggleVisibility} className="text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors">
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Confirm Password</label>
                        <div className="flex items-center gap-2 border border-zinc-800 rounded-xl px-3 bg-zinc-900/50 focus-within:border-zinc-700 transition-all">
                            <ShieldKeyhole className="text-zinc-500" size={16} />
                            <input
                                type={isConfirmVisible ? "text" : "password"}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-transparent py-2.5 text-sm outline-none text-zinc-200 placeholder:text-zinc-600"
                                required
                            />
                            <button type="button" onClick={toggleConfirmVisibility} className="text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors">
                                {isConfirmVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Join as a</label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <label className="flex items-center gap-2 border border-zinc-800 bg-zinc-900/20 has-[:checked]:border-zinc-600 has-[:checked]:bg-zinc-900/60 rounded-xl p-3 flex-1 cursor-pointer transition-all select-none">
                                <input
                                    type="radio"
                                    name="role"
                                    value="seeker"
                                    checked={role === "seeker"}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-4 h-4 accent-zinc-500 bg-zinc-900 border-zinc-800 text-zinc-700 focus:ring-0 cursor-pointer"
                                />
                                <span className="text-sm font-medium text-zinc-300">Job Seeker</span>
                            </label>
                            <label className="flex items-center gap-2 border border-zinc-800 bg-zinc-900/20 has-[:checked]:border-zinc-600 has-[:checked]:bg-zinc-900/60 rounded-xl p-3 flex-1 cursor-pointer transition-all select-none">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={role === "recruiter"}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-4 h-4 accent-zinc-500 bg-zinc-900 border-zinc-800 text-zinc-700 focus:ring-0 cursor-pointer"
                                />
                                <span className="text-sm font-medium text-zinc-300">Recruiter</span>
                            </label>
                        </div>
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div className="p-3 text-xs font-medium rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 text-xs font-medium rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="font-bold">Success:</span> {success}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full font-semibold rounded-xl text-sm h-12 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 transition-all active:scale-[0.99] cursor-pointer"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Create Account
                    </Button>

                    {/* Footer link */}
                    <div className="text-center pt-4 border-t border-zinc-800 text-sm text-zinc-500">
                        Already have an account?{" "}
                        <Link href="/authentication/signin" className="font-medium text-zinc-400 hover:text-zinc-200 hover:underline transition-colors">
                            Sign in instead
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}