"use client";

import React, { useState } from "react";
import Sidebar from "./sidebar-setting";
import SettingsContent from "./setting-content";

const SettingPanel = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [state, setState] = useState({
    darkMode: true,
    notifications: {
      email: true,
      push: false,
      sound: true,
    },
    language: "id",
  });

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Komponen Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Komponen Konten Pengaturan */}
      <SettingsContent
        activeSection={activeSection}
        state={state}
        setState={setState}
      />
    </div>
  );
};

export default SettingPanel;
