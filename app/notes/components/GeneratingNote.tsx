import React from "react";
import Gemini from "@/components/ui/Gemini";
import { generateId } from "@/utils/generateId";
import { Draggable } from "react-beautiful-dnd";

export default function GeneratingNote({ genStatus }: { genStatus: string }) {
  return (
    <Draggable draggableId={generateId("sloth.")} isDragDisabled index={0}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="md:min-w-[250px] w-full cursor-grab select-none relative md:w-auto max-w-[480px] max-h-[165px] md:m-1 bg-box border-2 border-bb rounded-xl md:py-5 md:px-8 py-4 px-5"
        >
          <div className="flex items-center justify-center gap-4 w-full h-full ">
            <Gemini className="text-3xl " />
            <h1 className="text-xl font-semibold">{genStatus}</h1>
          </div>
        </div>
      )}
    </Draggable>
  );
}
