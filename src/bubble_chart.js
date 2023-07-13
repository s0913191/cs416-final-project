function buildBubble() {
    // data is going to be an array d[N][2]
    var width = 800;
    var height = 500;
    function chart(selection) {
		var data = selection.datum();
        console.log(data);


		//chartSelection=selection;
		var div = selection,
		svg = div.selectAll('svg');
		svg.attr('width', width).attr('height', height);
		chartSVG=svg;

        var scaleRadius = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return +d.views; }),
            d3.max(data, function (d) { return +d.views; })])
            .range([5, 30]);
        
        var colorCircles = d3.scaleOrdinal(d3.schemeCategory10);

        var node = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", function (d) { return scaleRadius(d.views) })
            .style("fill", function(d) { return colorCircles(d.category)})
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')');


        var simulation = d3.forceSimulation(data)
            .force("charge", d3.forceManyBody().strength([-50]))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .on("tick", ticked);

        function ticked(e) {
            node.attr("cx", function (d) { return d.x })
                .attr("cy", function (d) { return d.y });
        }

    }

    // Accesor
    chart.width = function (value) {
        if (!arguments.length) { return width; }
        width = value;
        return chart;
    };

    chart.height = function (value) {
        if (!arguments.length) { return height; }
        height = value;
        return chart;
    };

    return chart;
}