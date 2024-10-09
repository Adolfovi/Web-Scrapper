const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');

// Cambia esta URL a la que deseas hacer scraping
const url = 'https://tudominio.com'; 

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

        // Seleccionar los elementos <meta> en el <head>
        const items = [];
        $('head meta').each((index, element) => {
            const metaAttributes = {};
            // Obtener todos los atributos del elemento <meta>
            for (const attr in element.attribs) {
                metaAttributes[attr] = element.attribs[attr];
            }
            items.push(metaAttributes);
        });

        console.log(items);
    } catch (error) {
        console.error('Error al hacer scraping:', error);
    }
}

// Llamar a la función de scraping
scrapeData();
