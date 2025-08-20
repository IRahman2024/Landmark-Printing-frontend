import { useEffect, useState } from "react";
import "./style.css";

const Settings = ({ canvas }) => {
    const [selectedObject, setSelectedObject] = useState(null);
    const [color, setColor] = useState('');
    const [radius, setRadius] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [fontSize, setFontSize] = useState('');
    const [fontFamily, setFontFamily] = useState('');
    const [text, setText] = useState('');
    const [fontWeight, setFontWeight] = useState('normal');

    const updateObjectSettings = (obj) => {
        if (!obj) {
            clearSettings();
            return;
        }

        setSelectedObject(obj);

        if (obj.type === 'rect') {
            setColor(obj.fill || '#000000');
            setRadius('');
            setHeight(Math.round(obj.getScaledHeight()));
            setWidth(Math.round(obj.getScaledWidth()));
            clearTextSettings();
        } else if (obj.type === 'circle') {
            setRadius(Math.round(obj.getScaledWidth() / 2));
            setColor(obj.fill || '#000000');
            setWidth('');
            setHeight('');
            clearTextSettings();
        } else if (obj.type === 'textbox' || obj.type === 'text') {
            setText(obj.text || '');
            setFontSize(obj.fontSize || 20);
            setFontFamily(obj.fontFamily || 'Arial');
            setColor(obj.fill || '#000000');
            setFontWeight(obj.fontWeight || 'normal');
            clearShapeSettings();
        } else {
            clearSettings();
        }
    };

    const clearSettings = () => {
        setSelectedObject(null);
        clearShapeSettings();
        clearTextSettings();
    };

    const clearShapeSettings = () => {
        setColor('');
        setRadius('');
        setHeight('');
        setWidth('');
    };

    const clearTextSettings = () => {
        setText('');
        setFontSize('');
        setFontFamily('');
        setFontWeight('normal');
    };

    const handleWidthChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);

        setWidth(intValue);

        if (selectedObject && selectedObject.type === "rect" && !isNaN(intValue) && intValue >= 0) {
            selectedObject.set({ width: intValue / selectedObject.scaleX });
            canvas.renderAll();
            updateObjectSettings(selectedObject);
        }
    };

    const handleHeightChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);

        setHeight(intValue);

        if (selectedObject && selectedObject.type === "rect" && !isNaN(intValue) && intValue >= 0) {
            selectedObject.set({ height: intValue / selectedObject.scaleY });
            canvas.renderAll();
            updateObjectSettings(selectedObject);
        }
    };

    const handleRadiusChange = (e) => {
        const value = e.target.value.replace(/,/g, '');
        const intValue = parseInt(value, 10);

        setRadius(intValue);

        if (selectedObject && selectedObject.type === "circle" && !isNaN(intValue) && intValue >= 0) {
            selectedObject.set({ radius: intValue / selectedObject.scaleX });
            canvas.renderAll();
            updateObjectSettings(selectedObject);
        }
    };

    const handleColorChange = (e) => {
        const value = e.target.value;
        setColor(value);
        if (selectedObject) {
            selectedObject.set({ fill: value });
            canvas.renderAll();
        }
    };

    const handleBackgroundColorChange = (e) => {
        const value = e.target.value;
        setColor(value);
        if (selectedObject) {
            selectedObject.set({ backgroundColor: value });
            canvas.renderAll();
        }
    };

    const handleTextChange = (e) => {
        const value = e.target.value;
        setText(value);
        if (selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text')) {
            selectedObject.set({ text: value });
            canvas.renderAll();
        }
    };

    const handleFontSizeChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setFontSize(value);
        if (selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text') && !isNaN(value)) {
            selectedObject.set({ fontSize: value });
            canvas.renderAll();
        }
    };

    const handleFontFamilyChange = (e) => {
        const value = e.target.value;
        setFontFamily(value);
        if (selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text')) {
            selectedObject.set({ fontFamily: value });
            canvas.renderAll();
        }
    };

    const handleFontWeightChange = (e) => {
        const value = e.target.value;
        setFontWeight(value);
        if (selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text')) {
            selectedObject.set({ fontWeight: value });
            canvas.renderAll();
        }
    };

    useEffect(() => {
        if (!canvas) return;

        canvas.on("selection:created", (e) => updateObjectSettings(e.selected[0]));
        canvas.on("selection:updated", (e) => updateObjectSettings(e.selected[0]));
        canvas.on("selection:cleared", clearSettings);

        canvas.on("object:modified", (e) => updateObjectSettings(e.target));
        canvas.on("object:scaling", (e) => updateObjectSettings(e.target));
        canvas.on("object:moving", (e) => updateObjectSettings(e.target));
        canvas.on("object:rotating", (e) => updateObjectSettings(e.target));

        return () => {
            if (canvas) {
                canvas.off("selection:created", updateObjectSettings);
                canvas.off("selection:updated", updateObjectSettings);
                canvas.off("selection:cleared", clearSettings);
                canvas.off("object:modified", updateObjectSettings);
                canvas.off("object:scaling", updateObjectSettings);
                canvas.off("object:moving", updateObjectSettings);
                canvas.off("object:rotating", updateObjectSettings);
            }
        };
    }, [canvas]);

    return (
        <div className="settings bg-white border rounded-lg shadow-sm mt-4">
            <h3 className="text-lg font-semibold mb-4">Object Properties</h3>

            {selectedObject && selectedObject.type === 'rect' && (
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={height !== null ? height : ''}
                            onChange={handleHeightChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={width !== null ? width : ''}
                            onChange={handleWidthChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fill Color</label>
                        <input
                            type="color"
                            className="input input-bordered w-full h-10 cursor-pointer"
                            value={color !== null ? color : '#000000'}
                            onChange={handleColorChange}
                        />
                    </div>
                </div>
            )}

            {selectedObject && selectedObject.type === 'circle' && (
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Radius</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={radius !== null ? radius : ''}
                            onChange={handleRadiusChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fill Color</label>
                        <input
                            type="color"
                            className="input input-bordered w-full h-10 cursor-pointer"
                            value={color !== null ? color : '#000000'}
                            onChange={handleColorChange}
                        />
                    </div>
                </div>
            )}

            {selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text') && (
                <div className="space-y-3 overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            value={text}
                            onChange={handleTextChange}
                            rows="3"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={fontSize}
                            onChange={handleFontSizeChange}
                            min="8"
                            max="200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
                        <select
                            className="select select-bordered w-full"
                            value={fontFamily}
                            onChange={handleFontFamilyChange}
                        >
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Impact">Impact</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
                        <select
                            className="select select-bordered w-full"
                            value={fontWeight}
                            onChange={handleFontWeightChange}
                        >
                            <option value="normal">Normal</option>
                            <option value="bold">Bold</option>
                            <option value="lighter">Lighter</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                        <input
                            type="color"
                            className="input input-bordered w-full h-10 cursor-pointer"
                            value={color !== null ? color : '#000000'}
                            onChange={handleColorChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                        <input
                            type="color"
                            className="input input-bordered w-full h-10 cursor-pointer"
                            value={color !== null ? color : '#000000'}
                            onChange={handleBackgroundColorChange}
                        />
                    </div>
                </div>
            )}

            {selectedObject && selectedObject.type === 'image' && (
                <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                        Use the corner handles to resize the image while maintaining aspect ratio.
                    </p>
                </div>
            )}

            {!selectedObject && (
                <p className="text-gray-500 text-center text-sm">
                    Select an object to edit its properties.
                </p>
            )}
        </div>
    );
};

export default Settings;