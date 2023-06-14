import {
    getPlaceholderTranslateSign,
    getTranslatableDraggables,
} from "./translatePrepare";

export function createPlaceholder(placeholderRef, draggedElement) {
    placeholderRef.current = document.createElement("div");

    placeholderRef.current.classList.add(
        "todo-placeholder",
        "sortable-transition"
    );

    placeholderRef.current.style.height = `${draggedElement.clientHeight}px`;
}
export function translatePlaceholder(
    placeholder,
    placement,
    draggedElement,
    draggedOverElement
) {
    let sign = getPlaceholderTranslateSign(placement);

    let amount = getTranslatableDraggables(
        placement,
        draggedElement,
        draggedOverElement
    )
        .map((n) => n.offsetHeight)
        .reduce((a, b) => a + b);

    placeholder.style.translate = `0 ${sign}${amount}px`;
}

export function removeTranslateStyles(placeholder) {
    if (!placeholder) return;
    placeholder.classList.remove("sortable-transition");
    placeholder.style.translate = "";
}

export function removePlaceholder(placeholderRef) {
    placeholderRef.current.remove();
    placeholderRef.current = null;
}
