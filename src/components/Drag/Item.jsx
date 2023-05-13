import React, { forwardRef } from 'react';


const Item = forwardRef(({ id, index, handleDelete, withOpacity, isDragging, style, ...props }, ref) => {
    const inlineStyles = {
        position: 'relative',
        opacity: withOpacity ? '0.5' : '1',
        transformOrigin: '50% 50%',
        height: '140px',
        width: '140px',
        // borderRadius: '10px',
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: isDragging  ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px' : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        overflow: 'hidden',
        ...style,
    };
    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        // console.log("handleClick ", id);
        handleDelete(id);
    }
    return <div ref={ref} style={inlineStyles} {...props}>
            <img src={id} style={{maxWidth: '100%', maxHeight: '100%'}} alt={id} />
            <button style={{position: 'absolute', right: 0, top: 0, }} onClick={handleClick}>&times;</button>
            <div style={{position: 'absolute', left: 0, bottom: 0, backgroundColor: 'rgb(255, 193, 7)', padding: '4px 6px'}}>{index+1}</div>
        </div>;
});

export default Item;
