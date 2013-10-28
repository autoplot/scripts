//TODO: binaryajax.js makes an AJAX request for the image which has
//already been loaded.  This is not necessary.  Modify binaryajax.js
//so that it looks to see if image has been loaded before making AJAX request.

function autoplotzoom(options) {

	// http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
	var DOMString = function(){/*
        	<div style="text-align:center">
	    		<div id="idplotinfo" style="text-align:center"></div>
		    		<div>
		    			<img id="idplot" src="">
		    		</div>
		    		<div id="idplotcontrols" style="text-align:center">        
		    		    <span style="text-align:center">
		    		        <img src="css/spinner.gif" id="idplotprogress" alt="Busy..."></img>
		    		    </span>
		    			<button id="idplotscanprev"><<</button>
		    			<button id="idplotscannext">>></button>
		    			<button id="idplotresetzoom">Reset Zoom</button>    
		    			<button id="idplotlastzoom">Last Zoom</button>    
		    			<button id="idplotzoomin">Zoom In</button>
		    			<button id="idplotzoomout">Zoom Out</button>    
		    			<button id="idplotcenterFocus" title="Center the plot on last click position">Center at x=</button><input id="idplotxclick" ></input>    
		    		</div>
		    	</div>
	    	</div>
        */}.toString().slice(14,-3)

	if (typeof(autoplotzoom.Nplots) === "undefined") {
		autoplotzoom.Nplots = 1;
	} else {
		autoplotzoom.Nplots = autoplotzoom.Nplots+1
	}
	id = "idplot"+(autoplotzoom.Nplots);

	if (options.el) {
		$(options.el).append(DOMString.replace(/idplot/g,id));
	} else {
		$("body").append(DOMString.replace(/idplot/g,id));
	}

	var startdateinmilliseconds = 0.0;
	var enddateinmilliseconds = 0.0;

	var PLOTINFO;

	var u = new Url(options.src);
	u.query.width = options.width || $('#'+id).parent().width();
	u.query.height = options.height || $('#'+id).parent().parent().parent().height();

	src = u.toString();

	
	$("#"+id).attr('src',src);

	console.log("Setting lastzoom for id = "+id+" to be " + src);
	lastzoom(id,src);

	$("#"+id).load(function () {
		$("#" + $(this).attr('id') + 'progress').hide();
	});

	var all = false;
	if (typeof(options.allcontrols) !== "undefined") {
		if (options.allcontrols) {
			all = true;
		}
	}
	if (!options.updateplots) {
		updateplots = function () {};
	}

	$("#"+id+"scanprev").click(function () {scanprev($(this).attr('id').replace("scanprev",""))});
	$("#"+id+"scannext").click(function () {scannext($(this).attr('id').replace("scannext",""))});
	$("#"+id+"zoomout").click(function () {zoomout($(this).attr('id').replace("zoomout",""))});    
	$("#"+id+"zoomin").click(function () {zoomin($(this).attr('id').replace("zoomin",""))}) ;   
	$("#"+id+"resetzoom").click(function () {resetzoom($(this).attr('id').replace("resetzoom",""))}) ;   
	$("#"+id+"lastzoom").click(function () {lastzoom($(this).attr('id').replace("lastzoom",""))}) ;   
	$("#"+id+"centerFocus").click(function () {centerFocus($(this).attr('id').replace("centerFocus",""))});    

	$("#"+id+"scanprev").hide(); if (all || options.scanprev) $("#"+id+"scanprev").show();
	$("#"+id+"scannext").hide(); if (all || options.scannext) $("#"+id+"scannext").show();
	$("#"+id+"zoomout").hide(); if (all || options.zoomout) $("#"+id+"zoomout").show();
	$("#"+id+"zoomin").hide(); if (all || options.zoomin) $("#"+id+"zoomin").show();
	$("#"+id+"resetzoom").hide(); if (options.resetzoom) $("#"+id+"resetzoom").show();
	$("#"+id+"lastzoom").hide(); if (all || options.lastzoom) $("#"+id+"lastzoom").show();
	$("#"+id+"centerFocus").hide(); if (all || options.centerFocus) $("#"+id+"centerFocus").show();
	$("#"+id+"xclick").hide(); if (all || options.centerFocus) $("#"+id+"xclick").show();

	
	$("#"+id).click(function (evt) {
		var id = $(this).attr('id');
		console.log(id);
		ImageInfo.loadInfo($(this).attr('src'), 
			function () {
				clickshift(evt,id,options.updateplots);
			})
	});	
	
	$('#'+id).imgAreaSelect({
		handles: true,
		autoHide: true,
		onSelectEnd: function(img, selection) {
			var x1milliseconds = 0;
			var x2milliseconds = 0;
			var id = $(img).attr('id')
			console.log("imgAreaSelect called with id="+id);
			ImageInfo.loadInfo($(img).attr('src'), function () {mycallback(id,selection)});
		}
	});

	function buildImgUrl(id, start, end) {
		imgurl = $("#"+id).attr('src');
	
		console.log('buildImageUrl called with id='+id);

		var u = new Url(imgurl);

		u.query.width = $('#'+id).parent().width();

		var iso8601s = new Date(start).toISOString();
		var iso8601e = new Date(end).toISOString(); // toLocalIsoString( end );
		u.query.timeRange = iso8601s + "/" + iso8601e;

		console.log('' + start + " - " + end + " " + new Date(start));
		console.log('' + iso8601s + "/" + iso8601e);
		return u.toString();
	}

	function echoImgUrl(id) {
		$('#'+id+'url').text($("#"+id).attr('src'));
	}

	function setTime(id,startMilliseconds, endMilliseconds) {

		console.log('setTime called with id='+id)
		console.log('    startdateinmilliseconds=' + startMilliseconds);
		console.log('    diffmilliseconds=' + (endMilliseconds - startMilliseconds));
		console.log('    mod86400000/3600000= ' + ((startMilliseconds % 86400000) / 3600000));

		zoomurl = buildImgUrl(id, startMilliseconds, endMilliseconds);

		$('#'+id).attr('src', zoomurl);
		$('#'+id+'progress').show();

		startdateinmilliseconds = startMilliseconds;
		enddateinmilliseconds   = endMilliseconds;
		diffmilliseconds        = enddateinmilliseconds - startdateinmilliseconds;
		msecperpx               = diffmilliseconds / graphwidth;
		console.log('--> startdateinmilliseconds=' + startdateinmilliseconds);

	}

	function scanprev(id) {
		setTime(id,startdateinmilliseconds - diffmilliseconds, enddateinmilliseconds - diffmilliseconds);
	}

	function scannext(id) {
		setTime(id,startdateinmilliseconds + diffmilliseconds, enddateinmilliseconds + diffmilliseconds);
	}

	function zoomout(id) {
		setTime(id,startdateinmilliseconds - diffmilliseconds, enddateinmilliseconds + diffmilliseconds);
	}

	function refresh(id) {
		setTime(id,startdateinmilliseconds, enddateinmilliseconds);
	}

	function lastzoom(id,src) {
		if (arguments.length == 2) {
			if (typeof(lastzoom.last) === "undefined") lastzoom.last = {};
			if (typeof(lastzoom.last[id]) === "undefined") lastzoom.last[id] = [];
			lastzoom.last[id].push(src);
			return;		
		}
		console.log("lastzoom called with id="+id);
		if (lastzoom.last[id].length == 1) return;
		$('#'+id+'progress').show();		
		$('#'+id).attr('src', lastzoom.last[id].pop());
	}

	function resetzoom(id) {
		$('#'+id).attr('src', lastzoom.last[id][0]);		
	}

	function zoomin(id) {
		third = (enddateinmilliseconds - startdateinmilliseconds) / 3;
		setTime(id,startdateinmilliseconds + third, enddateinmilliseconds - third);
	}

	function centerFocus(id) {
		if (typeof center === "undefined") {
			$("#info").html('click on the plot to set focus position');
		} else {
			sdatax = $('#'+id+'xclick').val();
			$('#'+id+"info").html(sdatax);
			datax  = new Date(sdatax).toJSON();
			center = new Date(datax).getTime();
			half = (enddateinmilliseconds - startdateinmilliseconds) / 2;
			setTime(id,center - half, center + half);
		}
	}
	
	function clickshift(subEvent,id,updateplots) {

		console.log("clickshift event triggered for id = "+id)

			splotInfo = ImageInfo.getField($("#"+id).attr('src'), "data")['plotInfo'];
			plotInfo = $.parseJSON(splotInfo)
	
			if (plotInfo == -1) {
				$("#"+id+"info").html('No metadata found.');
				return;
			}
	
			var xx = subEvent.offsetX || (subEvent.pageX - subEvent.target.offsetLeft);
			var yy = subEvent.offsetY || (subEvent.pageY - subEvent.target.offsetTop);
	
			//console.log(subEvent);
			var found = false;
			for (i = 0; i < plotInfo.plots.length; i++) {
				var p = plotInfo.plots[i];
				//console.log(p)
				if (p.xaxis.left <= xx && xx < p.xaxis.right && p.yaxis.top <= yy && yy < p.yaxis.bottom) {
					l = p.xaxis.right - p.xaxis.left;
	
					if (p.xaxis.units == 'UTC') {
						dmin = Date.parse(p.xaxis.min);
						dmax = Date.parse(p.xaxis.max);
						datax = ((xx - p.xaxis.left) * dmax + (p.xaxis.right - xx) * dmin) / l;
						datax = new Date(datax).toJSON();
					} else {
						if (p.xaxis.type == 'log') {
							oo = ((p.xaxis.right - xx) / l);
							zz = Math.log(p.xaxis.max / p.xaxis.min);
							datax = Math.exp(Math.log(p.xaxis.min) + ((xx - p.xaxis.left) / l) * Math.log(p.xaxis.max / p.xaxis.min));
						} else {
							datax = ((xx - p.xaxis.left) * p.xaxis.min + (xx - p.xaxis.left) * p.xaxis.max) / l;
						}
					}
					l = p.yaxis.bottom - p.yaxis.top;
					if (p.yaxis.type == 'log') {
						datay = Math.exp(Math.log(p.yaxis.min) + ((p.yaxis.bottom - yy) / l) * Math.log(p.yaxis.max / p.yaxis.min));
					} else {
						datay = ((yy - p.yaxis.top) * p.yaxis.min + (p.yaxis.bottom - yy) * p.yaxis.max) / l;
					}
	
					$("#"+id+"xclick").val(datax);
					console.log('x:' + datax + ' y:' + datay);
					//'x:' + xx + ' y:' + yy + ' np:' + plotInfo.numberOfPlots + ' ip:'+i + 
					found = true;
				}
			}
			if (!found) {
				console.log('Click was outside of axis bounds');
			} else {
				center = new Date(datax).getTime();
				if (updateplots)
					updateplots(datax,datay);	
			}
	
	
	}

	//	Callback function for when metadata extracted
	function mycallback(id,selection) {
		console.log("mycallback event triggered for id = "+id)
		imgurl = $("#"+id).attr('src');
		console.log(imgurl)
		splotInfo = ImageInfo.getField(imgurl, "data")['plotInfo'];
		PLOTINFO = $.parseJSON(splotInfo);

		console.log('   mycallback--> startdateinmilliseconds=' + startdateinmilliseconds);
		startdateinmilliseconds = new Date(PLOTINFO.plots[0].xaxis.min).getTime();
		enddateinmilliseconds   = new Date(PLOTINFO.plots[0].xaxis.max).getTime();
		diffmilliseconds        = enddateinmilliseconds - startdateinmilliseconds;
		console.log('   mycallback--> startdateinmilliseconds=' + startdateinmilliseconds + " (exit)");

		topside    = PLOTINFO.plots[0].yaxis.top;
		bottomside = PLOTINFO.plots[0].yaxis.bottom;
		leftside   = PLOTINFO.plots[0].xaxis.left;
		rightside  = PLOTINFO.plots[0].xaxis.right;

		graphwidth  = rightside - leftside;
		graphheight = bottomside - topside;
		msecperpx   = diffmilliseconds / graphwidth;
		
		console.log("Setting lastzoom for id = "+id+" to be " + imgurl);
		lastzoom(id,imgurl);
		
		x1milliseconds = (selection.x1 - leftside) * msecperpx + startdateinmilliseconds; // exclude leftside margin pixels
		x2milliseconds = (selection.x2 - leftside) * msecperpx + startdateinmilliseconds; // exclude leftside margin pixels
	
		if (selection.x2 - selection.x1 > 20) {  // make sure it's deliberate
			setTime(id,x1milliseconds, x2milliseconds);
		}
		
	}
}

