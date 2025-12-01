"use client"

import React from "react"
import { useContext } from "react"
import { CarContext } from "@/app/context/CarContext";


const DetailsPage = ({ params }: { params: { cardetail: string } }) => {
    const { cars, isLoading } = useContext(CarContext)
    const carId = Number(params.cardetail)
    const car = cars.find((car) => Number(car.id) === carId)

    if (isLoading) {
        return <div>Cargando...</div>
    }

    return (
        <div>
            {car ? (
                <div className="container mx-auto px-6 py-12">
                    <nav className="text-sm mb-8">
                        <span className="text-gray-600 hover:text-indigo-600">Home</span>
                        <span className="mx-2">/</span>
                        <span className="text-gray-600 hover:text-indigo-600">Inventory</span>
                        <span className="mx-2">/</span>
                        <span className="text-gray-800 font-semibold">{car.anio} {car.modelo}</span>
                    </nav>

                    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3">
                                <img
                                    id="main-image"
                                    src="https://placehold.co/800x600/3498db/ffffff?text=Civic+Front"
                                    alt="Main car view"
                                    className="w-full h-auto rounded-lg shadow-md mb-4"
                                />

                                <div className="grid grid-cols-5 gap-2">
                                    <img
                                        src="https://placehold.co/150x113/3498db/ffffff?text=Civic+Front"
                                        alt="Thumbnail 1"
                                        className="thumbnail active rounded w-full"
                                        data-src="https://placehold.co/800x600/3498db/ffffff?text=Civic+Front"
                                    />
                                    <img
                                        src="https://placehold.co/150x113/2ecc71/ffffff?text=Side"
                                        alt="Thumbnail 2"
                                        className="thumbnail rounded w-full"
                                        data-src="https://placehold.co/800x600/2ecc71/ffffff?text=Side+View"
                                    />
                                    <img
                                        src="https://placehold.co/150x113/e74c3c/ffffff?text=Rear"
                                        alt="Thumbnail 3"
                                        className="thumbnail rounded w-full"
                                        data-src="https://placehold.co/800x600/e74c3c/ffffff?text=Rear+View"
                                    />
                                    <img
                                        src="https://placehold.co/150x113/f1c40f/ffffff?text=Interior"
                                        alt="Thumbnail 4"
                                        className="thumbnail rounded w-full"
                                        data-src="https://placehold.co/800x600/f1c40f/ffffff?text=Interior"
                                    />
                                    <img
                                        src="https://placehold.co/150x113/9b59b6/ffffff?text=Engine"
                                        alt="Thumbnail 5"
                                        className="thumbnail rounded w-full"
                                        data-src="https://placehold.co/800x600/9b59b6/ffffff?text=Engine"
                                    />
                                </div>
                            </div>

                            <div className="lg:col-span-2">
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">{car.modelo}</h1>
                                <p className="text-indigo-600 font-bold text-4xl mb-6">${car.precio}</p>

                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6 border-t border-b py-4">
                                    <div className="flex items-center gap-2">
                                        {/* TODO: Add Simbols */}
                                        <i data-lucide="gauge-circle" className="text-indigo-500"></i>
                                        <span><strong>Kilometer:</strong> {car.kilometraje} km</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i data-lucide="cog" className="text-indigo-500"></i>
                                        <span><strong>Transmission:</strong> {car.transmision}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i data-lucide="fuel" className="text-indigo-500"></i>
                                        <span><strong>Fuel:</strong> {car.tipo_combustible}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i data-lucide="car" className="text-indigo-500"></i>
                                        <span><strong>Body Type:</strong> {car.tipo_carroceria}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i data-lucide="palette" className="text-indigo-500"></i>
                                        <span><strong>Exterior:</strong> {car.color}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i data-lucide="sliders-horizontal" className="text-indigo-500"></i>
                                        <span><strong>Engine:</strong> {car.motor}</span>
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-6">
                                    {car.descripcion}
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 border-t pt-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Vehicle Specifications</h2>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex justify-between py-2 border-b">
                                        <span className="font-semibold">Patente</span>
                                        <span>{car.patente}</span>
                                    </li>
                                    <li className="flex justify-between py-2 border-b">
                                        <span className="font-semibold">Tren Motriz</span>
                                        <span>{car.tren_motriz}</span>
                                    </li>
                                    <li className="flex justify-between py-2 border-b">
                                        <span className="font-semibold">Eficiencia combustible(km/l)</span>
                                        <span>{car.eficiencia_combustible}</span>
                                    </li>
                                    <li className="flex justify-between py-2">
                                        <span className="font-semibold">Color interior</span>
                                        <span>{car.color_interior}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Car not found</div>
            )}
        </div>
    );
};

export default DetailsPage;
