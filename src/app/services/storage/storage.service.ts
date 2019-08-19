import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    static SAVED_PLACE = 'saved_place';
    static FILTER_RENTA_VENTA = 'filter_renta_venta';
    static FILTER_PRECIO_MENOR = 'filter_precio_menor';
    static FILTER_PRECIO_MAYOR = 'filter_precio_mayor';
    static FILTER_TIPO_PROPIEDAD = 'filter_tipo_propiedad';
    static FILTER_M2_CONSTRUCCION = 'filter_m2_construccion';
    static FILTER_M2_TERRENO = 'filter_m2_terreno';
    static FILTER_NIVELES = 'filter_niveles';
    static FILTER_RECAMARAS = 'filter_recamaras';
    static FILTER_BANOS = 'filter_banos';
    static FILTER_MEDIOS_BANOS = 'filter_medios_banos';
    static FILTER_CAJONES_ESTACIONAMIENT = 'filter_cajones_estacionamiento';
    static FILTER_CAPACIDAD_CISTERNA = 'filter_capacidad_cisterna';
    static FILTER_EDAD_PROPIEDAD = 'filter_edad_propiedad';
    static FILTER_AMENIDADES = 'filter_amenidades';

    constructor() {}

    saveData(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getData(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }
}
