var textarea =[
"#una sola fuente: \nstor 5 \n load A \n stor 3 \n load B \n stor 1 \n load C \n stor 5 \n load D\n stor 1 \n load E \n stor E \n mpy D \n ADD C \n load Y \n stor A \n sub B \n div Y \n load Y",
"#dos fuentes: \n stor A,5 \n stor B,3 \n stor C,1 \n stor D,5 \n stor E,1 \n move Y,A \n sub Y,B \n move T,E \n mpy T,D \n ADD T,C \n DIV Y,T","#tres fuentes:\n add A,0,5 \n add B,0,3 \n add C,0,1 \n add D,0,5 \n add E,0,1 \n SUB Y,A,B \n MPY T,D,E \n ADD T,T,C \n DIV Y,Y,T","A+B*C+(D+E)*F"];

//UI del editor
var editor = {};
(function(){
    var self = this
    , edit
    , number
    , counterLinea = 1
    , errorE
    , nameFile = "asm.asm"
    , keydown = function(e){
        if(e.keyCode == 13 || e.keyCode==8){
            var width = edit.clientHeight/18;
            width += e.keyCode==13?1:0;
            counterLinea= 0;
            newNumberStr = "";
            for(var i=0;i<width;i++){
                 counterLinea++;
                 newNumberStr += '<li>'+counterLinea+'</li>';
             }
             number.innerHTML = newNumberStr;
         }
    };
    
    self.error = function(linea,tipo){
        tipo = tipo || "sintaxis error"
        console.log('error en la linea :',linea,'tipo:',tipo);
        errorE.innerText = tipo;
        errorE.style.display = "block";
        errorE.style.top = ((linea*18)-4)+"px";

    };

    self.ready = function(){
        edit = document.querySelector('.code');
        number = document.querySelector('.number');
        errorE = document.querySelector('.error');

        edit.on('keydown',keydown);

        document.querySelector('.button.runAll').on('click',function(e){
	    errorE.style.display = "none";
            parser.run(edit.innerText);
            reloadRegistros();
        });

        document.querySelector('.button.runNext').on('click',function(e){
            var text = edit.innerText.split('\n')
            , lineaActual = document.querySelector('.nRun')
            , index = parseInt(lineaActual.innerText) || 1;
            errorE.style.display = "none";
            if(text[index-1])
                parser.run(text[index-1],false);
            reloadRegistros();
            if(+document.querySelector('li:last-child').innerText <= index || !text[index-1])
                index = 0;
            lineaActual.innerText = +(index) + 1;
        });
       
        var ejemplos = document.querySelectorAll('.button.ejemplo');
        for(var i=0;i<5;i++){
            ejemplos[i].on('click',loadEjemplo); 
        }
        
        document.querySelector('.save').on('click',function(e){
            var a = document.createElement('a');
            a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(edit.innerText);
            a.download = nameFile;
            a.click();
        });

        document.querySelector('.open').on('change',function(e){
            var f = e.target.files[0];
            console.log(f);
            nameFile = f.name;
            var reader = new FileReader();
            reader.readAsText(f)
            reader.onload = function(e){
                edit.innerText = e.target.result;
                keydown({keyCode:8});

            }
        });

        document.querySelector('.postfijo').on('click',function(e){
            edit.innerText = postfijo(edit.innerText);
        });

        loadEjemplo();
    
        reloadRegistros();
    };

    var reloadRegistros = function(){
        //armar registros 
        var html = "<tr><th>Registro</th><th>Valor</th></tr>";
        for(var i in reg.val){
            html += "<tr><td>"+i+"</td>  <td>"+reg.val[i]+"</td> </tr>"
        }
        document.querySelector('.registros tbody').innerHTML = html;    
    }
    , loadEjemplo = function(e){
        var ejemplo;
        if(!e)
            ejemplo = textarea[0];
        else{
            ejemplo = textarea[this.className.split(' ')[2]-1] 
        }
        if(ejemplo){
            edit.innerText = ejemplo;
            keydown({keyCode:8});
        }else{
            edit.innerText = "";
            parser.clear();
            reloadRegistros();
            keydown({keyCode:8});
        }

	
    };

}).apply(editor);

