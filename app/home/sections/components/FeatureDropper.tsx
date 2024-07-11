'use client'

import type { Feature } from "@/types/Features";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import FeatureCard from "./FeatureCard";


const StrictModeDroppable = dynamic(
    () => import("@/components/dnd/Droppable").then((mod) => mod.default),
    { ssr: true },
);


export function FeatureDropper({ features }: { features: Feature[] }) {
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1130);
        };

        handleResize()

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="relative transition duration-300 overflow-auto animate-fade scrollbar-none dark:bg-category bg-transparent border-2 border-category p-2 rounded-3xl h-full">
            <h2 className="p-2 mx-2 flex text-accent justify-between items-center font-semibold">
                Features
            </h2>

            <StrictModeDroppable
                droppableId="features"
                direction={isLargeScreen ? "horizontal" : "vertical"}
            >
                {(provided, snapShot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex flex-wrap overflow-x-auto relative scrollbar-none min-h-46 transition duration-500 rounded-2xl border-2 ${snapShot.isDraggingOver
                            ? "bg-hue border-accent"
                            : "border-transparent"
                            }`}
                    >
                        {features.map((f) => (
                            <FeatureCard key={f.i} f={f} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}

            </StrictModeDroppable>
        </div>
    );
}
