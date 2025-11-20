import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Settings,
    Save,
    RefreshCw,
    Download,
    AlertTriangle,
    CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import AdminSidebar from "./Admin_Sidebar";
import Sidebar from "../../components/sidebars/Sidebar";

/**
 * SystemSettings.jsx
 * - Pure Tailwind components (no shadcn/ui)
 * - All original options preserved
 * - Tabs: General, Reports, Notifications, Security, Academic, Backup
 * - Actions: Save, Reset, Export (JSON), Backup Now/Download
 * - Uses Sonner for toasts (ensure <Toaster /> is rendered at app root)
 */

export default function SystemSettings() {
    const [activeTab, setActiveTab] = useState("general");
    const [hasChanges, setHasChanges] = useState(false);

    const [config, setConfig] = useState({
        general: {
            schoolName: "ZENDESK University",
            academicYear: "2024-2025",
            timezone: "America/New_York",
            language: "en-US",
            dateFormat: "MM/DD/YYYY",
            currency: "USD",
        },
        reports: {
            autoGeneration: true,
            generationFrequency: "monthly",
            emailNotification: true,
            defaultTemplate: "standard-term",
            includeGraphs: true,
            includePreviousTerms: true,
            reportRetentionDays: 365,
        },
        notifications: {
            emailEnabled: true,
            smsEnabled: false,
            pushEnabled: true,
            parentNotifications: true,
            teacherNotifications: true,
            adminNotifications: true,
            reminderDays: 3,
        },
        security: {
            passwordComplexity: "medium",
            sessionTimeout: 30,
            twoFactorAuth: false,
            ipWhitelist: false,
            auditLogging: true,
            dataEncryption: true,
        },
        academic: {
            gradingScale: "letter",
            attendanceThreshold: 80,
            termDuration: 90,
            examWeightage: 60,
            assignmentWeightage: 30,
            participationWeightage: 10,
        },
        backup: {
            autoBackup: true,
            backupFrequency: "daily",
            backupRetention: 30,
            cloudBackup: true,
            lastBackup: "2024-10-20T02:00:00Z",
        },
    });

    const updateConfig = (section, field, value) => {
        setConfig((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
        setHasChanges(true);
    };

    const saveSettings = () => {
        // Simulate API call
        setTimeout(() => {
            toast.success("Settings saved successfully!");
            setHasChanges(false);
        }, 700);
    };

    const resetSettings = () => {
        // In a real app, re-fetch defaults or keep a snapshot to restore
        toast.info("Settings reset to defaults");
        setHasChanges(false);
    };

    const exportSettings = () => {
        try {
            const dataStr = JSON.stringify(config, null, 2);
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "zendesk-settings.json";
            a.click();
            URL.revokeObjectURL(url);
            toast.success("Settings exported successfully!");
        } catch (e) {
            toast.error("Failed to export settings");
        }
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return dateString;
        }
    };

    // UI Helpers — plain Tailwind replacements
    const TabButton = ({ value, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(value)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
        ${activeTab === value
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
        >
            {Icon ? <Icon className="h-4 w-4" /> : null}
            {label}
        </button>
    );

    const SectionCard = ({ title, description, children, className = "" }) => (
        <div className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}>
            <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
                {description ? (
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                ) : null}
            </div>
            <div className="px-4 sm:px-6 py-5">{children}</div>
        </div>
    );

    const Field = ({ label, children, hint, htmlFor }) => (
        <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1" htmlFor={htmlFor}>
                {label}
            </span>
            {children}
            {hint ? <p className="text-xs text-gray-500 mt-1">{hint}</p> : null}
        </label>
    );

    const TextInput = ({ value, onChange, type = "text", placeholder, id, min, max }) => (
        <input
            id={id}
            type={type}
            value={value}
            min={min}
            max={max}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
    );

    const SelectBox = ({ value, onChange, id, options = [] }) => (
        <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );

    const ToggleSwitch = ({ checked, onChange, id }) => (
        <button
            id={id}
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition
        ${checked ? "bg-indigo-600" : "bg-gray-300"}`}
            aria-pressed={checked}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition
        ${checked ? "translate-x-5" : "translate-x-1"}`}
            />
        </button>
    );

    const Badge = ({ children, variant = "solid", className = "" }) => {
        const base = "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md";
        const styles =
            variant === "outline"
                ? "border border-gray-300 text-gray-700 bg-white"
                : "bg-gray-100 text-gray-800";
        return <span className={`${base} ${styles} ${className}`}>{children}</span>;
    };

    // Tab Content
    const GeneralTab = () => (
        <SectionCard
            title="General Configuration"
            description="Basic system settings and preferences"
        >
            <div className="grid gap-4 md:grid-cols-2">
                <Field label="School/Institution Name" htmlFor="schoolName">
                    <TextInput
                        id="schoolName"
                        value={config.general.schoolName}
                        onChange={(e) => updateConfig("general", "schoolName", e.target.value)}
                    />
                </Field>

                <Field label="Academic Year" htmlFor="academicYear">
                    <TextInput
                        id="academicYear"
                        value={config.general.academicYear}
                        onChange={(e) => updateConfig("general", "academicYear", e.target.value)}
                    />
                </Field>

                <Field label="Timezone" htmlFor="timezone">
                    <SelectBox
                        id="timezone"
                        value={config.general.timezone}
                        onChange={(value) => updateConfig("general", "timezone", value)}
                        options={[
                            { value: "America/New_York", label: "Eastern Time (EST)" },
                            { value: "America/Chicago", label: "Central Time (CST)" },
                            { value: "America/Denver", label: "Mountain Time (MST)" },
                            { value: "America/Los_Angeles", label: "Pacific Time (PST)" },
                            { value: "UTC", label: "UTC" },
                        ]}
                    />
                </Field>

                <Field label="Language" htmlFor="language">
                    <SelectBox
                        id="language"
                        value={config.general.language}
                        onChange={(value) => updateConfig("general", "language", value)}
                        options={[
                            { value: "en-US", label: "English (US)" },
                            { value: "en-UK", label: "English (UK)" },
                            { value: "es-ES", label: "Spanish" },
                            { value: "fr-FR", label: "French" },
                        ]}
                    />
                </Field>

                <Field label="Date Format" htmlFor="dateFormat">
                    <SelectBox
                        id="dateFormat"
                        value={config.general.dateFormat}
                        onChange={(value) => updateConfig("general", "dateFormat", value)}
                        options={[
                            { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                            { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                            { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                        ]}
                    />
                </Field>

                <Field label="Currency" htmlFor="currency">
                    <SelectBox
                        id="currency"
                        value={config.general.currency}
                        onChange={(value) => updateConfig("general", "currency", value)}
                        options={[
                            { value: "USD", label: "US Dollar (USD)" },
                            { value: "EUR", label: "Euro (EUR)" },
                            { value: "GBP", label: "British Pound (GBP)" },
                            { value: "CAD", label: "Canadian Dollar (CAD)" },
                        ]}
                    />
                </Field>
            </div>
        </SectionCard>
    );

    const ReportsTab = () => (
        <SectionCard
            title="Report Generation Settings"
            description="Configure automated report generation and distribution"
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-gray-900">Automatic Report Generation</h4>
                        <p className="text-sm text-gray-500">
                            Enable automated report card generation
                        </p>
                    </div>
                    <ToggleSwitch
                        checked={config.reports.autoGeneration}
                        onChange={(checked) => updateConfig("reports", "autoGeneration", checked)}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Generation Frequency" htmlFor="generationFrequency">
                        <SelectBox
                            id="generationFrequency"
                            value={config.reports.generationFrequency}
                            onChange={(value) => updateConfig("reports", "generationFrequency", value)}
                            options={[
                                { value: "weekly", label: "Weekly" },
                                { value: "monthly", label: "Monthly" },
                                { value: "quarterly", label: "Quarterly" },
                                { value: "term-end", label: "End of Term" },
                            ]}
                        />
                    </Field>

                    <Field label="Default Template" htmlFor="defaultTemplate">
                        <SelectBox
                            id="defaultTemplate"
                            value={config.reports.defaultTemplate}
                            onChange={(value) => updateConfig("reports", "defaultTemplate", value)}
                            options={[
                                { value: "standard-term", label: "Standard Term Report" },
                                { value: "progress-report", label: "Progress Report" },
                                { value: "annual-summary", label: "Annual Summary" },
                            ]}
                        />
                    </Field>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Email Notifications</h4>
                            <p className="text-sm text-gray-500">
                                Send email when reports are generated
                            </p>
                        </div>
                        <ToggleSwitch
                            checked={config.reports.emailNotification}
                            onChange={(checked) => updateConfig("reports", "emailNotification", checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Include Performance Graphs</h4>
                            <p className="text-sm text-gray-500">Add visual charts to reports</p>
                        </div>
                        <ToggleSwitch
                            checked={config.reports.includeGraphs}
                            onChange={(checked) => updateConfig("reports", "includeGraphs", checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Include Previous Terms</h4>
                            <p className="text-sm text-gray-500">Show historical performance data</p>
                        </div>
                        <ToggleSwitch
                            checked={config.reports.includePreviousTerms}
                            onChange={(checked) =>
                                updateConfig("reports", "includePreviousTerms", checked)
                            }
                        />
                    </div>
                </div>

                <Field label="Report Retention (Days)" htmlFor="reportRetentionDays" hint="Number of days to keep generated reports">
                    <TextInput
                        id="reportRetentionDays"
                        type="number"
                        value={config.reports.reportRetentionDays}
                        onChange={(e) =>
                            updateConfig("reports", "reportRetentionDays", Number(e.target.value || 0))
                        }
                    />
                </Field>
            </div>
        </SectionCard>
    );

    const NotificationsTab = () => (
        <SectionCard
            title="Notification Settings"
            description="Configure system-wide notification preferences"
        >
            <div className="space-y-8">
                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Notification Channels</h4>
                    {[
                        {
                            key: "emailEnabled",
                            label: "Email Notifications",
                            description: "Send notifications via email",
                        },
                        {
                            key: "smsEnabled",
                            label: "SMS Notifications",
                            description: "Send notifications via SMS",
                        },
                        {
                            key: "pushEnabled",
                            label: "Push Notifications",
                            description: "Send browser/app push notifications",
                        },
                    ].map(({ key, label, description }) => (
                        <div key={key} className="flex items-center justify-between">
                            <div>
                                <h5 className="font-medium text-gray-900">{label}</h5>
                                <p className="text-sm text-gray-500">{description}</p>
                            </div>
                            <ToggleSwitch
                                checked={config.notifications[key]}
                                onChange={(checked) => updateConfig("notifications", key, checked)}
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">User Group Notifications</h4>
                    {[
                        {
                            key: "parentNotifications",
                            label: "Parent Notifications",
                            description: "Send notifications to parents",
                        },
                        {
                            key: "teacherNotifications",
                            label: "Teacher Notifications",
                            description: "Send notifications to teachers",
                        },
                        {
                            key: "adminNotifications",
                            label: "Admin Notifications",
                            description: "Send notifications to administrators",
                        },
                    ].map(({ key, label, description }) => (
                        <div key={key} className="flex items-center justify-between">
                            <div>
                                <h5 className="font-medium text-gray-900">{label}</h5>
                                <p className="text-sm text-gray-500">{description}</p>
                            </div>
                            <ToggleSwitch
                                checked={config.notifications[key]}
                                onChange={(checked) => updateConfig("notifications", key, checked)}
                            />
                        </div>
                    ))}
                </div>

                <Field
                    label="Reminder Days Before Events"
                    htmlFor="reminderDays"
                    hint="Days before exams/events to send reminders"
                >
                    <TextInput
                        id="reminderDays"
                        type="number"
                        value={config.notifications.reminderDays}
                        onChange={(e) =>
                            updateConfig("notifications", "reminderDays", Number(e.target.value || 0))
                        }
                    />
                </Field>
            </div>
        </SectionCard>
    );

    const SecurityTab = () => (
        <SectionCard
            title="Security Configuration"
            description="Manage system security and access controls"
        >
            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Password Complexity" htmlFor="passwordComplexity">
                        <SelectBox
                            id="passwordComplexity"
                            value={config.security.passwordComplexity}
                            onChange={(value) => updateConfig("security", "passwordComplexity", value)}
                            options={[
                                { value: "low", label: "Low (6+ characters)" },
                                { value: "medium", label: "Medium (8+ characters, mixed case)" },
                                { value: "high", label: "High (12+ characters, symbols)" },
                            ]}
                        />
                    </Field>

                    <Field label="Session Timeout (minutes)" htmlFor="sessionTimeout">
                        <TextInput
                            id="sessionTimeout"
                            type="number"
                            value={config.security.sessionTimeout}
                            onChange={(e) =>
                                updateConfig("security", "sessionTimeout", Number(e.target.value || 0))
                            }
                        />
                    </Field>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            key: "twoFactorAuth",
                            label: "Two-Factor Authentication",
                            description: "Require 2FA for all users",
                        },
                        {
                            key: "ipWhitelist",
                            label: "IP Whitelisting",
                            description: "Restrict access to approved IP addresses",
                        },
                        {
                            key: "auditLogging",
                            label: "Audit Logging",
                            description: "Log all user actions for security",
                        },
                        {
                            key: "dataEncryption",
                            label: "Data Encryption",
                            description: "Encrypt sensitive data at rest",
                        },
                    ].map(({ key, label, description }) => (
                        <div key={key} className="flex items-center justify-between">
                            <div>
                                <h5 className="font-medium text-gray-900">{label}</h5>
                                <p className="text-sm text-gray-500">{description}</p>
                            </div>
                            <ToggleSwitch
                                checked={config.security[key]}
                                onChange={(checked) => updateConfig("security", key, checked)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </SectionCard>
    );

    const AcademicTab = () => {
        const total =
            (Number(config.academic.examWeightage) || 0) +
            (Number(config.academic.assignmentWeightage) || 0) +
            (Number(config.academic.participationWeightage) || 0);

        return (
            <SectionCard
                title="Academic Configuration"
                description="Set academic year structure and grading policies"
            >
                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Grading Scale" htmlFor="gradingScale">
                            <SelectBox
                                id="gradingScale"
                                value={config.academic.gradingScale}
                                onChange={(value) => updateConfig("academic", "gradingScale", value)}
                                options={[
                                    { value: "letter", label: "Letter Grades (A-F)" },
                                    { value: "percentage", label: "Percentage (0-100%)" },
                                    { value: "gpa", label: "GPA Scale (0.0-4.0)" },
                                    { value: "points", label: "Points (0-100)" },
                                ]}
                            />
                        </Field>

                        <Field label="Minimum Attendance (%)" htmlFor="attendanceThreshold">
                            <TextInput
                                id="attendanceThreshold"
                                type="number"
                                min={0}
                                max={100}
                                value={config.academic.attendanceThreshold}
                                onChange={(e) =>
                                    updateConfig(
                                        "academic",
                                        "attendanceThreshold",
                                        Number(e.target.value || 0)
                                    )
                                }
                            />
                        </Field>

                        <Field label="Term Duration (days)" htmlFor="termDuration">
                            <TextInput
                                id="termDuration"
                                type="number"
                                value={config.academic.termDuration}
                                onChange={(e) =>
                                    updateConfig("academic", "termDuration", Number(e.target.value || 0))
                                }
                            />
                        </Field>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Grade Weightage Distribution</h4>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Field label="Exams (%)" htmlFor="examWeightage">
                                <TextInput
                                    id="examWeightage"
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={config.academic.examWeightage}
                                    onChange={(e) =>
                                        updateConfig(
                                            "academic",
                                            "examWeightage",
                                            Number(e.target.value || 0)
                                        )
                                    }
                                />
                            </Field>
                            <Field label="Assignments (%)" htmlFor="assignmentWeightage">
                                <TextInput
                                    id="assignmentWeightage"
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={config.academic.assignmentWeightage}
                                    onChange={(e) =>
                                        updateConfig(
                                            "academic",
                                            "assignmentWeightage",
                                            Number(e.target.value || 0)
                                        )
                                    }
                                />
                            </Field>
                            <Field label="Participation (%)" htmlFor="participationWeightage">
                                <TextInput
                                    id="participationWeightage"
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={config.academic.participationWeightage}
                                    onChange={(e) =>
                                        updateConfig(
                                            "academic",
                                            "participationWeightage",
                                            Number(e.target.value || 0)
                                        )
                                    }
                                />
                            </Field>
                        </div>

                        <div className="text-sm">
                            <span className="text-gray-700">Total: </span>
                            <span className="font-medium">{total}%</span>
                            {total !== 100 && (
                                <span className="text-red-600 ml-2">⚠️ Should total 100%</span>
                            )}
                        </div>
                    </div>
                </div>
            </SectionCard>
        );
    };

    const BackupTab = () => (
        <SectionCard
            title="Backup & Recovery"
            description="Configure data backup and recovery settings"
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-gray-900">Automatic Backup</h4>
                        <p className="text-sm text-gray-500">
                            Enable scheduled automatic backups
                        </p>
                    </div>
                    <ToggleSwitch
                        checked={config.backup.autoBackup}
                        onChange={(checked) => updateConfig("backup", "autoBackup", checked)}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Backup Frequency" htmlFor="backupFrequency">
                        <SelectBox
                            id="backupFrequency"
                            value={config.backup.backupFrequency}
                            onChange={(value) => updateConfig("backup", "backupFrequency", value)}
                            options={[
                                { value: "hourly", label: "Every Hour" },
                                { value: "daily", label: "Daily" },
                                { value: "weekly", label: "Weekly" },
                                { value: "monthly", label: "Monthly" },
                            ]}
                        />
                    </Field>

                    <Field label="Backup Retention (days)" htmlFor="backupRetention">
                        <TextInput
                            id="backupRetention"
                            type="number"
                            value={config.backup.backupRetention}
                            onChange={(e) =>
                                updateConfig("backup", "backupRetention", Number(e.target.value || 0))
                            }
                        />
                    </Field>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-gray-900">Cloud Backup</h4>
                        <p className="text-sm text-gray-500">Store backups in cloud storage</p>
                    </div>
                    <ToggleSwitch
                        checked={config.backup.cloudBackup}
                        onChange={(checked) => updateConfig("backup", "cloudBackup", checked)}
                    />
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">Last Backup</h5>
                        <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Successful
                        </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{formatDate(config.backup.lastBackup)}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        <button
                            onClick={() => toast.success("Backup file download started")}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                        >
                            <Download className="h-4 w-4" />
                            Download
                        </button>
                        <button
                            onClick={() => toast.message("Backup started", { description: "Running in background" })}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Backup Now
                        </button>
                    </div>
                </div>
            </div>
        </SectionCard>
    );

    return (
        <div className="flex">
            <Sidebar role={"admin"}/>
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="container space-y-6"
            >
                {/* Header */}
                <div className="flex items-center justify-between mt-6 ">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 }}
                            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-900"
                        >
                            <Settings className="h-6 w-6 text-indigo-600" />
                            System Settings & Configuration
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-500"
                        >
                            Configure system-wide settings and preferences
                        </motion.p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={exportSettings}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                        >
                            <Download className="h-4 w-4" />
                            Export
                        </button>
                        <button
                            onClick={resetSettings}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Reset
                        </button>
                        <button
                            onClick={saveSettings}
                            disabled={!hasChanges}
                            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition
              ${hasChanges ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-300 cursor-not-allowed"}`}
                        >
                            <Save className="h-4 w-4" />
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Change indicator */}
                {hasChanges && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg border border-orange-200 bg-orange-50 p-3"
                    >
                        <div className="flex items-center gap-2 text-orange-800">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm font-medium">You have unsaved changes</span>
                        </div>
                    </motion.div>
                )}

                {/* Tabs */}
                <div className="flex flex-wrap gap-2">
                    <TabButton value="general" label="General" />
                    <TabButton value="reports" label="Reports" />
                    <TabButton value="notifications" label="Notifications" />
                    <TabButton value="security" label="Security" />
                    <TabButton value="academic" label="Academic" />
                    <TabButton value="backup" label="Backup" />
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {activeTab === "general" && <GeneralTab />}
                    {activeTab === "reports" && <ReportsTab />}
                    {activeTab === "notifications" && <NotificationsTab />}
                    {activeTab === "security" && <SecurityTab />}
                    {activeTab === "academic" && <AcademicTab />}
                    {activeTab === "backup" && <BackupTab />}
                </div>
            </motion.div>
        </div>
    );
}
