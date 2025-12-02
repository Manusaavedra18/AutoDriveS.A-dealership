export interface Car {
    id: string;
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

export type CarInput = Omit<Car, 'id'>