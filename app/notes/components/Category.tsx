/** eslint-disable lines-around-directive */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable react/jsx-curly-brace-presence */

// eslint-disable-next-line lines-around-directive
"use client";

import type { Note } from "@/types/NoteData";
import dynamic from "next/dynamic";
import React, { type ReactNode, useEffect, useState } from "react";
import { FaStar, FaTrashCan } from "react-icons/fa6";

const NoteCard = dynamic(
  () => import("./NoteCard").then((mod) => mod.default),
  { ssr: false },
);

const StrictModeDroppable = dynamic(
  () => import("@/components/dnd/Droppable").then((mod) => mod.default),
  { ssr: true },
);

export default function Category({
  title,
  notes,
  editMode,
  categoryId,
  generating,
  onDelete,
}: {
  title: string;
  notes: Note[];
  editMode: boolean;
  categoryId: string;
  generating?: ReactNode;
  onDelete: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1130);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1130);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="relative transition duration-300 max-w-[90vw] w-fit min-w-[90vw] md:min-w-fit md:max-w-auto animate-fade scrollbar-none dark:bg-category bg-transparent border-2 border-category p-2 rounded-3xl h-full"
    >
      <h2
        // eslint-disable-next-line react/jsx-curly-brace-presence
        className="p-2 mx-2 flex text-accent justify-between items-center font-semibold"
      >
        {title}
        {title === "Starred" ? <FaStar /> : ""}
        {editMode && title !== "Starred" && title !== "Uncategorized" && (
          <button
            onClick={onDelete}
            className="text-accent"
            aria-label="Delete"
            type="button"
          >
            <FaTrashCan className="text-xl" />
          </button>
        )}
      </h2>

      <StrictModeDroppable
        droppableId={categoryId}
        direction=
        "vertical"

      >
        {(provided, snapShot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-1 md:gap-0 relative scrollbar-none min-h-46 h-full md:min-w-[500px] max-w-full md:max-w-fit overflow-x-auto transition duration-500 rounded-2xl max-h-[600px] border-2 ${snapShot.isDraggingOver
              ? "bg-hue border-accent"
              : "border-transparent"
              }`}
          >
            {notes.map((note, index) => (
              <NoteCard
                isDragging={snapShot.draggingFromThisWith === note.id}
                key={note.id}
                isDragDisabled={!editMode}
                note={note}
                index={index}
              />
            ))}
            {generating && generating}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
}
