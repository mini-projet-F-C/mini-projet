var carteContainer = document.querySelector('.carte-container');
var parfumsList = document.querySelector('.parfums-list');
var carteList = document.querySelector('.carte-list');
var carteTotalValue = document.getElementById('carte-total-value');
var carteCountInfo = document.getElementById('carte-count-info');
var carteItemID = 1;
eventListeners();
function eventListeners() {
    window.addEventListener('DOMContentLoaded', function () {
        loadJSON();
        loadCarte();
    });
    document.querySelector('.navigationbar-toggler').addEventListener('click', function () {
        document.querySelector('.navigationbar-collapse').classList.toggle('show-navigationbar');
    });
    document.getElementById('carte-btn').addEventListener('click', function () {
        carteContainer.classList.toggle('show-carte-container');
    });
}
function updateCarteInfo(parfums) {
    var carteInfo = parfums.findCarteInfo();
    carteCountInfo.textContent = carteInfo.parfumsCount;
    carteTotalValue.textContent = carteInfo.total;
}
function loadJSON() {
    fetch('parfums.json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var html = '';
        data.forEach(function (parfums) {
            html += "\n                <div class = \"parfums-item\">\n                    <div class = \"parfums-img\">\n                        <img src = \"" + parfums.img + "\" alt = \"parfums image\">\n                        <button type = \"button\" class = \"add-to-carte-btn\">\n                            <i class = \"fas fa-shopping-carte\"></i>Add To Carte\n                        </button>\n                    </div>\n                    <div class = \"parfums-content\">\n                        <h3 class = \"parfums-nom\">" + parfums.nom + "</h3>\n                        <span class = \"parfums-marque\">" + parfums.marque + "</span>\n                        <p class = \"parfums-prix\">$" + parfums.prix + "</p>\n                    </div>\n                </div>\n            ";
        });
        parfumsList.innerHTML = html;
    })
        
   
}
function purchaseParfums(e) {
    if (e.target.classList.contains('add-to-carte-btn')) {
        var parfums = e.target.parentElement.parentElement;
        getParfumsInfo(parfums);
    }
}
function getParfumsInfo(parfums) {
    var parfumsInfo = {
        id: carteItemID,
        img: parfums.querySelector('.parfums-img img').src,
        nom: parfums.querySelector('.parfums-nom').textContent,
        marque: parfums.querySelector('.parfums-marque').textContent,
        prix: parfums.querySelector('.parfums-prix').textContent
    };
    carteItemID++;
    addToCarteList(parfumsInfo);
    saveparfums(parfumsInfo);
}
function addToCarteList(parfums) {
    var carteItem = document.createElement('div');
    carteItem.classList.add('carte-item');
    carteItem.setAttribute('data-id', "" + parfums.id);
    carteItem.innerHTML = "\n        <img src = \"" + parfums.img + "\" alt = \"parfums image\">\n        <div class = \"carte-item-info\">\n            <h3 class = \"carte-item-nom\">" + parfums.nom + "</h3>\n            <span class = \"carte-item-marque\">" + parfums.marque + "</span>\n            <span class = \"carte-item-prix\">" + parfums.prix + "</span>\n        </div>\n        <button type = \"button\" class = \"carte-item-del-btn\">\n            <i class = \"fas fa-times\"></i>\n        </button>\n    ";
    carteList.appendChild(carteItem);
}
function saveparfums(item) {
    var parfums = getparfums();
    parfums.push(item);
    localStorage.setItem('parfums', JSON.stringify(parfums));
    updateCarteInfo(parfums);
}
function getparfums() {
    return localStorage.getItem('parfums') ? JSON.parse(localStorage.getItem('parfums')) : [];
}
function loadCarte() {
    var parfums = getparfums();
    if (parfums.length < 1) {
        carteItemID = 1;
    }
    else {
        carteItemID = parfums[parfums.length - 1].id;
        carteItemID++;
        parfums.forEach(function (parfums) { return addToCarteList(parfums); });
        updateCarteInfo(parfums);
    }
    function findCarteInfo() {
        var parfums = getparfums();
        var total = parfums.reduce(function (compteur, parfums) {
            var prix = parseFloat(parfums.prix.substr(1));
            return compteur += prix;
        }, 0);
        return {
            total: total.toFixed(2),
            parfumsCount: parfums.length
        };
    }
    function deleteparfums() {
        var carteItem;
        carteItem.remove();
        var parfums = getparfums();
        var updatedparfums = parfums.filter(function (parfums) {
            return parfums.id !== parseInt(carteItem.dataset.id);
        });
        localStorage.setItem('parfums', JSON.stringify(updatedparfums));
        updateCarteInfo(parfums);
    }
}





