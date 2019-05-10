var inicioJuego = 0
	movimientos = 1
	puntos = 0
	imagenTotal = 35
    filaTotal = 5
    columnasTotal = 7
    bloqueo = 0
var data = [];
var item;
var itemDiv;
var arrayDiv = [];

var videoJuegos = {
	init: function(){
		$(".btn-reinicio").on("click", function(){
			switch(inicioJuego){
				case 0:
					videoJuegos.iniciarJuego();
				break;
				case 1:
					inicioJuego = 2;
					$('#timer').timer('remove');
					videoJuegos.terminarJuego();
				break;
				case 2:
					videoJuegos.reiniciarJuego();
				break;
				default:
					console.log('Error en el estado inicioJuego');
			}
		});
		this.animacionTitulo();
		this.cargarImagenes();
	},
	iniciarJuego: function(){
		$(".btn-reinicio").html('Reiniciar');
		inicioJuego = 1;
		this.inicioTiempo();
		this.scanRepetidosCol();
		this.scanRepetidosFil();
		if(data.length != 0){
			setTimeout(function(){
			videoJuegos.animacionAcertar();
			}, 800);
		}
	},
	terminarJuego: function(){
		$(".panel-tablero").hide("slide", {direction: "left"}, "slow", function(){
			$(".time").hide("slide", {direction: "left"}, "slow");
			$(".panel-score").animate({width: "390%"}, 1000);
			if(inicioJuego != 1){
				$(".panel-score").prepend('<h1 class="main-titulo-2">Juego Terminado</h1>');
			}
		});
	},
	reiniciarJuego: function(){
		var col = $("div[class^='col']");
		for (var i = 0; i < col.length; i++) {
			$(col[i]).html('');
		}
		$('#timer').timer('remove');
		$(".btn-reinicio").html('Iniciar');
		$("#timer").html('02:00');
		$("#movimientos-text").html('0');
		$("#score-text").html('0');
		puntos = 0;
		movimientos = 1;
		this.cargarImagenes();
		$(".main-titulo-2").remove();
		$(".panel-score").animate({width: "25%"}, 1000, function(){
			$(".panel-tablero").show("slide", {direction: "left"}, "slow");
			$(".time").show("slide", {direction: "left"}, "slow");
		});
		inicioJuego = 0;
	},
	inicioTiempo: function(){
		$('#timer').timer({
			duration: '2m',
			format: '%M:%S',
			callback: function(){
				inicioJuego = 2;
				videoJuegos.terminarJuego();
			}
		});
	},
	animacionTitulo: function(){
		setInterval(function(){
			$(".main-titulo").switchClass("main-titulo","main-titulo-efecto", 200),
			$(".main-titulo").switchClass("main-titulo-efecto","main-titulo", 200)
		}, 1000);
	},
	imagenes: function(){
		var i = 0;
		this[i++] = "image/1.png";
		this[i++] = "image/2.png";
		this[i++] = "image/3.png";
		this[i++] = "image/4.png";
		this.total = i;
	},
	obtenerColumnas: function(){
		var i = 0;
		this[i++] = $(".col-1").find("div");
		this[i++] = $(".col-2").find("div");
		this[i++] = $(".col-3").find("div");
		this[i++] = $(".col-4").find("div");
		this[i++] = $(".col-5").find("div");
		this[i++] = $(".col-6").find("div");
		this[i++] = $(".col-7").find("div");
		this.total = i;
	},
	obtenerFilas: function(){
		var i = 0;
		this[i++] = $("[id*=img-1]");
		this[i++] = $("[id*=img-2]");
		this[i++] = $("[id*=img-3]");
		this[i++] = $("[id*=img-4]");
		this[i++] = $("[id*=img-5]");
		this.total = i;
	},
	cargarImagenes: function(){
		var num = 1;
		var numImg = 1;
		for(var i = 1; i <= columnasTotal; i++){
			for(var ii = 1; ii <= filaTotal; ii++){
				var imagen = new this.imagenes;
				var src = imagen[Math.floor(Math.random() * imagen.total)];
				$(".col-" + num).append("<div id='item-"+ numImg +" img-"+ ii +"'>" +
										"<img src="+ src +" class='imagen-"+ numImg +"'>" +
										"</div>");
				$(".imagen-" + numImg).draggable({
					revert: true,
					containment: ".panel-tablero",
					start: function(){
						if(inicioJuego == 1){
						$("#movimientos-text").html(movimientos++);
						}
					},
				stop: function(){
					if(inicioJuego == 1){
						if(bloqueo == 0){
						videoJuegos.scanRepetidosCol();
						videoJuegos.scanRepetidosFil();
						videoJuegos.animacionAcertar();
					}
					}
				},
				drag: function(event, ui){}
			});
			$("[id='item-"+ numImg +" img-"+ ii +"'").droppable({
				drop: function(event, ui){
					if(inicioJuego == 1){
						if(bloqueo == 0){
							imagenUno = event.target.lastChild;
							imagenDos = ui.draggable[0];
							imgUno = $(imagenUno).attr("src");
							imgDos = $(imagenDos).attr("src");
							$(imagenUno).attr("src", imgDos);
							$(imagenDos).attr("src", imgUno);
						}
					}
				}
			});
			numImg++;
			}
			num++;
		}
	},
	resetDiv: function(){
		setTimeout(function(){
			var col = new videoJuegos.obtenerColumnas;
			var num = 1;
			var numImg = 1;
			for(var i = 0; i <= columnasTotal; i++){
			var num2 = 1;
				for (var ii = 0; ii < filaTotal; ii++){
				var nuevoDiv = $(col[i])[ii];
				$(nuevoDiv).attr("id", "item-"+ numImg +" img-"+ num2);
				$(nuevoDiv).find("img").attr("class", "item-"+ numImg);
				num2++;
				numImg++;
				}
				num++;
			}
		    videoJuegos.scanRepetidosCol();
			videoJuegos.scanRepetidosFil();
			if(data.length != 0){
				setTimeout(function(){
				videoJuegos.animacionAcertar();
				}, 800);
			}
			bloqueo = 0;
		}, 800);
	},
	agregarDiv: function(){
		bloqueo = 1;
		setTimeout(function(){
			var imagen = new videoJuegos.imagenes
			var datos = arrayDiv;
			for(var i = 0; i < datos.length; i++){
				var id = $(datos[i].obj)[0].id;
				var src = imagen[Math.floor(Math.random() * imagen.total)];
				var divEliminado = $(datos[i].obj).detach();
				var divNuevo = $(divEliminado)[0];
			$(divNuevo).find("img").attr("src", src);
			$(divNuevo).attr("id", id);
			$(datos[i].clase).prepend(divNuevo);
			$("[id*='"+ id +"']").show('bounce', 400, 'slow');
			}
			arrayDiv = [];
		  videoJuegos.resetDiv();
		}, 1000);
	},
	animacionAcertar: function(){
		var array
		var claseCol
		var cajaDulce
		if(data.length != 0){
			for(var i = 0; i < data.length; i++){
				switch(data[i].obj){
					case "Col":
						objeto = new this.obtenerColumnas;
					break;
					case "Fil":
						objeto = new this.obtenerFilas;
					break;
					default:
						console.log("Error en el Objeto - animacionAcertar");
				}
			for(var n = 0; n < data[i].arrays.length; n++){
				$(data[i].colFil[data[i].arrays[n]]).hide("pulsate", 400, function(){});
				cajaDulce = $(data[i].colFil[data[i].arrays[n]]);
				claseCol = "."+$(data[i].colFil[data[i].arrays[n]])[0].parentNode.className;
				itemDiv = {obj: $(data[i].colFil[data[i].arrays[n]]), clase: claseCol};
				arrayDiv.push(itemDiv);
			}
			$("#score-text").html(data[i].puntos);
			}
			data = [];
			videoJuegos.agregarDiv();
		}
	},
	scanRepetidosCol: function(){
		var imagen = new this.imagenes;
		var colDiv = new this.obtenerColumnas;
		var col = new this.obtenerColumnas;
		var objeto = "Col";
		for (var n = 0; n < col.total; n++) {
			col[n] = $(col[n]).find("img");
		}
		for(var i = 0; i < col.total; i++){
			for(var img = 0; img < imagen.total; img++){
				if($(col[i][0]).attr("src") == imagen[img] && $(col[i][1]).attr("src") == imagen[img] && $(col[i][2]).attr("src") == imagen[img] && $(col[i][3]).attr("src") == imagen[img] && $(col[i][4]).attr("src") == imagen[img]){
				puntos = puntos + 5;
				item = {arrays: [0,1,2,3,4], colFil: colDiv[i], obj: objeto, item: i, puntos: puntos};
				data.push(item);
				}else if($(col[i][0]).attr("src") == imagen[img] && $(col[i][1]).attr("src") == imagen[img] && $(col[i][2]).attr("src") == imagen[img] && $(col[i][3]).attr("src") == imagen[img]){
					puntos = puntos + 4;
					item = {arrays: [0,1,2,3], colFil: colDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
				}else if($(col[i][1]).attr("src") == imagen[img] && $(col[i][2]).attr("src") == imagen[img] && $(col[i][3]).attr("src") == imagen[img] && $(col[i][4]).attr("src") == imagen[img]){
					puntos = puntos + 4;
					item = {arrays: [1,2,3,4], colFil: colDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
				}else if($(col[i][0]).attr("src") == imagen[img] && $(col[i][1]).attr("src") == imagen[img] && $(col[i][2]).attr("src") == imagen[img]){
					puntos = puntos + 3;
					item = {arrays: [0,1,2], colFil: colDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
				}else if($(col[i][1]).attr("src") == imagen[img] && $(col[i][2]).attr("src") == imagen[img] && $(col[i][3]).attr("src") == imagen[img]){
					puntos = puntos + 3;
					item = {arrays: [1,2,3], colFil: colDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
				}else if($(col[i][2]).attr("src") == imagen[img] && $(col[i][3]).attr("src") == imagen[img] && $(col[i][4]).attr("src") == imagen[img]){
					puntos = puntos + 3;
					item = {arrays: [2,3,4], colFil: colDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
				}else{
				}
			}
		}
	},
	scanRepetidosFil: function(){
		var imagen = new this.imagenes;
		var filDiv = new this.obtenerFilas;
		var fil = new this.obtenerFilas;
		var objeto = "Fil";
		for (var n = 0; n < fil.total; n++) {
			fil[n] = $(fil[n]).find("img");
		}
		for(var i = 0; i < fil.total; i++){
			for(var img = 0; img < imagen.total; img++){
				if($(fil[i][0]).attr("src") == imagen[img] && $(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img] && $(fil[i][6]).attr("src") == imagen[img]){
					puntos = puntos + 7;
					item = {arrays: [0,1,2,3,4,5,6], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
				}else if($(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img] && $(fil[i][6]).attr("src") == imagen[img]){
					puntos = puntos + 6;
					item = {arrays: [1,2,3,4,5,6], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			  	}else if($(fil[i][0]).attr("src") == imagen[img] && $(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img]){
					puntos = puntos + 6;
					item = {arrays: [0,1,2,3,4,5], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			  	}else if($(fil[i][0]).attr("src") == imagen[img] && $(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img]){
					puntos = puntos + 5;
					item = {arrays: [0,1,2,3,4], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			  	}else if($(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img]){
					puntos = puntos + 5;
					item = {arrays: [1,2,3,4,5], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			 	}else if($(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img] && $(fil[i][6]).attr("src") == imagen[img]){
					puntos = puntos + 5;
					item = {arrays: [2,3,4,5,6], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			  	}else if($(fil[i][0]).attr("src") == imagen[img] && $(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img]){
					puntos = puntos + 4;
					item = {arrays: [0,1,2,3], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			 	}else if($(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img]){
					puntos = puntos + 4;
					item = {arrays: [1,2,3,4], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			  	}else if($(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img]){
					puntos = puntos + 4;
					item = {arrays: [2,3,4,5], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			  	}else if($(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img] && $(fil[i][6]).attr("src") == imagen[img]){
					puntos = puntos + 4;
					item = {arrays: [3,4,5,6], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			  	}else if($(fil[i][0]).attr("src") == imagen[img] && $(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img]){
					puntos = puntos + 3;
					item = {arrays: [0,1,2], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			  	}else if($(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img]){
					puntos = puntos + 3;
					item = {arrays: [1,2,3], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			  	}else if($(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img]){
					puntos = puntos + 3;
					item = {arrays: [2,3,4], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			 	}else if($(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img]){
					puntos = puntos + 3;
					item = {arrays: [3,4,5], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			  	}else if($(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img] && $(fil[i][6]).attr("src") == imagen[img]){
					puntos = puntos + 3;
					item = {arrays: [4,5,6], colFil: filDiv[i], obj: objeto, item: i, puntos: puntos};
					data.push(item);
			  	}else{
				}
			}
		}
	}
}

$(document).ready(function(){
	videoJuegos.init();
});