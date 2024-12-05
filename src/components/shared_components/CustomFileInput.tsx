import { useState } from "react";
import { FiUpload } from "react-icons/fi";

// Define the component props type
type CustomFileInputProps = {
    onFileChange: (file: File | null) => void;
};

// Create a functional component for CustomFileInput
export function CustomFileInput({ onFileChange }: Readonly<CustomFileInputProps>) {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0) || null;
        setFileName(file ? file.name : null);
        onFileChange(file);
    };

    return (
        <div className="custom-file-input-wrapper">
            <label htmlFor="file-upload" className="custom-file-label flex items-center cursor-pointer">
                <FiUpload size={24} className="mr-2 text-gray-700" />
                <span className="upload-text">{fileName || "Choose File"}</span>
                <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>
        </div>
    );
}