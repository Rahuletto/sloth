"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Note } from "@/types/NoteData";
import { FaStar, FaTrashCan } from "react-icons/fa6";
import dynamic from "next/dynamic";

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
  const isLarge = notes.length >= 4;

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
      className={`relative transition duration-300 animate-fade scrollbar-none dark:bg-category bg-transparent border-2 border-category p-2 rounded-3xl h-full ${
        isLarge ? "overflow-y-auto" : ""
      }`}
    >
      <h2
        className={`p-2 mx-2 flex text-accent justify-between items-center font-semibold ${
          isLarge ? "text-md" : "text-md"
        }`}
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

      <StrictModeDroppable droppableId={categoryId} direction={isLargeScreen && title === "Starred" ? "horizontal" : "vertical"}>
        {(provided, snapShot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-wrap relative scrollbar-none min-h-46 transition duration-500 rounded-2xl max-h-[600px] border-2 ${
              snapShot.isDraggingOver
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
