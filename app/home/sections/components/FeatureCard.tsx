import React from "react";
import { Feature } from "@/types/Features";
import { Draggable } from "react-beautiful-dnd";

export default function FeatureCard({ f }: { f: Feature }) {
    return (
      <Draggable draggableId={f.i.toString()} index={f.i}>
        {(drag) => (
          <div
            ref={drag.innerRef}
            {...drag.draggableProps}
            {...drag.dragHandleProps}
            className="w-full min-w-[99%] lg:min-w-[250px] cursor-grab select-none relative md:w-auto lg:max-w-[20.2vw] max-h-[165px] m-1 bg-box border-2 border-bb rounded-xl md:py-5 md:px-8 py-4 px-5"
          >
            <h1 className="flex gap-3 items-center select-none md:text-2xl text-xl font-semibold line-clamp-2 overflow-hidden text-ellipsis truncate">
              {f.icon} {f.title}
            </h1>
            <p className="mt-3 text-sm select-none">
              <span className="opacity-70">{f.description}</span>
            </p>
          </div>
        )}
      </Draggable>
    );
  }