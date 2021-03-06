
var items = [{fig: "circulo", texto: "Círculo"},
			 {fig: "quadrado", texto: "Quadrado"},
			 {fig: "rectangulo", texto: "Rectângulo"},
			 {fig: "triangulo", texto: "Triângulo"},
			 {fig: "paralelepipedo", texto: "Paralelepípedo"},
			 {fig: "piramide", texto: "Pirâmide"},
			 {fig: "cilindro", texto: "Cilindro"},
			];

var tamanhoItems = items.length;

shuffle(items);

var LARGURA_LINHA = 2.5;
var pontuacao;
var itemAtual;

$(document).ready(function(){
	pontuacao = 0;
	itemAtual = 0;

	proximo(itemAtual);

	$('#pontuacao').text(pontuacao);
	$('#total').text(tamanhoItems);

	$('#btn_seguinte').click(function(){
		
		
		if(itemAtual < tamanhoItems){
			
			var selecionado = $("input[name='opcoes']:checked").val();
			
			if(items[itemAtual].fig === selecionado){
				pontuacao++;
				$('#pontuacao').text(pontuacao);
				$("input[name='opcoes']:checked").parent().css({color: '#4Caf50', fontWeight: 'bold'});
			}else{
				$("input[name='opcoes']:checked").parent().css({color: '#d50000', fontWeight: 'bold'});
			}

			itemAtual++;
			if(itemAtual< tamanhoItems){
				setTimeout(function(){  
					proximo(itemAtual); }
				, 1500);
			}else{
				imprimirPontuacao();
			}
			
		}else{
			imprimirPontuacao();
		}

	});



});

function imprimirPontuacao(){
	var percent = pontuacao * 100 / tamanhoItems;

	if(percent < 50){
		alert("Fim do Jogo, obteve "+pontuacao+" pontos! \n MAU DESEMPENHO, TENTE NOVAMENTE!");
	}else if(percent > 50 && percent < 75){
		alert("Fim do Jogo, obteve "+pontuacao+" pontos! \n PRECISAS TREINAR MAIS!!");
	}else{
		alert("Fim do Jogo, obteve "+pontuacao+" pontos! \n  PARABÉNS BEM JOGADO!!!");
	}
};

function proximo(posicao){
	$('#rest').html(posicao+1);

	var copia = items.slice(0);
	var item = copia[posicao];
	copia.splice(posicao, 1);
	
	var candids = [];
	var remov = Math.floor(Math.random() * copia.length);
	
	candids.push(copia[remov]);
	copia.splice(remov, 1);

	remov = Math.floor(Math.random() * copia.length);
	candids.push(copia[remov]);
	copia.splice(remov, 1);

	remov = Math.floor(Math.random() * copia.length);
	candids.push(copia[remov]);

	candids.push(item);

	shuffle(candids);

	var mostrar = "";
	for(i=0; i < candids.length; i++){
		mostrar += "<li class=\"opts\"><input type=\"radio\" class=\"opcoes\" name=\"opcoes\" value=\""+candids[i].fig+"\" />"+candids[i].texto+"</li>";
	}

	$("ul#lista_respostas").html(mostrar);
	desenhar(posicao);

}


function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


function desenhar(pos){
	var canvas = document.getElementById("gameCanvas");
	var context = canvas.getContext("2d");

	//Limpar o Canvas
	context.clearRect(0, 0, 200, 140);

	switch(items[pos].fig) {

	    case "circulo":
	    	context.beginPath();
			context.arc(95,50,48,0,2*Math.PI);
			context.lineWidth = LARGURA_LINHA;
			context.stroke();
	        break;
	    case "quadrado":
	    	context.fillStyle = "#000000";
	    	context.lineWidth = LARGURA_LINHA;
			context.strokeRect(80,20,100,100);
	        break;
	    case "rectangulo":
	   		context.fillStyle = "#000000";
	   		context.lineWidth = LARGURA_LINHA;
			context.strokeRect(30,20,160,80);
	        break;
	    case "triangulo":
		    context.beginPath();
			context.moveTo(90,15);
			context.lineTo(30,120);
			context.lineTo(150,120);
			context.closePath();
			context.lineWidth = LARGURA_LINHA;
			context.stroke();
	        break;
	    case "paralelepipedo":
	    	context.strokeRect(20,60,120,60);
			context.strokeRect(60,40,120,60);
			context.beginPath();
			context.moveTo(20,60);
			context.lineTo(60,40);
			context.moveTo(140,60);
			context.lineTo(180,40);
			context.moveTo(20,120);
			context.lineTo(60,100);
			context.moveTo(140,120);
			context.lineTo(180,100);
			context.lineWidth = LARGURA_LINHA;
			context.stroke();
			context.closePath();
	        break;
	    case "piramide":
	    	context.beginPath();
			context.moveTo(70,20);
			context.lineTo(20,120);
			context.lineTo(60,80);
			context.lineTo(70,20);
			context.lineTo(140,80);
			context.lineTo(60,80);
			context.moveTo(20,120);
			context.lineTo(120,120);
			context.lineTo(70,20);
			context.moveTo(120,120);
			context.lineTo(140,80);
			context.lineWidth = LARGURA_LINHA;
			context.closePath();
			context.stroke();
	        break;
	    case "cilindro":
	    	context.beginPath();
			context.ellipse(120, 30, 50, 10, 0, 0, 2 * Math.PI);
			context.ellipse(120, 120, 50, 10, 0, 0, 2 * Math.PI);
			context.moveTo(70, 30);
			context.lineTo(70, 120);
			context.lineWidth = LARGURA_LINHA;
			context.closePath();
			context.stroke();
	        break;
	    default:
	    	return;

	}

}