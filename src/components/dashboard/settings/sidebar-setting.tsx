import {
  User,
  Bell,
  Palette,
  Shield,
  Globe,
  HelpCircle,
  LogOut,
  LucideIcon,
} from "lucide-react";

interface SettingsSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

const settingsSections: SettingsSection[] = [
  { id: "profile", label: "Profil Pengguna", icon: User },
  { id: "notifications", label: "Notifikasi", icon: Bell },
  { id: "appearance", label: "Tampilan", icon: Palette },
  { id: "privacy", label: "Privasi & Keamanan", icon: Shield },
  { id: "language", label: "Bahasa & Regional", icon: Globe },
  { id: "help", label: "Bantuan & Dukungan", icon: HelpCircle },
];

interface SidebarProps {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  return (
    <div className="w-80">
      <nav className="space-y-2">
        {settingsSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeSection === section.id
                ? "bg-green-600 text-white"
                : "text-gray-300 hover:bg-gray-900 hover:text-white"
            }`}
          >
            <section.icon className="w-5 h-5" />
            <span>{section.label}</span>
          </button>
        ))}

        <div className="pt-4 border-t border-gray-700 mt-4">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-400 hover:bg-red-600/10 hover:text-red-300 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
