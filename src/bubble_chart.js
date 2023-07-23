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
    var showTitleOnCircle = true;

    function chart(selection) {
        var data = selection.datum();
        var div = selection;
        var svg = div.select('svg');
        if (svg.empty()) {
            svg = div.append('svg');
            svg.attr('width', width)
                .attr('height', height);

        } else {
            svg.selectAll("*")
                .remove();
        }


        // Tooltip configurations
        const tooltip = div.append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "#626D71")
            .style("border-radius", "6px")
            .style("text-align", "center")
            .style("font-family", "monospace")
            //.style("width", "400px")
            .style("font-size", "12px")
            .style("stroke", "transparent")
            .text("");

        // Mouse event functions for tooltip
        const mouseover = (event, d) => {
            tooltip.html(d[columnForTitle] + "<br/>" + d[columnForColors] + "<br/>" + numberWithCommas(d[columnForRadius]));
            return tooltip.style("visibility", "visible");
        };

        const mousemove = (event, d) => {
            const [x, y] = d3.pointer(event, document.body);
            console.log(svg.node());
            console.log(x, y);
            return tooltip.style("top", (y + 0) + "px").style("left", (x + 100) + "px");
            //return tooltip.style("y", (y + 0) + "px").style("x", (x + 100) + "px");
            //return tooltip.style("left", (d3.mouse(this)[0]+70) + "px").style("top", (d3.mouse(this)[1]) + "px")
        };

        const mouseout = (event, d) => {
            return tooltip.style("visibility", "hidden");
        };

        // Scaler functions
        var scaleRadius = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return +d[columnForRadius]; }), d3.max(data, function (d) { return +d[columnForRadius]; })])
            .range([minRadius, maxRadius]);

        var colorCircles = d3.scaleOrdinal(d3.schemePaired);

        // Nodes (create dots)
        var node = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", function (d) { return scaleRadius(d[columnForRadius]) })
            .style("fill", function (d) { return colorCircles(d[columnForColors]) })
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseout", mouseout);

        node.append("clipPath")
            .attr("id", function (d, i) { return "clip-" + i; })
            .append("use")
            .attr("xlink:href", function (d, i) { return "#" + i; });

        // Add force simulations
        var simulation = d3.forceSimulation(data)
            .force("charge", d3.forceManyBody().strength(forceApart))
            .force("x", d3.forceX().x(width / 2).strength(0.5))
            .force("y", d3.forceY().y(height / 2).strength(0.5))
            .force("collide", d3.forceCollide().radius(function (d) { return scaleRadius(d[columnForRadius]) + 2; }))
            .tick(framesToSimulate)
            .on("tick", ticked);

        function ticked(e) {
            node.attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")";
            });
        }

        if (showTitleOnCircle) {
            var textGroup = node.append("g")
                .attr("clip-path", function (d, i) {
                    return "url(#clip-" + i + ")";
                });

            textGroup.append("text")
                .attr("text-anchor", "middle")
                .style("pointer-events", "none")
                .attr("dy", ".35em")
                //.attr('transform', function(d){return 'translate(' + [d.x,d.y] + ')'})
                .text(function (d) { return d[columnForTitle]; })
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseout", mouseout);
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