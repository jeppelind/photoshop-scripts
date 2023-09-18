// Center the selected layer on the canvas.

// Check if there's an active document
if (app.activeDocument) {
    const doc = app.activeDocument;
    const layer = doc.activeLayer;
    const layerWidth = layer.bounds[2].value - layer.bounds[0].value;
    const layerHeight = layer.bounds[3].value - layer.bounds[1].value;
    const newX = (doc.width.value - layerWidth) / 2;
    const newY = (doc.height.value - layerHeight) / 2;
    layer.translate(newX - layer.bounds[0].value, newY - layer.bounds[1].value);
} else {
    alert("No active document found.");
}