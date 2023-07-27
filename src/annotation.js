const width = 1200;
const height = 800;
const margin = { top: 20, right: 20, bottom: 30, left: 100 };
const graphWidth = width - margin.left - margin.right;
const graphHeight = height - margin.top - margin.bottom;

const annotations = [
    {
        note: {
            label: "Terrorist Attacks",
            title: "2001",
            wrap:300
        },
        data: { year: 2001, travelers: 27990385 },
        dy: 100,
        dx: 0,
    }, {
        note: {
            label: "Global Financial Crisis",
            title: "2008",
            wrap:300
        },
        data: { year: 2008, travelers: 33390025 },
        dy: -50,
        dx: -50
    }, {
        note: {
            label: "Trump & Brexit",
            title: "2016",
            wrap:300
        },
        data: { year: 2016, travelers: 48524355 },
        dy: 100,
        dx: 0
    }, {
        note: {
            label: "COVID-19",
            title: "2020",
            wrap:300
        },
        data: { year: 2020, travelers: 11257292 },
        dy: 50,
        dx: 0
    }
].map(function (d) { d.color = "#E8336D"; return d });

const xScale = d3.scaleTime().domain([2000, 2022]).range([margin.left, width - margin.right]);
const yScale = d3.scaleLinear().domain([0, 52203108]).range([height - margin.bottom, margin.top]);

const makeAnnotations = d3.annotation()
    .type(d3.annotationCalloutCircle)
    .accessors({
        x: d => xScale(d.year),
        y: d => yScale(d.travelers)
    })
    .accessorsInverse({
        date: function year(d) {
            return _x.invert(d.x);
        },
        close: function travelers(d) {
            return _y.invert(d.y);
        }
    })
    .annotations(annotations)
    ;

