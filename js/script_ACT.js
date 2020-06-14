$(window).load(function() {
	$( "#tabs" ).tabs();
    $( "#check" ).button();
    $( "#format" ).buttonset();
	$( "#tooltip" ).tooltip();
	$( "#slider-range-max" ).slider({
		change: function(event, ui) { changeOpacity(ui.value);} ,
		range: "max",
		min: 0,
		max: 100,
		step: 5,
		value: 25,
		slide: function( event, ui ) {
		  $( "#amount" ).val( ui.value );
		}
		});
		$( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
});


/////////////////
// FUNCTIONS
/////////////////

$( "#zoom" ).change(function(event){
	zoomChapter();
});


/*
google.load("visualization", "1", {packages:["corechart"]});
google.load('visualization', '1', {packages: ['corechart', 'bar']});
google.setOnLoadCallback(drawPieChart);
google.setOnLoadCallback(drawBarChart);



function drawPieChart(buildPie, arr1, arr2, length, titlePie)
{
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Type');
	data.addColumn('number', 'Number');
		for ( var i = 0 ; i < length; i++ ) {
			data.addRow([arr1[i], arr2[i]]);
		}

	var options = {
	  title: titlePie,
	  colors: ['#000', '#737373', '#d9d9d9'],
	};
	var chart = new google.visualization.PieChart(buildPie);
	chart.draw(data, options);
}

	
function drawBarChart(buildBar, arr_b1, arr_b2, arr_b3) {
var data = google.visualization.arrayToDataTable([
['Country', '-', '-', '0', '+', '+'],
['USA',   arr_b1[0], arr_b1[1], arr_b1[2], arr_b1[3], arr_b1[4]],
['MEX',   arr_b2[0], arr_b2[1], arr_b2[2], arr_b2[3], arr_b2[4]],
['CAN',  arr_b3[0], arr_b3[1], arr_b3[2], arr_b3[3], arr_b3[4]],
]);

var options = {
title: 'Mean Score',
colors: ['#0571b0', '#92c5de', '#cccccc', '#f4a582', '#ca0020'],
is3D:true,
isStacked: true,
animation: {
	duration: 1500,
	startup: true
    }
};

var chart = new google.visualization.BarChart(buildBar);
chart.draw(data, options);
}


// intersect Leaflet draw and write table
function updateLayer(query, layer){
	$("#tabs").tabs({ active: 1}); 
	// run a query to select portions of a layer
	var sql = cartodb.SQL({ user: 'gverutes' });
	
	sql.execute("SELECT * FROM ("+query+") a").done(function(data) {
	var arr1 = ['USA', 'MEX', 'CAN']; var arr2 = [0, 0, 0];
	
	var arr_b1 = [0, 0, 0, 0, 0];
	var arr_b2 = [0, 0, 0, 0, 0];
	var arr_b3 = [0, 0, 0, 0, 0];
	
	for (var i = 0; i < data.total_rows; i++){
		if (data.rows[i].stateid.substring(0,3) == 'USA'){
			arr2[0] = arr2[0] + 1
			if (data.rows[i].mean < -0.25){arr_b1[0] = arr_b1[0] + 1;}
			else if (data.rows[i].mean < 0){arr_b1[1] = arr_b1[1] + 1;}
			else if (data.rows[i].mean == 0){arr_b1[2] = arr_b1[2] + 1;}
			else if (data.rows[i].mean > -0.25){arr_b1[4] = arr_b1[4] + 1;}
			else {arr_b1[3] = arr_b1[3] + 1;}			
		}
		else if (data.rows[i].stateid.substring(0,3) == 'MEX'){
			arr2[1] = arr2[1] + 1
			if (data.rows[i].mean < -0.25){arr_b2[0] = arr_b2[0] + 1;}
			else if (data.rows[i].mean < 0){arr_b2[1] = arr_b2[1] + 1;}
			else if (data.rows[i].mean == 0){arr_b2[2] = arr_b2[2] + 1;}
			else if (data.rows[i].mean > -0.25){arr_b2[4] = arr_b2[4] + 1;}
			else {arr_b2[3] = arr_b2[3] + 1;}	
		}
		else {
			arr2[2] = arr2[2] + 1
			if (data.rows[i].mean < -0.25){arr_b3[0] = arr_b3[0] + 1;}
			else if (data.rows[i].mean < 0){arr_b3[1] = arr_b3[1] + 1;}
			else if (data.rows[i].mean == 0){arr_b3[2] = arr_b3[2] + 1;}
			else if (data.rows[i].mean > -0.25){arr_b3[4] = arr_b3[4] + 1;}
			else {arr_b3[3] = arr_b3[3] + 1;}	
		}

	}
	
	drawPieChart(document.getElementById('chartPie-div'), arr1, arr2, arr1.length, 'Country'); 
	drawBarChart(document.getElementById('chartBar-div'), arr_b1, arr_b2, arr_b3);
	
	});

}

*/

// define basemaps
var ESRIImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, and UPR-EGP'
});

var OSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMaps</a>'});
var CartoDB_positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.carto.com">Carto</a>'});
var terrain = L.tileLayer('http://a.tiles.mapbox.com/v3/mapbox.mapbox-warden/{z}/{x}/{y}.png', {id: 'MapID'});
var mapboxStreets = L.tileLayer('http://a.tiles.mapbox.com/v3/geointerest.afb8c76d/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.mapbox.com">Mapbox</a>'});
var mapboxTerrain = L.tileLayer('http://a.tiles.mapbox.com/v3/geointerest.e4qjes5f/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2VvaW50ZXJlc3QiLCJhIjoiQ2czbnlDMCJ9.pQ-_LxzHCL6WqMm5rJrEWw', {attribution: '&copy; <a href="http://www.mapbox.com">Mapbox</a>'});
	
var oceanESRI = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, GEBCO, NOAA, and DeLorme'
});

// map settings
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2VvaW50ZXJlc3QiLCJhIjoiQ2czbnlDMCJ9.pQ-_LxzHCL6WqMm5rJrEWw';
bounds = new L.LatLngBounds(new L.LatLng(38, -85), new L.LatLng(30, -68));
	
// set base map and controls
var map = new L.Map('map', {
  zoomControl: false,
  layer_selector: true,
  layers: [mapboxStreets],
  center: [34.25, -76],
  zoom: 7,
  minZoom: 7,
  maxZoom: 14,
  maxBounds: bounds
  
});

// zoom control
map.addControl( L.control.zoom({position: 'topleft'}) )
// scale
L.control.scale({ position: 'topleft' }).addTo(map);
	
// draw control (Leaflet)
L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a polygon';
	var drawControl = new L.Control.Draw({
		position: 'topright',
		draw: {
			polyline: false,
			polygon:false,
			rectangle: {
            shapeOptions: {
				color: '#fff',
                clickable: false,
				opacity: 0.1,
            }
        },
			circle: false,
			marker: false
		}
	});
	
	
map.addControl(drawControl);		
map.attributionControl.setPrefix('Mapping portal by <a href="mailto:gverutes@audubon.org" target="_top">Gregg Verutes</a>');
	

// add basemap and overlays
var baseMaps = {
	"Terrain": mapboxTerrain,
	"Imagery": ESRIImagery,
	"Streets": mapboxStreets,
};

	
// add CartoDB vector	
//var layerGrid = 'https://gverutes.carto.com/api/v2/viz/311de20c-a382-11e6-9210-0ecd1babdde5/viz.json'; 
var Birds = 'https://gverutes.carto.com/api/v2/viz/061d60ac-17c5-11e7-bcc0-0e233c30368f/viz.json';

/*
BIRDS
https://stanford.carto.com/u/gverutes/api/v2/viz/061d60ac-17c5-11e7-bcc0-0e233c30368f/viz.json

PEOPLE
https://stanford.carto.com/u/gverutes/api/v2/viz/1ef6c1cc-17c5-11e7-b0c2-0ecd1babdde5/viz.json
*/
/*
// intersect layerGrid with LeafletDraw
cartodb.createLayer(map, layerGrid)
	 .on('done', function(layer) {
		layer.setZIndex(13);	
		// keep track of all draw objects
		var drawnItems = new L.FeatureGroup();
		map.addLayer(drawnItems);

		// set the title to show on the polygon button
		map.on('draw:created', function (e) {
		var type = e.layerType,
		draw_layer = e.layer;

		// show the polygon on the map
		drawnItems.addLayer(draw_layer);

		// get the coordinates of the polygon we just drew
		var poly = draw_layer.getLatLngs();
		var sql_poly = [];
		for (i in poly){
			sql_poly.push("CDB_LatLng("+poly[i].lat+","+poly[i].lng+")")
			}
			// SQL polygon must be a CLOSED loop
			sql_poly.push("CDB_LatLng("+poly[0].lat+","+poly[0].lng+")")

			// join drawn coordinates and a SQL query
			var query = "SELECT * FROM bhnu_2_geo WHERE ST_Intersects(the_geom, ST_MakePolygon(ST_MakeLine(Array["+sql_poly.join()+"])))";
			
			// run function to update SQL and Style
			updateLayer(query, layer.getSubLayer(0))
		});
})
        .on('error', function(err) {
          alert("some error occurred: " + err);
        });


*/

