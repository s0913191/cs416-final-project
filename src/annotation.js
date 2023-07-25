const annotations = [
    {
        note: {
            label: "Terrorist Attack in NYC",
            title: "2001"
        },
        //x: 100,
        //y: 50,
        data: { Year: "2001", Travelers: "27990385" },
        dy: 100,
        dx: 100
    }, {
        note: {
            label: "Global Financial Crisis",
            title: "2008"
        },
        x: 400,
        y: 200,
        dy: 100,
        dx: 100
    }, {
        note: {
            label: "Donald Trump was elected",
            title: "2016"
        },
        x: 500,
        y: 100,
        dy: 100,
        dx: 100
    }, {
        note: {
            label: "COVID-19 worldwide pandemic",
            title: "2020"
        },
        x: 600,
        y: 100,
        dy: 100,
        dx: 100
    }
].map(function (d) { d.color = "#E8336D"; return d })



const x = d3.scaleTime().domain([2000, 2022]).range([0, 1380])
const y = d3.scaleLinear().domain([0, 52203108]).range([750, 0])

const makeAnnotations = d3.annotation()
    .type(d3.annotationLabel)
    .accessors({
        x: d => x(d.Year),
        y: d => y(d.Travelers)
    })
    .annotations(annotations)
    ;

