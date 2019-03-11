export class Propiedad {
    // información básica
    tipo_propiedad: string;
    nombre: string;
    m2_construccion: number;
    recamaras: number;
    banos: number;
    medios_banos: number;
    cajones_estacionamiento: number;
    descripcion: string;
    precio_venta: number;
    precio_renta: number;

    // información avanzada
    m2_terreno: number;
    niveles: number;
    amenidades: string;
    tiempo_minimo_renta: number;
    capacidad_cisterna: number;
    edad_propiedad: number;
    costo_mantenimiento: number;

    urls_fotografias: [string];
}