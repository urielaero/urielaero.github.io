var textarea =["stor A,5 \n stor B,3 \n stor C,1 \n stor D,5 \n stor E,1 \n SUB Y,A,B \n MPY T,D,E \n ADD T,T,C \n DIV Y,Y,T",
"stor A,5 \n stor B,3 \n stor C,1 \n stor D,5 \n stor E,1 \n move Y,A \n sub Y,B \n move T,E \n mpy T,D \n ADD T,C \n DIV Y,T",
"stor A,5 \n stor B,3 \n stor C,1 \n stor D,5 \n stor E,1 \n stor E \n mpy D \n ADD C \n load Y \n stor A \n sub B \n div Y \n load Y"]

//UI del editor
var editor = {};
(function(){
    var self = this
    , edit
    , number
    , counterLinea = 1
    , errorE
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
        for(var i=0;i<ejemplos.length;i++){
            ejemplos[i].on('click',loadEjemplo); 
        }
        
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
            ejemplo = textarea[2];
        else{
            console.log();
            ejemplo = textarea[this.className.split(' ')[2]-1]
            
        }    
        edit.innerText = ejemplo;
        keydown({keyCode:8});
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
            if(linea != ""){//linea sin nada
                if(op_fuente.length>1){
                    var op = op_fuente[0]
                    , fuentes = op_fuente.slice(1).join('').split(',');//espacios entre comas
                    //console.log('op:',op,'fuentes:',fuentes);
                    tokens.push({
                            op:op,
                            fuentes:fuentes,
                            linea:counterLinea
                        });
                }else{
                    editor.error(counterLinea,'up');
                }        
            }


        }

    }
    , clear = function(){
        tokens = [];
        for(var i in reg.val){
            reg.val[i] = '';
        }
    }

    , validate = function(txt,limpiar){
        if(limpiar==undefined)
            clear();
        tokenizar(txt);
        var tk;
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
                }
            }
            
        }
        return true;

    }

    ajustar = function(){
        for(var i=0;i<tokens.length;i++){
            var fuentes = tokens[i].fuentes;
            if(fuentes.length==1){//guardaras en acumulador
                tokens[i].fuentes = ["AC",fuentes[0]];
                //console.log(tokens[i].fuentes);
            }
        }
    };
    
    self.run = function(txt,clear){
        if(validate(txt,clear)){
            ajustar();
            for(var i=0;i<tokens.length;i++){
                var tk = tokens[i];
                alu.setData(tk)
                alu.execute();

            }
        }
    }

}).apply(parser);

var alu = {};
(function(){
    var self = this
    , codigoOperacion
    , opCode = {
        000:function move(){//siempre solo binario
            reg.val[f1] = f2; 
        },

        001:function stor(){
            reg.val[f1] = f2;
        },

        010:function load(){//siempre binario
            //reg.val[f1] = f2;
            reg.val[fs[1]] = reg.val['AC'];
        },

        011:function sub(){
            f2 = f2?f2:reg.val['AC'];
            f2 = f3?f2:(+f2*-1);
            reg.val[f1] = +(-f3 || reg.val[f1]) + +f2;
        
        },

        100:function add(){
            reg.val[f1] = +(f3 || reg.val[f1]) + +f2;
        },
        
        101:function mpy(){
            reg.val[f1] = +(f3 || reg.val[f1]) * +f2;
        },

        110:function div(){
            var aux = f2;
            f2 = f3?f2:reg.val[f1];
            f3 = f3?f3:aux;
            reg.val[f1] = f2 / f3;
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
        opCode[codigoOperacion]();
        
    }
    
    
}).apply(alu);

var isa = {};
(function(){
    var self = this;
    opCodes = {
        MOVE:000,
        STOR:001,
        LOAD:010,
        SUB:011,
        ADD:100,
        MPY:101,
        DIV:110
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
}
window.addEventListener('load', editor.ready, false )
