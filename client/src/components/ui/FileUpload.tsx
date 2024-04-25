import { IconPhoto } from "@tabler/icons-react";
import React from "react";

type FileUploadProps = {
    preview?: string;
    children: React.ReactNode;
};

const FileUpload = (props: FileUploadProps) => {
    const { children, preview } = props;

    return (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center flex gap-5 items-center">
                {preview ? (
                    <img className="h-28 w-28 object-cover rounded-md" src={preview} alt={preview} />
                ) : (
                    <IconPhoto className="h-28 w-28" />
                )}
                <div className=" gap-2 flex flex-col text-sm leading-6 items-center text-gray-600">
                    <label className="relative cursor-pointer font-semibold text-indigo-600 outline-none">
                        <span>Upload a file</span>
                        {children}
                    </label>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;