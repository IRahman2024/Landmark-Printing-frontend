import { Canvas, Circle, Rect, FabricImage, Textbox } from "fabric";
import { useEffect, useState, useRef, useContext } from "react";
import Settings from "../../Canvas/Settings";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import { Bounce, toast, ToastContainer } from "react-toastify";

const BusinessCard = () => {
    const { user } = useContext(AuthContext);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [product_type, setProduct_type] = useState(null);
    const [isModified, setIsModified] = useState(false);
    const [showTemplates, setShowTemplates] = useState(true);
    const [template, setTemplate] = useState(null);
    const [defaultHeight, setDefaultHeight] = useState(600);
    const [defaultWidth, setDefaultWidth] = useState(800);
    const [cost, setCost] = useState(0);
    const [canvasFilled, setCanvasFilled] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const path = useLocation().pathname;

    const businessCardTemplates = [
        {
            id: 1,
            name: "Black and White",
            src: "/Business Cards Templates/Black and white.png"
        },
        {
            id: 2,
            name: "Blue and Gray",
            src: "/Business Cards Templates/Blue and Gray.png"
        },
        {
            id: 3,
            name: "Blue and White Elegant",
            src: "/Business Cards Templates/Blue and White Elegant Business Card.png"
        },
        {
            id: 4,
            name: "Red Black Creative",
            src: "/Business Cards Templates/Red Black Creative Modern Business Card.png"
        },
        {
            id: 5,
            name: "Yellow Modern Manager",
            src: "/Business Cards Templates/Yellow Modern Manager Business Card.png"
        },
        {
            id: 6,
            name: "Green and White Modern",
            src: "/Business Cards Templates/Green and White Modern Business Card.png"
        }
    ];

    const successToast = () => {
        toast.success('Order has been Successfully placed. Please Continue to payment ', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const errorToast = () => {
        toast.error('Something Went Wrong. Please Contact The Administration!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const bannerTemplates = [
        {
            id: 1,
            name: "Technology Company Banner",
            src: "/Banners/Black Modern Technology Company Banner.png"
        },
        {
            id: 2,
            name: "Estate Property Agent Banner",
            src: "/Banners/Estate Property Agent Banner.png"
        },
        {
            id: 3,
            name: "Healthcare Banner",
            src: "/Banners/Healthcare Banner.png"
        },
        {
            id: 4,
            name: "Modern House For Sale Banner",
            src: "/Banners/Modern House Living Sale Banner Portrait.png"
        },
        {
            id: 5,
            name: "Modern Special Menu Banner",
            src: "/Banners/Modern Special Menu Banner.png"
        },
        {
            id: 6,
            name: "School Admission Poster",
            src: "/Banners/School Admission Poster.png"
        },
        {
            id: 7,
            name: "Single Food Item Promotion Banner",
            src: "/Banners/Single Food Item Promotion Banner.png"
        }
    ];

    const posterCardTemplates = [
        {
            id: 1,
            name: "Single Food Promotional Poster",
            src: "/Posters/Burger Photo Creative Promotional Poster.png"
        },
        {
            id: 2,
            name: "Fashion Logo Advertising Poster",
            src: "/Posters/Modern Fashion Logo Advertising Poster.png"
        },
        {
            id: 3,
            name: "Modern Special Menu Banner",
            src: "/Posters/Modern Special Menu Banner.png"
        },
        {
            id: 4,
            name: "Property Marketing Poster",
            src: "/Posters/Property Marketing Poster.png"
        },
        {
            id: 5,
            name: "Restaurant Menu Poster",
            src: "/Posters/Restaurant Menu Poster.png"
        }
    ];

    const labelTemplates = [
        {
            id: 1,
            name: "Blue and White Modern Food Product",
            src: "/Labels/Blue and White Modern Food Product Label-1.png"
        },
        {
            id: 2,
            name: "Brown Illustration Cookies Product",
            src: "/Labels/Brown Illustration Choco Cookies Product Label-1.png"
        },
        {
            id: 3,
            name: "Brown Vintage Organic Bar Soap Label",
            src: "/Labels/Brown Vintage Organic Bar Soap Label.png"
        },
        {
            id: 4,
            name: "Modern Illustration Product Label",
            src: "/Labels/Modern Illustration Product Label.png"
        },
        {
            id: 5,
            name: "Red and White Modern Spicy Tomato",
            src: "/Labels/Red and White Modern Spicy Tomato Label-1.png"
        },
        {
            id: 6,
            name: "Simple Clean Pineapple Jam Label",
            src: "/Labels/Yellow Simple Clean Pineapple Jam Label.png"
        }
    ];

    useEffect(() => {
        console.log('Path changed:', path);

        if (path === '/poster') {
            console.log("Setting poster templates");
            setDefaultWidth(600);
            setDefaultHeight(500);
            setTemplate(posterCardTemplates);
            setCost(100);
            setProduct_type('Poster');
        }
        else if (path === '/banner') {
            console.log("Setting banner templates");
            setDefaultWidth(600);
            setDefaultHeight(500);
            setTemplate(bannerTemplates);
            setCost(200);
            setProduct_type('Banner');
        }
        else if (path === '/label') {
            console.log("Setting label templates");
            setDefaultWidth(600);
            setDefaultHeight(500);
            setTemplate(labelTemplates);
            setCost(50);
            setProduct_type('Label');
        }
        else {
            console.log("Setting business card templates");
            setDefaultWidth(600);
            setDefaultHeight(500);
            setTemplate(businessCardTemplates);
            setCost(150);
            setProduct_type('Business Card');
        }

        setShowTemplates(true);
        setIsModified(false);
    }, [path]);

    useEffect(() => {
        console.log('Canvas dimensions changed:', defaultWidth, defaultHeight);

        if (canvas) {
            canvas.dispose();
            setCanvas(null);
        }

        if (!canvasRef.current) return;

        const initCanvas = new Canvas(canvasRef.current, {
            width: Math.min(defaultWidth, 600),
            height: Math.min(defaultHeight, 800),
            backgroundColor: '#ffffff',
        });

        initCanvas.renderAll();
        setCanvas(initCanvas);
        console.log('Canvas initialized with dimensions:', initCanvas.width, initCanvas.height);

        return () => {
            if (initCanvas) {
                initCanvas.dispose();
            }
        };
    }, [defaultHeight, defaultWidth]);

    // Canvas event listeners
    useEffect(() => {
        if (!canvas) return;

        const handleModification = () => {
            setIsModified(true);
        };

        canvas.on('object:added', handleModification);
        canvas.on('object:modified', handleModification);
        canvas.on('object:removed', handleModification);
        canvas.on('text:changed', handleModification);

        return () => {
            if (canvas) {
                canvas.off('object:added', handleModification);
                canvas.off('object:modified', handleModification);
                canvas.off('object:removed', handleModification);
                canvas.off('text:changed', handleModification);
            }
        };
    }, [canvas]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Delete') {
                const activeObject = canvas?.getActiveObject();
                if (activeObject) {
                    canvas.remove(activeObject);
                    canvas.discardActiveObject();
                    canvas.renderAll();
                    setIsModified(true);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [canvas]);

    const loadTemplate = (templateSrc) => {
        console.log('Loading template:', templateSrc);
        if (!canvas) {
            console.error('Canvas not initialized');
            return;
        }

        const applyTemplateToCanvas = (fabricImg, loadMethod) => {
            console.log(`Template loaded successfully using ${loadMethod}`);

            canvas.clear();
            canvas.backgroundColor = '#7A7171';

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgWidth = fabricImg.width;
            const imgHeight = fabricImg.height;

            console.log('Canvas:', canvasWidth, 'x', canvasHeight);
            console.log('Image:', imgWidth, 'x', imgHeight);

            const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);

            fabricImg.set({
                left: (canvasWidth - imgWidth * scale) / 2,
                top: (canvasHeight - imgHeight * scale) / 2,
                scaleX: scale,
                scaleY: scale,
                selectable: false,
                evented: false,
            });

            canvas.add(fabricImg);
            canvas.sendToBack(fabricImg);
            canvas.renderAll();
            setCanvasFilled(true);

            setIsModified(false)
            setShowTemplates(false);

            console.log('Template applied successfully');
        };

        const img = new Image();
        img.onload = () => {
            console.log('Image exists, loading with Fabric.js');

            FabricImage.fromURL(templateSrc)
                .then((fabricImg) => {
                    applyTemplateToCanvas(fabricImg, 'standard method');
                })
        };

        img.onerror = () => {
            console.error('Image does not exist:', templateSrc);
            alert(`Template image not found: ${templateSrc}\n\nPlease check if the image exists in your public folder.`);
        };

        img.crossOrigin = 'anonymous';
        img.src = templateSrc;
    };

    const addRec = () => {
        if (canvas) {
            const rect = new Rect({
                left: 50,
                top: 100,
                fill: 'rgba(0,0,0,0.1)',
                width: 100,
                height: 100,
                strokeUniform: true,
            });
            canvas.add(rect);
            canvas.setActiveObject(rect);
            canvas.renderAll();
            setIsModified(true);
        }
    };

    const addCircle = () => {
        if (canvas) {
            const circle = new Circle({
                left: 150,
                top: 150,
                fill: 'rgba(0,0,0,0.3)',
                stroke: 'black',
                strokeWidth: 2,
                radius: 50,
            });
            canvas.add(circle);
            canvas.setActiveObject(circle);
            canvas.renderAll();
            setIsModified(true);
        }
    };

    const addText = () => {
        if (canvas) {
            const text = new Textbox('Your Text Here', {
                left: 100,
                top: 50,
                fontSize: 20,
                fontFamily: 'Arial',
                fill: '#000000',
                width: 200,
                fontWeight: 'normal',
                backgroundColor: 'rgba(255,255,255,0.8)',
            });
            canvas.add(text);
            canvas.setActiveObject(text);
            canvas.renderAll();
            setIsModified(true);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file || !canvas) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const imgElement = new Image();
            imgElement.onload = () => {
                FabricImage.fromURL(event.target.result).then((fabricImg) => {
                    const canvasWidth = canvas.width;
                    const canvasHeight = canvas.height;
                    const imgWidth = fabricImg.width;
                    const imgHeight = fabricImg.height;

                    const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight, 1);

                    fabricImg.set({
                        left: (canvasWidth - imgWidth * scale) / 2,
                        top: (canvasHeight - imgHeight * scale) / 2,
                        scaleX: scale,
                        scaleY: scale,
                    });

                    canvas.add(fabricImg);
                    canvas.setActiveObject(fabricImg);
                    canvas.renderAll();
                    setCanvasFilled(true);
                    setIsModified(true);
                    setShowTemplates(false);
                });
            };
            imgElement.src = event.target.result;
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const exportImage = (format = 'png') => {
        if (!canvas) return;

        if (!isModified) {
            alert('Please make some modifications to your design before downloading!');
            return;
        }

        const dataURL = canvas.toDataURL({
            format: format,
            quality: 1,
            multiplier: 2,
        });

        const link = document.createElement('a');
        link.download = `design-${Date.now()}.${format}`;
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const clearCanvas = () => {
        if (canvas) {
            canvas.clear();
            canvas.backgroundColor = '#ffffff';
            canvas.renderAll();
            setIsModified(false);
            setShowTemplates(true);
            setCanvasFilled(false);
        }
    };

    const startFromScratch = () => {
        if (canvas) {
            canvas.clear();
            canvas.backgroundColor = '#ffffff';
            canvas.renderAll();
            setIsModified(false);
            setShowTemplates(false);
        }
    };

    // Upload canvas to Cloudinary
    const uploadCanvasToCloudinary = async (folderName) => {
        if (!canvas) {
            throw new Error('Canvas not initialized');
        }

        // Get canvas as data URL
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 2,
        });

        // Convert data URL to Blob
        const response = await fetch(dataURL);
        const blob = await response.blob();

        // Create FormData for Cloudinary upload
        const uploadData = new FormData();
        uploadData.append('file', blob, `design-${Date.now()}.png`);
        uploadData.append('upload_preset', 'E-com_Product_preset');
        uploadData.append('cloud_name', 'dwhcnlq8y');
        uploadData.append('folder', folderName);

        const url = import.meta.env.VITE_CLOUDINARY_URL;

        try {
            const uploadResponse = await fetch(url, {
                method: 'POST',
                body: uploadData
            });

            const result = await uploadResponse.json();

            if (result.secure_url) {
                return result.secure_url;
            } else {
                throw new Error('Upload failed: No secure URL returned');
            }
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            throw new Error('Failed to upload image to Cloudinary');
        }
    };

    // Handle order with image upload
    const handleOrder = async (e) => {
        e.preventDefault();

        if (!canvas || !isModified) {
            alert('Please create or modify your design before placing an order!');
            return;
        }

        setIsUploading(true);

        try {
            // Upload canvas image to Cloudinary first
            const imageUrl = await uploadCanvasToCloudinary(product_type + '(Landmark Printing)');
            console.log('Uploaded image URL:', imageUrl);

            const order_name = e.target.order_name.value;
            const size = e.target.size.value;
            const quantity = parseInt(e.target.quantity.value);
            const contact_name = e.target.contact_name.value;
            const contact_number = e.target.contact_number.value;
            const address = e.target.address.value;
            const contact_email = user?.email;
            const product = product_type;

            const paper_type_select = e.target.paper_type;
            const paper_type = paper_type_select.selectedOptions[0].text;
            const paper_type_value = paper_type_select.value;

            const finishing_option_select = e.target.finishing_option;
            const finishing_option = finishing_option_select.selectedOptions[0].text;
            const finishing_option_value = finishing_option_select.value;

            const amount = cost * quantity * paper_type_value * finishing_option_value;

            const orderDetails = {
                order_name,
                size,
                quantity,
                contact_name,
                contact_number,
                contact_email,
                address,
                paper_type,
                finishing_option,
                product,
                amount,
                paid_status: false,
                design_image_url: imageUrl
            };

            // console.log(orderDetails);
            // console.log('hit');



            const response = await axiosPublic.post('/due-payments', orderDetails);
            console.log(response);

            if (response.data.result.insertedId) {
                successToast();
                clearCanvas();
            } else {
                errorToast();
            }
        } catch (error) {
            console.error('Error during order process:', error);
            alert(`An error occurred: ${error.message}. Please try again.`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="grid min-h-screen bg-[#C4E1E6]">
            <div className="bg-[url('/New%20Images/c837a6_1d5f201e63994552ba2cf5357c5b6571mv2.webp')] bg-cover bg-center overflow-hidden text-white">
                {showTemplates && (
                    <div className="p-8">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-white mb-2">Choose a Template</h2>
                            <p className="text-blue-100">Select a template to start designing</p>
                            <button
                                onClick={startFromScratch}
                                className="mt-4 btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-blue-600"
                            >
                                Start from Scratch
                            </button>
                        </div>
                        <div className="flex overflow-x-auto gap-6 pb-4">
                            {template?.map((templateItem) => (
                                <div key={templateItem.id} className="flex-shrink-0">
                                    <div
                                        className="w-80 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
                                        onClick={() => loadTemplate(templateItem.src)}
                                    >
                                        <img
                                            className="w-full h-48 object-cover"
                                            src={templateItem.src}
                                            alt={templateItem.name}
                                            onError={(e) => {
                                                e.target.src = '/placeholder-image.png';
                                                e.target.alt = 'Template not found';
                                            }}
                                            required />
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800 text-center">{templateItem.name}</h3>
                                            <p className="text-sm text-gray-600 text-center mt-1">Click to use this template</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-start justify-between w-full gap-4 p-4">
                {/* Left Sidebar: Drawing Tools */}
                <div className="w-64 flex-shrink-0">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-xs text-gray-600 mb-2 text-center">Drawing Tools</p>

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="btn btn-primary btn-sm w-full mb-1"
                            title="Upload Image">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 3v12" />
                                <path d="m17 8-5-5-5 5" />
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            </svg>
                            Upload Image
                        </button>

                        <button
                            onClick={addText}
                            className="btn btn-info btn-sm mb-1 w-full"
                            title="Add Text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" />
                                <path d="M7 22h1a4 4 0 0 0 4-4v-1" />
                                <path d="M7 2h1a4 4 0 0 1 4 4v1" />
                            </svg>
                            Add Text
                        </button>

                        <button
                            onClick={addRec}
                            className="btn btn-success btn-sm mb-1 w-full"
                            title="Add Rectangle">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            </svg>
                            Add Rectangle
                        </button>

                        <button
                            onClick={addCircle}
                            className="btn btn-success btn-sm mb-1 w-full"
                            title="Add Circle">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                            </svg>
                            Add Circle
                        </button>

                        <div className="divider my-1"></div>

                        <button
                            onClick={() => setShowTemplates(true)}
                            className="btn btn-secondary btn-sm mb-1 w-full"
                            title="Show Templates">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                            Show Templates
                        </button>

                        <button
                            onClick={clearCanvas}
                            className="btn btn-warning btn-sm w-full"
                            title="Clear Canvas">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m7 7 10 10M7 17 17 7" />
                            </svg>
                            Clear Canvas
                        </button>
                    </div>
                </div>

                {/* Center: Main Canvas Area - Now with full width */}
                <div className="flex-1 min-w-0 px-4"> {/* Added min-w-0 to prevent flex item overflow */}
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Design Editor</h3>
                            <div className={`badge ${isModified ? 'badge-success' : 'badge-warning'}`}>
                                {isModified ? 'Modified' : 'No Changes'}
                            </div>
                        </div>

                        <canvas
                            ref={canvasRef}
                            className="border border-gray-400 rounded w-full h-[600px]"
                        />

                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                💡 Tip: Double-click text to edit, use Delete key to remove selected objects
                            </p>
                        </div>

                        <div className="flex gap-2 justify-center mt-4">
                            <button
                                onClick={() => exportImage('png')}
                                className={`btn btn-accent btn-sm bg-[#C4E1E6] ${!isModified ? 'btn-disabled' : ''}`}
                                disabled={!isModified}>
                                Export as PNG
                            </button>
                            <button
                                onClick={() => exportImage('jpeg')}
                                className={`btn btn-accent btn-sm bg-[#C4E1E6] ${!isModified ? 'btn-disabled' : ''}`}
                                disabled={!isModified}>
                                Export as JPEG
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Object Properties */}
                <div className="w-64 flex-shrink-0">
                    <Settings canvas={canvas} />
                    {/* <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
                    </div> */}
                </div>
            </div>
            {/* older Order Form */}
            {/* <div className="flex flex-cols justify-center items-center mb-10">
                <div className="card card-border bg-base-100 w-full p-10 mx-4">
                    <form onSubmit={handleOrder} className="card-body">
                        <h2 className="font-bold mx-auto mb-10 text-3xl">Order Details</h2>

                        {isUploading && (
                            <div className="alert alert-info">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Uploading your design... Please wait!</span>
                            </div>
                        )}

                        <div className="flex justify-between my-2 gap-x-5">
                            <div className="w-1/2 mr-14">
                                <div className="flex items-center my-2">
                                    <p className="font-semibold text-xl">Name Of Order : </p>
                                    <input type="text" name='order_name' placeholder="Order Name" className="input border-black border-1" required />
                                </div>
                                <div className="flex items-center my-2 w-full">
                                    <p className="font-semibold text-xl">Quantity : </p>
                                    <input type="number" name='quantity' placeholder="Quantity" className="input border-black border-1" required />
                                </div>
                                <div className="flex items-center my-2">
                                    <p className="font-semibold text-xl">Paper Type : </p>
                                    <select name='paper_type' defaultValue="Pick a text editor" className="select select-primary">
                                        <option disabled={true}>Pick A Paper Type</option>
                                        <option value='1.2'>130gsm Gloss</option>
                                        <option value='1'>130gsm Matt</option>
                                        <option value='0.80'>130gsm Uncoated</option>
                                    </select>
                                </div>
                                <div className="flex items-center my-2 w-full">
                                    <p className="font-semibold text-xl">Finishing Option : </p>
                                    <select name='finishing_option' defaultValue="Pick a text editor" className="select select-primary">
                                        <option disabled={true}>Pick As You Like</option>
                                        <option value='10'>Creasing</option>
                                        <option value='2'>Folding</option>
                                        <option value='7'>Laminating</option>
                                        <option value='8'>Stitching</option>
                                        <option value='5'>Embelishment</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="flex items-center my-2">
                                    <p className="font-semibold text-xl">Size : </p>
                                    <input type="text" name='size' placeholder="Size in cm" className="input border-black border-1" required />
                                </div>
                                <div className="flex items-center my-2">
                                    <p className="font-semibold text-xl">Contact Name : </p>
                                    <input type="text" name='contact_name' placeholder="Contact Name" className="input border-black border-1" required />
                                </div>
                                <div className="flex items-center my-2">
                                    <p className="font-semibold text-xl">Contact Number : </p>
                                    <input type="number" name='contact_number' placeholder="Contact Number" className="input border-black border-1" required />
                                </div>
                                <div className="flex items-center my-2">
                                    <p className="font-semibold text-xl">Address : </p>
                                    <input type="text" name='address' placeholder="Address" className="input border-black border-1" required />
                                </div>
                            </div>
                        </div>

                        <div className="card-actions justify-center w-full">
                            <button
                                type='submit'
                                className={`btn text-black w-full bg-[#C4E1E6] ${isUploading ? 'loading' : ''}`}
                                disabled={isUploading || !isModified}
                            >
                                {isUploading ? 'Processing...' : 'Approve The Order'}
                            </button>
                        </div>
                    </form>
                </div>
            </div> */}
            {/* new order form */}
            <div className="p-6 bg-white rounded-2xl shadow-md my-6 w-full">
                <h2 className="text-center text-xl font-semibold mb-6">Order Details</h2>

                <form onSubmit={handleOrder} className="grid grid-cols-2 gap-6">

                    <div>
                        <label className="block text-sm font-medium mb-3">Name Of Order</label>
                        <input name='order_name' type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />

                        <label className="block text-sm font-medium mt-4 mb-3">Quantity</label>
                        <input type="number" name='quantity' className="w-full border border-gray-300 rounded-md px-3 py-2" />

                        <label className="block text-sm font-medium mt-4 mb-3">Paper Type</label>
                        <select name='paper_type' defaultValue="Pick a text editor" className="select select-primary">
                            <option disabled={true}>Pick A Paper Type</option>
                            <option value='1.2'>130gsm Gloss</option>
                            <option value='1'>130gsm Matt</option>
                            <option value='0.80'>130gsm Uncoated</option>
                        </select>

                        <label className="block text-sm font-medium mt-4 mb-3">Finishing Option</label>
                        <select name='finishing_option' defaultValue="Pick a text editor" className="select select-primary">
                            <option disabled={true}>Pick As You Like</option>
                            <option value='10'>Creasing</option>
                            <option value='2'>Folding</option>
                            <option value='7'>Laminating</option>
                            <option value='8'>Stitching</option>
                            <option value='5'>Embelishment</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-3">Size</label>
                        <input type="text" name='size' className="w-full border border-gray-300 rounded-md px-3 py-2" />

                        <label className="block text-sm font-medium mt-4 mb-3">Contact Name</label>
                        <input type="text" name='contact_name' className="w-full border border-gray-300 rounded-md px-3 py-2" />

                        <label className="block text-sm font-medium mt-4 mb-3">Contact Number</label>
                        <input type="text" name='contact_number' className="w-full border border-gray-300 rounded-md px-3 py-2" />

                        <label className="block text-sm font-medium mt-4 mb-3">Address</label>
                        <textarea rows="3" name='address' className="w-full border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div className="card-actions w-full col-span-2">
                        <button
                            type='submit'
                            className={`btn text-black w-full bg-[#C4E1E6] ${isUploading ? 'loading' : ''}`}
                            disabled={isUploading || !isModified}
                        >
                            {isUploading ? 'Processing...' : 'Approve The Order'}
                        </button>
                    </div>
                </form>

            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    );
};

export default BusinessCard;