function buildLine(ds) {
    // ds is going to be an array d[N][2]
    var width = 800;
    var height = 500;

    function chart(selection) {
        const margin = { top: 20, right: 20, bottom: 30, left: 100 };
        const graphWidth = width - margin.left - margin.right;
        const graphHeight = height - margin.top - margin.bottom;

        const xScale = d3.scaleTime()
            .domain(d3.extent(ds, d => d[0]))
            .range([0, graphWidth]);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(ds, d => d[1])])
            .range([graphHeight, 0]);

        const xAxisGen = d3.axisBottom(xScale).tickFormat(d3.format("d"));
        const yAxisGen = d3.axisLeft(yScale);
        const lineFun = d3.line()
            .x(d => xScale(d[0]))
            .y(d => yScale(d[1]));

        const svg = d3.select(selection)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "svg-overview");

        const graph = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        graph.append("g")
            .call(xAxisGen)
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${graphHeight})`);

        graph.append("g")
            .call(yAxisGen)
            .attr("class", "y-axis");

        graph.append("path")
            .datum(ds)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", lineFun);

        //const tooltip = d3.select("body")
        const tooltip = d3.select(selection)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        const mouseover = (event, d) => {
            tooltip.style("opacity", 1);
            tooltip.html("Year: " + d[0] + "<br>Value: " + d[1])
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        };

        const mouseout = (event, d) => {
            tooltip.style("opacity", 0);
        };

        graph.selectAll("circle")
            .data(ds)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d[0]))
            .attr("cy", d => yScale(d[1]))
            .attr("r", 4)
            .attr("fill", "#666666")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);
    }

    // Accesor
    chart.width = function(value) {
        if (!arguments.length) { return width; }
        width = value;
        return chart;
    };
    
    chart.height = function(value) {
        if (!arguments.length) { return height; }
        height = value;
        return chart;
    };    

    return chart;
}
