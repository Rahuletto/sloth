import { Input } from "@/components/ui/Input";
import { Dispatch, SetStateAction } from "react";
import { FaPlus } from "react-icons/fa6";

export function AddCategory({
    newCategory,
    setNewCategory,
    handleAddCategory,
  }: {
    newCategory: string;
    setNewCategory: Dispatch<SetStateAction<string>>;
    handleAddCategory: () => void;
  }) {
    return (
      <div className="bg-category p-4 rounded-3xl h-full min-h-64 max-h-72">
        <div className="flex items-center flex-col justify-center gap-3 p-4 rounded-2xl border-4 border-alt border-dashed h-full">
          <div className="text-light flex items-center flex-col justify-center gap-4 my-6">
            <span className={`duration-300 transition-all text-3xl text-light`}>
              <FaPlus />
            </span>
            <p className="max-w-[350px] text-center font-mono">
              Add a new category to organize your notes
            </p>
          </div>
          <div className="flex mb-2">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
            />
  
            <button
              onClick={handleAddCategory}
              className="bg-accent text-semibold rounded-md text-bg py-3 px-5"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
  