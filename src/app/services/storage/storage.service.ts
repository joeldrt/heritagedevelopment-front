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

    constructor() {}

    saveData(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getData(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }
}
