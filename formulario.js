var inquirer = require('inquirer');
var fs = require('fs');
var tipoLicoresGradoAlcohol = [
    'Fermentados', 'Ordinarios', 'Semifinos', 'Finos', 'Extrafinos'
];
var tipoLicorGeneral = [
    'Vino', 'Cerveza', 'Champagne', 'Chicha', 'Aguardiente',
    'Ron', 'Vodka', 'Whisky', 'Tequila', 'Ginebra', 'Brandy'
];
var opcionesMenu = [
    'Crear', 'Borrar', 'Actualizar', 'Buscar',
];
var menu = [
    { type: 'list',
        name: 'menu',
        message: '¿Qué desea realizar?',
        choices: opcionesMenu },
];
inquirer
    .prompt(menu)
    .then(function (respuesta) {
    if (respuesta.menu === 'Crear' || 'Actualizar') {
        var preguntasFormulario = [
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
                choices: tipoLicoresGradoAlcohol },
        ];
        inquirer
            .prompt(preguntasFormulario)
            //.catch()
            .then(function (respuestasFormulario) {
            console.log(respuestasFormulario);
            funcionEscritura(respuestasFormulario.nombre, JSON.stringify(respuestasFormulario));
        });
    }
    if (respuesta.menu == 'Borrar') {
        var preguntaParaBorrar = [
            { type: 'input', name: 'nombre', message: '¿Qué licor desea eliminar?' }
        ];
        inquirer
            .prompt(preguntaParaBorrar)
            .then(function (respuestaParaBorrar) {
            funcionBorrar(respuestaParaBorrar.nombre);
        });
    }
    if (respuesta.menu == 'Buscar') {
        var preguntaBusqueda = [{
                type: 'input', name: 'nombre', message: '¿Qué licor deseas probar?'
            }];
        inquirer
            .prompt(preguntaBusqueda)
            .then(function (respuestaBusqueda) {
            console.log(respuestaBusqueda);
            buscar(respuestaBusqueda.nombre);
        });
    }
});
var funcionEscritura = function (nombreDelArchivo, respuestasDeLasPreguntas) {
    fs.writeFile(nombreDelArchivo, respuestasDeLasPreguntas, function (error) {
        return new Promise(function (resolve, reject) {
            if (error) {
                reject({
                    mensaje: 'fallo durante la creacion del licor',
                });
            }
            else {
                resolve({
                    mensaje: 'nuevo licor ingresado correctamente'
                });
            }
        });
    });
};
var funcionBorrar = function (nombreDelArchivo) {
    fs.unlink(nombreDelArchivo, function (err) {
        return new Promise(function (resolve, reject) {
            if (err) {
                reject({
                    mensaje: 'fallo durante la eliminación del licor'
                });
            }
            else {
                resolve({
                    mensaje: 'licor eliminado correctamente'
                });
            }
        });
    });
};
var buscar = function (nombreDelArchivo) {
    fs.readFile('../' + nombreDelArchivo, function (error, datos) {
        return new Promise(function (resolve, reject) {
            if (error) {
                reject({
                    mensaje: 'no se ha encontrado el licor buscado'
                });
            }
            else {
                resolve({
                    mensaje: "licor encontrado, disfrutalo y es el siguiente: " + datos
                });
            }
        });
    });
};
//# sourceMappingURL=formulario.js.map