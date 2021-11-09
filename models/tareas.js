require('colors');

/**
 *  _listado:
 *      { 'uuid-12312312-124124-2: { id:12, desc:asd, completadoEN:92231} },
 *      { 'uuid-12312312-124124-2: { id:12, desc:asd, completadoEN:92231} },
 */

const Tarea = require("./tarea");


class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;

    }



    constructor() {
        this._listado = {};
    
    }

    cargarTareasFromArray( tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

        return this._listado;

    }


    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto () {

        // 1: en verde
        // Completada: verde
        // Pendiente: rojo

        // 1. Alma :: Completada | Pendiente
        // const lista = this.listadoArr

        // for (let index = 0; index < lista.length; index++) {
        //     const {desc, completadoEn} = lista[index];
        //     if (completadoEn === null){
        //         console.log(`${'1'.green} ${desc} :: ${'Pendiente'.red}`)
        //     }else{
        //     console.log(`'${'1'.green} ${desc} :: ${'Completada'.green}`)
        //     }
        console.log();

        this.listadoArr.forEach((tarea,i) => {

            const idx = `${i+1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            console.log( `${idx} ${desc} :: ${estado}`);
            

        });
    }
    
    listarPendientesCompletadas(completadas = true) {
        console.log();
        let index = 0;

        this.listadoArr.forEach((tarea) => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            if (completadas && completadoEn){

                index +=1;
                console.log( `${(index + '.').green} ${desc} :: ${completadoEn.green}`);

            } else if (!completadas && !completadoEn){

                index +=1
                console.log( `${(index + '.').red} ${desc} :: ${estado}`);

            }
            

        });
    }

    borrarTarea(id = '') {
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids =[]){

        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {

            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }


        })

    }

}



module.exports = Tareas;
