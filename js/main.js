let callback = function(){
  // Handler when the DOM is fully loaded
  console.log('document loaded');
  addListeners();
  drawStackChart();
};

if (
    document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener('DOMContentLoaded', callback);
}

let addListeners = function() {
	let elements = document.getElementsByClassName("button");
	console.log(elements);

	let acaButton = document.getElementsByClassName("button")[0];
	console.log(acaButton);

	let acaContent = document.getElementById('aca-who');

	let ahcaButton = document.getElementsByClassName('button')[1];
	console.log(ahcaButton);

	let ahcaWhatButton = document.getElementsByClassName('button')[4];
	let acaWhatContent = document.getElementById('aca-what');

	let acaWhatButton = document.getElementsByClassName('button')[3];

	ahcaButton.addEventListener('click', function(e) {
		e.preventDefault();
		console.log(e);
		console.log('pressed AHCA button');
		let elements = acaContent.getElementsByClassName('crossed');
		for (let i=0; i < elements.length; i++) {
			let element = elements[i];
			element.onclick = turnOnCross(element);
		}
		console.log(acaContent);
		let ahcaCallout = document.getElementById('ahca-callout');
		ahcaCallout.onclick = toggleCallout(ahcaCallout, true);
		if(document.getElementByTarget(e.target.value).hasClass('active')){
        	this.removeClass('active')
		} else {
	        this.addClass('active');
	    }
		// ahcaCallout.classList.add('visible');
		// ahcaCallout.classList.remove('hidden');
		// ahcaContent.classList.add('visible');
		// ahcaContent.classList.remove('hidden');

		// acaContent.classList.add('hidden');
		// acaContent.classList.remove('visible');
	});

	acaButton.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('pressed ACA button');
		let elements = acaContent.getElementsByClassName('crossed');
		for (let i=0; i < elements.length; i++) {
			let element = elements[i];
			element.onclick = turnOffCross(element);
		}
		console.log('acaContent', acaContent);
		let ahcaCallout = document.getElementById('ahca-callout');
		ahcaCallout.onclick = toggleCallout(ahcaCallout, false);
		// acaCallout.classList.add('visible');
		// acaCallout.classList.remove('hidden');
		// acaContent.classList.add('visible');
		// acaContent.classList.remove('hidden');

		// ahcaContent.classList.add('hidden');
		// ahcaContent.classList.remove('visible');

	});

	ahcaWhatButton.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('pressed AHCA What button');
		let elements = acaWhatContent.getElementsByClassName('crossed');
		//console.log(elements);
		for (let i=0; i < elements.length; i++) {
			//console.log(elements[i]);
			let element = elements[i];
    		element.onclick = turnOnCross(element);
		}
	});

	acaWhatButton.addEventListener('click', function(e) {
		e.preventDefault();
		let elements = acaWhatContent.getElementsByClassName('crossed');
		for (let i=0; i < elements.length; i++) {
			//console.log(elements[i]);
			let element = elements[i];
    		element.onclick = turnOffCross(element);
		}
	});

	let turnOnCross = function(element) {
		console.log('turn on cross');
		console.log(element);
		element.classList.add('visible');
		element.classList.remove('hidden');
	}

	let turnOffCross = function(element) {
		console.log('turn off cross');
		console.log(element);
		element.classList.add('hidden');
		element.classList.remove('visible');
	}

	let toggleCallout = function(element, aca) {
		console.log('toggle callout', aca);
		console.log(element);
		if (aca) {
			element.classList.add('visible');
			element.classList.remove('hidden');
		} else {
			element.classList.add('hidden');
			element.classList.remove('visible');
		}
		
	}

	let toggleCrossClass = function(element) {
		console.log('toggle cross');
		console.log(element);
		if (element.classList.contains('hidden')) {
			element.classList.add('visible');
    		element.classList.remove('hidden');
		} else if (element.classList.contains('visible')) {
			element.classList.add('hidden');
			element.classList.remove('visible');
		}
    	
	}

