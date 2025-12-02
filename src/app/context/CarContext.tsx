"use client"

import { createContext, useEffect, useState } from "react"
import { Car, CarInput } from "../interfaces/Car";

export const CarContext = createContext<{
    cars: Car[],
    isLoading: boolean,
    getCars: () => Promise<void>,
    createCar: (car: CarInput) => Promise<CarInput | null>,
    deleteCar: (id: string) => Promise<void>
}>({
    cars: [],
    isLoading: false,
    getCars: async () => {},
    createCar: async () => null,
    deleteCar: async () => {}
})

export const CarProvider = ({ children } : { children: React.ReactNode }) => {
    const [cars, setCars] = useState<Car[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    async function getCars() {
        try {
            setIsLoading(true)
            const res = await fetch('/api/cars')
            const data = await res.json()
            setCars(data)
        } catch (error) {
            console.error('Error fetching cars', error)
            setCars([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCars();
    }, []);

    async function createCar(car: CarInput) {
        const res = await fetch('/api/cars', {
            method: 'POST',
            body: JSON.stringify(car),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.ok) {
            const newCar = await res.json();
            setCars(prevCars => [...prevCars, newCar]);
            return newCar;
        }
    }

    async function deleteCar(id: string) {
        const res = await fetch(`/api/cars/${id}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            setCars(cars.filter(car => car.id !== id));
        }
    }

    return <CarContext.Provider value={{cars, isLoading, getCars, createCar, deleteCar}}>
        {children}
    </CarContext.Provider>
}