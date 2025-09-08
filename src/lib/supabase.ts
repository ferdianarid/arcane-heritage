import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nxokvrytufkunnijfuck.supabase.co";
const SUPABASE_ANONYMOUS_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54b2t2cnl0dWZrdW5uaWpmdWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MzQ1ODUsImV4cCI6MjA3MjExMDU4NX0.g3DY7_fpXkzJ6CsaX7M74AfVnpo4BqC55ZiAx_rwNxw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANONYMOUS_KEY);

export const uploadFileImageBuilding = async (file: File | string) => {
  try {
    const filename = `${Date.now()}.png`;

    const { error } = await supabase.storage
      .from("arcane")
      .upload(`buildings/${filename}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(`Supabase upload failed: ${error.message}`);
    }

    return filename;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const getUrlFileImageBuilding = (filename: string) => {
  const { data } = supabase.storage
    .from("arcane")
    .getPublicUrl(`buildings/${filename}`);

  return data.publicUrl;
};

// ===== Makanan ====== //
export const uploadFileImageFood = async (file: File | string) => {
  try {
    const filename = `${Date.now()}.png`;

    const { error } = await supabase.storage
      .from("arcane")
      .upload(`foods/${filename}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(`Supabase upload failed: ${error.message}`);
    }

    return filename;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const getUrlFileImageFood = (filename: string) => {
  const { data } = supabase.storage
    .from("arcane")
    .getPublicUrl(`foods/${filename}`);

  return data.publicUrl;
};
