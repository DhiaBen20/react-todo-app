import {
    getDraggablesTranslateSign,
    getTranslatableDraggables,
} from "./translatePrepare";

export function prepareDraggedElement(draggedElement) {
    draggedElement.style.width = `${draggedElement.offsetWidth}px`;
    draggedElement.style.position = "absolute";
    draggedElement.style.zIndex = "20";
    draggedElement.style.boxShadow =
        "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";

    draggedElement.classList.remove(
        "border-t-transparent",
        "border-x-transparent",
        "dark:border-x-transparent",
        "dark:border-t-transparent"
    );
}

export function drag(draggedElement, shiftX, shiftY, e) {
    draggedElement.style.top = `${e.clientY - shiftY}px`;
    draggedElement.style.left = `${e.clientX - shiftX}px`;
}

export function removeDragStyle(draggedElement) {
    draggedElement.style.width = "";
    draggedElement.style.position = "";
    draggedElement.style.zIndex = "";
    draggedElement.style.boxShadow = "";
    draggedElement.style.top = "";
    draggedElement.style.left = "";

    draggedElement.classList.add(
        "border-t-transparent",
        "border-x-transparent",
        "dark:border-x-transparent",
        "dark:border-t-transparent"
    );
}

export function getDraggedOverElement(draggedElement, e) {
    draggedElement.style.display = "none";

    let draggedOverElement = document
        .elementFromPoint(e.clientX, e.clientY)
        ?.closest("[data-draggable]");

    draggedElement.style.display = "";

    return draggedOverElement;
}

export function translateDraggables(
    placement,
    draggedElement,
    draggedOverElement
) {
    let translatableDraggables = getTranslatableDraggables(
        placement,
        draggedElement,
        draggedOverElement
    );

    let sign = getDraggablesTranslateSign(placement);

    translatableDraggables.forEach((draggable) => {
        draggable.classList.add("sortable-transition");

        draggable.style.position = "relative";
        draggable.style.zIndex = "10";
        draggable.style.translate = `0 ${sign}${draggable.offsetHeight}px`;
    });
}

export function removeDraggablesTranslateStyles(
    placement,
    draggedElement,
    draggedOverElement
) {
    let translatableDraggables = getTranslatableDraggables(
        placement,
        draggedElement,
        draggedOverElement
    );

    translatableDraggables.forEach((draggable) => {
        draggable.classList.remove("sortable-transition");

        draggable.style.position = "";
        draggable.style.zIndex = "";
        draggable.style.translate = "";
    });
}

export function sortDraggableNodes(
    placement,
    draggedElement,
    draggedOverElement,
    placeholder
) {
    if (placement === "after") {
        draggedOverElement.after(draggedElement);
    } else {
        draggedOverElement.before(draggedElement);
    }

    if (placeholder) {
        draggedElement.after(placeholder);
    }
}
