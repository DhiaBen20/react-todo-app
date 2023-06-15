import { CheckIcon } from "./icons";

let colorsClasses =
    "bg-[hsl(236,33%,92%)] dark:bg-[hsl(237,14%,26%)] from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)]";
let centeringClasses = "flex items-center justify-center";

export default function ToggleComplete({ isComplete, ...props }) {
    return (
        <button
            aria-label={`${isComplete ? 'uncomplete' : 'complete'} todo`}
            {...props}
            className={`w-[19px] h-[19px] md:w-[24px] md:h-[24px] rounded-full relative hover:bg-gradient-to-br flexxitems-centerxjustify-center ${colorsClasses} ${centeringClasses} ${
                isComplete ? "bg-gradient-to-br" : ""
            }`}
        >
            {!isComplete && (
                <span className="bg-white dark:bg-[hsl(235,24%,19%)] absolute rounded-full w-[17px] h-[17px] md:w-[22px] md:h-[22px] top-[1px] left-[1px]"></span>
            )}
            {isComplete && <CheckIcon />}
        </button>
    );
}
