import { Dispatch, SetStateAction } from "react";

export default function FocusButton({ focus, setFocus }: { focus: boolean, setFocus: Dispatch<SetStateAction<boolean>> }) {
  return focus ? (
    <button
      onClick={() => setFocus((prev) => !prev)}
      className="opacity-30 fixed top-8 right-8 text-md text-left px-3 py-2 rounded-xl hover:bg-bb font-semibold hidden lg:flex gap-2 items-center justify-start transition-all duration-300 font-mono"
    >
      Exit Focus
    </button>
  ) : null;
}
