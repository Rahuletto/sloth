import LogoutDialog from "@/components/ui/LogoutDialog";
import { useTheme } from "@/provider/ThemeProvider";
import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { FaRegMoon, FaRegSun } from "react-icons/fa6";
import { GrPowerShutdown } from "react-icons/gr";

export default function AccountPill({
  editMode,
  toggleEditMode,
}: {
  editMode: boolean;
  toggleEditMode: () => void;
}) {
  const { isDark, toggleTheme } = useTheme();
  const [logoutPanel, setLogoutPanel] = useState(false);
  return (
    <div className="flex gap-2 rounded-full bg-box border-2 border-bb p-1 items-center justify-between">
      <LogoutDialog setOpen={setLogoutPanel} open={logoutPanel} />
      <button
        aria-label="Edit library"
        type="button"
        className="hover:bg-alt p-2 rounded-full duration-150"
        onClick={toggleTheme}
      >
        {isDark ? (
          <FaRegMoon className="md:text-2xl text-lg" />
        ) : (
          <FaRegSun className="md:text-2xl text-lg" />
        )}
      </button>
      <button
        aria-label="Edit library"
        type="button"
        className={`hover:bg-alt p-2 rounded-full duration-150 ${
          editMode ? "bg-alt" : ""
        }`}
        onClick={toggleEditMode}
      >
        <BiPencil className="md:text-2xl text-lg" />
      </button>

      <button
        aria-label="Logout"
        type="button"
        title="Logout"
        onClick={() => setLogoutPanel(true)}
        className="bg-accent hover:px-3 text-bg p-2 rounded-full duration-150"
      >
        <GrPowerShutdown className="md:text-2xl text-lg" />
      </button>
    </div>
  );
}
