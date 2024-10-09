const axios = require('axios');
const cheerio = require('cheerio');
const dns = require('dns');
const { URL } = require('url');

// GENERA UN DOMINIO ALEATORIO
function generarDominioAleatorio() {
    // Función para generar una cadena de letras aleatorias
    function generarNombreDominio(longitud) {
        const caracteres = 'abcdefghijklmnopqrstuvwxyz';
        let resultado = '';
        for (let i = 0; i < longitud; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            resultado += caracteres[indiceAleatorio];
        }
        return resultado;
    }

    // Longitud del nombre del dominio
    const longitudNombre = Math.floor(Math.random() * 10) + 3; // Entre 3 y 12 caracteres
    const nombreDominio = generarNombreDominio(longitudNombre);

    // Array de extensiones de dominio
    const extensiones = ['.com', '.net', '.org', '.io', '.info', '.co', '.biz'];

    // Selecciona aleatoriamente una extensión
    const extensionAleatoria = extensiones[Math.floor(Math.random() * extensiones.length)];

    // Genera el dominio completo
    const dominio = `${nombreDominio}${extensionAleatoria}`;

    return dominio;
}

// OBTENER DATOS DE LA URL GENERADA
function getDataofSelectedDomain(){

// Cambia esta URL a la que deseas hacer scraping
//let url = 'https://itcm.es'; 

  let url = "https://" + generarDominioAleatorio();

function obtenerDominio(url) {
    try {
        const miUrl = new URL(url);
        return miUrl.hostname; 
    } catch (error) {
        console.error('URL inválida:', error);
        return null;
    }
}

async function scrapeData() {
    try {
        // Hacer la solicitud a la URL
        const { data } = await axios.get(url);
        
        // Obtener el dominio
        const dominio = obtenerDominio(url);
        console.log(dominio);

        // Cargar el HTML en cheerio
        const $ = cheerio.load(data);



        const description = $('meta[name="description"]').attr('content');
        if(description == undefined){
            console.log('NO DATA');
        }else{
            console.log(description);
        }
        
        // OBTENER UN OBJETO QUE CONTIENE LA INFORMACION DE TODOS LOS META
        // Seleccionar los elementos <meta> en el <head>
        // const items = [];
        // $('head meta').each((index, element) => {
        //     const metaAttributes = {};
        //     // Obtener todos los atributos del elemento <meta>
        //     for (const attr in element.attribs) {
        //         metaAttributes[attr] = element.attribs[attr];
        //     }
        //     items.push(metaAttributes);
        // });

        // console.log(items);
    } catch (error) {
        console.log("no existe la url " + url);
    }
}
scrapeData();
}

getDataofSelectedDomain();