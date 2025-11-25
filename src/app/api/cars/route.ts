import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(){
    try {
        const cars = await prisma.car.findMany()
        return NextResponse.json(cars) 
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error fetching cars", error: error
            }, {status: 500}
        )
    }
}

export async function POST(req : Request){
    try {
        const car = await req.json()
        const newCar = await prisma.car.create({
            data: car
        })
        
        return NextResponse.json(
            {
                message: "Car created", car: newCar
            }
        )
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error creating car", error: error
            }, {status: 500}
        )
    }
}
