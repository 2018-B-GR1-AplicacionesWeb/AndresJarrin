declare var  require;
const inquirer = require('inquirer');
const fs = require ('fs');
declare var Promise:any;

const tipoLicoresGradoAlcohol = [
    'Fermentados','Ordinarios','Semifinos','Finos','Extrafinos'
];

const tipoLicorGeneral = [
    'Vino','Cerveza','Champagne','Chicha','Aguardiente',
    'Ron','Vodka','Whisky','Tequila','Ginebra','Brandy'

]

const opcionesMenu = [
    'Crear','Borrar','Actualizar','Buscar',
];

const menu = [
    { type: 'list',
        name: 'menu',
        message: '¿Qué desea realizar?',
        choices: opcionesMenu },
];

inquirer
    .prompt(menu)
    .then((respuesta) => {

        if (respuesta.menu === 'Crear'||'Actualizar'){
            const preguntasFormulario = [
                { type: 'input',
                  name: 'nombre',
                  message: 'Ingrese nombre del licor:'
                },
                { type: 'input',
                  name: 'precio',
                  message: 'Ingrese el precio del licor:'
                },
                { type: 'list',
                  name: 'tipoLicor',
                  message: 'Escoga el tipo de licor:',
                  choices: tipoLicorGeneral
                },
                { type: 'input',
                  name: 'contenido',
                  message: 'Ingrese el volumen que contiene la botella:'
                },
                { type: 'list',
                  name: 'clase',
                  message: 'Escoga la clase de licor:',
                  choices: tipoLicoresGradoAlcohol},
            ];
            inquirer
                .prompt(preguntasFormulario)
                //.catch()

                .then((respuestasFormulario) => {
                        console.log(respuestasFormulario)
                        funcionEscritura(respuestasFormulario.nombre,JSON.stringify(respuestasFormulario));
                    }
                );
        }if(respuesta.menu == 'Borrar'){
            const preguntaParaBorrar = [
                { type: 'input', name: 'nombre', message: '¿Qué licor desea eliminar?' }];
            inquirer
                .prompt(preguntaParaBorrar)
                .then((respuestaParaBorrar) => {
                        funcionBorrar(respuestaParaBorrar.nombre);
                    }
                )
        }if(respuesta.menu == 'Buscar'){
            const preguntaBusqueda = [{
                type: 'input', name: 'nombre', message: '¿Qué licor deseas probar?'
            }];
            inquirer
                .prompt(preguntaBusqueda)
                .then((respuestaBusqueda)=>{
                    console.log(respuestaBusqueda);

                    buscar(respuestaBusqueda.nombre);
            })
        }
    });




const funcionEscritura = (nombreDelArchivo,respuestasDeLasPreguntas)=>{
    fs.writeFile(nombreDelArchivo,respuestasDeLasPreguntas,
        (error)=> {
            return new Promise(
                (resolve,reject)=>{
                    if(error){
                        reject({
                            mensaje:'fallo durante la creacion del licor',
                        })
                    }else {
                        resolve ({
                            mensaje: 'nuevo licor ingresado correctamente'
                        })
                    }
                }
            )
        });
};


const funcionBorrar =(nombreDelArchivo)=> {
    fs.unlink(nombreDelArchivo, (err) => {
        return new Promise(
            (resolve, reject) => {
                if (err) {
                    reject({
                        mensaje: 'fallo durante la eliminación del licor'
                    })
                } else {
                    resolve({
                        mensaje: 'licor eliminado correctamente'
                    });
                }
            });
    });
};

const buscar = (nombreDelArchivo)=>{
fs.readFile('../'+nombreDelArchivo, (error,datos) => {
    return new Promise(
        (resolve, reject) => {
            if (error) {
                reject({
                    mensaje: 'no se ha encontrado el licor buscado'
                })

            } else {
                resolve({
                    mensaje: "licor encontrado, disfrutalo y es el siguiente: "+ datos
                });
            }
        });
});
};

