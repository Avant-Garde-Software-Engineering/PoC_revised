import * as THREE from 'three';
import * as BufferGeometryUtils from './BufferGeometryUtils';

/***********************************************/
/************ CLASSE BIN *********************/
/***********************************************/

class Bin {
    constructor(width, height, depth) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.content = null; // Contenuto del bin (oggetto tridimensionale)
        this.isEmpty = true; // Flag per indicare se il bin è vuoto o meno
    }
}

/***********************************************/
/******** CLASSE GEOMETRIA SCAFFALATURA ********/
/***********************************************/

/**
 * @class ShelfGeometryBuilder Rappresenta e costruisce la geometria della scaffalatura in 3-dimensioni con profondità massima di 1 [bin] e statica
 */
class ShelfGeometryBuilder {
    #_binCols;
    #_binRows;
    #_width;
    #_height;

    #_bins = [];
    /**
	 * @type {THREE.BufferGeometry}
	 */
    #_geometry = null;

    static #_maxWidth = Number.POSITIVE_INFINITY;
    static #_maxHeight = Number.POSITIVE_INFINITY;
    #_binDimensions = {
        width: 2,
        height: 2,
        depth: 2
    };
    static #_planeHeight = 0.2;
    static #_legWidth = 0.2;
    static #_legDepth = 0.2;

    /**
     * 
     * @param {number} binCols Numero di colonne della scaffalatura in [bin]
     * @param {number} binRows Numero di righe della scaffalatura in [bin]
     */
    constructor(binCols, binRows, binSize) {
        this.#_setupDimensions(binCols, binRows, binSize);
        this.#_buildGeometry();
    }

    /**
     * Imposta le dimensioni della scaffalatura a partire dai parametri indicati
     * @param {number} binCols Numero di colonne della scaffalatura in [bin]
     * @param {number} binRows Numero di righe della scaffalatura in [bin]
     */
    #_setupDimensions(binCols, binRows, binSize) {
        if(binCols <= 0 || binRows <= 0) {
            throw new Error("Dimensioni impossibili per scaffalatura");
        }
        this.#_binDimensions.width = binSize;
        this.#_binDimensions.height = binSize;
        this.#_binDimensions.depth = binSize;
        this.#_binCols = binCols;
        this.#_binRows = binRows;
        this.#_width = this.#_binCols * this.#_binDimensions.width;
        this.#_height = this.#_binRows * this.#_binDimensions.height + ShelfGeometryBuilder.#_planeHeight;
        if(this.#_width > ShelfGeometryBuilder.#_maxWidth || this.#_height > ShelfGeometryBuilder.#_maxHeight) {
            throw new Error("Le dimensioni per la scaffalatura eccedono i massimi valori impostati");
        }
    }

    /**
	 * Costruisce la figura 3D della scaffalatura
	 */
    #_buildGeometry() {
        let depth = this.#_binDimensions.depth;

        let geometriesArray = [];
        for (let rowIndex = 0; rowIndex < this.#_binRows+1; rowIndex++) {
            for (let colIndex = 0; colIndex < this.#_binCols; colIndex++) {
                // Adding plane geometry
                let geometry = new THREE.BoxGeometry( this.#_binDimensions.width, ShelfGeometryBuilder.#_planeHeight, depth );
                geometry.translate(this.#_binDimensions.width * (colIndex-0.5*this.#_binCols) + this.#_binDimensions.width/2 , this.#_binDimensions.height * rowIndex + ShelfGeometryBuilder.#_planeHeight / 2, 0);
                geometriesArray.push(geometry);
            }
        }
		
        const frontLeftLegGeo = new THREE.BoxGeometry( ShelfGeometryBuilder.#_legWidth, this.#_height, ShelfGeometryBuilder.#_legDepth );
        frontLeftLegGeo.translate(-(this.#_width / 2 - ShelfGeometryBuilder.#_legWidth), (this.#_height / 2), (depth / 2 - ShelfGeometryBuilder.#_legDepth));
        geometriesArray.push(frontLeftLegGeo);

        const frontRightLegGeo = new THREE.BoxGeometry( ShelfGeometryBuilder.#_legWidth, this.#_height, ShelfGeometryBuilder.#_legDepth );
        frontRightLegGeo.translate((this.#_width / 2 - ShelfGeometryBuilder.#_legWidth), (this.#_height / 2), (depth / 2 - ShelfGeometryBuilder.#_legDepth));
        geometriesArray.push(frontRightLegGeo);

        const backLeftLegGeo = new THREE.BoxGeometry( ShelfGeometryBuilder.#_legWidth, this.#_height, ShelfGeometryBuilder.#_legDepth );
        backLeftLegGeo.translate(-(this.#_width / 2 - ShelfGeometryBuilder.#_legWidth), (this.#_height / 2), -(depth / 2 - ShelfGeometryBuilder.#_legDepth));
        geometriesArray.push(backLeftLegGeo);

        const backRightLegGeo = new THREE.BoxGeometry( ShelfGeometryBuilder.#_legWidth, this.#_height, ShelfGeometryBuilder.#_legDepth );
        backRightLegGeo.translate((this.#_width / 2 - ShelfGeometryBuilder.#_legWidth), (this.#_height / 2), -(depth / 2 - ShelfGeometryBuilder.#_legDepth));
        geometriesArray.push(backRightLegGeo);
        
        this.#_geometry = BufferGeometryUtils.mergeGeometries(geometriesArray);
    }

    /**
     * Rimuovere la scaffalatura
     * @param {Object} object - Scaffalatura da rimuovere
     */
    
    
    removeShelf() {
        for(let i = 0; i < this.#_binCols; i++) {
            for(let j = 0; j < this.#_binRows; j++) {
                if(this.#_bins[i][j].isEmpty == false) {
                    return false;
                }
            }
        }

        if (this.#_geometry !== null) {
            this.#_geometry.dispose();
            this.#_geometry = null;
            return true
        }
        return true
    }

    
    get rows() {
        return this.#_binRows;
    }

    get cols() {
        return this.#_binCols;
    }


    /**
     * @returns {THREE.BufferGeometry}
     */
    get geometry() {
        return this.#_geometry;
    }

    /**
     * @returns {number}
     */
    get width() {
        return this.#_width;
    }

    /**
     * @returns {number}
     */
    get height() {
        return this.#_height;
    }

    
    /**
     * @returns {number}
     */
    get depth() {
        return this.#_binDimensions.depth;
    }

    /**
     * @returns {number}
     */
    static get maxWidth() {
        return ShelfGeometryBuilder.#_maxWidth;
    }

    /**
     * @returns {number}
     */
    static get maxHeight() {
        return ShelfGeometryBuilder.#_maxHeight;
    }

    /**
     * @param {number} value Valore da impostare come massima lunghezza
     */
    static set maxWidth(value) {
        ShelfGeometryBuilder.#_maxWidth = value;
    }

    /**
     * @param {number} value Valore da impostare come massima altezza
     */
    static set maxHeight(value) {
        ShelfGeometryBuilder.#_maxHeight = value;
    }

    /**
     * @param {number} value Valore da impostare come lunghezza del bin
     */
    set binWidth(value) {
        this.#_binDimensions.width = value;
    }

    /**
     * @param {number} value Valore da impostare come altezza del bin
     */
    set binHeight(value) {
        this.#_binDimensions.height = value;
    }

    /**
     * @param {number} value Valore da impostare come profondità del bin
     */
    set binDepth(value) {
        this.#_binDimensions.depth = value;
    }
}

export { ShelfGeometryBuilder }