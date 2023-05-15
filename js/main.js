const total = document.getElementById('total')
const cant = document.getElementById('cant')


class Autos{    
    constructor(id, modelo, color, precio, img){
        this.id=id;
        this.modelo=modelo;
        this.color=color;
        this.precio=precio;
        this.img=img;        
    }
}

const renault = new Autos(1,"renault","negro","25000","./images/renault.jpg")
const ford = new Autos(2,"ford","azul","50000","./images/renault.jpg")
const toyota = new Autos(3,"toyota","rojo","25000","./images/renault.jpg")
const ferrari = new Autos(4,"ferrari","dorado","900000","./images/renault.jpg")
const fitito = new Autos(5,"fitito","marron","250000","./images/renault.jpg")
const lamborgini = new Autos(6,"lamborgini","verde","900000","./images/renault.jpg")

const autos = [renault, ford, toyota, ferrari, fitito, lamborgini]

let carrito = []

const pro = document.getElementById('productos')

function MostrarProductos(){
    //const card = document.createElement('')
    autos.forEach(function(el){
        const card = document.createElement("div")
        card.classList.add("col-12", "col-sm-6","border")
        card.innerHTML =`
            <div class="">
                <div class="card">
                    <img src="${el.img}" class="card-img-top" alt="">                    
                    <div class="card-body">                    
                        <h5 class="card-title">${el.modelo}</h5>
                        <p class="card-text">${el.precio}</p>
                        <button class="btn btn-primary" id="btn${el.id}" data-id="${el.id}">Agregar</button>
                    </div>
                </div>
            </div>`

       pro.appendChild(card)

       const boton = document.getElementById(`btn${el.id}`)
       boton.addEventListener("click",function(e){
        addCart(e)
       })
    })
}

MostrarProductos()
actualizarCarrito()
vaciarCarrito()

function addCart(e){ 
    
    
    const articulos={
        id:e.target.parentNode.querySelector('.btn').dataset.id,
        title:e.target.parentNode.querySelector('h5').textContent,
        precio:Number(e.target.parentNode.querySelector('p').textContent),
        cantidad:1
    }      
    //este codigo persistira mi variable carrito, ya que sin ella, el carrito volvera a cero y se reseterara el carrito
    if(JSON.parse(localStorage.getItem('carrito'))){
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
    //console.log(carrito)    
    //filtro cantidades correspondientes
    if(carrito.length==0){        
        carrito.push(articulos)                
    }else{        
        let band=true
        carrito.forEach(function(elem){          
            if(elem.id==articulos.id){
                elem.cantidad++
                band=false                                           
            }
        })

        if(band){
            carrito.push(articulos)                                     
        }
    }   
    
    localStorage.setItem('carrito', JSON.stringify(carrito))    
    calcularSuma()
}

function calcularSuma(){
    
    let carrito = JSON.parse(localStorage.getItem('carrito'))   
    let cantidad = 0, sumaPrecio=0

    carrito.forEach(function(item){
        cantidad = cantidad + item.cantidad
        sumaPrecio = sumaPrecio + (item.precio * item.cantidad)
    })

    localStorage.setItem('cantidad', cantidad)
    localStorage.setItem('total', sumaPrecio)
    
    total.innerHTML = localStorage.getItem('total')
    cant.innerHTML = localStorage.getItem('cantidad') 
    
}

function actualizarCarrito(){
    total.innerHTML = localStorage.getItem('total')
    cant.innerHTML = localStorage.getItem('cantidad') 
}

let btnCart = document.getElementById('btnCart')
let tabla = document.getElementById("tabla")
let tbody = document.getElementById('tbody')    
btnCart.addEventListener('click', function(){
    if(tabla.style.display=="block"){
        tabla.style.display="none"              
        tbody.innerHTML=''    
    }else{
        tabla.style.display="block"
        mostrarCarrito()          
    }        
})

function mostrarCarrito(){    
    let carrito = JSON.parse(localStorage.getItem('carrito'))    

    carrito.forEach(function(elem){
        tbody.innerHTML+=`<tr>
            <td>${elem.title}</td>
            <td>${elem.precio}</td>
            <td>${elem.cantidad}</td>
            <td><button onclick="removeCart(${elem.id})" class="btn btn-danger">Eliminar</button></td>
        <tr>`
    })
}

function removeCart(id){
    let carrito = JSON.parse(localStorage.getItem('carrito'))
    const producto = carrito.find(producto=>producto.id == id)    
    let indice = carrito.indexOf(producto)
    carrito.splice(indice, 1)
    localStorage.setItem('carrito', JSON.stringify(carrito))    

    if(JSON.parse(localStorage.getItem('carrito'))==0){
        eliminarCarrito()
    }
    recargarPagina(event)
    calcularSuma()            
}



function vaciarCarrito(){       
    const clean = document.getElementById('clean')
    clean.addEventListener('click',function(){                      
       eliminarCarrito()          
       recargarPagina(event)
    })    
}

function eliminarCarrito(){
    localStorage.clear()
    total.innerHTML = 0
    cant.innerHTML = 0
}

function recargarPagina(event){
    if(event){
        window.location.href="/"
    }
}

