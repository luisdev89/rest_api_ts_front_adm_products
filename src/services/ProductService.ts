import { DraftProductSchema, ProductSchema, ProductsSchema } from "../types"
import {safeParse, pipe, toNumber, string, parse} from 'valibot'
import axios from "axios"
import { toBoolean } from "../utils";
import type { Product } from "../types";


type ProductData = {
   [k: string]: FormDataEntryValue
}
export async function  addProduct(data:ProductData) {
    try {
        const result = safeParse(DraftProductSchema,{
            name:data.name,
            price:+data.price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
             await axios.post(url,{
                name:result.output.name,
                price:result.output.price
            })
        }else{
            throw new Error("Datos no validos revisar data de services")
        }
    } catch (error) {
        console.log(error)
    }
   
}

export async function getAllProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)
        const result = safeParse(ProductsSchema,data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error al obtener todos los productos')
        }
        
        
    } catch (error) {
        console.log(error)
    }
    
}

export async function getProductById(id:Product['id']){
    
   try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductSchema,data.data)
        if(result.success){
            
            return result.output
        }else{
            throw new Error('Hubo un error al obtener todos los productos')
        }
        
        
    } catch (error) {
        console.log(error)
    }
}

// actualizar producto
export async function updateProduct(data:ProductData, id:Product['id']){
  try {
    const NumberSchema = pipe(string(), toNumber())//convertir un string a number
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    const result = safeParse(ProductSchema, {
        id,
        name:data.name,
        price:parse(NumberSchema, data.price),
        availability: toBoolean(data.availability.toString())// se covierte a string por es un tipo formValue
    })
    if(result.success){
        await axios.put(url, result.output)

    }else{
        throw new Error("Hubo un Problema en la actualizacion del producto")
    }
  } catch (error) {
    console.log(error)
  }
}

// actualizar disponibilidad 

export async function updateAvailability(id:Product['id']){
    try {
         const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
         await axios.patch(url, id)
    } catch (error) {
        console.log(error)
    }
}

//eliminar producto 

export async function deleteProduct(id:Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
         await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}