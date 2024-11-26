import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaArrowLeft, FaArrowRight, FaUpload } from 'react-icons/fa';

const SliderAddImages = () => {
    const [images, setImages] = useState([
        { id: 1, src: '/assets/images/image1.jpg', selected: false, order: null },
        { id: 2, src: '/assets/images/image2.jpg', selected: false, order: null },
        { id: 3, src: '/assets/images/image3.jpg', selected: false, order: null },
    ]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [tempImages, setTempImages] = useState([]);

    // Load images from local storage on component mount
    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem('sliderImages')) || [];
        if (storedImages.length) setImages(storedImages);
    }, []);

    // Save images to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('sliderImages', JSON.stringify(images));
    }, [images]);

    const selectedImages = images.filter((image) => image.selected).sort((a, b) => a.order - b.order);

    // Handle image selection
    const handleSelectImage = (id) => {
        setImages((prevImages) =>
            prevImages.map((img) =>
                img.id === id
                    ? {
                          ...img,
                          selected: !img.selected,
                          order: img.selected ? null : Math.max(0, ...prevImages.map((i) => i.order || 0)) + 1,
                      }
                    : img
            )
        );
    };

    // Navigate through selected images
    const handleArrowClick = (direction) => {
        setCurrentImageIndex((prevIndex) => (direction === 'left' ? (prevIndex - 1 + selectedImages.length) % selectedImages.length : (prevIndex + 1) % selectedImages.length));
    };

    // Handle adding new images
    const handleAddImage = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file, index) => ({
            id: Date.now() + index,
            src: URL.createObjectURL(file), // For preview
            file, // Include the actual file
            selected: false,
            order: null,
        }));
        setTempImages(newImages);
        setShowModal(false); // Close modal
        setConfirmationModal(true); // Open confirmation modal
    };

    // Confirm new images
    const confirmAddImages = async () => {
        try {
            const formData = new FormData();
            formData.append('images', tempImages[0].file);

            console.log(tempImages);

            const response = await axios.post('http://localhost:3000/api/v1/slider-image', formData);

            if (response.ok) {
                const result = await response.json();
                console.log('Images uploaded:', result);

                // Update images state with backend response if needed
                setImages((prevImages) => [...prevImages, ...tempImages]);
                setTempImages([]); // Clear temp storage
                setConfirmationModal(false); // Close modal
            } else {
                console.error('Failed to upload images:', response.statusText);
                alert('Failed to upload images');
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Error uploading images');
        }
    };

    // Cancel new images
    const cancelAddImages = () => {
        setTempImages([]); // Discard temporary images
        setConfirmationModal(false); // Close confirmation modal
    };

    // Delete selected images
    const handleDeleteSelected = () => {
        setImages((prevImages) => prevImages.filter((img) => !img.selected));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Slider Image Manager</h1>

            {/* Slider Preview */}
            <div className="relative p-4 rounded-md shadow-md mb-6 border">
                {selectedImages.length > 0 ? (
                    <>
                        <button onClick={() => handleArrowClick('left')} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md">
                            <FaArrowLeft />
                        </button>
                        <img src={selectedImages[currentImageIndex]?.src} alt={`Slide ${currentImageIndex + 1}`} className="mx-auto max-h-64 object-contain" />
                        <button onClick={() => handleArrowClick('right')} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md">
                            <FaArrowRight />
                        </button>
                    </>
                ) : (
                    <p className="text-center text-gray-600">No images selected for the slider.</p>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4">
                <button onClick={() => setShowModal(true)} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md">
                    <FaPlus className="inline mr-2" />
                    Add New
                </button>
                <button onClick={handleDeleteSelected} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md shadow-md">
                    <FaTrash className="inline mr-2" />
                    Delete Selected
                </button>
            </div>

            {/* Initial Images Section */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">All Images</h2>
                <div className="grid grid-cols-4 gap-4">
                    {images.map((image) => (
                        <div key={image.id} className="relative border p-2 rounded-md">
                            <img src={image.src} alt={`Image ${image.id}`} className="w-full h-32 object-cover rounded-md" />
                            <button onClick={() => handleSelectImage(image.id)} className={`absolute inset-0 ${image.selected ? 'border-4 border-blue-500' : ''}`}></button>
                            {image.selected && <div className="absolute top-2 right-2 bg-blue-500 text-white text-sm px-2 py-1 rounded-full">{image.order}</div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Confirmation Modal */}
            {confirmationModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Confirm Upload</h2>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {tempImages.map((img) => (
                                <img key={img.id} src={img.src} alt="Uploaded" className="h-20 w-full object-cover rounded-md" />
                            ))}
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button onClick={cancelAddImages} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md">
                                Cancel
                            </button>
                            <button onClick={confirmAddImages} className="bg-black hover:bg-black text-white px-4 py-2 rounded-md">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white text-black p-6 rounded-md shadow-lg w-[350px] flex flex-col items-center">
                        <div className="text-center">
                            {/* Upload Icon in Black */}
                            <FaUpload className="text-5xl text-black mb-4" />
                            <h2 className="text-lg font-bold mb-4">Upload Images</h2>
                            {/* Upload Button in Black */}
                            <label htmlFor="fileUpload" className="cursor-pointer bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md shadow-md">
                                Choose Files
                            </label>
                            <input id="fileUpload" type="file" multiple accept="image/*" onChange={handleAddImage} className="hidden" />
                        </div>
                        <div className="flex justify-end w-full mt-6">
                            <button onClick={() => setShowModal(false)} className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md shadow-sm">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SliderAddImages;
