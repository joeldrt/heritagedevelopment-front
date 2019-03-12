export class PropiedadObj implements Propiedad {
    public id: string;
    public user_uid: string;
    public tipo_propiedad: string;
    public nombre: string;
    public m2_construccion: number;
    public recamaras: number;
    public banos: number;
    public medios_banos: number;
    public cajones_estacionamiento: number;
    public descripcion: string;
    public direccion: string;
    public precio_venta: number;
    public precio_renta: number;
    public m2_terreno: number;
    public niveles: number;
    public amenidades: string;
    public tiempo_minimo_renta: number;
    public capacidad_cisterna: number;
    public edad_propiedad: number;
    public costo_mantenimiento: number;
    public urls_fotografias: string[];
    constructor(){
        // this.user_uid = "";
        // this.tipo_propiedad = "";
        // this.nombre = "";
        // this.m2_construccion = 0;
        // this.recamaras = 0;
        // this.banos = 0;
        // this.medios_banos = 0;
        // this.cajones_estacionamiento = 0;
        // this.descripcion = "";
        // this.precio_venta = 0;
        // this.precio_renta = 0;
        // this.m2_terreno = 0;
        // this.niveles = 0;
        // this.amenidades = "";
        // this.tiempo_minimo_renta = 0;
        // this.capacidad_cisterna = 0;
        // this.edad_propiedad = 0;
        // this.costo_mantenimiento = 0;
        // this.urls_fotografias = [];
    }

    verificarValoresIndefinidos() {
        if (this.user_uid === undefined) this.user_uid = "";
        if (this.tipo_propiedad === undefined) this.tipo_propiedad = "";
        if (this.nombre === undefined) this.nombre = "";
        if (this.m2_construccion === undefined) this.m2_construccion = 0;
        if (this.recamaras === undefined) this.recamaras = 0;
        if (this.banos === undefined) this.banos = 0;
        if (this.medios_banos === undefined) this.medios_banos = 0;
        if (this.cajones_estacionamiento === undefined) this.cajones_estacionamiento = 0;
        if (this.descripcion === undefined) this.descripcion = "";
        if (this.direccion === undefined) this.direccion = "";
        if (this.precio_venta === undefined) this.precio_venta = 0;
        if (this.precio_renta === undefined) this.precio_renta = 0;
        if (this.m2_terreno === undefined) this.m2_terreno = 0;
        if (this.niveles === undefined) this.niveles = 0;
        if (this.amenidades === undefined) this.amenidades = "";
        if (this.tiempo_minimo_renta === undefined) this.tiempo_minimo_renta = 0;
        if (this.capacidad_cisterna === undefined) this.capacidad_cisterna = 0;
        if (this.edad_propiedad === undefined) this.edad_propiedad = 0;
        if (this.costo_mantenimiento === undefined) this.costo_mantenimiento = 0;
        if (this.urls_fotografias === undefined) this.urls_fotografias = [];
    }
}

export interface Propiedad {
    id?: string;
    user_uid: string;
    tipo_propiedad: string;
    nombre: string;
    m2_construccion: number;
    recamaras: number;
    banos: number;
    medios_banos?: number;
    cajones_estacionamiento: number;
    descripcion: string;
    direccion: string;
    precio_venta?: number;
    precio_renta?: number;

    // información avanzada
    m2_terreno?: number;
    niveles?: number;
    amenidades?: string;
    tiempo_minimo_renta?: number;
    capacidad_cisterna?: number;
    edad_propiedad?: number;
    costo_mantenimiento?: number;

    urls_fotografias?: string[];
}