var parser = {};
(function(){
    var self = this
    , tokens = []
    , eliminaEspacios = function(t){
        t = t.replace(/^\s{0,}/g,"");
        return t.replace(/\s{0,}$/g,"");
    },
    tokenizar = function(text){
        var lineas = text.split('\n')
        , counterLinea = 0;
        for(var i=0;i<lineas.length;i++){
            var linea = eliminaEspacios(lineas[i])
            , op_fuente = linea.split(' ');
            counterLinea++;
            if(linea != "" && linea[0]!="#"){//linea sin nada o comentario
                if(op_fuente.length>1 || op_fuente[0].toUpperCase()=='HLT'){
                    var op = op_fuente[0]
                    , fuentes = op_fuente.slice(1).join('').split(',');//espacios entre comas

                    if(op.toUpperCase() == 'HLT')
                        fuentes = [1];
                    tokens.push({
                            op:op,
                            fuentes:fuentes,
                            linea:counterLinea
                        });
                }else{
                    console.log(op_fuente);
                    editor.error(counterLinea,'up');
                }        
            }


        }

    } 

    , validate = function(txt,limpiar){
        if(limpiar==undefined)
            self.clear();
        tokenizar(txt);
        var tk,
        onlyRegister = [00111,01000,01001,01011,01111]
        for(var i=0;i<tokens.length;i++){     
            tk = tokens[i]; 
            if(tk['op'] && isa.getOpCode(tk.op)==-1){
                editor.error(tk.linea,'Operador invalido');
                return false;
            }else if(tk['fuentes']){
                for(var j=0;j<tk.fuentes.length;j++){
                    //si no esta en el registro o el seguno no es un numero es
                    //invalido
                    if(!(tk.fuentes[j] in reg.val) && !(tk.fuentes[j]!='' && isFinite(tk.fuentes[j])) ){
                        editor.error(tk.linea,'fuente no valido');
                        return false;
                    }
                    if(onlyRegister.indexOf(isa.getOpCode(tk.op))!=-1 && isFinite(tk.fuentes[0])){
                        editor.error(tk.linea,'se necesita un registro');
                        return false;                        
                    }
                }
            }
            
        }
        return true;

    }

    , ajustar = function(){
        for(var i=0;i<tokens.length;i++){
            var fuentes = tokens[i].fuentes;
            if(fuentes.length==1){//guardaras en acumulador
                tokens[i].fuentes = ["AC",fuentes[0]];
                //console.log(tokens[i].fuentes);
            }
        }
    };

    self.clear = function(){
        tokens = [];
        for(var i in reg.val){
            reg.val[i] = '';
        }
    }
    
    self.run = function(txt,clear){
        if(validate(txt,clear)){
            ajustar();
            for(var i=0;i<tokens.length;i++){
                var tk = tokens[i];
                alu.setData(tk)
                if(alu.execute() === false)
                    break;

            }
        }
    }

}).apply(parser);

var alu = {};
(function(){
    var self = this
    , codigoOperacion
    , opCode = {
        00000:function move(){//siempre solo binario
            reg.val[f1] = f2; 
        },

        00001:function stor(){
	        if(isFinite(f1))
                reg.val.AC = f2;
            else
                reg.val[f1] = f2;
        },

        00010:function load(){//siempre binario
            //reg.val[f1] = f2;
            reg.val[fs[1]] = reg.val['AC'];
        },

        00011:function sub(){
            f2 = f2?f2:reg.val['AC'];
            f2 = f3?f2:(+f2*-1);
            reg.val[f1] = +(-f3 || reg.val[f1]) + +f2;
        
        },

        00100:function add(){
            reg.val[f1] = +(f3 || reg.val[f1]) + +f2;
        },
        
        00101:function mpy(){
            reg.val[f1] = +(f3 || reg.val[f1]) * +f2;
        },

        00110:function div(){
            var aux = f2;
            f2 = f3?f2:reg.val[f1];
            f3 = f3?f3:aux;
            reg.val[f1] = f2 / f3;
        },
	//nuevas
        00111:function inr(){
            reg.val[fs[1]]++;
        },
        
        01000:function dcr(){
            reg.val[fs[1]]--; 
        },
        
        01001:function ana(){
            reg.val[fs[1]] = (reg.val[f1] && f2)?1:0;
        },

        01010:function ani(){
            reg.val[fs[0]] = (parseInt(reg.val[fs[0]]) && parseInt(fs[1]))?1:0; 
        },

        01011:function ora(){
            reg.val[f1] = (reg.val[f1] || f2)?1:0;
        },

        01100:function ori(){
            reg.val[f1] = (parseInt(reg.val[f1]) || parseInt(f2))?1:0;
        },
        
        01101:function hlt(){
            return false;
        },

        01110:function sui(){
            reg.val[f1] = reg.val[f1]-f2;
        },

        01111:function xra(){
            reg.val[f1] = (reg.val[f1] != f2)?1:0; 
        },

        10000:function xri(){
            reg.val[f1] = (reg.val[f1] != f2)?1:0; 
        }

    }
    , fs
    , f1
    , f2
    , f3;

    self.setData = function(token){
        codigoOperacion = isa.getOpCode(token.op);
        fs = token.fuentes;
        f1 = token.fuentes[0];
        f2 = reg.val[token.fuentes[1]] || token.fuentes[1];
        f3 = reg.val[token.fuentes[2]] || token.fuentes[2];

    }

    self.execute = function(){
        return opCode[codigoOperacion]();
        
    }
    
    
}).apply(alu);

var isa = {};
(function(){
    var self = this;
    opCodes = {
        MOVE:00000,
        STOR:00001,
        LOAD:00010,
        SUB:00011,
        ADD:00100,
        MPY:00101,
        DIV:00110,
        //10 mas...
        INR:00111,//inr D incrementa en uno D
        DCR:01000, //DCR D decrementa en uno D
        ANA:01001, //ANA S , AC AND S , guarda en AC, registros.
        ANI:01010, //ANA sin registro.
        ORA:01011,//ORA S , AC OR S guarda en AC
        ORI:01100,//ora sin registro
        HLT:01101,
        SUI:01110, //substrae lo del numero de AC
        XRA:01111, //xor s , s xor AC
        XRI:10000 //xor sin registro.
    };
    
    self.getOpCode = function(name){
        name = name.toUpperCase();
        if(name in opCodes){
            return opCodes[name];
        }
        return -1;
    }
    
}).apply(isa);

var reg = {};
(function(){
    var self = this;
    self.val = {
            AC:'',A:'',B:'',C:'',D:'',E:'',F:'',G:'',H:'',I:'',
            T:'',K:'',Y:''
        }
}).apply(reg);


//eventos
Element.prototype.on = function(event,callback){
    if(this['attachEvent'])
        return this.attachEvent('on'+event,callback);
    else
        return this.addEventListener(event,callback,false)
};

window.addEventListener('load',editor.ready,false )

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
    return salida;
}
