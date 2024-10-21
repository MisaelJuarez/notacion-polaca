class Pila {
    constructor(){
        this.pila = {};
        this.top = 0
    }

    agregar(dato) {
        this.top++;
        this.pila[this.top] = dato;
    }

    quitar(){
        let dato;
        dato = this.pila[this.top];
        delete this.pila[this.top];
        this.top--;
        return dato;
    }

    size() {
        return this.top;
    }

    vacia() {
        return (!this.size()) ? true : false;
    }
    proximo(){
        return (this.vacia()) ? null : this.pila[this.top];
    }
}

const pila = new Pila();

let exp = /^[0-9+\-*/\s]+$/;

const validaciones = (texto) => {
    if (texto.length == '') {
        return [false,'No puedes dejar el input vacio'];
    }else if(!exp.test(texto)){  
        return [false,'No puedes ingresar caracteres especiales'];
    } else {
        return [true];
    }
}

const transformar = (arrNotacion,resultado) => {
    arrNotacion.map((e,i) => {
        if (isNaN(e)) pila.agregar(e);
        
        if (!isNaN(arrNotacion[i+1])) {
            resultado.push(arrNotacion[i+1]);
            if (!pila.vacia()) resultado.push(pila.quitar()) 
        } 
    });
    return resultado;
}

// const transformar = (arrNotacion,resultado) => {
//     let expresion = /^[\+\-\*/]\d+$/;

//     arrNotacion.map((e,i) => {
//         if (expresion.test([e,arrNotacion[i+1],arrNotacion[i+2]].join(''))) {
//             resultado.push('(');
//             pila.agregar(')');
//         }

//         if (isNaN(e)) pila.agregar(e);
        
//         if (!isNaN(arrNotacion[i+1])) {
//             resultado.push(arrNotacion[i+1]);
//             if (!pila.vacia()){
//                 if (pila.proximo() == ')') {
//                     resultado.push(pila.quitar());
//                     resultado.push(pila.quitar());
//                 } else {
//                     resultado.push(pila.quitar());
//                 }
//             }  
//         } 
//     });
//     return resultado;
// }

document.getElementById('btn').addEventListener('click',() => {
    let notacion = document.getElementById('notacion').value;
    let resultado = [];
    
    if (validaciones(notacion)[0]) {
        let arrNotacion = notacion.split(' ');    
        
        resultado = transformar(arrNotacion,resultado);
        resultado = resultado.join().replaceAll(',',' ');
    
        document.getElementById('polaca').textContent = `Polaca: ${notacion}`; 
        document.getElementById('exp').textContent = `Expresion: ${resultado}`; 
        document.getElementById('resultado').textContent = `Resultado: ${eval(resultado)}`; 
        document.getElementById('notacion').value = '';
    } else {
        Swal.fire({icon: "error",text: validaciones(notacion)[1]});
    }
});