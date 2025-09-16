import React, { ReactNode } from "react";

interface SettingsRowProps {
  label: string;
  description: string;
  children: ReactNode;
}

const SettingsRow: React.FC<SettingsRowProps> = ({
  label,
  description,
  children,
}) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
    <div>
      <p className="text-white font-medium">{label}</p>
      {description && <p className="text-gray-400 text-sm">{description}</p>}
    </div>
    {children}
  </div>
);

export default SettingsRow;
