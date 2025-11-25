import { NextResponse } from "next/server"

export async function GET(){
    return NextResponse.json({message: "Getting cars"})
}

export async function POST(){
    return NextResponse.json({message: "Creating a car"})
}