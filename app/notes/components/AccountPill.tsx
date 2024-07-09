import { useTheme } from "@/provider/ThemeProvider";
import { Link } from "next-view-transitions";
import React from "react";
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
  return (
    <div className="flex gap-2 rounded-full bg-box border-2 border-bb p-1 items-center justify-between">
      <button
        aria-label="Edit library"
        type="button"
        className={`hover:bg-alt p-2 rounded-full duration-150 ${
          editMode ? "bg-alt" : ""
        }`}
        onClick={toggleTheme}
      >
        {isDark ? (
          <FaRegMoon className="text-2xl" />
        ) : (
          <FaRegSun className="text-2xl" />
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
        <BiPencil className="text-2xl" />
      </button>

      <Link
        href="/auth/logout"
        className="bg-accent hover:px-3 text-bg p-2 rounded-full duration-150"
      >
        <GrPowerShutdown className="text-2xl" />
      </Link>
    </div>
  );
}
