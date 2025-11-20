import React, { useState, useEffect } from "react";
import {
    Users,
    UserCog,
    UserSquare,
    FileText,
    Edit,
    Trash2,
    Plus,
    ChevronDown,
    ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import studentService from "../../services/studentService";
import AdminSidebar from "./Admin_Sidebar";
import Sidebar from "../../components/sidebars/Sidebar";

// Mock API call (replace with Django backend API later)
const fetchData = (type) => {
    switch (type) {
        case "staff":
            return [
                { id: 1, name: "Mr. Sharma", subject: "Maths" },
                { id: 2, name: "Ms. Priya", subject: "Science" },
            ];
        case "parents":
            return [
                { id: 1, name: "Mr. Doe", student: "John Doe" },
                { id: 2, name: "Mrs. Smith", student: "Jane Smith" },
            ];
        case "admissions":
            return [
                { id: 1, applicant: "Rahul", status: "Pending" },
                { id: 2, applicant: "Sneha", status: "Approved" },
            ];
        default:
            return [];
    }

};

export default function AdminUserManagement() {
    const [activeTab, setActiveTab] = useState("students");
    const [data, setData] = useState([]);
    const [editFormData, setEditFormData] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    // Popup state
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
    const [formData, setFormData] = useState({});
    const [students, setStudents] = useState([]);


    // Search & Sort states
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    useEffect(() => {
        if (activeTab === "students") {
            const fetchStudents = async () => {
                setLoading(true);
                try {
                    const response = await studentService.getStudents();
                    console.log("Fetched students:", response);

                    // response looks like: {count, next, previous, results:[...]}
                    setData(response.results || []);
                } catch (err) {
                    toast.error(err.error || "Failed to fetch students");
                } finally {
                    setLoading(false);
                }
            };
            fetchStudents();
        } else {
            setData(fetchData(activeTab));
        }
    }, [activeTab]);



    useEffect(() => {
        setData(fetchData(activeTab));
        setSearchQuery("");
        setSortConfig({ key: null, direction: "asc" });
    }, [activeTab]);

    // ✅ ADD HANDLER
    const handleAdd = async () => {
        const requiredFields = ["name", "dob", "roll", "class", "contact", "address"];

        const missing = requiredFields.filter(
            (field) => !formData[field] || formData[field].trim() === ""
        );

        if (missing.length > 0) {
            toast.error(`Please fill in the required fields: ${missing.join(", ")}`);
            return;
        }

        try {
            const newStudent = {
                student_id: formData.roll,
                grade_level: formData.class,
                address: formData.address,
                user: {
                    username: formData.name.replace(/\s+/g, "").toLowerCase(),
                    first_name: formData.name.split(" ")[0] || "",
                    last_name: formData.name.split(" ")[1] || "",
                    email: formData.email || "",
                },
            };

            const savedStudent = await studentService.addStudent(newStudent);

            setData((prev) => [...prev, savedStudent]);
            toast.success("Student added successfully!");
            setFormData({});
            setShowModal(false);
            setIsAddFormOpen(false);
        } catch (err) {
            toast.error(err.error || "Failed to add student");
        }
    };


    // ✅ EDIT HANDLER
    const handleEdit = (item) => {
        setEditFormData(item);
        setModalMode("Edit");
        setShowModal(true)
        setEditingId(item.id);
    };

    const handleUpdate = () => {
        setData((prev) =>
            prev.map((item) =>
                item.id === editingId ? { ...item, ...editFormData } : item
            )
        );
        setEditingId(null);
        setShowModal(false)
        setEditFormData({});
    };

    const handleDelete = (id) => {
        setData((prev) => prev.filter((item) => item.id !== id));
    };

    // 🔹 Search filter
    const filteredData = data.filter((item) =>
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    // 🔹 Sorting logic


    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    // 🔹 Reusable Form Fields
    const renderFormFields = (formData, setFormData) => {
        switch (activeTab) {
            case "students":
                return (
                    <>
                        <input
                            className="border px-2 py-1 rounded"
                            placeholder="Name"
                            value={formData.name || ""}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            className="border px-2 py-1 rounded"
                            placeholder="Class"
                            value={formData.class || ""}
                            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                        />
                        <input
                            className="border px-2 py-1 rounded"
                            placeholder="Roll"
                            value={formData.roll || ""}
                            onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                        />
                    </>
                );
            case "staff":
                return (
                    <>
                        <input
                            className="border px-2 py-1 rounded"
                            placeholder="Name"
                            value={formData.name || ""}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            className="border px-2 py-1 rounded"
                            placeholder="Subject"
                            value={formData.subject || ""}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                    </>
                );
            case "parents":
                return (
                    <>
                        <input
                            className="border px-2 py-1 rounded"
                            placeholder="Name"
                            value={formData.name || ""}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            className="border px-2 py-1 rounded"
                            placeholder="Student Name"
                            value={formData.student || ""}
                            onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                        />
                    </>
                );
            case "admissions":
                return (
                    <>
                        <input
                            className="border px-2 py-1 rounded"
                            placeholder="Applicant"
                            value={formData.applicant || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, applicant: e.target.value })
                            }
                        />
                        <input
                            className="border px-2 py-1 rounded"
                            placeholder="Status"
                            value={formData.status || ""}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    const icons = {
        students: <Users className="h-4 w-4 text-blue-600" />,
        staff: <UserCog className="h-4 w-4 text-green-600" />,
        parents: <UserSquare className="h-4 w-4 text-purple-600" />,
        admissions: <FileText className="h-4 w-4 text-orange-600" />,
    };

    return (
        <div className="flex">
            <Sidebar role={"admin"}/>
            <div className="container space-y-6 p-6">
                <h1 className="text-2xl font-bold">User Management</h1>

                {/* Tabs */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {["students", "staff", "parents", "admissions"].map((tab) => (
                        <div
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setEditingId(null);
                                setEditFormData({});
                            }}
                            className={`cursor-pointer border rounded-lg p-6 shadow hover:shadow-md transition ${activeTab === tab ? "bg-blue-50 border-blue-200" : "bg-white"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium capitalize">{tab}</h3>
                                {icons[tab]}
                            </div>
                            <p className="text-2xl font-bold">{fetchData(tab).length}</p>
                            <p className="text-xs text-gray-500">Manage {tab}</p>
                        </div>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold capitalize">{activeTab} List</h2>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded px-3 py-1"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Add Button */}
                <button
                    onClick={() => {
                        setModalMode("add");
                        setFormData({});
                        setShowModal(true);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <Plus size={16} /> Add {activeTab.slice(0, -1)}
                </button>

                {/* TABLE */}
                <div className="border rounded-lg p-6 shadow overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>

                                <th className="border px-4 py-2 text-left cursor-pointer select-none">Student ID </th>
                                <th className="border px-4 py-2 text-left cursor-pointer select-none">User Name</th>
                                <th className="border px-4 py-2 text-left cursor-pointer select-none">First Name</th>
                                <th className="border px-4 py-2 text-left cursor-pointer select-none">Last Name</th>
                                <th className="border px-4 py-2 text-left cursor-pointer select-none">Email</th>
                                <th className="border px-4 py-2 text-left cursor-pointer select-none">Grade Level</th>
                                <th className="border px-4 py-2 text-left cursor-pointer select-none">Phone Number</th>
                                <th className="border px-4 py-2 text-left cursor-pointer select-none">Address</th>


                                <th className="border px-4 py-2">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((student) => (
                                <tr key={student.id}>

                                    <td className="border px-4 py-2">{student.student_id}</td>
                                    <td className="border px-4 py-2">{student.user?.username}</td>
                                    <td className="border px-4 py-2">{student.user?.first_name}</td>
                                    <td className="border px-4 py-2">{student.user?.last_name}</td>
                                    <td className="border px-4 py-2">{student.user?.email}</td>
                                    <td className="border px-4 py-2">{student.grade_level}</td>
                                    <td className="border px-4 py-2">{student.user.phone || "N/A"}</td>
                                    <td className="border px-4 py-2">{student.address}</td>
                                    <td className="border px-4 py-2 flex gap-2">
                                        <button onClick={() => handleEdit(student)} className="px-2 py-1 bg-yellow-500 text-white rounded flex items-center gap-1">
                                            <Edit size={14} /> Edit
                                        </button>
                                        <button onClick={() => handleDelete(student.id)} className="px-2 py-1 bg-red-600 text-white rounded flex items-center gap-1">
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh]">

                            {/* Header */}
                            <div className="p-5 border-b flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {modalMode === "add" ? "Add New Student" : "Edit Student Information"}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 hover:text-gray-700 text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="p-6 overflow-y-auto space-y-6 flex-1">

                                {/* Personal Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Personal Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="Full Name *" value={formData.name || ""}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="border rounded-lg px-3 py-2 w-full" required />
                                        <input type="date" placeholder="Date of Birth *" value={formData.dob || ""}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                            className="border rounded-lg px-3 py-2 w-full" required />
                                        <select value={formData.gender || ""}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                            className="border rounded-lg px-3 py-2 w-full" required>
                                            <option value="">Select Gender *</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Academic Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Academic Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="Roll Number / Student ID *" value={formData.roll || ""}
                                            onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                                            className="border rounded-lg px-3 py-2 w-full" required />
                                        <input type="text" placeholder="Class / Grade *" value={formData.class || ""}
                                            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                            className="border rounded-lg px-3 py-2 w-full" required />
                                        <input type="text" placeholder="Section" value={formData.section || ""}
                                            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                            className="border rounded-lg px-3 py-2 w-full" />
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="Contact Number *" value={formData.contact || ""}
                                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                            className="border rounded-lg px-3 py-2 w-full" required />
                                        <input type="email" placeholder="Email ID" value={formData.email || ""}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="border rounded-lg px-3 py-2 w-full" />
                                        <textarea placeholder="Address *" value={formData.address || ""}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="border rounded-lg px-3 py-2 w-full col-span-2 h-20" required />
                                    </div>
                                </div>

                                {/* Guardian Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Parent / Guardian</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="Guardian Name" value={formData.guardian || ""}
                                            onChange={(e) => setFormData({ ...formData, guardian: e.target.value })}
                                            className="border rounded-lg px-3 py-2 w-full" />
                                        <input type="text" placeholder="Guardian Contact" value={formData.guardianContact || ""}
                                            onChange={(e) => setFormData({ ...formData, guardianContact: e.target.value })}
                                            className="border rounded-lg px-3 py-2 w-full" />
                                    </div>
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="p-5 border-t flex justify-end gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                {modalMode === "add" ? (
                                    <button
                                        onClick={handleAdd}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                    >
                                        Add Student
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                    >
                                        Update Student
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
