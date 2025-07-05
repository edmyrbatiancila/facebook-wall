import { Card, CardContent } from "./ui/card";

const Sidebar = () => {
    return (
        <div className="lg:col-span-1 space-y-6">
            <Card className="border-2 border-gray-300">
                <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-4">Information</h3>
                    <div className="space-y-3">
                        <div>
                            <h4 className="font-medium text-gray-700">Networks</h4>
                            <p className="text-gray-600">Stanford Alum</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Current City</h4>
                            <p className="text-gray-600">Palo Alto, CA</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Sidebar;