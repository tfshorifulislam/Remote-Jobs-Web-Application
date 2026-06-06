"use client";

import { useState } from "react";
import { Factory, Globe, Pencil, ArrowLeft } from "@gravity-ui/icons";
import Link from "next/link";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
    const [company, setCompany] = useState(recruiterCompany || null);
    const [isEditing, setIsEditing] = useState(false);
    const [logo, setLogo] = useState(company?.logo || "");
    const [errors, setErrors] = useState({});

    function validate(formData) {
        const newErrors = {};
        const requiredFields = ["name", "websiteUrl", "industry", "location", "employeeCount", "description"];

        requiredFields.forEach((field) => {
            const value = formData.get(field)?.toString().trim();
            if (!value) newErrors[field] = "This field is required";
        });

        if (!logo) newErrors.logo = "Company logo is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (!validate(formData)) return;

        const companyData = {
            name: formData.get("name"),
            websiteUrl: formData.get("websiteUrl"),
            industry: formData.get("industry"),
            location: formData.get("location"),
            employeeCount: formData.get("employeeCount"),
            description: formData.get("description"),
            recruiterId: recruiter?.id,
            logo,
        };

        setCompany(companyData);
        setIsEditing(false);
        console.log(companyData);
    }

    async function handleLogoUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, logo: "Max file size is 5MB" }));
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
                { method: "POST", body: formData }
            );
            const data = await res.json();

            if (data?.success) {
                setLogo(data.data.url);
                setErrors((prev) => ({ ...prev, logo: "" }));
            }
        } catch (err) {
            console.error(err);
        }
    }

    // UNIFORM METALLIC INPUT STYLE
    const inputStyle = "w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-3 text-[#E5E2E3] placeholder-zinc-600 focus:outline-none focus:bg-zinc-900 focus:border-zinc-700 transition-all text-sm";

    // CREATE MODE
    if (!company) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href="/dashboard/recruiter" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} /> Back to Dashboard
                    </Link>
                </div>

                <div className="bg-[#1B1B1C] border border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-10">
                    <h2 className="text-3xl font-bold text-zinc-200 mb-8 tracking-tight">
                        Create Company Profile
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-5">
                            {["name", "websiteUrl", "industry", "location"].map((field) => (
                                <div key={field}>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 capitalize">
                                        {field.replace(/([A-Z])/g, " $1")}
                                    </label>
                                    <input
                                        name={field}
                                        placeholder={`Enter ${field}`}
                                        className={inputStyle}
                                    />
                                    {errors[field] && <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors[field]}</p>}
                                </div>
                            ))}

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Number of Employees</label>
                                <input
                                    name="employeeCount"
                                    type="text"
                                    placeholder="e.g. 50-100"
                                    className={inputStyle}
                                />
                                {errors.employeeCount && <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors.employeeCount}</p>}
                            </div>
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Company Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-3 text-zinc-500 text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border file:border-zinc-700 file:bg-zinc-800 file:text-zinc-300 file:font-medium file:cursor-pointer hover:file:bg-zinc-700 file:transition-all"
                            />
                            {errors.logo && <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors.logo}</p>}
                            {logo && (
                                <img src={logo} alt="logo" className="mt-4 w-28 h-28 object-cover rounded-2xl border border-zinc-800" />
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Description</label>
                            <textarea
                                name="description"
                                rows={6}
                                placeholder="Tell us about your company..."
                                className={`${inputStyle} resize-none`}
                            />
                            {errors.description && <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors.description}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-semibold rounded-xl text-sm transition-all active:scale-[0.99] cursor-pointer"
                        >
                            Create Profile
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // EDIT MODE
    if (isEditing) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-[#1B1B1C] border border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-10">
                    <h2 className="text-3xl font-bold text-zinc-200 mb-8 tracking-tight">Edit Company</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-5">
                            {["name", "websiteUrl", "industry", "location"].map((field) => (
                                <div key={field}>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                                    <input
                                        name={field}
                                        defaultValue={company[field]}
                                        className={inputStyle}
                                    />
                                    {errors[field] && <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors[field]}</p>}
                                </div>
                            ))}

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Number of Employees</label>
                                <input
                                    name="employeeCount"
                                    defaultValue={company.employeeCount}
                                    className={inputStyle}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Company Logo</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleLogoUpload} 
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-3 text-zinc-500 text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border file:border-zinc-700 file:bg-zinc-800 file:text-zinc-300 file:font-medium file:cursor-pointer hover:file:bg-zinc-700 file:transition-all"
                            />
                            {errors.logo && <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors.logo}</p>}
                            {logo && <img src={logo} className="mt-4 w-28 h-28 object-cover rounded-2xl border border-zinc-800" />}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Description</label>
                            <textarea
                                name="description"
                                rows={6}
                                defaultValue={company.description}
                                className={`${inputStyle} resize-none`}
                            />
                            {errors.description && <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors.description}</p>}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button
                                type="submit"
                                className="flex-1 py-3.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-semibold rounded-xl text-sm transition-all active:scale-[0.99] cursor-pointer"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="flex-1 py-3.5 border border-zinc-800 rounded-xl text-zinc-400 font-medium bg-zinc-900/30 hover:bg-zinc-900/80 transition-colors text-sm cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // VIEW MODE
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-[#1B1B1C] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden">
                
                {/* Header */}
                <div className="p-6 md:p-10 border-b border-zinc-800">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-zinc-800 flex-shrink-0 bg-zinc-900 flex items-center justify-center">
                                {company.logo ? (
                                    <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                                ) : (
                                    <Factory size={40} className="text-zinc-700" />
                                )}
                            </div>

                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-zinc-200 tracking-tight">{company.name}</h1>
                                <a
                                    href={company.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 hover:underline mt-2 text-sm transition-colors"
                                >
                                    <Globe size={14} />
                                    {company.websiteUrl}
                                </a>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-sm font-medium rounded-xl transition active:scale-[0.99] cursor-pointer"
                        >
                            <Pencil size={14} />
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 md:p-10 bg-zinc-900/20 border-b border-zinc-800">
                    {[
                        { label: "Industry", value: company.industry },
                        { label: "Location", value: company.location },
                        { label: "Company Size", value: company.employeeCount },
                    ].map((item) => (
                        <div key={item.label} className="bg-[#1B1B1C] border border-zinc-800 rounded-2xl p-5">
                            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">{item.label}</p>
                            <p className="font-semibold text-lg text-zinc-300 mt-1.5">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* About Section */}
                <div className="p-6 md:p-10">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
                        About the Company
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-[15px] whitespace-pre-line">
                        {company.description}
                    </p>
                </div>
            </div>
        </div>
    );
}