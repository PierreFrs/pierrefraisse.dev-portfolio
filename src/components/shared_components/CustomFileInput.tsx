import React, { useState, forwardRef, useImperativeHandle } from "react";
import { FiUpload } from "react-icons/fi";

type CustomFileInputProps = {
    onFileChange: (file: File | null) => void;
    inputKey?: string;
};

export const CustomFileInput = forwardRef<HTMLInputElement, CustomFileInputProps>(
    ({ onFileChange, inputKey }, ref) => {
        const [fileName, setFileName] = useState<string | null>(null);

        // Local ref for the file input element
        const inputRef = React.useRef<HTMLInputElement>(null);

        // Method to reset the file input
        useImperativeHandle(ref, () => ({
            reset: () => {
                if (inputRef.current) {
                    inputRef.current.value = ""; // Reset the file input element value
                    setFileName(null);
                }
            },
            // Also ensure the original inputRef properties are accessible
            focus: () => {
                inputRef.current?.focus();
            },
        }));

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.item(0) || null;
            setFileName(file ? file.name : null);
            onFileChange(file);
        };

        return (
            <div className="custom-file-input-wrapper">
                <label htmlFor={`file-upload-${inputKey}`} className="custom-file-label flex items-center cursor-pointer">
                    <FiUpload size={24} className="mr-2 text-gray-700" />
                    <span className="upload-text">{fileName || "Choose File"}</span>
                    <input
                        id={`file-upload-${inputKey}`}
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        ref={inputRef}
                    />
                </label>
            </div>
        );
    }
);

CustomFileInput.displayName = "CustomFileInput";
