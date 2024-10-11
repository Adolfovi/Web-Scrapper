const axios = require('axios');
const cheerio = require('cheerio');
const dns = require('dns');
const { URL } = require('url');

// GENERA UN DOMINIO ALEATORIO CON SÍLABAS
function generarDominioAleatorio() {
    // Array de sílabas
    const silabas = ['ba', 'be', 'bi', 'bo', 'bu', 'ka', 'ke', 'ki', 'ko', 'ku', 
                     'la', 'le', 'li', 'lo', 'lu', 'ma', 'me', 'mi', 'mo', 'mu', 
                     'na', 'ne', 'ni', 'no', 'nu', 'ra', 're', 'ri', 'ro', 'ru'];

    const TopDomain = ['com','org','net','cat','edu'];

    // Función para generar un nombre de dominio aleatorio
    function generarNombreDominio(longitud) {
        let resultado = '';
        for (let i = 0; i < longitud; i++) {
            const indiceAleatorio = Math.floor(Math.random() * silabas.length);
            resultado += silabas[indiceAleatorio];
        }
        resultado = resultado +".";
        resultado = resultado +TopDomain[Math.floor(Math.random() * 5)];
        return resultado;
    }

    // Genera un nombre de dominio de longitud aleatoria (por ejemplo, entre 2 y 5 sílabas)
    const longitudDominio = Math.floor(Math.random() * 4) + 2; // 2 a 5 sílabas
    const nombreDominio = generarNombreDominio(longitudDominio);
    
    // Retorna el dominio final
    return `${nombreDominio}`; // Puedes cambiar la extensión si lo deseas
}


// OBTENER DATOS DE LA URL GENERADA
function getDataofSelectedDomain(){

// Cambia esta URL a la que deseas hacer scraping
//let url = 'https://tudominio.com'; 

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
            console.log('EXISTS BUT NO DATA');
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
        console.log(url);
        console.log("NO EXISTS");
    }
}
scrapeData();
}

getDataofSelectedDomain();