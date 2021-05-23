const carteContainer = document.querySelector('.carte-container');
const parfumsList = document.querySelector('.parfums-list');
const carteList = document.querySelector('.carte-list');
const carteTotalValue = document.getElementById('carte-total-value');
const carteCountInfo = document.getElementById('carte-count-info');
let carteItemID = 1;

eventListeners();


function eventListeners(){
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
        loadCarte();
    });
    document.querySelector('.navigationbar-toggler').addEventListener('click', () => {
        document.querySelector('.navigationbar-collapse').classList.toggle('show-navigationbar');
    });

    
    document.getElementById('carte-btn').addEventListener('click', () => {
        carteContainer.classList.toggle('show-carte-container');
    });

   

    
}


function updateCarteInfo(parfums){
    let carteInfo = parfums.findCarteInfo();
    carteCountInfo.textContent = carteInfo.parfumsCount;
    carteTotalValue.textContent = carteInfo.total;
}


function loadJSON(){
    fetch('parfums.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach((parfums: { img: any; nom: any; marque: any; prix: any; }) => {
            html += `
                <div class = "parfums-item">
                    <div class = "parfums-img">
                        <img src = "${parfums.img}" alt = "parfums image">
                        <button type = "button" class = "add-to-carte-btn">
                            <i class = "fas fa-shopping-carte"></i>Add To Carte
                        </button>
                    </div>
                    <div class = "parfums-content">
                        <h3 class = "parfums-nom">${parfums.nom}</h3>
                        <span class = "parfums-marque">${parfums.marque}</span>
                        <p class = "parfums-prix">$${parfums.prix}</p>
                    </div>
                </div>
            `;
        });
        parfumsList.innerHTML = html;
    })
    
}


function purchaseParfums(e: { target: { classList: { contains: (arg0: string) => any; }; parentElement: { parentElement: any; }; }; }){
    if(e.target.classList.contains('add-to-carte-btn')){
        let parfums = e.target.parentElement.parentElement;
        getParfumsInfo(parfums);
    }
}

function getParfumsInfo(parfums: { querySelector: (arg0: string) => { (): any; new(): any; src: any; textContent: any; }; }){
    let parfumsInfo = {
        id: carteItemID,
        img: parfums.querySelector('.parfums-img img').src,
        nom: parfums.querySelector('.parfums-nom').textContent,
        marque: parfums.querySelector('.parfums-marque').textContent,
        prix: parfums.querySelector('.parfums-prix').textContent
    }
    carteItemID++;
    addToCarteList(parfumsInfo);
    saveparfums(parfumsInfo);
}

function addToCarteList(parfums: { id: any; img: any; nom: any; marque: any; prix: any; }){
    const carteItem = document.createElement('div');
    carteItem.classList.add('carte-item');
    carteItem.setAttribute('data-id', `${parfums.id}`);
    carteItem.innerHTML = `
        <img src = "${parfums.img}" alt = "parfums image">
        <div class = "carte-item-info">
            <h3 class = "carte-item-nom">${parfums.nom}</h3>
            <span class = "carte-item-marque">${parfums.marque}</span>
            <span class = "carte-item-prix">${parfums.prix}</span>
        </div>
        <button type = "button" class = "carte-item-del-btn">
            <i class = "fas fa-times"></i>
        </button>
    `;
    carteList.appendChild(carteItem);
}


function saveparfums(item: any){
    let parfums = getparfums();
    parfums.push(item);
    localStorage.setItem('parfums', JSON.stringify(parfums));
    updateCarteInfo(parfums);
}


function getparfums(){
    return localStorage.getItem('parfums') ? JSON.parse(localStorage.getItem('parfums')) : [];
    
}


function loadCarte(){
    let parfums = getparfums();
    if(parfums.length < 1){
        carteItemID = 1; 
    } else {
        carteItemID = parfums[parfums.length - 1].id;
        carteItemID++;
        
    parfums.forEach((parfums: any) => addToCarteList(parfums));

   
    updateCarteInfo(parfums);
}

function findCarteInfo(){
    let parfums = getparfums();
    let total = parfums.reduce(( compteur: number, parfums: { prix: string; }) => {
        let prix = parseFloat(parfums.prix.substr(1)); 
        return compteur += prix;
    }, 0); 

    return{
        total: total.toFixed(2),
        parfumsCount: parfums.length
    }
}


function deleteparfums(){
    let carteItem: { remove: () => void; dataset: { id: string; }; };
    carteItem.remove(); 
    

    let parfums = getparfums();
    let updatedparfums = parfums.filter((parfums: { id: number; }) => {
        return parfums.id !== parseInt(carteItem.dataset.id);
    });
    localStorage.setItem('parfums', JSON.stringify(updatedparfums)); 
    updateCarteInfo(parfums);
}

}






