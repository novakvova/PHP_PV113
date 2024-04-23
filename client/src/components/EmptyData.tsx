import { IconMoodEmpty } from "@tabler/icons-react";
import React from "react";

const EmptyData: React.FC = () => {
    return (
        <div className="flex  w-full gap-5 items-center justify-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50">
            <IconMoodEmpty />
            <div>
                <span className="font-medium">Items not found!</span> Change a few things up and try submitting again.
            </div>
        </div>
    );
};

export default EmptyData;