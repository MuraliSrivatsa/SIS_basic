import { useState } from "react";
import { toast } from "sonner@2.0.3";

export function SystemSettings() {
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
    setTimeout(() => {
      toast.success("Settings saved successfully!");
      setHasChanges(false);
    }, 1000);
  };

  const resetSettings = () => {
    toast.info("Settings reset to defaults");
    setHasChanges(false);
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "zendesk-settings.json";
    link.click();
    toast.success("Settings exported successfully!");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">System Settings & Configuration</h1>
          <p className="text-gray-500">Configure system-wide settings and preferences</p>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100"
            onClick={exportSettings}
          >
            Export
          </button>
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100"
            onClick={resetSettings}
          >
            Reset
          </button>
          <button
            className={`px-3 py-1 border rounded ${!hasChanges ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
            onClick={saveSettings}
            disabled={!hasChanges}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      {hasChanges && (
        <div className="bg-orange-50 border border-orange-200 p-3 rounded flex items-center text-orange-800">
          ⚠️ You have unsaved changes
        </div>
      )}

      {/* Tabs */}
      <div>
        <div className="flex gap-2 border-b mb-4">
          {["general", "reports", "notifications", "security", "academic", "backup"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${activeTab === tab ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">School/Institution Name</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={config.general.schoolName}
                  onChange={(e) => updateConfig("general", "schoolName", e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Academic Year</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={config.general.academicYear}
                  onChange={(e) => updateConfig("general", "academicYear", e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Timezone</label>
                <select
                  className="w-full border p-2 rounded"
                  value={config.general.timezone}
                  onChange={(e) => updateConfig("general", "timezone", e.target.value)}
                >
                  <option value="America/New_York">Eastern Time (EST)</option>
                  <option value="America/Chicago">Central Time (CST)</option>
                  <option value="America/Denver">Mountain Time (MST)</option>
                  <option value="America/Los_Angeles">Pacific Time (PST)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Language</label>
                <select
                  className="w-full border p-2 rounded"
                  value={config.general.language}
                  onChange={(e) => updateConfig("general", "language", e.target.value)}
                >
                  <option value="en-US">English (US)</option>
                  <option value="en-UK">English (UK)</option>
                  <option value="es-ES">Spanish</option>
                  <option value="fr-FR">French</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Date Format</label>
                <select
                  className="w-full border p-2 rounded"
                  value={config.general.dateFormat}
                  onChange={(e) => updateConfig("general", "dateFormat", e.target.value)}
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Currency</label>
                <select
                  className="w-full border p-2 rounded"
                  value={config.general.currency}
                  onChange={(e) => updateConfig("general", "currency", e.target.value)}
                >
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="CAD">Canadian Dollar (CAD)</option>
                </select>
              </div>
            </div>
          )}

          {/* Other tabs (reports, notifications, security, academic, backup) can be added in the same style */}
        </div>
      </div>
    </div>
  );
}
