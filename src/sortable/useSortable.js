import { useEffect, useRef } from "react";
import {
    createPlaceholder,
    removePlaceholder,
    removeTranslateStyles,
    translatePlaceholder,
} from "./draggablePlaceholder";
import { getPlacement } from "./translatePrepare";
import {
    drag,
    getDraggedOverElement,
    prepareDraggedElement,
    removeDragStyle,
    removeDraggablesTranslateStyles,
    sortDraggableNodes,
    translateDraggables,
} from "./draggables";

export function useSortable(id, syncStateWithDOM) {
    let dragging = useRef(false);
    let draggedElementRef = useRef();
    let placeholderRef = useRef();

    let shiftX = useRef();
    let shiftY = useRef();

    let placementRef = useRef();
    let draggedOverId = useRef();

    useEffect(() => {
        draggedElementRef.current.dataset.draggable = "";
        draggedElementRef.current.dataset.draggableId = id;
    }, []);

    function handlePointerDown(e) {
        let { x, y } = draggedElementRef.current.getBoundingClientRect();

        shiftX.current = e.clientX - x;
        shiftY.current = e.clientY - y;

        document.addEventListener("pointermove", handlePointerMove);
    }

    function handlePointerMove(e) {
        if (!dragging.current) {
            handleStartDrag(e);
        } else {
            handleDrag(e);
        }
    }

    function handleStartDrag(e) {
        dragging.current = true;

        document.body.style.overflow = "hidden";

        prepareDraggedElement(draggedElementRef.current);

        createPlaceholder(placeholderRef, draggedElementRef.current);
        draggedElementRef.current.after(placeholderRef.current);
    }

    function handleDrag(e) {
        let draggedElement = draggedElementRef.current;
        drag(draggedElement, shiftX.current, shiftY.current, e);

        let draggedOverElement = getDraggedOverElement(draggedElement, e);

        if (!draggedOverElement) return;

        let placement = (placementRef.current = getPlacement(
            draggedElement,
            draggedOverElement
        ));

        draggedOverId.current = draggedOverElement.dataset.draggableId;

        translateDraggables(placement, draggedElement, draggedOverElement);

        translatePlaceholder(
            placeholderRef.current,
            placement,
            draggedElement,
            draggedOverElement
        );

        setTimeout(() => {
            removeDraggablesTranslateStyles(
                placement,
                draggedElement,
                draggedOverElement
            );

            sortDraggableNodes(
                placement,
                draggedElement,
                draggedOverElement,
                placeholderRef.current
            );

            removeTranslateStyles(placeholderRef.current);
        }, 110);
    }

    function handlePointerUp(e) {
        if (dragging.current) {
            dragging.current = false;

            syncStateWithDOM({
                placement: placementRef.current,
                draggedId: id,
                draggedOverId: draggedOverId.current,
            });

            document.body.style.overflow = "";

            removeDragStyle(draggedElementRef.current);

            removePlaceholder(placeholderRef);

            draggedOverId.current = null;
            placementRef.current = null;
        }
        document.removeEventListener("pointermove", handlePointerMove);
    }

    return {
        ref: draggedElementRef,
        listeners: {
            onPointerDown: handlePointerDown,
            onPointerUp: handlePointerUp,
        },
    };
}
