import { create } from 'zustand';

const useWarehouseStore = create((set) => ({
  shelves: [],
  products: [],
  warehouse: {
    width: null,
    depth: null,
    height: null,
  },
  selectedObjectId: null,
  selectedProductId: null,
  selectObject: (objectId) => set({ selectedObjectId: objectId }),
  selectProduct: (prodId) => set({ selectedProductId: prodId }),
  deselectObject: () => set({ selectedObjectId: null }),
  deselectProduct: () => set({ selectedProductId: null }),
  setShelves: (shelves) => set({ shelves }),
  setProducts: (products) => set({ products }),
  setWarehouseDimensions: (dimensions) => set((state) => ({ warehouse: { ...state.warehouse, ...dimensions } })),
  addShelf: (shelf) => {
    set((state) => ({ shelves: [...state.shelves, shelf] }));
    set({ lastAddedShelfId: shelf.name });
  },
  updateShelfPosition: (shelfId, newX, newZ) => {
    set((state) => ({
      shelves: state.shelves.map((shelf) =>
        shelf.name === shelfId ? { ...shelf, x: newX, z: newZ } : shelf
      ),
    }));
  },
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeShelf: (shelfName) => {
    set((state) => ({
      shelves: state.shelves.filter(shelf => shelf.name !== shelfName)
    }));
  },
  removeProduct: (productName) => set((state) => ({ products: state.products.filter(product => product.name !== productName) })),

}));

export default useWarehouseStore;