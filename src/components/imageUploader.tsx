import type { themeTypes } from "@/types"
import { Upload, X } from "lucide-react";
import React, { useRef, useState } from "react"
import { toast } from "sonner"
import { Input } from "./ui/input";


interface ImageUploaderProps {
    onImageUploader: (imageFile: string | null) => void;
    theme: themeTypes
    styles: {
        button: string;
        border: string;
        [key: string]: string
    }
}


export default function ImageUploader({ onImageUploader, theme, styles }: ImageUploaderProps) {

    const [isDragActive, setIsDragActive] = useState(false)
    const [isPreview, setIsPreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)


    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true)
        if (e.type === "dragleave") setIsDragActive(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragActive(false)
        handleFile(e.dataTransfer.files[0])
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        handleFile(e.target.files![0])
    }

    const handleButtonClick = () => { fileInputRef.current?.click() }

    const handleFile = (file: File) => {
        if (!file.type.match("image.*")) return toast.error("Please select an image file");

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setIsPreview(result);
            onImageUploader(result);
        };
        reader.readAsDataURL(file);
    };

    const imageRemover = () => {
        setIsPreview(null)
        onImageUploader(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const getUploadAreaClasses = () => {
        const baseClasses = `border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-white'
            }`;

        if (isDragActive) {
            return `${baseClasses} ${theme === 'purple'
                ? 'border-purple-500 bg-purple-50'
                : theme === 'dark'
                    ? 'border-amber-500 bg-slate-600'
                    : 'border-blue-400 bg-blue-50'
                }`;
        }

        return `${baseClasses} ${styles.border} hover:bg-gray-50 ${theme === 'dark' ? 'hover:bg-slate-600' : ''
            }`;
    };


    return (
        <div>
            <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
            />

            <div
                className={getUploadAreaClasses()}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={handleButtonClick}
                style={{ cursor: 'pointer' }}
            >
                {isPreview ? (
                    <div className="relative">
                        <img
                            src={isPreview}
                            alt="Preview"
                            className="max-h-36 mx-auto object-contain rounded"
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                imageRemover();
                            }}
                            className={`absolute -top-3 -right-3 p-1 rounded-full ${theme === 'purple'
                                ? 'bg-purple-500'
                                : theme === 'dark'
                                    ? 'bg-amber-500'
                                    : 'bg-blue-500'
                                } text-white`}
                        >
                            <X size={16} />
                        </button>
                        <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            Click to change image
                        </p>
                    </div>
                ) : (
                    <>
                        <Upload className={`mx-auto h-12 w-12 ${theme === 'dark' ? 'text-amber-500' : theme === 'purple' ? 'text-purple-500' : 'text-blue-500'}`} />
                        <p className={`mt-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                            Drop an image here
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            or click to upload
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}