export function getPlacement(draggedElement, draggedOverElement) {
    let draggables = Array.from(document.querySelectorAll("[data-draggable]"));

    let draggedElementIndex = draggables.indexOf(draggedElement);
    let draggedOverElementIndex = draggables.indexOf(draggedOverElement);

    return draggedElementIndex < draggedOverElementIndex ? "after" : "before";
}

export function getPlaceholderTranslateSign(placement) {
    return placement === "after" ? "" : "-";
}

export function getDraggablesTranslateSign(placement) {
    return placement === "after" ? "-" : "";
}

export function getTranslatableDraggables(
    placement,
    draggedElement,
    draggedOverElement
) {
    let draggables = Array.from(document.querySelectorAll("[data-draggable]"));

    let draggedElementIndex = draggables.indexOf(draggedElement);
    let draggedOverElementIndex = draggables.indexOf(draggedOverElement);

    return placement === "after"
        ? draggables.slice(draggedElementIndex + 1, draggedOverElementIndex + 1)
        : draggables.slice(draggedOverElementIndex, draggedElementIndex);
}
