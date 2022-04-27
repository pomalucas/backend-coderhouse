const fs = require('fs')

class contenedor {
    constructor(filename){
        this.filename = filename;
    }

    save(obj){
        fs.promises.readFile('./'+ this.filename)
            .then(data =>{
                const contenidoViejo = JSON.parse(data)
                console.log(`Contenido Viejo: ${contenidoViejo}`)
                console.log(obj.title)
                let found = false;
                for(var i = 0; i< contenidoViejo.length; i++){
                    if(contenidoViejo[i].title == obj.title){
                        found = true
                        break;
                    }
                }
                console.log(found)

                if(found == false){
                    
                    obj.id = contenidoViejo.length + 1 

                    let IdsArray = contenidoViejo.map(productos => productos.id)
                    console.log(IdsArray)
                    let maxID = Math.max(...IdsArray)
                    console.log(maxID)

                    if(maxID >= obj.id){
                        obj.id = maxID + 1;
                    }

                    contenidoViejo.push( obj )
                    let contenidoNuevo = contenidoViejo
                    console.log(`Contenido Nuevo: ${contenidoNuevo}`)
                    console.log("Product ID = " + obj.id)
                    return fs.promises.writeFile('./'+ this.filename , JSON.stringify(contenidoNuevo, null, 2))

                } else if(found == true) {
                    console.log("This Product Already Exist")
                }
                
            })
            .catch(err=>{
                console.log("ERROR with Save ->" + err)
            })
    }

    getById(idNumber){
        fs.promises.readFile('./'+ this.filename)
        .then(data =>{
            const contenidoParseado = JSON.parse(data);
            let prodPorId = contenidoParseado.find(productos => productos.id === idNumber);
            if(prodPorId !== undefined){
                console.log(prodPorId)
            } else {
                console.log("Product Not Found!")
            }
        })
        .catch(err=>{
            console.log("ERROR with GetById-> " + err)
        })
    }

    getAll(){
        fs.promises.readFile('./'+ this.filename)
        .then(data =>{
            const contParsed = JSON.parse(data);
            console.log(contParsed)
        })
        .catch(err=>{
            console.log("ERROR -> " + err)
        })
    }

    deleteById(idNumber){
        fs.promises.readFile('./'+ this.filename)
        .then(data =>{
            const contParsed = JSON.parse(data);
            let prodPorId = contParsed.find(productos => productos.id === idNumber);
            if(prodPorId !== undefined){
                let prodListIndex = contParsed.findIndex(productos => productos.id === idNumber)
                contParsed.splice(prodListIndex,1)
                console.log(contParsed) 
                fs.promises.writeFile('./'+ this.filename, JSON.stringify(contParsed, null, 2))
            } else {
                console.log("Product Not Found!")
            }
        })
    }
    deleteAll(){
        fs.promises.unlink('./'+ this.filename)
        console.log("DATA DELETED")
    }

}

let newContenedor = new contenedor("productos.json")

/****** Quitar comentario para Verificar****** */
//newContenedor.save({"title": "resaltador", "price": 340})
//newContenedor.getById(1)
//newContenedor.getById(234324)
//newContenedor.getAll()
//newContenedor.deleteById(2)
//newContenedor.deleteById(1)
//newContenedor.deleteAll()  ////CUIDADO BORRA EL PRODUCTOS.JSON  ////
