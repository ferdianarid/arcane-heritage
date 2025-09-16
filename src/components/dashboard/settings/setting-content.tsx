/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input } from "@/components/ui/input";
import SettingsSection from "./setting-section";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SettingsRow from "./setting-row";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight } from "lucide-react";
import { SettingsState } from "@/types";

const SettingContent: React.FC<{
  activeSection: string;
  state: SettingsState;
  setState: React.Dispatch<React.SetStateAction<SettingsState>>;
}> = ({ activeSection, state, setState }) => {
  const { darkMode, notifications, language } = state;

  const handleNotificationsChange = (type: string, checked: boolean) => {
    setState((prev: any) => ({
      ...prev,
      notifications: { ...prev.notifications, [type]: checked },
    }));
  };

  const handleDarkModeChange = (checked: boolean) => {
    setState((prev: any) => ({ ...prev, darkMode: checked }));
  };

  const handleLanguageChange = (value: string) => {
    setState((prev: any) => ({ ...prev, language: value }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <>
            <SettingsSection title="Informasi Personal">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nama Lengkap
                  </label>
                  <Input
                    type="text"
                    defaultValue="Ferdian Ahmad R"
                    className="bg-[#363636] border-none text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    defaultValue="ferdianand@example.com"
                    className="bg-[#363636] border-none text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nomor Telepon
                  </label>
                  <Input
                    type="tel"
                    defaultValue="+62 812-3456-7890"
                    className="bg-[#363636] border-none text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio
                  </label>
                  <Textarea
                    rows={4}
                    defaultValue="Administrator platform Arcane Heritage, berdedikasi untuk melestarikan warisan budaya Indonesia."
                    className="bg-[#363636] border-none text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>
              </div>
            </SettingsSection>
            <SettingsSection title="Foto Profil">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xl">FA</span>
                </div>
                <div>
                  <Button className="bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Ubah Foto
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white ml-2 transition-colors"
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </SettingsSection>
          </>
        );
      case "notifications":
        return (
          <>
            <SettingsSection title="Preferensi Notifikasi">
              <div className="space-y-1">
                <SettingsRow
                  label="Notifikasi Email"
                  description="Terima pembaruan dan pemberitahuan melalui email"
                >
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      handleNotificationsChange("email", checked)
                    }
                  />
                </SettingsRow>
                <SettingsRow
                  label="Notifikasi Push"
                  description="Terima pemberitahuan langsung di browser"
                >
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) =>
                      handleNotificationsChange("push", checked)
                    }
                  />
                </SettingsRow>
                <SettingsRow
                  label="Suara Notifikasi"
                  description="Putar suara saat menerima notifikasi"
                >
                  <Switch
                    checked={notifications.sound}
                    onCheckedChange={(checked) =>
                      handleNotificationsChange("sound", checked)
                    }
                  />
                </SettingsRow>
              </div>
            </SettingsSection>
            <SettingsSection title="Jenis Notifikasi">
              <div className="space-y-1">
                <SettingsRow
                  label="Makanan Baru"
                  description="Diberitahu ketika ada makanan tradisional baru ditambahkan"
                >
                  <Switch checked={true} onCheckedChange={() => {}} />
                </SettingsRow>
                <SettingsRow
                  label="Komentar & Review"
                  description="Notifikasi untuk komentar dan review baru"
                >
                  <Switch checked={true} onCheckedChange={() => {}} />
                </SettingsRow>
                <SettingsRow
                  label="Update Sistem"
                  description="Pemberitahuan untuk pembaruan aplikasi"
                >
                  <Switch checked={false} onCheckedChange={() => {}} />
                </SettingsRow>
              </div>
            </SettingsSection>
          </>
        );
      case "appearance":
        return (
          <>
            <SettingsSection title="Tema">
              <div className="space-y-1">
                <SettingsRow
                  label="Mode Gelap"
                  description="Gunakan tema gelap untuk pengalaman yang lebih nyaman di mata"
                >
                  <Switch
                    checked={darkMode}
                    onCheckedChange={handleDarkModeChange}
                  />
                </SettingsRow>
              </div>
            </SettingsSection>
            <SettingsSection title="Tampilan">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ukuran Font
                  </label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-full bg-[#363636] border-none text-white">
                      <SelectValue placeholder="Pilih ukuran font" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#363636] border-none text-white">
                      <SelectItem value="small">Kecil</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="large">Besar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tampilan Grid
                  </label>
                  <Select defaultValue="2">
                    <SelectTrigger className="w-full bg-[#363636] border-none text-white">
                      <SelectValue placeholder="Pilih tampilan grid" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#363636] border-none text-white">
                      <SelectItem value="2">2 kolom</SelectItem>
                      <SelectItem value="3">3 kolom</SelectItem>
                      <SelectItem value="4">4 kolom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SettingsSection>
          </>
        );
      case "privacy":
        return (
          <>
            <SettingsSection title="Keamanan Akun">
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  className="w-full bg-[#363636] text-white rounded-lg hover:bg-gray-600 transition-colors text-left"
                >
                  Ubah Password
                </Button>
                <Button
                  variant="ghost"
                  className="w-full bg-[#363636] text-white rounded-lg hover:bg-gray-600 transition-colors text-left"
                >
                  Autentikasi Dua Faktor
                </Button>
                <Button
                  variant="ghost"
                  className="w-full bg-[#363636] text-white rounded-lg hover:bg-gray-600 transition-colors text-left"
                >
                  Sesi Aktif
                </Button>
              </div>
            </SettingsSection>
            <SettingsSection title="Privasi Data">
              <div className="space-y-1">
                <SettingsRow
                  label="Profil Publik"
                  description="Izinkan orang lain melihat profil Anda"
                >
                  <Switch checked={true} onCheckedChange={() => {}} />
                </SettingsRow>
                <SettingsRow
                  label="Analitik"
                  description="Bantu kami meningkatkan layanan dengan berbagi data analitik"
                >
                  <Switch checked={false} onCheckedChange={() => {}} />
                </SettingsRow>
              </div>
            </SettingsSection>
          </>
        );
      case "language":
        return (
          <>
            <SettingsSection title="Bahasa Interface">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bahasa Utama
                  </label>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full bg-[#363636] border-none text-white">
                      <SelectValue placeholder="Pilih bahasa" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#363636] border-none text-white">
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="jv">Bahasa Jawa</SelectItem>
                      <SelectItem value="su">Bahasa Sunda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Format Tanggal
                  </label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger className="w-full bg-[#363636] border-none text-white">
                      <SelectValue placeholder="Pilih format tanggal" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#363636] border-none text-white">
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Zona Waktu
                  </label>
                  <Select defaultValue="wib">
                    <SelectTrigger className="w-full bg-[#363636] border-none text-white">
                      <SelectValue placeholder="Pilih zona waktu" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#363636] border-none text-white">
                      <SelectItem value="wib">WIB (GMT+7)</SelectItem>
                      <SelectItem value="wita">WITA (GMT+8)</SelectItem>
                      <SelectItem value="wit">WIT (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SettingsSection>
          </>
        );
      case "help":
        return (
          <>
            <SettingsSection title="Bantuan & Dukungan">
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  className="w-full bg-[#363636] text-white rounded-lg hover:bg-gray-600 transition-colors text-left flex items-center justify-between"
                >
                  Pusat Bantuan
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full bg-[#363636] text-white rounded-lg hover:bg-gray-600 transition-colors text-left flex items-center justify-between"
                >
                  FAQ
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full bg-[#363636] text-white rounded-lg hover:bg-gray-600 transition-colors text-left flex items-center justify-between"
                >
                  Hubungi Dukungan
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full bg-[#363636] text-white rounded-lg hover:bg-gray-600 transition-colors text-left flex items-center justify-between"
                >
                  Laporkan Bug
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </SettingsSection>
            <SettingsSection title="Tentang Aplikasi">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Versi Aplikasi</span>
                  <span className="text-white">v2.1.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Build</span>
                  <span className="text-white">#1234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Terakhir Diperbarui</span>
                  <span className="text-white">15 Jan 2025</span>
                </div>
              </div>
            </SettingsSection>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1">
      <div className="max-w-4xl mx-auto">
        {renderContent()}
        <div className="flex justify-end space-x-4 pt-6 border-t border-[#000]">
          <Button
            variant="ghost"
            className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Batal
          </Button>
          <Button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingContent;
