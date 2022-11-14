const fs = require('fs');



class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    async writeFile(datos) {
        try {
            await fs.promises.writeFile(
                this.nombreArchivo,
                JSON.stringify(datos, null, 2)
            )
        } catch (error) {
            console.log(error)
        }

    }

    async getAll() {
        try {
            let stock = await fs.promises.readFile(this.nombreArchivo, "utf-8")
            return JSON.parse(stock)
        } catch (error) {
            console.log(error, "No hay datos en el archivo")
            return []
        }
    }

    async save(obj) {
        let stock = await this.getAll()
        try {
            if (stock.length == 0) {
                obj.id = 1
            } else {
                obj.id = stock[stock.length - 1].id + 1
            }
            stock.push(obj)
            await this.writeFile(stock)
            console.log(`Se ha añadido correctamente ${JSON.stringify(obj)}`)
        } catch (error) {
            console.log(error, "No se ha guardado correctamente")
        }
    }

    async getById(id) {
        try {
            let stock = await this.getAll()
            stock = stock.find(prod => prod.id === id)
            function devolverId() {
                if (stock) {
                    return stock
                } else {
                    return null
                }
            }
            return devolverId()
        } catch (error) {
            console.log(error)

        }
    }

    async deleteById(id) {
        try {
            let stock = await this.getAll()
            stock = stock.filter(prod => prod.id != id)
            await this.writeFile(stock)
            console.log(`Se ha eliminado el producto ${JSON.stringify(stock)}`)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        await this.writeFile([])
        console.log(`Se han eliminado todos los productos del archivo: ${this.nombreArchivo}`)
    }

}

const archivo = new Contenedor('productos.json')

async function prueba() {
//.save()
    /* await archivo.save({
        nombre: "Crema de manos Neroli Orquideas",
        precio: "$1200",
        marca: "Semilla"
    })
    await archivo.save({
        nombre: "Crema de cuerpo Neroli Orquideas",
        precio: "$2100",
        marca: "Semilla"
    })
    await archivo.save({
        nombre: "Esmalte Base Coat",
        precio: "$1100",
        marca: "Semilla"
    })
    await archivo.save({
        nombre: "Esmalte Top Coat",
        precio: "$1200",
        marca: "Semilla"
    })
    await archivo.save({
        nombre: "Agua Micelar",
        precio: "$1400",
        marca: "Semilla"
    })
    */

//.getAll()
    /* let get_all= await archivo.getAll()
    console.log(get_all) */

//.getById()
    /* let get_id = await archivo.getById(3)
    console.log(get_id) */

//.deleteById()
    /* await archivo.deleteById(2) */

//.deleteAll()
    /* await archivo.deleteAll()
     */
}

prueba()














