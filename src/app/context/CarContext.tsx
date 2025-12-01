"use client"

import { createContext, useEffect, useState } from "react"

interface Car {
    marca: string;
    modelo: string;
    anio: number;
    precio: number;
    color: string;
    tipo_combustible: string;
    estado: string;
    disponibilidad: string;
    kilometraje?: number;
    transmision?: string;
    tipo_carroceria?: string;
    motor?: string;
    patente?: string;
    tren_motriz?: string;
    eficiencia_combustible?: number;
    color_interior?: string;
    descripcion?: string;
  }

export const CarContext = createContext<{
    cars: any[],
    isLoading: boolean,
    getCars: () => Promise<void>,
    createCar: (car: any) => Promise<any>
}>({
    cars: [],
    isLoading: false,
    getCars: async () => {},
    createCar: async () => null
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

    async function createCar(car: Car) {
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

    return <CarContext.Provider value={{cars, isLoading, getCars, createCar}}>
        {children}
    </CarContext.Provider>
}