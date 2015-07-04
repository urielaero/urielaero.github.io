function postfijo(entrada){
    var pila = []
    , salida = ''
    , op = {
        '+':0
        , '-':0
        , '*':1
        , '/':1
        }
    , i
    , length;

    for(var j=0;j<entrada.length;j++){
        i = entrada[j];
        if(!(i in op) && i != '(' && i !=')'){
            salida += i;
        }else if(i=='('){
            pila.push(i);
        }else if(i in op){
            while(1){
                if(pila.indexOf('(') !=-1){
                    pila.push(i);
                    break;            
                }else if(pila.length == 0 || op[i] > op[pila[0]]){
                    pila.push(i);
                    break;
                }else{
                    salida += pila.pop();
                }
                
            }
        }else if(i == ')'){
            for(var l=0;l<pila.length;l++){
                if(pila[l] != '(')
                    salida += pila.pop();
            }
            pila.pop();
        }
    }
    length = pila.length;
    for(i=0;i<length;i++){
        salida += pila.pop();
    }
    console.log(salida)
    return salida;
}
postfijo("A+B*C+(D+E)*F");
