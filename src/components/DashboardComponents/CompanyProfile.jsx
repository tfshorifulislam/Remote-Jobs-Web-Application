"use client";

import { useState } from "react";
import { Factory, Globe, Pencil } from "@gravity-ui/icons";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
    const [company, setCompany] = useState(recruiterCompany || null);
    const [isEditing, setIsEditing] = useState(false);
    const [logo, setLogo] = useState(company?.logo || "");

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

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

        console.log(companyData);

        setCompany(companyData);
        setIsEditing(false);
    }

    async function handleLogoUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.success) {
                setLogo(data.data.url);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // CREATE COMPANY
    if (!company) {
        return (
            <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Create Company</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" placeholder="Company Name" className="w-full border border-gray-300 rounded-xl px-4 py-3" />
                    <input name="websiteUrl" placeholder="Website URL" className="w-full border border-gray-300 rounded-xl px-4 py-3" />
                    <input name="industry" placeholder="Industry" className="w-full border border-gray-300 rounded-xl px-4 py-3" />

                    <div>
                        <label className="block mb-2 text-sm font-medium">Company Logo</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3"
                        />

                        {logo && (
                            <img
                                src={logo}
                                alt="Company Logo"
                                className="w-24 h-24 object-cover rounded-xl mt-3 border"
                            />
                        )}
                    </div>

                    <input name="location" placeholder="Location" className="w-full border border-gray-300 rounded-xl px-4 py-3" />
                    <input name="employeeCount" placeholder="Employees" className="w-full border border-gray-300 rounded-xl px-4 py-3" />

                    <textarea
                        name="description"
                        rows={5}
                        placeholder="Description"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3"
                    />

                    <button type="submit" className="bg-black text-white px-6 py-3 rounded-xl">
                        Create Company
                    </button>
                </form>
            </div>
        );
    }

    // EDIT COMPANY
    if (isEditing) {
        return (
            <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Edit Company</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" defaultValue={company.name} className="w-full border border-gray-300 rounded-xl px-4 py-3" />
                    <input name="websiteUrl" defaultValue={company.websiteUrl} className="w-full border border-gray-300 rounded-xl px-4 py-3" />

                    <div>
                        <label className="block mb-2 text-sm font-medium">Company Logo</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3"
                        />

                        {logo && (
                            <img
                                src={logo}
                                alt="Company Logo"
                                className="w-24 h-24 object-cover rounded-xl mt-3 border"
                            />
                        )}
                    </div>

                    <input name="industry" defaultValue={company.industry} className="w-full border border-gray-300 rounded-xl px-4 py-3" />
                    <input name="location" defaultValue={company.location} className="w-full border border-gray-300 rounded-xl px-4 py-3" />
                    <input name="employeeCount" defaultValue={company.employeeCount} className="w-full border border-gray-300 rounded-xl px-4 py-3" />

                    <textarea
                        name="description"
                        rows={5}
                        defaultValue={company.description}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3"
                    />

                    <div className="flex gap-3">
                        <button type="submit" className="bg-black text-white px-6 py-3 rounded-xl">
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="border border-gray-300 px-6 py-3 rounded-xl"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    // VIEW COMPANY
    return (
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
                        {company.logo ? (
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <Factory size={24} className="text-gray-500" />
                            </div>
                        )}
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold">{company.name}</h1>

                        <a
                            href={company.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-blue-600 mt-1"
                        >
                            <Globe size={14} />
                            {company.websiteUrl}
                        </a>
                    </div>
                </div>

                <button
                    onClick={() => setIsEditing(true)}
                    className="border border-gray-300 px-4 py-2 rounded-xl flex items-center gap-2"
                >
                    <Pencil size={14} />
                    Edit
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="font-medium">{company.industry}</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{company.location}</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Employees</p>
                    <p className="font-medium">{company.employeeCount}</p>
                </div>
            </div>

            <div className="mt-6 border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold mb-2">About Company</h3>
                <p className="text-gray-600">{company.description}</p>
            </div>
        </div>
    );
}