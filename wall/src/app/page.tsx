

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Main from '@/components/Main';

export default function WallPage() {


    return (
        
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />

            <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6 mt-10 border shadow-lg">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <Main/>
            </div>
        </div>
    );
}