export class Coordinates {
    public _lat: number;
    public _long: number;
    public isEqual(other: any) {
        if (this._long === other._long && this._lat === other._lat) {
            return true;
        }
        return false;
    }

    constructor(lat: number, long: number) {
        this._lat = lat;
        this._long = long;
    }
}

export class Propiedad {
    public id?: string;
    public latitud: number;
    public longitud: number;
    public creador: string;
    public tipoPropiedad: string;
    public nombre: string;
    public m2Construccion: number;
    public recamaras: number;
    public banos: number;
    public mediosBanos?: number;
    public cajonesEstacionamiento: number;
    public descripcion: string;
    public direccion: string;
    public precioVenta?: number;
    public precioRenta?: number;
    public m2Terreno?: number;
    public niveles?: number;
    public amenidades?: string[];
    public tiempoMinimoRenta?: number;
    public capacidadCisterna?: number;
    public edadPropiedad?: number;
    public costoMantenimiento?: number;
    public urlsFotografias?: string[];
    public coordinates?: Coordinates;
    public geoposicion?: Coordinates;
    public geohash?: string;
    public estatus: string;
    constructor() {
    }

    static verificarValoresIndefinidos(obj: Propiedad) {
        if (obj.creador === undefined) { obj.creador = null; }
        if (obj.tipoPropiedad === undefined) { obj.tipoPropiedad = null; }
        if (obj.nombre === undefined) { obj.nombre = null; }
        if (obj.m2Construccion === undefined) { obj.m2Construccion = null; }
        if (obj.recamaras === undefined) { obj.recamaras = null; }
        if (obj.banos === undefined) { obj.banos = null; }
        if (obj.mediosBanos === undefined) { obj.mediosBanos = null; }
        if (obj.cajonesEstacionamiento === undefined) { obj.cajonesEstacionamiento = null; }
        if (obj.descripcion === undefined) { obj.descripcion = null; }
        if (obj.direccion === undefined) { obj.direccion = null; }
        if (obj.precioVenta === undefined) { obj.precioVenta = null; }
        if (obj.precioRenta === undefined) { obj.precioRenta = null; }
        if (obj.m2Terreno === undefined) { obj.m2Terreno = null; }
        if (obj.niveles === undefined) { obj.niveles = null; }
        if (obj.amenidades === undefined) { obj.amenidades = []; }
        if (obj.tiempoMinimoRenta === undefined) { obj.tiempoMinimoRenta = null; }
        if (obj.capacidadCisterna === undefined) { obj.capacidadCisterna = null; }
        if (obj.edadPropiedad === undefined) { obj.edadPropiedad = null; }
        if (obj.costoMantenimiento === undefined) { obj.costoMantenimiento = null; }
        if (obj.urlsFotografias === undefined) { obj.urlsFotografias = []; }
        if (obj.coordinates === undefined) { obj.coordinates = null; }
        if (obj.geoposicion === undefined) { obj.geoposicion = null; }
        if (obj.geohash === undefined) { obj.geohash = null; }
        if (obj.estatus === undefined) { obj.estatus = null; }
    }
}
