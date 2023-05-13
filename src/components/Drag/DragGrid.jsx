import React from 'react';

const DragGrid = ({ children, columns, isLoading }) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridGap: 10,
                maxWidth: '800px',
                margin: '100px auto',
                position: 'relative',
            }}
        >
            {children}
            {isLoading &&
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255, 0.8)'}}>Loading...</div>
            }
        </div>
    );
};

export default DragGrid;
