"use client";

import { useSession } from "@/lib/auth-client";
import React, { useState, useEffect } from "react";
import {
    FiBriefcase,
    FiMapPin,
    FiDollarSign,
    FiFileText,
    FiTag,
    FiLayers,
    FiClock,
    FiAlertCircle,
} from "react-icons/fi";

const PostJobForm = () => {
    const { data: session } = useSession();
    const user = session?.user;

    // Form data state
    const [formData, setFormData] = useState({
        jobTitle: "",
        category: "",
        jobType: "",
        location: "",
        skills: "",
        salary: "",
        description: "",
        isRemote: false,
        recruiterName: "",
        recruiterEmail: "",
    });

    // Client-side Validation Errors State
    const [errors, setErrors] = useState({});

    // Automatically update recruiter info once user session is loaded
    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                recruiterName: user.name || "",
                recruiterEmail: user.email || "",
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Real-time error clearing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Required validation handling
        const newErrors = {};
        if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
        if (!formData.category) newErrors.category = "Please select a category";
        if (!formData.jobType) newErrors.jobType = "Please select a job type";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.salary.trim()) newErrors.salary = "Salary range is required";
        if (!formData.skills.trim()) newErrors.skills = "Required skills are mandatory";
        if (!formData.description.trim()) newErrors.description = "Job description cannot be empty";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            const firstErrorField = Object.keys(newErrors)[0];
            const element = document.getElementsByName(firstErrorField)[0];
            if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        const finalPayload = {
            ...formData,
            createdAt: new Date().toISOString()
        };

        console.log("Form Submitted Successfully:", finalPayload);
    };

   
    const getInputStyle = (fieldName) => {
        const baseStyle = "w-full bg-zinc-800/40 border rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-[#E5E2E3] placeholder-zinc-500 focus:outline-none focus:bg-zinc-800/80 transition-all duration-250";
        if (errors[fieldName]) {
            return `${baseStyle} border-rose-500 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10`;
        }
        return `${baseStyle} border-zinc-800 focus:border-zinc-700 focus:ring-4 focus:ring-zinc-800/40`;
    };

    return (
      
        <div className="w-full max-w-4xl mx-auto bg-[#1B1B1C] border border-zinc-800 rounded-3xl p-5 sm:p-10 box-border">

            {/* Header / Premium Banner Combo */}
           
            <div className="mb-10 relative overflow-hidden rounded-2xl bg-zinc-800/30 p-6 border border-zinc-800">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-zinc-700/10 blur-2xl pointer-events-none" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                     
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-bold uppercase tracking-wider border border-[#22C55E]/20 mb-1">
                            Premium Standard
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#E5E2E3] tracking-tight">
                            Post a New Job Listing
                        </h2>
                        <p className="text-xs sm:text-sm text-[#C4C7C8]">
                            Fill out the details below to reach thousands of global top talents.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Job Title */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#C4C7C8] mb-2">
                            Job Title <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <FiBriefcase className={`absolute left-4 top-1/2 -translate-y-1/2 text-base transition-colors ${errors.jobTitle ? 'text-rose-500' : 'text-zinc-500'}`} />
                            <input
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                placeholder="e.g. Senior Frontend Developer"
                                className={getInputStyle("jobTitle")}
                            />
                        </div>
                        {errors.jobTitle && (
                            <p className="flex items-center gap-1 text-xs font-semibold text-rose-400 mt-1.5"><FiAlertCircle /> {errors.jobTitle}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#C4C7C8] mb-2">
                            Category <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <FiLayers className={`absolute left-4 top-1/2 -translate-y-1/2 text-base transition-colors ${errors.category ? 'text-rose-500' : 'text-zinc-500'}`} />
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={getInputStyle("category")}
                            >
                                <option value="" className="bg-[#1B1B1C]">Select Category</option>
                                <option value="Engineering" className="bg-[#1B1B1C]">Engineering</option>
                                <option value="Design" className="bg-[#1B1B1C]">Design</option>
                                <option value="Marketing" className="bg-[#1B1B1C]">Marketing</option>
                                <option value="Sales" className="bg-[#1B1B1C]">Sales</option>
                                <option value="Support" className="bg-[#1B1B1C]">Support</option>
                            </select>
                        </div>
                        {errors.category && (
                            <p className="flex items-center gap-1 text-xs font-semibold text-rose-400 mt-1.5"><FiAlertCircle /> {errors.category}</p>
                        )}
                    </div>

                    {/* Job Type */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#C4C7C8] mb-2">
                            Job Type <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <FiClock className={`absolute left-4 top-1/2 -translate-y-1/2 text-base transition-colors ${errors.jobType ? 'text-rose-500' : 'text-zinc-500'}`} />
                            <select
                                name="jobType"
                                value={formData.jobType}
                                onChange={handleChange}
                                className={getInputStyle("jobType")}
                            >
                                <option value="" className="bg-[#1B1B1C]">Select Type</option>
                                <option value="Full Time" className="bg-[#1B1B1C]">Full Time</option>
                                <option value="Part Time" className="bg-[#1B1B1C]">Part Time</option>
                                <option value="Contract" className="bg-[#1B1B1C]">Contract</option>
                                <option value="Internship" className="bg-[#1B1B1C]">Internship</option>
                            </select>
                        </div>
                        {errors.jobType && (
                            <p className="flex items-center gap-1 text-xs font-semibold text-rose-400 mt-1.5"><FiAlertCircle /> {errors.jobType}</p>
                        )}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#C4C7C8] mb-2">
                            Location <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <FiMapPin className={`absolute left-4 top-1/2 -translate-y-1/2 text-base transition-colors ${errors.location ? 'text-rose-500' : 'text-zinc-500'}`} />
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Dhaka, Bangladesh"
                                className={getInputStyle("location")}
                            />
                        </div>
                        {errors.location && (
                            <p className="flex items-center gap-1 text-xs font-semibold text-rose-400 mt-1.5"><FiAlertCircle /> {errors.location}</p>
                        )}
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#C4C7C8] mb-2">
                            Salary Range <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <FiDollarSign className={`absolute left-4 top-1/2 -translate-y-1/2 text-base transition-colors ${errors.salary ? 'text-rose-500' : 'text-zinc-500'}`} />
                            <input
                                type="text"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="e.g. $1000 - $3000"
                                className={getInputStyle("salary")}
                            />
                        </div>
                        {errors.salary && (
                            <p className="flex items-center gap-1 text-xs font-semibold text-rose-400 mt-1.5"><FiAlertCircle /> {errors.salary}</p>
                        )}
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#C4C7C8] mb-2">
                            Required Skills <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <FiTag className={`absolute left-4 top-1/2 -translate-y-1/2 text-base transition-colors ${errors.skills ? 'text-rose-500' : 'text-zinc-500'}`} />
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="e.g. React, Next.js, Tailwind"
                                className={getInputStyle("skills")}
                            />
                        </div>
                        {errors.skills && (
                            <p className="flex items-center gap-1 text-xs font-semibold text-rose-400 mt-1.5"><FiAlertCircle /> {errors.skills}</p>
                        )}
                    </div>

                </div>

                {/* Remote Toggle Box */}
                <div className={`border rounded-2xl p-4.5 transition-all ${formData.isRemote ? 'bg-zinc-800/30 border-zinc-700' : 'bg-zinc-800/10 border-zinc-800'}`}>
                    <label className="flex items-start gap-3.5 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            name="isRemote"
                            checked={formData.isRemote}
                            onChange={handleChange}
                            className="h-5 w-5 rounded border-zinc-700 bg-zinc-800 text-indigo-600 focus:ring-offset-0 focus:ring-0 mt-0.5 accent-indigo-600"
                        />
                        <div className="flex flex-col">
                            <p className={`text-sm font-bold transition-colors ${formData.isRemote ? 'text-white' : 'text-[#E5E2E3]'}`}>
                                Remote Position
                            </p>
                            <p className="text-xs text-[#C4C7C8] font-medium mt-0.5">
                                Enable this selection if target candidates can dynamically work from home.
                            </p>
                        </div>
                    </label>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#C4C7C8] mb-2">
                        Job Description <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                        <FiFileText className={`absolute left-4 top-4 text-base transition-colors ${errors.description ? 'text-rose-500' : 'text-zinc-500'}`} />
                        <textarea
                            rows={6}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Provide deep analysis on requirements, company workflow, stack expectations, and basic perks..."
                            className={`w-full bg-zinc-800/40 border rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-[#E5E2E3] placeholder-zinc-500 resize-none focus:outline-none focus:bg-zinc-800/80 transition-all duration-250 ${errors.description ? 'border-rose-500 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10' : 'border-zinc-800 focus:border-zinc-700 focus:ring-4 focus:ring-zinc-800/40'}`}
                        />
                    </div>
                    {errors.description && (
                        <p className="flex items-center gap-1 text-xs font-semibold text-rose-400 mt-1.5"><FiAlertCircle /> {errors.description}</p>
                    )}
                </div>

                {/* Action Buttons */}
                <button
                    type="submit"
                    className="px-7 py-3 rounded-xl bg-[#0A65CC] text-white font-bold text-sm hover:bg-[#0957b0] shadow-md shadow-[#0A65CC]/20 transition active:scale-[0.99] cursor-pointer"
                >
                    Publish Job Listing
                </button>
            </form>
        </div>
    );
};

export default PostJobForm;