var carteContainer = document.querySelector('.carte-container');
var parfumsList = document.querySelector('.parfums-list');
var carteList = document.querySelector('.carte-list');
var carteTotalValue = document.getElementById('carte-total-value');
var carteCountInfo = document.getElementById('carte-count-info');
var carteItemID = 1;

var parfums = /** @class */ (function () {
    function parfums(nom, marque, prix, img) {
        this.nom = nom;
        this.marque = marque;
        this.prix = prix;
        this.img = img;
    }
    return parfums;
}());
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
    });
}
function addToCarteList(parfums) {
    var carteItem = document.createElement('div');
    carteItem.classList.add('carte-item');
    carteItem.setAttribute('data-id', "" + parfums.id);
    carteItem.innerHTML = "\n        <img src = \"" + parfums.img + "\" alt = \"parfums image\">\n        <div class = \"carte-item-info\">\n            <h3 class = \"carte-item-nom\">" + parfums.nom + "</h3>\n            <span class = \"carte-item-marque\">" + parfums.marque + "</span>\n            <span class = \"carte-item-prix\">" + parfums.prix + "</span>\n        </div>\n        <button type = \"button\" class = \"carte-item-del-btn\">\n            <i class = \"fas fa-times\"></i>\n        </button>\n    ";
    carteList.appendChild(carteItem);
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
}
