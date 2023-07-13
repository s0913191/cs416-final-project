function buildBubble() {
    // data is going to be an array d[N][2]
    var width = 800;
    var height = 500;
    function chart(selection) {
        var data = selection.datum();
        //console.log(data);

        //chartSelection=selection;
        var div = selection,
            svg = div.selectAll('svg');
        svg.attr('width', width).attr('height', height);
        chartSVG = svg;

        var scaleRadius = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return +d.views; }), d3.max(data, function (d) { return +d.views; })])
            .range([5, 18]);

        var colorCircles = d3.scaleOrdinal(d3.schemeCategory10);

        var node = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", function (d) { return scaleRadius(d.views) })
            .style("fill", function (d) { return colorCircles(d.category) })
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')');


        var simulation = d3.forceSimulation(data)
            .force("charge", d3.forceManyBody().strength(-10))
            .force("x", d3.forceX().x(width / 2).strength(0.05))
            .force("y", d3.forceY().y(height / 2).strength(0.05))
            .on("tick", ticked);

        function ticked(e) {
            //node.attr("cx", function (d) { return d.x + width / 2 }).attr("cy", function (d) { return d.y + height / 2 });
            node.attr("transform", function (d) {
                //return "translate(" + [d.x + (width / 2), d.y + (height / 2)] + ")";
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

    return chart;
}