//TO DO: get the toggleVisibility working
	var changeVisibility = function(element) {
		if (element.style.display === 'none') {
			element.classList.add('visible');
			element.classList.remove('hidden');
		} else if (element.style.display === 'visible') {
			element.classList.add('hidden');
			element.classList.remove('visible');
		}

	}
}

	//Draw Stack Chart
	let svg = d3.select("#spendingGraph");
	console.log(svg.node().getBoundingClientRect().width);
    let marginStackChart = { top: 20, right: 20, bottom: 30, left: 40 },
            widthStackChart = +svg.node().getBoundingClientRect().width - marginStackChart.left - marginStackChart.right,
            heightStackChart =  +svg.node().getBoundingClientRect().height - marginStackChart.top - marginStackChart.bottom;
            console.log(heightStackChart);

    // set x scale
    let xStackChart = d3.scaleBand()
            .range([widthStackChart/4, widthStackChart - widthStackChart/4])
            .padding(0.6);

    // set y scale
    let yStackChart = d3.scaleLinear()
            .range([heightStackChart, 0]);


    let colorStackChart = d3.scaleOrdinal(["#67aec3", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])


    let canvasStackChart = d3.select("#spendingGraph").append("svg")
        .attr("width", widthStackChart + marginStackChart.left + marginStackChart.right)
        .attr("height", heightStackChart + marginStackChart.top + marginStackChart.bottom)
        .append("g")
        .attr("transform", "translate(" + marginStackChart.left + "," + marginStackChart.top + ")");

    let yAxis = d3.axisLeft(yStackChart)
    	.tickSize(0)
    	//.tickValues(["$0", "$200B", "$400B", "$600B", "$800B", "$1T", "$1.2T", "$1.4T", "$1.6T", "$1.8T", "$2T"])
    	//.tickFormat(d3.format(".2s"))
    	.tickFormat (function (d) { return formatAbbreviation(d) })
    	.ticks(12);

    function customYAxis(g) {
		g.call(yAxis);
		//g.select(".domain").remove();
		//g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
	}

    // gridlines in y axis function
	function make_y_gridlines() {		
	    return yAxis
	}

    let background = canvasStackChart.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", widthStackChart - 1)
    .attr("height", heightStackChart)
    .attr('transform', 'translate(1, 0)')
    .style('opacity', 1.0)
    .style('fill', '#f5f5f6');

	var formatNumberT = d3.format(".1f");
	var formatNumber = d3.format(".0f"),
	formatTrillion = function(x) { return formatNumberT(x / 1e12) + "T"; },
    formatBillion = function(x) { return formatNumber(x / 1e9) + "B"; },
    formatMillion = function(x) { return formatNumber(x / 1e6) + "M"; },
    formatZero = function(x) { return formatNumber(x / 1e3); };

	function formatAbbreviation(x) {
	  var v = Math.abs(x);
	  return ( v >= .9995e12 ? formatTrillion
	  	  :	v >= .9995e9 ? formatBillion
	      : v >= .9995e6 ? formatMillion
	      : formatZero)(x);
	}

	formatAbbreviation(5000000000000); // 5T
	formatAbbreviation(5000000000); // 5B
	formatAbbreviation(5000000); // 5M
	formatAbbreviation(5000); // 5k

	// var tooltip = d3.select("body")
 //    .append("div")
 //    .classed('hover', true)
 //    .style("position", "absolute")
 //    .style("z-index", "10")
 //    .style("visibility", "hidden")
 //    .text("a simple tooltip");

	// Prep the tooltip bits, initial display is hidden
	let tooltip = d3.select("body").append("div")
		.classed('hover', true)
	    .attr("class", "tooltip")
	    .style('position', 'absolute')
	    .style('z-index', '10')
	    .style("visibility", "hidden")
	    .text('a simple tooltip');
	      
	// tooltip.append("rect")
	//     .attr("width", 60)
	//     .attr("height", 20)
	//     .attr("fill", "white")
	//     .style("opacity", 0.5);

	// tooltip.append("text")
	//     .attr("x", 30)
	//     .attr("dy", "1.2em")
	//     .style("text-anchor", "middle")
	//     .attr("font-size", "12px")
	//     .attr("font-weight", "bold");

    function drawStackChart() {

    	let data = [
    	{
			"bill": "aca",
			"otherInsurance": {
				"amount": "400000000000",
				"description": " "
			},
			"discountedInsurance": {
				"amount": "400000000000",
				"description": "Spending to provide discounted insurance to individuals making between 11K–48K per year. (Tax credits and subsidies)",
				"descriptionTitle": "Discounted insurance"
			},
			"freeInsurance": {
				"amount" : "1200000000000",
				"description": "Spending to provide free insurance for anyone who makes less than 11K per year. (Medicaid expansion)",
				"descriptionTitle": "Free insurance"
			}
		},
		{
			"bill": "ahca",
			"otherInsurance": {
				"amount": "376000000000",
				"description": " "
			},
			"discountedInsurance": {
				"amount": "124000000000",
				"description": "Spending on discounted insurance is cut by $276B",
				"descriptionTitle": "Spending cut"
			},
			"freeInsurance": {
				"amount": "400000000000",
				"description": "Spending on free insurance for those making less than 11K a year cut by $834B (Medicaid expansion)",
				"descriptionTitle": "Spending cut"
			}
		}];

    	colorStackChart.domain(d3.keys(data[0]).filter(function (key) { return key !== "bill"; }));

    	data.forEach(function (d) {
            let y0 = 0;
            d.amounts = colorStackChart.domain().map(function (type) { 
            	console.log(d[type].amount);
            	return { 
            		type: type,
            		bill: d.bill,
            		y0: y0, 
            		y1: y0 += +d[type].amount,
            		description: d[type].description,
            		title: d[type].descriptionTitle
            	}; 
            });
            console.log(d);
            d.total = d.amounts[d.amounts.length - 1].y1;
        });

        //data.sort(function (a, b) { return b.total - a.total; });

        console.log(data);

        xStackChart.domain(data.map(function (d) { return d.bill; }));
        yStackChart.domain([0, d3.max(data, function(d) { 
        	return d.total; 
        })]);
        //yStackChart.domain([0, 2000000000000]);

        console.log(yStackChart.domain);

        canvasStackChart.append('g')
        	.attr('class', 'x axis')
        	.attr('transform', 'translate(0,' + heightStackChart + ')')
        	.call(d3.axisBottom(xStackChart));

        canvasStackChart.append('g')
        	.attr('class', 'y axis')
        	.call(customYAxis)
        	.append('text')
        	// .attr('transform', 'rotate(-90)')
        	.attr('y', 6)
        	.attr('dy', '.71em')
        	.style('text-anchor', 'end')
        	.text('Spending in billions');

        // add the Y gridlines
		canvasStackChart.append("g")			
		    .attr("class", "grid")
		    .call(make_y_gridlines()
		        .tickSize(-widthStackChart - 1)
		        .tickFormat("")
		    );

        let bill = canvasStackChart.selectAll('.bill')
        	.data(data)
        	.enter().append('g')
        	.attr('class', 'g')
        	.attr('transform', function(d) { return 'translate(' + xStackChart(d.bill) + ',0)'; });


    	let area = d3.area()
                      //.interpolate("cardinal")
                      .x0( function(d) { return data[1].x[d] } )
                      .x1( function(d) { return data[0].x[d] } )
                      .y0( function(d) { return yscale(data[1].y[d]) } )
                      .y1(  function(d) { return yscale(data[1].y[d]) } );

        bill.selectAll('rect')
        	.data(function(d) { return d.amounts; })
        	.enter().append('rect')
        	.attr('class', 'bar')
        	.attr('width', xStackChart.bandwidth())
        	//.attr('x', function(d) { return xStackChart(d.bill); })
        	.attr('y', function(d) { return yStackChart(d.y1); })
        	.attr('height', function(d) {
        		// console.log(d);
        		// console.log( yStackChart(d.y0));
        		// console.log( yStackChart(d.y1));
        		return yStackChart(d.y0) - yStackChart(d.y1);

        	})
        	.style('fill', function(d) { return colorStackChart(d.type); })
        	.on('mouseover', function(d) {
        		console.log(d);
        		if (d.title != undefined) {
        			tooltip.html("<strong>" + d.title + "</strong><br><div>" + d.description + "</div>");
					tooltip.style("visibility", "visible")
						   .style('left', xStackChart(d.bill) +
						   	document.getElementById("spendingGraph").offsetLeft + 'px')
						   .style('top', (parseInt(d3.select(this).attr('y')) +
						   	document.getElementById("spendingGraph").offsetTop) + 'px');

					console.log(xStackChart(d.bill), d3.select(this).attr('y'));
					console.log(canvasStackChart);
					console.log(document.getElementById("spendingGraph").offsetTop);

        		}
        	})
		    .on('mouseout', function() { 
		    	tooltip.style('visibility', 'hidden');
		    	d3.select(this).style('fill', function(d) { return colorStackChart(d.type); });
		    })
		    .on('mousemove', function(d) {
		    	//console.log(d);
		    	let barArea = d3.select(this)
            	.style("fill", "#007485");
            	//console.log(barArea);
            	//console.log(barArea.node().getBoundingClientRect());
            	let bbox = barArea.node().getBoundingClientRect();
            	let xPosition = bbox.left / 2;
            	let yPosition = bbox.top + (bbox.height / 2);
            	// let barNode = barArea.node().parentNode;
            	// console.log(barNode.getBoundingClientRect());
		    	// let xPosition = d3.mouse(this)[0];
		    	// let yPosition = d3.mouse(this)[1];
		    	//console.log(xPosition, yPosition);
		    	//console.log(d3.event.pageX, d3.event.pageY);
		    	//console.log(this.getScreenCTM());
				// tooltip.attr('transform', 'translate(' + xPosition + ',' + yPosition + ')');
				// tooltip.select('text').text('test');
				// return tooltip.style("top",(d3.event.pageY - 10) + "px")
				// 			  .style("left", (d3.event.pageX + 10) + "px");
				// return tooltip.style('top', yPosition + 'px')
				// 			  .style('left', xPosition + 'px');

    	});

		let rectBar = d3.select('.g');
		//console.log(rectBar);
		//console.log(bill);
	}


let loadData = function() {
	d3.json('data/aca-ahca.json', function(error, data) {
		if (error) throw error;
		//console.log(data);

		data.forEach( d => {
			if (d.graph === 'spending') {
				console.log('spending', d.data);
			}

			if (d.graph === 'funding') {
				console.log('funding', d.data);
			}
		})
	});
}