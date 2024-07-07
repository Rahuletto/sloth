"use client";
import { Note } from "@/types/NoteData";
import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";

export const NoteCard = ({ note, index }: { note: Note; index: number }) => {
    const router = useRouter()
  return (
    <Draggable draggableId={note.id} index={index}>
      {(provided) => (
        <div
          onClick={() => router.push(`/notes/${note.id}`)}
          className="md:w-fill m-1 md:w-auto cursor-grab bg-box border-2 border-bb rounded-xl md:py-5 md:px-8 py-4 px-5"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h1 className="text-2xl font-semibold line-clamp-2 overflow-hidden text-ellipsis truncate">
            {note.data.title}
          </h1>
          <h3 className="text-xs opacity-30 mb-3">
            Recorded at {formatDate(note.data.createdAt)}
          </h3>
          <p className="text-sm">
            <span className="bg-accent rounded-lg px-2 py-1 text-xs text-bg font-semibold mr-2">
              Transcript
            </span>
            <span className="opacity-50">
              {note.data.transcript?.split(" ")?.slice(0, 32)?.join(" ")}...
            </span>
          </p>
        </div>
      )}
    </Draggable>
  );
};
