// api/businessLogic/warehouseLogic.js
import { warehouse_geometry } from './warehouse_geometry.js';

// Modulo per la logica di business relativa ai magazzini
export function createWarehouse(width, depth, height) {
    console.log('Creazione del magazzino:', { width, depth, height });
    const warehouse = new warehouse_geometry(width, depth, height);
    console.log('Magazzino creato:', warehouse);
    return warehouse;
}

export function createShelf() {

}