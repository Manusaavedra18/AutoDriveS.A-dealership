"use client"

import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Image from "next/image";
import photo from "@/../public/bmw.jpg";
import { CarContext } from "@/app/context/CarContext";


const Inventory = () => {
  interface Car {
    id: number;
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

  const [carsData, setCarsData] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("any");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedFuel, setSelectedFuel] = useState<string>("any");
  const [selectedStatus, setSelectedStatus] = useState<string>("any");
  const [selectedDisponibility, setSelectedDisponibility] = useState<string>("any");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [newCarData, setNewCarData] = useState<Partial<Car>>({
    marca: "",
    modelo: "",
    anio: new Date().getFullYear(),
    precio: 0,
    color: "",
    tipo_combustible: "",
    estado: "",
    disponibilidad: "",
    kilometraje: 0,
    transmision: "",
    tipo_carroceria: "",
    motor: "",
    patente: "",
    tren_motriz: "",
    eficiencia_combustible: 0,
    color_interior: "",
    descripcion: "",
  });

  const { cars, getCars, createCar } = useContext(CarContext);


  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    setCarsData(cars || []);
    setFilteredCars(cars || []);
  }, [cars]);


  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);



  const addVehicle = async () => {



    if (newCarData.kilometraje == 0 && newCarData.estado === "usado") {
      alert("Kilometraje cannot be 0 for a used car.");
      return;
    }

    if (!newCarData.marca || !newCarData.modelo || !newCarData.anio || !newCarData.precio || !newCarData.color || !newCarData.tipo_carroceria || !newCarData.motor || !newCarData.patente || !newCarData.tren_motriz || !newCarData.eficiencia_combustible || !newCarData.color_interior || !newCarData.descripcion) {
      alert("Please complete all required fields.");
      return;
    }



    const vehicle = {
      marca: String(newCarData.marca),
      modelo: String(newCarData.modelo),
      anio: Number(newCarData.anio),
      precio: Number(newCarData.precio),
      color: String(newCarData.color || ""),
      tipo_combustible: String(newCarData.tipo_combustible || ""),
      estado: String(newCarData.estado || "nuevo"),
      disponibilidad: String(newCarData.disponibilidad || "en stock"),
      kilometraje: Number(newCarData.kilometraje),
      transmision: newCarData.transmision,
      tipo_carroceria: newCarData.tipo_carroceria,
      motor: newCarData.motor,
      patente: newCarData.patente,
      tren_motriz: newCarData.tren_motriz,
      eficiencia_combustible: newCarData.eficiencia_combustible ? Number(newCarData.eficiencia_combustible) : undefined,
      color_interior: newCarData.color_interior,
      descripcion: newCarData.descripcion,
    };

    const created = await createCar(vehicle);

    if (created) {
      getCars();
      setCarsData(cars || []);
      setFilteredCars(cars || []);
    }

    setIsOpen(false);
    setNewCarData({
      marca: "",
      modelo: "",
      anio: new Date().getFullYear(),
      precio: 0,
      color: "",
      tipo_combustible: "",
      estado: "",
      disponibilidad: "",
      kilometraje: 0,
      transmision: "",
      tipo_carroceria: "",
      motor: "",
      patente: "",
      tren_motriz: "",
      eficiencia_combustible: 0,
      color_interior: "",
      descripcion: "",
    });
  };

  const filterCars = () => {
    let updatedCars = carsData;

    if (selectedMake !== "any") {
      updatedCars = updatedCars.filter(car => String(car.marca).toLowerCase() === selectedMake);
    }

    if (selectedModel !== "") {
      updatedCars = updatedCars.filter(car => String(car.modelo).toLowerCase() === selectedModel);
    }

    if (selectedYear !== "") {
      updatedCars = updatedCars.filter(car => Number(car.anio) === Number(selectedYear));
    }

    if (selectedFuel !== "any") {
      updatedCars = updatedCars.filter(car => String(car.tipo_combustible).toLowerCase() === selectedFuel);
    }

    if (selectedStatus !== "any") {
      updatedCars = updatedCars.filter(car => String(car.estado).toLowerCase() === selectedStatus);
    }

    if (selectedDisponibility !== "any") {
      updatedCars = updatedCars.filter(car => String(car.disponibilidad).toLowerCase() === selectedDisponibility);
    }

    if (minPrice !== "") {
      updatedCars = updatedCars.filter(car => car.precio >= minPrice);
    }

    if (maxPrice !== "") {
      updatedCars = updatedCars.filter(car => car.precio <= maxPrice);
    }

    setFilteredCars(updatedCars);
  };

  return (
    <>
      <section className="text-center py-20 flex flex-col justify-center items-center px-4">
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Our Vehicle Inventory</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Browse our wide selection of quality new and pre-owned vehicles.</p>
      </section>
      <div className="mx-20 bg-white p-6 rounded-lg shadow-lg sticky">
        <h2 className="md:text-3xl text-4xl font-black mb-4 tracking-tight">Filter & Refine</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-2">Make</label>
            <select
              name="make"
              id="make"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={e => {
                setSelectedMake(e.target.value.toLowerCase());
              }}
            >
              <option value="any">Any Make</option>
              <option value="toyota">Toyota</option>
              <option value="honda">Honda</option>
              <option value="ford">Ford</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full p-2 border border-gray-300 rounded-md"
                min={0}
                onChange={e => setMinPrice(Number(e.target.value))}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full p-2 border border-gray-300 rounded-md"
                min={0}
                max={100000}
                onChange={e => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
          <div>
            <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-2">Model </label>
            <input type="text" name="model" placeholder="Model" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " onChange={e => setSelectedModel(e.target.value.toLowerCase())} />
          </div>
          <div>
            <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <input type="number" name="year" placeholder="Year" min={1900} max={new Date().getFullYear()} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 " onChange={e => setSelectedYear(Number(e.target.value))} />
          </div>
          <div>
            <label htmlFor="fuel-type" className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
            <select name="fuel-type" id="fuel-type" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={e => setSelectedFuel(e.target.value.toLowerCase())}>
              <option value="any">Any Fuel Type</option>
              <option value="nafta">Nafta</option>
              <option value="diésel">Diésel</option>
              <option value="eléctrico">Eléctrico</option>
              <option value="híbrido">Híbrido</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select name="status" id="status" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={e => setSelectedStatus(e.target.value.toLowerCase())}>
              <option value="any">Any Status</option>
              <option value="nuevo">Nuevo</option>
              <option value="usado">Usado</option>
            </select>
          </div>
          <div>
            <label htmlFor="disponibility" className="block text-sm font-medium text-gray-700 mb-2">Disponibility</label>
            <select name="disponibility" id="disponibility" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={e => setSelectedDisponibility(e.target.value.toLowerCase())}>
              <option value="any">Any Disponibility</option>
              <option value="en stock">En Stock</option>
              <option value="vendido">Vendido</option>
            </select>
          </div>
          <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md" onClick={filterCars} >Apply Filters</button>
        </div>
      </div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md flex justify-end items-center mx-20">
        <button onClick={() => setIsOpen(true)} id="register-car-btn" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md flex items-center gap-2">
          <i data-lucide="plus-circle" className="w-5 h-5"></i>
          Register New Vehicle
        </button>
      </div>

      <div id="vehicle-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mx-20">
        {filteredCars.map(car => (
          <div key={car.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 relative">
            {/* <div className="absolute top-2 right-2 flex gap-2 bg-black bg-opacity-30 p-1 rounded-md">
              <button className="modify-btn text-white hover:text-indigo-300" title="Modify"><i data-lucide="file-pen-line" className="w-5 h-5"></i></button>
              <button className="deregister-btn text-white hover:text-red-400" title="Deregister"><i data-lucide="trash-2" className="w-5 h-5"></i></button>
            </div> */}

            <Image src={photo} alt="Vehicle" className="w-full h-56 object-cover" width={400} height={300} />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">{car.anio} {car.modelo}</h3>
              <p className="text-xl font-bold mb-2">{car.marca}</p>
              <p className="text-indigo-600 font-semibold text-2xl mb-4">${car.precio}</p>
              <a href={`inventory/${car.id}`} className="w-full text-center block bg-gray-800 text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition">View Details</a>
            </div>
          </div>
        ))}

      </div>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${showContent ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`bg-white p-6 rounded-2xl shadow-lg w-[80%] text-center transform transition-all duration-300 h-[90%] ${showContent ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-semibold mb-4">Register New Vehicle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70%] overflow-y-auto">
              {/* TODO: add constants to select options */}
              <select
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                onChange={e => setNewCarData(prev => ({ ...prev, marca: e.target.value }))}
              >
                <option value="">Select Make</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
              </select>

              <input
                type="text"
                placeholder="Model"
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={e => setNewCarData(prev => ({ ...prev, modelo: e.target.value }))}
              />

              <input
                type="number"
                placeholder="Year"
                min={1900}
                max={new Date().getFullYear()}
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={e => setNewCarData(prev => ({ ...prev, anio: Number(e.target.value) }))}
              />

              <input
                type="number"
                placeholder="Price"
                min={0}
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={e => setNewCarData(prev => ({ ...prev, precio: Number(e.target.value) }))}
              />

              <input
                type="text"
                placeholder="Color"
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={e => setNewCarData(prev => ({ ...prev, color: e.target.value }))}
              />

              <select
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={e => setNewCarData(prev => ({ ...prev, tipo_combustible: e.target.value }))}
              >
                <option value="">Any Fuel</option>
                <option value="nafta">Nafta</option>
                <option value="diésel">Diésel</option>
                <option value="eléctrico">Eléctrico</option>
                <option value="híbrido">Híbrido</option>
              </select>

              <select
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                onChange={e => {
                  setNewCarData(prev => ({ ...prev, estado: e.target.value }));
                }}
              >
                <option value="nuevo">Nuevo</option>
                <option value="usado">Usado</option>
              </select>

              <select
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                onChange={e => {
                  setNewCarData(prev => ({ ...prev, disponibilidad: e.target.value }));
                }}
              >
                <option value="en stock">En Stock</option>
                <option value="vendido">Vendido</option>
              </select>

              <input
                type="number"
                placeholder="Kilometraje"
                min={0}
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={e => setNewCarData(prev => ({ ...prev, kilometraje: Number(e.target.value) }))}
              />

              <select
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={e => setNewCarData(prev => ({ ...prev, transmision: e.target.value }))}
              >
                <option value="">Select Transmission</option>
                <option value="manual">Manual</option>
                <option value="automática">Automática</option>
              </select>

              <input
                type="text"
                placeholder="Tipo de Carrocería"
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={e => setNewCarData(prev => ({ ...prev, tipo_carroceria: e.target.value }))}
              />

              <input
                type="text"
                placeholder="Motor"
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={e => setNewCarData(prev => ({ ...prev, motor: e.target.value }))}
              />

              <input
                type="text"
                placeholder="Patente"
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={e => setNewCarData(prev => ({ ...prev, patente: e.target.value }))}
              />

              <input
                type="text"
                placeholder="Tren Motriz"
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={e => setNewCarData(prev => ({ ...prev, tren_motriz: e.target.value }))}
              />

              <input
                type="number"
                placeholder="Eficiencia Combustible (km/l)"
                min={0}
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={e => setNewCarData(prev => ({ ...prev, eficiencia_combustible: Number(e.target.value) }))}
              />

              <input
                type="text"
                placeholder="Color Interior"
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={e => setNewCarData(prev => ({ ...prev, color_interior: e.target.value }))}
              />

              <textarea
                placeholder="Descripción"
                className="p-2 border border-gray-300 rounded-md w-full resize-none"
                rows={3}
                onChange={e => setNewCarData(prev => ({ ...prev, descripcion: e.target.value }))}
              ></textarea>
            </div>
            <button
              onClick={addVehicle}
              className="bg-indigo-600 text-white font-bold py-2 px-2 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md mt-4"
            >
              Add Vehicle
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Inventory;