// PEOPLE
cartodb.createLayer(map, 'https://stanford.carto.com/u/gverutes/api/v2/viz/1ef6c1cc-17c5-11e7-b0c2-0ecd1babdde5/viz.json')
		.addTo(map)
        .on('done', function(layer) {
		layer.setZIndex(18);	
});


// BIRDS
	cartodb.createLayer(map, Birds)
	.on('done', function(layer) {
		layer.setZIndex(19);	
		var overlayMaps = {	 
		"Birds": layer.addTo(map),	
		};
		L.control.layers(baseMaps, overlayMaps, {position: 'topleft', collapsed: false}).addTo(map);
		
	});


	// mini map
  	var mapboxUrl='http://a.tiles.mapbox.com/v3/geointerest.map-dqz2pa8r/{z}/{x}/{y}.png';
	var mb = new L.TileLayer(mapboxUrl, {minZoom: 2, maxZoom: 14});
	var miniMap = new L.Control.MiniMap(mb, { toggleDisplay: true }).addTo(map); 	

// control that shows state info on hover
	var info = L.control({position: 'bottomleft'});


// legend box
info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	this.update();
	return this._div;
};

// method that we will use to update the control based on feature           properties passed
info.update = function (props) {
	this._div.innerHTML = "<img src='img/legend_ACT.png'>";
};

info.addTo(map);		

	
var sql = cartodb.SQL({ user: 'gverutes' });
	
// query and zoom by chapter
function zoomChapter(){	
	var MapQuery = "SELECT * FROM chapterboundaries WHERE chptrnames = '"+ $( "#zoom option:selected" ).text()+"'";
	sql.getBounds(MapQuery).done(function(bounds) {
	bounds[1][1] = bounds[1][1] + 0.75;
	map.fitBounds(bounds);
	});
	
	sql.execute(MapQuery)
	  .done(function(data){
		// read table to variable "HTML"
		var strImage = data.rows[0].chptrnames.replace(/\s/g, '');
		var HTML = "";
		HTML = HTML + "<br><img src='img/"+strImage+".jpg'></a><br><b>State:</b> "+data.rows[0].state+"<br><b>Flyway:</b> "+data.rows[0].flyway+"<br><b>Total Members:</b> "+data.rows[0].sum_member+"<br><b>Website: </b><a href='"+data.rows[0].website+"' target='_blank'>"+data.rows[0].website+"</a>";
		// write table to left panel
		document.getElementById("Table").innerHTML = HTML;	
	  });
}  

 
// query and zoom

var start = 0;
var end = 0;  
var sublayers = [];

function zoomGrid(){
	
	end = end + 1;
	var country = document.getElementsByName('zoom-grid1')[0].value; 	
	var state = document.getElementsByName('zoom-grid2')[0].value; 	
	var code = document.getElementsByName('zoom-grid3')[0].value; 	
	
	var MapQuery = "SELECT * FROM bhnu_2_geo WHERE stateid = '"+country+"-"+state+"-"+code+"'";
	sql.getBounds(MapQuery).done(function(bounds) {
	// bounds[1][1] = bounds[1][1] + 0.75;
	map.fitBounds(bounds);
	});	
	
	var CartoCSS_1 = "#bhnu_2_geo{polygon-fill: #ff0;polygon-opacity: 0.25;line-color: #000;line-width: 5;line-opacity: 1}#bhnu_2_geo::labels[zoom>10]{text-name: [stateid];text-face-name: 'DejaVu Sans Book';text-size: 12;text-label-position-tolerance: 15;text-fill: #000;text-halo-fill: rgba(255,255,255,0.8);text-halo-radius: 2;text-dy: 0;text-allow-overlap: true;text-placement: point;text-placement-type: simple;}";
	
	
	  cartodb.createLayer(map, layerGrid)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQuery,
		  cartocss: CartoCSS_1,
		}
		var sublayer = layer.getSubLayer(0);
		layer.setZIndex(100);
		sublayer.set(subLayerOptions);
		sublayers.push(sublayer);
	  }).on('error', function() {
		// log the error
	  });
}   
 
