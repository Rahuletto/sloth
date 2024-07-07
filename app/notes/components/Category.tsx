"use client";
import React, { ReactNode } from "react";
import { StrictModeDroppable } from "@/components/dnd/Droppable";
import { Note } from "@/types/NoteData";
import { NoteCard } from "./NoteCard";
import { FaStar } from "react-icons/fa6";

export const Category = ({
  title,
  notes,
  categoryId,
  generating
}: {
  title: string;
  notes: Note[];
  categoryId: string;
  generating?: ReactNode
}) => (
  <div className="category bg-category rounded-3xl px-5 py-3 pb-5 w-full">
    <h2 className="text-accent mb-2 font-semibold flex justify-between items-center">{title}{title == 'Starred' ? <FaStar /> : ""}</h2>
    <StrictModeDroppable droppableId={categoryId}>
      {(provided, snapShot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className={`min-h-12 flex flex-col transition-all duration-500 rounded-2xl max-h-[600px] border-2 ${snapShot.isDraggingOver ? "bg-hue border-accent" : "border-transparent"}`}>
          {notes.map((note, index) => (
            <NoteCard key={note.id} note={note} index={index} />
          ))}
          {generating && generating}
          {provided.placeholder}
        </div>
      )}
    </StrictModeDroppable>
  </div>
);