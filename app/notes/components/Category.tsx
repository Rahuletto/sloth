"use client";
import React, { ReactNode } from "react";
import { StrictModeDroppable } from "@/components/dnd/Droppable";
import { Note } from "@/types/NoteData";
import { NoteCard } from "./NoteCard";
import { FaStar, FaTrashCan } from "react-icons/fa6";

export const Category = ({
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
}) => {
  const isLarge = notes.length >= 4;

  return (
    <div
      className={`transition-all duration-300 animate-fade scrollbar-none bg-category p-2 rounded-3xl h-full ${
        isLarge ? "overflow-y-auto" : ""
      }`}
    >
      <h2
        className={`p-2 mx-2 flex text-accent justify-between items-center font-semibold ${
          isLarge ? "text-md" : "text-md"
        }`}
      >
        {title}
        {title == "Starred" ? <FaStar /> : ""}
        {editMode && title !== "Starred" && title !== "Uncategorized" && (
          <button onClick={onDelete} className="text-accent">
            <FaTrashCan className="text-xl" />
          </button>
        )}
      </h2>

      <StrictModeDroppable droppableId={categoryId}>
        {(provided, snapShot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`scrollbar-none min-h-12 flex flex-row flex-wrap transition-all duration-500 rounded-2xl max-h-[600px] border-2 ${
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
};
