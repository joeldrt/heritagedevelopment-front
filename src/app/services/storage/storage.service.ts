import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    static SAVED_PLACE = 'saved_place';

    constructor() {}

    saveData(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getData(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }
}
