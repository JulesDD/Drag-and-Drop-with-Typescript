
    //Dragging and droppable interface
    export interface Draggable{
        dragStartHandler(e: DragEvent): void;
        dragEndHandler(e: DragEvent):void;
    }

    export interface Droppable{
        dragOverHandler(e: DragEvent): void;
        dropHandler(e: DragEvent): void;
        dragLeaveHandler(e: DragEvent): void;
    }


