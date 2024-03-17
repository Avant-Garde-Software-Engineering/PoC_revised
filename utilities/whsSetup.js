export const createWarehouse = (e) => {
    /***********************************************/
    /************* SETUP MAGAZZINO *****************/
    /***********************************************/
    const setupWhsWin = document.getElementById('setupWhs');
    const WhsSizeForm = document.getElementById('WhsSetupForm');
    e.preventDefault();

    const WhsWidth = parseFloat(document.getElementById('WhsWidth').value);
    const WhsDepth = parseFloat(document.getElementById('WhsDepth').value);
    const WhsHeight = parseFloat(document.getElementById('WhsHeight').value);

    if (isNaN(WhsWidth) || isNaN(WhsDepth) || isNaN(WhsHeight)) {
      alert("Assicurarsi di aver inserito tutte le misure");
    } 
    else {
      setupWhsWin.style.display = 'none';
      WhsSizeForm.reset();
      //setupWhs(WhsWidth, WhsHeight, WhsDepth);
    }
}

export const onStartup = () => {
    const setupWhsWin = document.getElementById('setupWhs');

    /* Aprire finestra per setup del magazzino quando 
    la pagina viene caricata inizialmente*/
    setupWhsWin.style.display = 'flex';
}