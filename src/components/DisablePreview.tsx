import React from 'react';
import Link from "next/link";

const DisablePreview = () => {
    return (
        <Link
            href="/api/exit-preview"
            className="fixed z-[9999] bottom-3 left-1/2 -translate-x-1/2 text-white font-bold bg-gray-900 hover:bg-gray-700 transition-all duration-300 ease-linear p-2 rounded-xl"
        >
            Désactiver le mode pré-visualisation
        </Link>
    );
};

export default DisablePreview;