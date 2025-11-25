import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Prisma } from "../../../../../generated/prisma/client"


interface Params {params : {id: string}}

export async function GET(req : Request, { params } : Params){
    try {

        const resolvedParams = (await params) as { id: string }
        const id = Number(resolvedParams.id)

        if (!id) {
            return NextResponse.json(
                {
                    message: "Car ID is required"
                }, {status: 400}
            )
        }

        const car = await prisma.car.findFirst({
            where: {
                id: id
            }
        })

        if (!car) {
            return NextResponse.json(
                {
                    message: "Car not found"
                }, {status: 404}
            )
        }

        return NextResponse.json(car)
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error fetching car", error: error
            }, {status: 500}
        ) 
    }
}

export async function PUT(req : Request, {params} : Params){
    try {
        const resolvedParams = (await params) as { id: string }
        const id = Number(resolvedParams.id)

        if (!id) {
            return NextResponse.json(
                {
                    message: "Car ID is required"
                }, {status: 400}
            )
        }

        const carData = await req.json()
        const updatedCar = await prisma.car.update({
            where: {
                id: id
            },
            data: carData
        })

        return NextResponse.json(updatedCar)
        
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === 'P2025') {
                return NextResponse.json(
                    {
                        message: "Car not found"
                    }, {status: 404}
                )
            }

            return NextResponse.json(
                {
                    message: "Error updating car", error: error
                }, {status: 500}
            )
        }
    }
}

export async function DELETE(req : Request, {params} : Params) {
    try {
        const resolvedParams = (await params) as { id: string }
        const id = Number(resolvedParams.id)

        if (!id) {
            return NextResponse.json(
                {
                    message: "Car ID is required"
                }, {status: 400}
            )
        }

        const deletedCar = await prisma.car.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({message: "Car deleted successfully", car: deletedCar})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === 'P2025') {
                return NextResponse.json(
                    {
                        message: "Car not found"
                    }, {status: 404}
                )
            }

            return NextResponse.json(
                {
                    message: "Error updating car", error: error
                }, {status: 500}
            )
        }
    }
}