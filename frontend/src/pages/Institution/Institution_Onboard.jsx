import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    Globe,
    Users,
    GraduationCap,
    BookOpen,
    Calendar,
    Shield,
    CheckCircle,
    ArrowRight,
    ArrowLeft,
    Upload,
    User,
    Award,
    Clock,
    FileText,
    Camera,
    Home,
    AlertCircle,
    X
} from "lucide-react";

const InstitutionOnboarding = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [logo, setLogo] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [formData, setFormData] = useState({
        institutionName: "",
        institutionCode: "",
        institutionType: "",
        establishedYear: "",
        affiliationBoard: "",
        registrationNumber: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        phone: "",
        email: "",
        website: "",
        principalName: "",
        principalEmail: "",
        principalPhone: "",
        adminName: "",
        adminEmail: "",
        adminPhone: "",
        totalStudents: "",
        totalTeachers: "",
        totalClasses: "",
        facilities: [],
        subjects: [],
        academicYear: "",
        description: "",

        institutionLogo: null,
    });
    const logoInputRef = useRef(null);
    const docsInputRef = useRef(null);


    const [documents, setDocuments] = useState([]);

    // Handle logo upload
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, institutionLogo: e.target.files[0] })
            setLogo({
                file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    // Handle multiple documents upload
    const handleDocsChange = (e) => {
        const files = Array.from(e.target.files);
        setDocuments((prev) => [...prev, ...files]);
    };
    const totalSteps = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const institutionTypes = [
        "Primary School", "Secondary School", "High School", "Senior Secondary School",
        "College", "University", "Technical Institute", "Vocational Training Center",
        "Professional College", "Research Institute"
    ];

    const affiliationBoards = [
        "CBSE", "ICSE", "State Board", "IB (International Baccalaureate)",
        "Cambridge International", "NIOS", "UGC", "AICTE", "Other"
    ];

    const facilitiesList = [
        "Library", "Computer Lab", "Science Laboratory", "Sports Ground",
        "Auditorium", "Cafeteria", "Medical Room", "Transportation",
        "Hostel", "Wi-Fi", "Smart Classrooms", "Art Room", "Music Room", "Swimming Pool"
    ];

    const subjectsList = [
        "Mathematics", "Science", "English", "Hindi", "Social Studies",
        "Computer Science", "Physics", "Chemistry", "Biology", "Commerce",
        "Economics", "History", "Geography", "Arts", "Physical Education", "Other Languages"
    ];

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleArrayToggle = (field, value) => {
        const currentArray = formData[field];
        const newArray = currentArray.includes(value)
            ? currentArray.filter(item => item !== value)
            : [...currentArray, value];
        setFormData({ ...formData, [field]: newArray });
    };

    const validateStep1 = () => {
        return formData.institutionName.trim() !== "" &&
            formData.institutionCode.trim() !== "" &&
            formData.institutionType !== "" &&
            formData.establishedYear !== "" &&
            formData.affiliationBoard !== "";
    };

    const validateStep2 = () => {
        return formData.address.trim() !== "" &&
            formData.city.trim() !== "" &&
            formData.state.trim() !== "" &&
            formData.country.trim() !== "" &&
            formData.postalCode.trim() !== "" &&
            formData.phone.trim() !== "" &&
            formData.email.trim() !== "";
    };

    const validateStep3 = () => {
        return formData.principalName.trim() !== "" &&
            formData.principalEmail.trim() !== "" &&
            formData.principalPhone.trim() !== "" &&
            formData.adminName.trim() !== "" &&
            formData.adminEmail.trim() !== "" &&
            formData.adminPhone.trim() !== "";
    };

    const validateStep4 = () => {
        return formData.totalStudents !== "" &&
            formData.totalTeachers !== "" &&
            formData.totalClasses !== "";
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1: return validateStep1();
            case 2: return validateStep2();
            case 3: return validateStep3();
            case 4: return validateStep4();
            case 5: return true;
            default: return false;
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps && canProceed()) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };


    const handleSubmit = async () => {
        const submitData = new FormData();

        // Append all text fields
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null && formData[key] !== "") {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach((item) => submitData.append(`${key}[]`, item));
                } else {
                    submitData.append(key, formData[key]);
                }
            }
        });

        // ✅ Ensure logo is appended as file, not string
        if (formData.institutionLogo) {
            submitData.append("institutionLogo", formData.institutionLogo);
        }

        try {
            const res = await axios.post("/api/institutions/", submitData, {
                headers: {
                    "Content-Type": "multipart/form-data", // 👈 required
                },
            });
            alert("✅ Institution saved:", res.data);
            navigate("/login");
        } catch (err) {
            console.error("❌ Upload failed", err.response?.data || err);
        }
    };


    const renderProgressBar = () => (
        <div className={`mb-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
            <div className="flex items-center justify-between">
                {Array.from({ length: totalSteps }, (_, i) => (
                    <div key={i} className="flex items-center">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${i + 1 < currentStep
                                ? "bg-green-500 text-white scale-110"
                                : i + 1 === currentStep
                                    ? "bg-indigo-600 text-white scale-110 shadow-lg"
                                    : "bg-slate-200 text-slate-600"
                                }`}
                        >
                            {i + 1 < currentStep ? (
                                <CheckCircle className="w-6 h-6" />
                            ) : (
                                i + 1
                            )}
                        </div>
                        {i < totalSteps - 1 && (
                            <div
                                className={`h-1 w-16 mx-2 transition-all duration-500 ${i + 1 < currentStep ? "bg-green-500" : "bg-slate-200"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-4 text-center">
                <span className="text-sm text-slate-600 font-medium">
                    Step {currentStep} of {totalSteps}
                </span>
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className={`space-y-6 transform transition-all duration-700 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Basic Institution Information</h2>
                <p className="text-slate-600">Let's start with the fundamental details about your institution</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Institution Code *
                    </label>
                    <input
                        type="text"
                        value={formData.institutionCode}
                        onChange={(e) => handleInputChange("institutionCode", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-slate-400 hover:shadow-md"
                        placeholder="Enter your institution Code"
                    />
                </div>
                <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Institution Name *
                    </label>
                    <input
                        type="text"
                        value={formData.institutionName}
                        onChange={(e) => handleInputChange("institutionName", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-slate-400 hover:shadow-md"
                        placeholder="Enter your institution name"
                    />
                </div>

                <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Institution Type *
                    </label>
                    <select
                        value={formData.institutionType}
                        onChange={(e) => handleInputChange("institutionType", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-slate-400 hover:shadow-md"
                    >
                        <option value="">Select institution type</option>
                        {institutionTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Established Year *
                    </label>
                    <input
                        type="number"
                        value={formData.establishedYear}
                        onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-slate-400 hover:shadow-md"
                        placeholder="YYYY"
                        min="1800"
                        max={new Date().getFullYear()}
                    />
                </div>

                <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Affiliation/Board *
                    </label>
                    <select
                        value={formData.affiliationBoard}
                        onChange={(e) => handleInputChange("affiliationBoard", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-slate-400 hover:shadow-md"
                    >
                        <option value="">Select affiliation</option>
                        {affiliationBoards.map((board) => (
                            <option key={board} value={board}>{board}</option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2 transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Registration Number (Optional)
                    </label>
                    <input
                        type="text"
                        value={formData.registrationNumber}
                        onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-slate-400 hover:shadow-md"
                        placeholder="Official registration/license number"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className={`space-y-6 transform transition-all duration-700 delay-200 ${currentStep === 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Contact Information</h2>
                <p className="text-slate-600">Provide your institution's address and contact details</p>
            </div>

            <div className="space-y-6">
                <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Complete Address *
                    </label>
                    <textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-slate-400 hover:shadow-md"
                        placeholder="Enter complete address with landmarks"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { field: "city", label: "City *", placeholder: "City" },
                        { field: "state", label: "State/Province *", placeholder: "State/Province" },
                        { field: "country", label: "Country *", placeholder: "Country" },
                        { field: "postalCode", label: "Postal Code *", placeholder: "Postal Code" },
                        { field: "phone", label: "Phone Number *", placeholder: "+91 98765 43210", type: "tel" },
                        { field: "email", label: "Email Address *", placeholder: "contact@institution.edu", type: "email" }
                    ].map((input, idx) => (
                        <div key={input.field} className="transform hover:scale-105 transition-transform duration-200" style={{ animationDelay: `${idx * 100}ms` }}>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                {input.label}
                            </label>
                            <input
                                type={input.type || "text"}
                                value={formData[input.field]}
                                onChange={(e) => handleInputChange(input.field, e.target.value)}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-slate-400 hover:shadow-md"
                                placeholder={input.placeholder}
                            />
                        </div>
                    ))}
                </div>

                <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Website (Optional)
                    </label>
                    <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-slate-400 hover:shadow-md"
                        placeholder="https://www.yourinstitution.edu"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className={`space-y-6 transform transition-all duration-700 delay-200 ${currentStep === 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-110 transition-transform duration-300">
                    <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Administrative Contacts</h2>
                <p className="text-slate-600">Key personnel who will manage the system</p>
            </div>

            <div className="space-y-8">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 hover:shadow-lg transition-all duration-300 transform hover:scale-102">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                        <Award className="w-6 h-6 mr-2 text-indigo-600" />
                        Principal/Head of Institution
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { field: "principalName", label: "Full Name *", placeholder: "Principal's full name" },
                            { field: "principalEmail", label: "Email Address *", placeholder: "principal@institution.edu", type: "email" },
                            { field: "principalPhone", label: "Phone Number *", placeholder: "Phone number", type: "tel" }
                        ].map((input, idx) => (
                            <div key={input.field} className="transform hover:scale-105 transition-transform duration-200" style={{ animationDelay: `${idx * 100}ms` }}>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    {input.label}
                                </label>
                                <input
                                    type={input.type || "text"}
                                    value={formData[input.field]}
                                    onChange={(e) => handleInputChange(input.field, e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                                    placeholder={input.placeholder}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:scale-102">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                        <Shield className="w-6 h-6 mr-2 text-blue-600" />
                        System Administrator
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { field: "adminName", label: "Full Name *", placeholder: "Admin's full name" },
                            { field: "adminEmail", label: "Email Address *", placeholder: "admin@institution.edu", type: "email" },
                            { field: "adminPhone", label: "Phone Number *", placeholder: "Phone number", type: "tel" }
                        ].map((input, idx) => (
                            <div key={input.field} className="transform hover:scale-105 transition-transform duration-200" style={{ animationDelay: `${idx * 100}ms` }}>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    {input.label}
                                </label>
                                <input
                                    type={input.type || "text"}
                                    value={formData[input.field]}
                                    onChange={(e) => handleInputChange(input.field, e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                    placeholder={input.placeholder}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className={`space-y-6 transform transition-all duration-700 delay-200 ${currentStep === 4 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Institution Details</h2>
                <p className="text-slate-600">Tell us about your institution's capacity and offerings</p>
            </div>

            <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center mb-2">
                            <Users className="w-5 h-5 text-blue-600 mr-2" />
                            <label className="block text-sm font-medium text-slate-700">
                                Total Students (Approx.) *
                            </label>
                        </div>
                        <input
                            type="number"
                            value={formData.totalStudents}
                            onChange={(e) => handleInputChange("totalStudents", e.target.value)}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            placeholder="Number of students"
                        />
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center mb-2">
                            <Award className="w-5 h-5 text-green-600 mr-2" />
                            <label className="block text-sm font-medium text-slate-700">
                                Total Teachers/Faculty *
                            </label>
                        </div>
                        <input
                            type="number"
                            value={formData.totalTeachers}
                            onChange={(e) => handleInputChange("totalTeachers", e.target.value)}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                            placeholder="Number of teachers"
                        />
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center mb-2">
                            <BookOpen className="w-5 h-5 text-purple-600 mr-2" />
                            <label className="block text-sm font-medium text-slate-700">
                                Total Classes/Departments *
                            </label>
                        </div>
                        <input
                            type="number"
                            value={formData.totalClasses}
                            onChange={(e) => handleInputChange("totalClasses", e.target.value)}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                            placeholder="Number of classes"
                        />
                    </div>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Academic Year Pattern
                    </label>
                    <select
                        value={formData.academicYear}
                        onChange={(e) => handleInputChange("academicYear", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-slate-400 hover:shadow-md"
                    >
                        <option value="">Select academic year pattern</option>
                        <option value="April-March">April - March</option>
                        <option value="June-May">June - May</option>
                        <option value="January-December">January - December</option>
                        <option value="September-August">September - August</option>
                    </select>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg hover:bg-slate-100 transition-all duration-300">
                    <label className="block text-sm font-medium text-slate-700 mb-4 flex items-center">
                        <Building2 className="w-5 h-5 mr-2 text-slate-600" />
                        Available Facilities (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {facilitiesList.map((facility, idx) => (
                            <label
                                key={facility}
                                className={`flex items-center space-x-2 cursor-pointer p-3 rounded-lg transition-all duration-300 hover:scale-105 ${formData.facilities.includes(facility)
                                    ? 'bg-indigo-100 border-2 border-indigo-300 shadow-md'
                                    : 'bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
                                    }`}
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.facilities.includes(facility)}
                                    onChange={() => handleArrayToggle("facilities", facility)}
                                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 transition-colors"
                                />
                                <span className="text-sm text-slate-700 font-medium">{facility}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg hover:bg-slate-100 transition-all duration-300">
                    <label className="block text-sm font-medium text-slate-700 mb-4 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-slate-600" />
                        Subjects/Streams Offered (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {subjectsList.map((subject, idx) => (
                            <label
                                key={subject}
                                className={`flex items-center space-x-2 cursor-pointer p-3 rounded-lg transition-all duration-300 hover:scale-105 ${formData.subjects.includes(subject)
                                    ? 'bg-green-100 border-2 border-green-300 shadow-md'
                                    : 'bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
                                    }`}
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.subjects.includes(subject)}
                                    onChange={() => handleArrayToggle("subjects", subject)}
                                    className="w-4 h-4 text-green-600 border-slate-300 rounded focus:ring-green-500 transition-colors"
                                />
                                <span className="text-sm text-slate-700 font-medium">{subject}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep5 = () => (
        <div className={`space-y-6 transform transition-all duration-700 delay-200 ${currentStep === 5 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Final Step - Review & Submit</h2>
                <p className="text-slate-600">Review your information and complete the registration</p>
            </div>

            <div className="space-y-6">
                <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Institution Description (Optional)
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-slate-400 hover:shadow-md"
                        placeholder="Describe your institution's mission, values, and unique features..."
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Institution Logo Upload */}
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105">
                        <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600 mb-2 font-medium">
                            Upload Institution Logo
                        </p>

                        {/* Hidden Input */}
                        <input
                            type="file"
                            accept="image/*"
                            ref={logoInputRef}
                            className="hidden"
                            onChange={handleLogoChange}
                        />

                        <button
                            type="button"
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold bg-white px-4 py-2 rounded-lg border hover:shadow-md transition-all"
                            onClick={() => logoInputRef.current.click()}
                        >
                            Choose File
                        </button>

                        {/* Preview */}
                        {logo && (
                            <div className="mt-4 relative inline-block">
                                <img
                                    src={logo.preview}
                                    alt="Logo Preview"
                                    className="w-24 h-24 object-cover rounded-lg border shadow"
                                />
                                <button
                                    type="button"
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow"
                                    onClick={() => setLogo(null)}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Documents Upload */}
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600 mb-2 font-medium">
                            Upload Documents
                        </p>

                        {/* Hidden Input */}
                        <input
                            type="file"
                            multiple
                            ref={docsInputRef}
                            className="hidden"
                            onChange={handleDocsChange}
                        />

                        <button
                            type="button"
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold bg-white px-4 py-2 rounded-lg border hover:shadow-md transition-all"
                            onClick={() => docsInputRef.current.click()}
                        >
                            Choose Files
                        </button>

                        {/* Documents List */}
                        {documents.length > 0 && (
                            <ul className="mt-4 text-left text-sm text-slate-700 space-y-2">
                                {documents.map((doc, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between bg-white p-2 rounded-md border shadow-sm"
                                    >
                                        <span>{doc.name}</span>
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-600"
                                            onClick={() =>
                                                setDocuments(documents.filter((_, i) => i !== index))
                                            }
                                        >
                                            <X size={14} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Review Your Information
                    </h3>
                    <p className="text-indigo-800 text-sm mb-4">
                        Please review all the information you've provided. You can go back to any previous step to make changes.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm bg-white p-4 rounded-lg">
                        <div className="space-y-2">
                            <div><strong className="text-slate-700">Institution:</strong> <span className="text-slate-600">{formData.institutionName || "Not provided"}</span></div>
                            <div><strong className="text-slate-700">Type:</strong> <span className="text-slate-600">{formData.institutionType || "Not selected"}</span></div>
                            <div><strong className="text-slate-700">Email:</strong> <span className="text-slate-600">{formData.email || "Not provided"}</span></div>
                            <div><strong className="text-slate-700">Phone:</strong> <span className="text-slate-600">{formData.phone || "Not provided"}</span></div>
                        </div>
                        <div className="space-y-2">
                            <div><strong className="text-slate-700">Students:</strong> <span className="text-slate-600">{formData.totalStudents || "Not specified"}</span></div>
                            <div><strong className="text-slate-700">Teachers:</strong> <span className="text-slate-600">{formData.totalTeachers || "Not specified"}</span></div>
                            <div><strong className="text-slate-700">Classes:</strong> <span className="text-slate-600">{formData.totalClasses || "Not specified"}</span></div>
                            <div><strong className="text-slate-700">City:</strong> <span className="text-slate-600">{formData.city || "Not provided"}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Header */}
            <div className={`bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-slate-900">ZENDESK <span className="text-sm font-bold text-slate-900">By ITS Phoneix</span></span>
                            <span className="text-slate-400">|</span>
                            <span className="text-slate-600 font-medium">Institution Onboarding</span>
                        </div>
                        <button
                            className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-indigo-50"
                        >
                            <Home className="w-4 h-4" />
                            <span className="font-medium" onClick={() => navigate("/")}>Back to Home</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
                <div className={`bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
                    <div className="p-8">
                        {renderProgressBar()}

                        <form className="space-y-8">
                            {currentStep === 1 && renderStep1()}
                            {currentStep === 2 && renderStep2()}
                            {currentStep === 3 && renderStep3()}
                            {currentStep === 4 && renderStep4()}
                            {currentStep === 5 && renderStep5()}

                            {/* Validation Warning */}
                            {!canProceed() && currentStep < totalSteps && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center space-x-2 animate-pulse">
                                    <AlertCircle className="w-5 h-5 text-amber-600" />
                                    <span className="text-amber-800 text-sm font-medium">
                                        Please fill all required fields (*) to continue to the next step
                                    </span>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-8 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${currentStep === 1
                                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                        : "bg-slate-200 text-slate-700 hover:bg-slate-300 hover:scale-105 shadow-md hover:shadow-lg"
                                        }`}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Previous
                                </button>

                                {currentStep < totalSteps ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!canProceed()}
                                        className={`flex items-center px-8 py-3 rounded-xl font-medium transition-all duration-300 ${canProceed()
                                            ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 shadow-lg hover:shadow-xl"
                                            : "bg-slate-300 text-slate-500 cursor-not-allowed"
                                            }`}
                                    >
                                        Next
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Complete Registration
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
                <Dialog
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
                >
                    <Dialog.Panel className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <Dialog.Title className="text-xl font-semibold text-center mb-4">
                            Registration Successful 🎉
                        </Dialog.Title>

                        <p className="text-slate-700 text-center mb-6">
                            Your login credentials have been generated. <br />
                            <span className="font-semibold text-red-600">
                                Please save them for future login.
                            </span>
                        </p>

                        <div className="bg-slate-100 rounded-lg p-4 mb-6">
                            <p className="font-mono text-sm mb-2">
                                <span className="font-semibold">Username:</span> {credentials.username}
                            </p>
                            <p className="font-mono text-sm">
                                <span className="font-semibold">Password:</span> {credentials.password}
                            </p>
                        </div>

                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all"
                        >
                            Got it, I’ve saved them
                        </button>
                    </Dialog.Panel>
                </Dialog>

                {/* Help Section */}
                <div className={`mt-8 text-center transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 inline-block shadow-lg">
                        <p className="text-slate-600 text-sm">
                            Need help with registration?{" "}
                            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-all">
                                Contact Support
                            </a>
                            {" "}or call{" "}
                            <a href="tel:+911234567890" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-all">
                                +91 123 456 7890
                            </a>
                        </p>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className={`mt-8 text-center transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600">
                            Registration takes approximately 5-10 minutes
                        </span>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        @keyframes slideInFromLeft {
          0% { transform: translateX(-100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInFromRight {
          0% { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        .slide-in-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }
        
        .slide-in-right {
          animation: slideInFromRight 0.8s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default InstitutionOnboarding;