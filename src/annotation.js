const annotations = [
    {
        note: {
            label: "Terrorist Attack in NYC",
            title: "2001/9/11"
        },
        x: 100,
        y: 50,
        dy: 100,
        dx: 100
    }, {
        note: {
            label: "Global Financial Crisis",
            title: "2008/10/xx"
        },
        x: 400,
        y: 200,
        dy: 100,
        dx: 100
    }, {
        note: {
            label: "Donald Trump was elected",
            title: "2016/xx/xx"
        },
        x: 500,
        y: 100,
        dy: 100,
        dx: 100
    }
].map(function (d) { d.color = "#E8336D"; return d })

const makeAnnotations = d3.annotation()
    .type(d3.annotationLabel)
    .annotations(annotations);



