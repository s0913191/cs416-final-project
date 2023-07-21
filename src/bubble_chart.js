function buildBubble() {
    // data is going to be an array d[N][3]

    // Default parameters
    var width = 800;
    var height = 500;
    var minRadius = 6;
    var maxRadius = 20;
    var columnForColors = "category";
    var columnForTitle = "title";
    var columnForRadius = "views";
    var forceApart = -50;
    var framesToSimulate = 10;
    var showTitleOnCircle = false;

    function chart(selection) {
        var data = selection.datum();

        //console.log(data);

        var div = selection,
            svg = div.append('svg');
        svg.attr('width', width).attr('height', height);

        var scaleRadius = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return +d[columnForRadius]; }), d3.max(data, function (d) { return +d[columnForRadius]; })])
            .range([minRadius, maxRadius]);

        var colorCircles = d3.scaleOrdinal(d3.schemeCategory10);

        var node = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", function (d) { return scaleRadius(d[columnForRadius]) })
            .style("fill", function (d) { return colorCircles(d[columnForColors]) })
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')');


        var simulation = d3.forceSimulation(data)
            .force("charge", d3.forceManyBody().strength(forceApart))
            .force("x", d3.forceX().x(width / 2).strength(0.3))
            .force("y", d3.forceY().y(height / 2).strength(0.3))
            //.force("cluster", forceCluster())
            //.force("collide", forceCollide())
            //.force("collision", d3.forceCollide().radius(function(d) {return d[columnForRadius]-100}))
            .tick(framesToSimulate)
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

    chart.forceApart = function (value) {
        if (!arguments.length) { return forceApart; }
        forceApart = value;
        return chart;
    };

    chart.maxRadius = function (value) {
        if (!arguments.length) { return maxRadius; }
        maxRadius = value;
        return chart;
    };

    chart.minRadius = function (value) {
        if (!arguments.length) { return minRadius; }
        minRadius = value;
        return chart;
    };

    chart.framesToSimulate = function (value) {
        if (!arguments.length) { return framesToSimulate; }
        framesToSimulate = value;
        return chart;
    };

    return chart;
}