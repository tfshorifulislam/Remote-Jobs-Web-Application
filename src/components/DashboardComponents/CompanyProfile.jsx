"use client";

import { useState } from "react";
import { Factory, Globe, Pencil, ArrowLeft } from "@gravity-ui/icons";
import Link from "next/link";

const PRIMARY = "#0A65CC";

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

    // CREATE MODE
    if (!company) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href="/dashboard/recruiter/company" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700">
                        <ArrowLeft size={18} /> Back to Dashboard
                    </Link>
                </div>

                <div className="bg-white border border-zinc-200 rounded-3xl shadow-sm p-6 md:p-10">
                    <h2 className="text-3xl font-bold text-center md:text-left mb-8" style={{ color: PRIMARY }}>
                        Create Company Profile
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-5">
                            {["name", "websiteUrl", "industry", "location"].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1.5 capitalize">
                                        {field.replace(/([A-Z])/g, " $1")}
                                    </label>
                                    <input
                                        name={field}
                                        placeholder={`Enter ${field}`}
                                        className="w-full border border-zinc-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A65CC]/30 focus:border-[#0A65CC]"
                                    />
                                    {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Number of Employees</label>
                                <input
                                    name="employeeCount"
                                    type="text"
                                    placeholder="e.g. 50-100"
                                    className="w-full border border-zinc-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A65CC]/30 focus:border-[#0A65CC]"
                                />
                                {errors.employeeCount && <p className="text-red-500 text-sm mt-1">{errors.employeeCount}</p>}
                            </div>
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Company Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="w-full border border-zinc-200 rounded-2xl px-5 py-3 file:mr-4 file:py-2 file:px-6 file:rounded-xl file:border-0 file:bg-[#0A65CC] file:text-white"
                            />
                            {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo}</p>}
                            {logo && (
                                <img src={logo} alt="logo" className="mt-4 w-28 h-28 object-cover rounded-2xl border" />
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Description</label>
                            <textarea
                                name="description"
                                rows={6}
                                placeholder="Tell us about your company..."
                                className="w-full border border-zinc-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A65CC]/30 focus:border-[#0A65CC]"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full md:w-auto px-10 py-3.5 rounded-2xl text-white font-semibold text-lg transition hover:brightness-105"
                            style={{ backgroundColor: PRIMARY }}
                        >
                            Create Company Profile
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
                <div className="bg-white border border-zinc-200 rounded-3xl shadow-sm p-6 md:p-10">
                    <h2 className="text-3xl font-bold mb-8" style={{ color: PRIMARY }}>Edit Company</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Same fields as create but with default values */}
                        <div className="grid md:grid-cols-2 gap-5">
                            {["name", "websiteUrl", "industry", "location"].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1.5 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                                    <input
                                        name={field}
                                        defaultValue={company[field]}
                                        className="w-full border border-zinc-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A65CC]/30 focus:border-[#0A65CC]"
                                    />
                                    {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Number of Employees</label>
                                <input
                                    name="employeeCount"
                                    defaultValue={company.employeeCount}
                                    className="w-full border border-zinc-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A65CC]/30 focus:border-[#0A65CC]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Company Logo</label>
                            <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full border border-zinc-200 rounded-2xl px-5 py-3 file:mr-4 file:py-2 file:px-6 file:rounded-xl file:border-0 file:bg-[#0A65CC] file:text-white" />
                            {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo}</p>}
                            {logo && <img src={logo} className="mt-4 w-28 h-28 object-cover rounded-2xl border" />}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Description</label>
                            <textarea
                                name="description"
                                rows={6}
                                defaultValue={company.description}
                                className="w-full border border-zinc-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A65CC]/30 focus:border-[#0A65CC]"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 py-3.5 rounded-2xl text-white font-semibold"
                                style={{ backgroundColor: PRIMARY }}
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="flex-1 py-3.5 border border-zinc-300 rounded-2xl font-medium hover:bg-zinc-50"
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
            <div className="bg-white border border-zinc-200 rounded-3xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="p-6 md:p-10 border-b">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-zinc-100 flex-shrink-0">
                                {company.logo ? (
                                    <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                                        <Factory size={40} className="text-zinc-400" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">{company.name}</h1>
                                <a
                                    href={company.websiteUrl}
                                    target="_blank"
                                    className="flex items-center gap-2 text-[#0A65CC] hover:underline mt-2 text-lg"
                                >
                                    <Globe size={18} />
                                    {company.websiteUrl}
                                </a>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-medium hover:brightness-105 transition"
                            style={{ backgroundColor: PRIMARY }}
                        >
                            <Pencil size={18} />
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 md:p-10 bg-zinc-50">
                    {[
                        { label: "Industry", value: company.industry },
                        { label: "Location", value: company.location },
                        { label: "Company Size", value: company.employeeCount },
                    ].map((item) => (
                        <div key={item.label} className="bg-white border rounded-2xl p-5">
                            <p className="text-zinc-500 text-sm">{item.label}</p>
                            <p className="font-semibold text-xl mt-1">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* About Section */}
                <div className="p-6 md:p-10">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: PRIMARY }}>
                        About the Company
                    </h3>
                    <p className="text-zinc-600 leading-relaxed text-[17px]">
                        {company.description}
                    </p>
                </div>
            </div>
        </div>
    );
}