// Script that sets the size of a underlying shape layer to the bounding box of currently selected text plus the PADDING.
// Assumes that the selected text and shape are located in same group.
// No other layes should be in the group to make sure it center correctly.

const PADDING = 44;

function getLayerIndexWithinGroup(layer) {
    if (layer.parent) {
        for (var i = 0; i < layer.parent.layers.length; i++) {
            if (layer.parent.layers[i] === layer) {
                return i;
            }
        }
    }
    return -1; // Return -1 if layer is not in a group or an error occurs
}

function centerLayer(layer) {
    const layerWidth = layer.bounds[2].value - layer.bounds[0].value;
    const layerHeight = layer.bounds[3].value - layer.bounds[1].value;
    const newX = (doc.width.value - layerWidth) / 2;
    const newY = (doc.height.value - layerHeight) / 2;
    layer.translate(newX - layer.bounds[0].value, newY - layer.bounds[1].value);
}

// Check if there's an active document
if (app.activeDocument) {
    // Get the active document
    var doc = app.activeDocument;

    if (doc.activeLayer.kind == LayerKind.TEXT) {
        var textLayer = doc.activeLayer;
        var parentGroup = textLayer.parent;

        // Loop through layers below the active layer
        var activeLayerIndex = getLayerIndexWithinGroup(textLayer);
        for (var i = activeLayerIndex + 1; i < doc.layers.length; i++) {
            var layer = parentGroup.layers[i];

            // Check if the layer is a shape layer
            if (layer.kind == LayerKind.GRADIENTFILL || layer.kind === SOLIDFILL) {
                var textBounds = textLayer.bounds;

                // Calculate width and height
                var textWidth = textBounds[2].value - textBounds[0].value;
                var textHeight = textBounds[3].value - textBounds[1].value;
                var width = layer.bounds[2].value - layer.bounds[0].value;
                var height = layer.bounds[3].value - layer.bounds[1].value;
                var newWidth = (100 / width) * (textWidth + PADDING);
                var newHeight = (100 / height) * (textHeight + PADDING);
                layer.resize(newWidth, newHeight, AnchorPosition.MIDDLECENTER);

                // Center layers on canvas
                centerLayer(layer);
                centerLayer(textLayer);

                // Refresh the document
                doc.activeLayer = doc.activeLayer;

                break; // Exit the loop after selecting the first shape layer
            }
        }
    } else {
        alert("Please select a Text layer.");
    }
} else {
    alert("No active document found.");
}