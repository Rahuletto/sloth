import React from "react";
import Gemini from "@/components/ui/Gemini";
import { generateId } from "@/utils/generateId";
import { Draggable } from "react-beautiful-dnd";


export function GeneratingNote({ genStatus }: { genStatus: string }) {
  return <Draggable draggableId={generateId("sloth.")} isDragDisabled index={0}>
      {(provided) => (
<div
ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className="w-[89vw] md:w-auto cursor-grab bg-box border-2 border-bb rounded-2xl md:py-5 md:px-8 py-4 px-5"
  >
    <div className="flex items-center gap-4">
    <Gemini className="text-3xl "/>
      <h1 className="text-xl font-semibold">{genStatus}</h1>
    </div>
  </div>
      )}
      </Draggable>
}
