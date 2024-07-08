import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { generateId } from "@/utils/generateId";
import Markdown from "react-markdown";
import Code from "../../components/Code";

export default function QuizCard({
  question,
  options,
  answer,
  num,
  container,
  grade,
  setGrade,
}: {
  question: string;
  grade: (null | "correct" | "wrong")[];
  options: string[];
  answer: string;
  num: number;
  container: RefObject<HTMLDivElement>;
  setGrade: Dispatch<SetStateAction<("correct" | "wrong" | null)[]>>;
}) {
  const card = useRef<HTMLDivElement>(null);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (!card.current) return;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
        card.current.style.opacity = "1";
        card.current.style.transform = "scale(1)";
      } else if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
        card.current.style.opacity = "0.3";
        card.current.style.transform = "scale(0.9)";
      }
    });
  };

  function evaluateAns(e: MouseEvent | any, option: string) {
    if (generateId(option) === answer) {
      if (grade[num - 1] === null) grade[num - 1] = "correct";
      e.target.style.backgroundColor = "var(--green-hue)";
      e.target.style.color = "var(--green)";
      e.target.style.borderColor = "var(--green)";
    } else {
      if (grade[num - 1] === null) grade[num - 1] = "wrong";

      e.target.style.backgroundColor = "var(--hue)";
      e.target.style.color = "var(--accent)";
      e.target.style.borderColor = "var(--accent)";
    }
    setGrade([...grade]);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: container.current,
      rootMargin: "0px",
      threshold: 0.9,
    });
    if (card.current) {
      observer.observe(card.current);
    }
    return () => {
      if (card.current) {
        observer.unobserve(card.current);
      }
    };
  }, [card]);

  return (
    <div
      ref={card}
      // eslint-disable-next-line no-nested-ternary
      className={`snap-center border-2 ${grade[num - 1] === "wrong" ? "border-accent" : grade[num - 1] === "correct" ? "border-green" : "border-bb"} bg-category lg:px-12 lg:py-8 h-fit rounded-3xl lg:min-w-[70%] min-w-[96%] px-7 py-5 duration-300 transition-all delay-500`}
    >
      <h1 className="text-2xl font-semibold md:block hidden">Question {num}</h1>

      <h2 id="quiz" className="text-lg my-1">
        <Markdown components={{ code: Code as any }}>{question}</Markdown>
      </h2>
      <div className="flex flex-col gap-2 md:mt-8 mt-5">
        {options.map((option, i) => (
          <div
            key={i}
            className="transition-all duration-300 opacity-65 hover:opacity-95 flex gap-3 items-center"
          >
            <p className="md:flex hidden text-sm aspect-square rounded-full bg-alt font-semibold items-center justify-center h-6 w-6">
              {["A", "B", "C", "D"][i]}
            </p>{" "}
            <button
              type="button"
              onClick={(e) => evaluateAns(e, option)}
              className="text-left flex items-center md:px-6 md:text-lg text-sm px-3 py-2 rounded-xl border-b-8 border-2 border-bb w-full"
            >
              {option}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
