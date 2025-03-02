import fs from "fs";
import { createCanvas } from "canvas";

// Create icons in different sizes
const sizes = [16, 48, 128];

sizes.forEach((size) => {
    // Create canvas
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    // Draw blue background circle
    ctx.fillStyle = "#4285f4";
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw white "P" letter for "Prompt"
    ctx.fillStyle = "white";
    ctx.font = `bold ${size * 0.6}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("P", size / 2, size / 2);

    // Save as PNG
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(`public/icons/icon-${size}.png`, buffer);

    console.log(`Created icon-${size}.png`);
});

console.log("All icons created successfully!");
