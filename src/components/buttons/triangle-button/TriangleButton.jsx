import style from './TriangleButton.module.css';

import { useState, useRef, useEffect } from 'react';

export const TriangleButton = (props) => {
    const { buttonProps, canvasProps, colors } = props;
    const [hovered, setHovered] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        // Clear previous drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save(); // Save
        // Flip canvas (left-to-right)
        ctx.transform(1, 0, 0, -1, 0, canvas.height);
        // Draw shape
        ctx.beginPath();
        ctx.moveTo(
            // Right center
            canvas.clientWidth,
            canvas.clientHeight / 2,
        );
        ctx.lineTo(0, 0); // Top left
        ctx.lineTo(0, canvas.clientHeight); // Bottom left
        ctx.closePath();
        // Styling
        ctx.strokeStyle = 'transparent';
        ctx.fillStyle = hovered
            ? colors.backgroundColorHovered
            : colors.backgroundColor;
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.fill();
        // Remove transformation
        ctx.restore();
    }, [hovered]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className={`flex-column-absolute ${style['canvas']}`}
                {...canvasProps}
            ></canvas>

            <button
                className={`flex-column-absolute ${style['button']}`}
                onMouseEnter={() => {
                    setHovered(true);
                }}
                onMouseLeave={() => {
                    setHovered(false);
                }}
                {...buttonProps}
            ></button>
        </>
    );
};
