import { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  children,
  title,
}) => (
  <div className="bg-sidebar rounded-lg p-6 mb-6">
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    {children}
  </div>
);

export default SettingsSection;