///////////////////////////////////////////////////////////////////////////////////////////////////	
	
var opacity = 0.75;	
function changeOpacity(sliderVal){
opacity = (sliderVal/100.0)
}
	

// show Grid
function showGrid(){

	end = end + 1;
	var ck_USA = document.getElementById('radio-1a');
	var ck_Mexico = document.getElementById('radio-2a');
	var ck_Canada = document.getElementById('radio-3a');

	var ck_Loss = document.getElementById('radio-1b');
	var ck_Stasis = document.getElementById('radio-2b');
	var ck_Gain = document.getElementById('radio-3b');	

	var Query = "SELECT * FROM bhnu_2_geo";
	var CartoCSS = "";


	if (ck_USA.checked || ck_Mexico.checked || ck_Canada.checked)
	{Query = Query + " WHERE ";}	
	
	if (ck_USA.checked && ck_Mexico.checked && ck_Canada.checked)
	{Query = Query + "(stateid LIKE 'USA%' OR stateid LIKE 'MEX%' OR stateid LIKE 'CAN%')";}
	else if (ck_USA.checked && ck_Mexico.checked && !(ck_Canada.checked))
	{Query = Query + "(stateid LIKE 'USA%' OR stateid LIKE 'MEX%')";}
	else if (ck_USA.checked && !(ck_Mexico.checked) && ck_Canada.checked)
	{Query = Query + "(stateid LIKE 'USA%' OR stateid LIKE 'CAN%')";}	
	else if (!(ck_USA.checked) && ck_Mexico.checked && ck_Canada.checked)
	{Query = Query + "(stateid LIKE 'MEX%' OR stateid LIKE 'CAN%')";}	
	else if (ck_USA.checked && !(ck_Mexico.checked) && !(ck_Canada.checked))
	{Query = Query + "(stateid LIKE 'USA%')";}		
	else if (!(ck_USA.checked) && ck_Mexico.checked && !(ck_Canada.checked))
	{Query = Query + "(stateid LIKE 'MEX%')";}	
	else if (!(ck_USA.checked) && !(ck_Mexico.checked) && ck_Canada.checked)
	{Query = Query + "(stateid LIKE 'CAN%')";}		
	else {
	 alert("You must check at least one country.");
	}

	if (ck_Loss.checked){
	Query = Query + " AND mean < 0";
	CartoCSS = CartoCSS + "#bhnu_2_geo {polygon-fill: #0571b0;line-color: #0571b0;";
	}
	else if (ck_Stasis.checked){
	Query = Query + " AND mean = 0";
	CartoCSS = CartoCSS + "#bhnu_2_geo {polygon-fill: #ccc;line-color: #ccc;";
	}
	else if (ck_Gain.checked){
	Query = Query + " AND mean > 0";
	CartoCSS = CartoCSS + "#bhnu_2_geo {polygon-fill: #ca0020;line-color:  #ca0020;";
	}
	
	CartoCSS = CartoCSS + "polygon-opacity: "+opacity+";line-width: 1;line-opacity: "+opacity+";}#bhnu_2_geo {[zoom=9]{polygon-opacity: 0; line-width: 10;}}#bhnu_2_geo {[zoom=10]{polygon-opacity: 0; line-width: 15;}}#bhnu_2_geo {[zoom>10]{polygon-opacity: 0; line-width: 20;}}#bhnu_2_geo {[zoom>10]{polygon-opacity: 0; line-width: 25;}}";
	
	  cartodb.createLayer(map, layerGrid)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: Query,
		  cartocss: CartoCSS,
		}
		var sublayer = layer.getSubLayer(0);
		layer.setZIndex(100);	
		sublayer.set(subLayerOptions);
		sublayers.push(sublayer);
	  }).on('error', function() {
		// log the error
	  });
}


// CLEAR LAYERS
function clearGrid(){

	for (var i = start; i < end; i++) {
		sublayers[i].remove();
		}
	start = end;
	// map.removeLayer(conserv);
}


/*
// zoom levels for quick zooms
document.getElementById('map-ui').onclick = function(e) {
var pos = e.target.getAttribute('data-position4');	
if (pos) {
	var loc = pos.split(',');
	map.setView(loc, 4);
}
var pos = e.target.getAttribute('data-position3');	
if (pos) {
	var loc = pos.split(',');
	map.setView(loc, 3);
}

}

*/