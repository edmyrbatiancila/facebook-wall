import React from "react";

interface EmptyStateProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    children,
    title,
    subtitle,
    icon
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 m-2">
            <div className="text-center max-w-md">
                <div className="flex justify-center mb-4">
                    { icon }
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{ title }</h3>
                <p className="text-sm text-gray-500 mb-6">
                    { subtitle }
                </p>
                { children }
            </div>
        </div>
    );
}

export default EmptyState;