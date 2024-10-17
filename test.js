const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');
const fs = require('fs');


// GENERA UN DOMINIO ALEATORIO CON SÍLABAS
function generarDominioAleatorio() {
    // Array de sílabas
    const worldWideWeb = ['', 'www.'];
    let vocals = ['a', 'e', 'i', 'o', 'u'];
    let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];    
    const TopDomain = ['com', 'org', 'net'];

    // Función para generar un nombre de dominio aleatorio
        let resultado = '';
        resultado = resultado + worldWideWeb[Math.floor(Math.random() * 2)];

            for (let i = 0; i < Math.floor(Math.random()*3+1); i++) {
                let order = Math.floor(Math.random()*100+1);
                
                if(order<=50){

                    let a= consonants[Math.floor(Math.random()* consonants.length)];
                    let b= vocals[Math.floor(Math.random()* vocals.length)];
                    let word = a+b;

                    resultado = resultado + word;
                    
                }else if(order>50 && order<=90){
                    let a= vocals[Math.floor(Math.random()* vocals.length)];
                    let b= consonants[Math.floor(Math.random()* consonants.length)];
                    let word = a+b;
                    
                    // const indiceAleatorio = Math.floor(Math.random() * silabas.length);
                    resultado = resultado + word;
                }else{
                    let a= consonants[Math.floor(Math.random()* consonants.length)];
                    let b= consonants[Math.floor(Math.random()* consonants.length)];
                    let word = a+b;
                    
                    // const indiceAleatorio = Math.floor(Math.random() * silabas.length);
                    resultado = resultado + word;
                }
                
                
                
                
                
                // const indiceAleatorio = Math.floor(Math.random() * silabas.length);




            }
        
        
        resultado = resultado + ".";
        resultado = resultado + TopDomain[Math.floor(Math.random()*3)];
        return resultado;
    
}

// OBTENER DATOS DE LA URL GENERADA
function getDataofSelectedDomain() {

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

            // Cargar el HTML en cheerio
            const $ = cheerio.load(data);



            const description = $('meta[name="description"]').attr('content');
            if (description == undefined) {
                console.log(dominio + ',"NO DATA"');
                fs.appendFile('results.csv', '"'+dominio+'"' + ',"NO DATA"\n', function (err) {
                    if (err) throw err;
                });
            } else {
                console.log(dominio + " - " + description);
                fs.appendFile('results.csv', '"'+dominio+'"' + ',"' + description + '"\n', function (err) {
                    if (err) throw err;
                });
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
            console.log(url + " -" + " NO EXISTS");
        }
    }
    scrapeData();
}


setInterval(() => {
    getDataofSelectedDomain();
}, 1000);