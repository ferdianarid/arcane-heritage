"use client";

import React, { useState } from "react";
import Sidebar from "./settings/sidebar-setting";
import SettingsContent from "./settings/setting-content";

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
    <div className="min-h-screen mt-6 flex gap-5">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <SettingsContent
        activeSection={activeSection}
        state={state}
        setState={setState}
      />
    </div>
  );
};

export default SettingPanel;
