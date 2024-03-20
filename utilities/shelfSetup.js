export const displayShelfForm = () => {
    const setupShelfWin = document.getElementById('addShelf');
    setupShelfWin.style.display = 'flex';
}
  
export const hideShelfForm = (e) => {
    if(e) e.preventDefault()  
    const setupShelfWin = document.getElementById('addShelf');
    const shelfSizeForm = document.getElementById('shelfSetupForm');
    setupShelfWin.style.display = 'none';
    shelfSizeForm.reset();
}

export const createShelf = (e, addToLib) => {
    e.preventDefault();
      
    //let shelfDepth = document.getElementById('shelfDepth').value;
    let shelfWidth = parseInt(document.getElementById('shelfWidth').value);     //int perchè misura in bin non mt
    let shelfHeight = parseInt(document.getElementById('shelfHeight').value);
    let shelfId = document.getElementById('shelfId').value;
    let binSize= document.getElementById('binSize').value;
    //let nShelfUnit = document.getElementById('nShelfUnit').value;
  
    if (shelfId == "" || isNaN(shelfWidth) || isNaN(shelfHeight) || isNaN(binSize)) {
      alert("Assicurarsi di aver compilato tutti i campi");
    } 
    else {
      hideShelfForm(null)
      addToLib(shelfId)
      /*
      alert("La scaffalatura può essere posizionata con doppio click");
      let newShelf = new ShelfGeometryBuilder(shelfWidth, shelfHeight, binSize);
      addObjToLib(newShelf, shelfId);*/
    }
}

