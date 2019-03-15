export class PropiedadObj implements Propiedad {
    public id?: string;
    public user_uid: string;
    public tipo_propiedad: string;
    public nombre: string;
    public m2_construccion: number;
    public recamaras: number;
    public banos: number;
    public medios_banos?: number;
    public cajones_estacionamiento: number;
    public descripcion: string;
    public direccion: string;
    public precio_venta?: number;
    public precio_renta?: number;
    public m2_terreno?: number;
    public niveles?: number;
    public amenidades?: string;
    public tiempo_minimo_renta?: number;
    public capacidad_cisterna?: number;
    public edad_propiedad?: number;
    public costo_mantenimiento?: number;
    public urls_fotografias?: string[];
    public mapaDeImagenes?: Map<string, string | ArrayBuffer>;
    constructor(){
    }

    static verificarValoresIndefinidos(obj: PropiedadObj) {
        if (obj.user_uid === undefined) obj.user_uid = "";
        if (obj.tipo_propiedad === undefined) obj.tipo_propiedad = "";
        if (obj.nombre === undefined) obj.nombre = "";
        if (obj.m2_construccion === undefined) obj.m2_construccion = 0;
        if (obj.recamaras === undefined) obj.recamaras = 0;
        if (obj.banos === undefined) obj.banos = 0;
        if (obj.medios_banos === undefined) obj.medios_banos = 0;
        if (obj.cajones_estacionamiento === undefined) obj.cajones_estacionamiento = 0;
        if (obj.descripcion === undefined) obj.descripcion = "";
        if (obj.direccion === undefined) obj.direccion = "";
        if (obj.precio_venta === undefined) obj.precio_venta = 0;
        if (obj.precio_renta === undefined) obj.precio_renta = 0;
        if (obj.m2_terreno === undefined) obj.m2_terreno = 0;
        if (obj.niveles === undefined) obj.niveles = 0;
        if (obj.amenidades === undefined) obj.amenidades = "";
        if (obj.tiempo_minimo_renta === undefined) obj.tiempo_minimo_renta = 0;
        if (obj.capacidad_cisterna === undefined) obj.capacidad_cisterna = 0;
        if (obj.edad_propiedad === undefined) obj.edad_propiedad = 0;
        if (obj.costo_mantenimiento === undefined) obj.costo_mantenimiento = 0;
        if (obj.urls_fotografias === undefined) obj.urls_fotografias = [];
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
    mapaDeImagenes?: Map<string, string | ArrayBuffer>;
}