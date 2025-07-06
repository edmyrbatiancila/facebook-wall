import { Search } from "lucide-react";
import { Input } from "./ui/input";

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4 shadow-lg">
            <div className="max-w-6xl mx-auto">
                <section className="flex items-center justify-between">
                    <div>
                        <span className="text-xl">The Wall Social Media</span>
                    </div>
                    <div className="relative">
                        <Input type="text" placeholder="Search.." className="w-[300px]" />
                        <Search size={ 16 } className="absolute top-2 right-2"/>
                    </div>
                    <div>
                        <ul className="flex gap-4">
                            <li>Profile</li>
                            <li>Logout</li>
                        </ul>
                    </div>
                </section>
                
            </div>
            
        </header>
    );
}

export default Header;