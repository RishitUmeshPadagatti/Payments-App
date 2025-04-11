import React, { useEffect, useState } from 'react';
const storeTypes = ['All', 'CAFE', 'BAKERY', 'BOOKSTORE', 'PLANT', 'STATIONARY'];

export const Dashboard = () => {

    const [stores, setStores] = useState([])
    console.log(stores);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const res = await fetch("http://localhost:3000/")
                const data = await res.json()
                setStores(data)
            } catch (error) {
                console.error("Error fetching stores:", error)
            }
        }

        fetchStores()
    }, [])

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');

    const filteredStores = stores.filter(store => {
        const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'All' || store.type === selectedType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-md px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center flex-1">
                        <div className="flex items-center mr-8">
                            <svg className="h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <div className="ml-3">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Boutique</h1>
                                <p className="text-xs text-gray-500 -mt-1">Discover Local Gems</p>
                            </div>
                        </div>
                        <div className="w-3/4 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search stores..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="relative ml-4">
                        <select
                            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            {storeTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Store Cards */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredStores.map((store, index) => (
                        <div
                            key={store.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
                        >
                            <img
                                src={store.landscapePicture}
                                alt={store.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <div className="flex items-center space-x-3 mb-3">
                                    <img
                                        src={store.profilePicture}
                                        alt={store.name}
                                        className="w-10 h-10 rounded-full object-cover border"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {store.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm">{store.type}</p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <svg
                                            className="h-4 w-4 mr-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        {store.phone}
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            className="h-4 w-4 mr-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 12a4 4 0 01-8 0m8 0a4 4 0 01-8 0m8 0V7a4 4 0 00-8 0v5m8 0v4a4 4 0 01-8 0v-4"
                                            />
                                        </svg>
                                        {store.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}