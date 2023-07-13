function buildBubble() {
    // data is going to be an array d[N][3]

    // Default parameters
    var width = 800;
    var height = 500;
    var columnForColors = "category";
    var columnForTitle = "title";
    var columnForRadius = "views";

    function chart(selection) {
        var data = selection.datum();

        var div = selection,
            svg = div.selectAll('svg');
        svg.attr('width', width).attr('height', height);

        var scaleRadius = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return +d[columnForRadius]; }), d3.max(data, function (d) { return +d[columnForRadius]; })])
            .range([5, 18]);

        var colorCircles = d3.scaleOrdinal(d3.schemeCategory10);

        var node = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", function (d) { return scaleRadius(d[columnForRadius]) })
            .style("fill", function (d) { return colorCircles(d[columnForColors]) })
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')');


        var simulation = d3.forceSimulation(data)
            .force("charge", d3.forceManyBody().strength(-30))
            .force("x", d3.forceX().x(width / 2).strength(0.05))
            .force("y", d3.forceY().y(height / 2).strength(0.05))
            //.force("cluster", forceCluster())
            //.force("collide", forceCollide())
            //.force("collision", d3.forceCollide().radius(function(d) {return d[columnForRadius]-100}))
            .on("tick", ticked);

        function ticked(e) {
            node.attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")";
            });
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

    chart.columnForColors = function (value) {
        if (!arguments.length) { return columnForColors; }
        columnForColors = value;
        return chart;
    };

    chart.columnForTitle = function (value) {
        if (!arguments.length) { return columnForTitle; }
        columnForTitle = value;
        return chart;
    };

    chart.columnForRadius = function (value) {
        if (!arguments.length) { return columnForRadius; }
        columnForRadius = value;
        return chart;
    };

    return chart;
}