import React, { useState, useCallback, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import DragGrid from './DragGrid';
import SortableItem from './SortableItem';
import Item from './Item';

const DragArea = ({dataItems, handleDelete, handleSetArray, isLoading}) => {
    const [items, setItems] = useState(dataItems);
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(PointerSensor, {
        activationConstraint: {
          distance: 8,
        },
      }));

    const handleDragStart = useCallback((event) => {
        setActiveId(event.active.id);
    }, []);
    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                if (!over || !active) {
                    return;
                }
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                const newArray = arrayMove(items, oldIndex, newIndex);
                handleSetArray(newArray);
                return newArray;
            });
        }

        setActiveId(null);
    // eslint-disable-next-line
    }, []);
    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    // eslint-disable-next-line
    }, []);
    
    useEffect(()=>{
        setItems(dataItems);
    },[dataItems]);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <DragGrid columns={4} isLoading={isLoading}>
                    {items && items.map((id, index) => (
                        <SortableItem key={id} id={id} index={index} handleDelete={(id) => {setItems(items.filter((item)=> item!==id)); handleDelete(id)}} handleSetArray={handleSetArray} />
                    ))}
                </DragGrid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeId ? <Item id={activeId} isDragging /> : null}
            </DragOverlay>
        </DndContext>
    );
};

export default DragArea;
