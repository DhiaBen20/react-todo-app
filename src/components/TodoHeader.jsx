import { MoonIcon, SunIcon } from "./icons";
import { useTodos } from "../store";
import { useEffect } from "react";
export default function TodoHeader() {
    let mode = useTodos.use.mode();
    let setMode = useTodos.use.setMode();

    useEffect(() => {
        if (mode == "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [mode]);

    function handleThemeSwitcherClick() {
        if (mode == "dark") {
            setMode("light");
        } else {
            setMode("dark");
        }
    }

    return (
        <header className="h-[180px] md:h-[300px] header-bg bg-cover pt-10 md:pt-20 -mb-[82px] md:-mb-[145px]">
            <div className="max-w-xl mx-auto flex items-center justify-between px-6 md:px-0">
                <h1 className="uppercase font-semibold text-2xl md:text-4xl text-white tracking-[12px]">
                    Todo
                </h1>
                <button
                    className="-mt-2"
                    onClick={handleThemeSwitcherClick}
                    aria-label={`${
                        mode == "light" ? "light theme" : "dark theme"
                    }`}
                >
                    {mode == "light" ? <MoonIcon /> : <SunIcon />}
                </button>
            </div>
        </header>
    );
}
