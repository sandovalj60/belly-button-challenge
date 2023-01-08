const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// d3.selectAll("#selDataset").on("change", optionChanged);
// function optionChanged() {
d3.json(url).then(function (data) {
    let nameData = data.names;
    let nameList = [];
    for (i = 0; i < nameData.length; i++){
        row = nameData[i];
        nameList.push(row);
}
    for (i = 0; i < nameList.length; i++){
        item = nameList[i];
        let PANEL = d3.select("#selDataset")
        PANEL.append("option").text(item);
}}
)

// d3.selectAll("#selDataset").on("change", optionChanged);
// function optionChanged() {

    d3.json(url).then(function (data) {
        let dropdownMenu = 940;
        let panel = d3.select(".panel-body");
        let metaData = data.metadata;
        let resultArray = metaData.filter(metaData => metaData.id == dropdownMenu);
        let resultID = resultArray.map(resultArray => resultArray.id);
        panel.append("h6").text(`id: ${resultID}`);
        let resultAge = resultArray.map(resultArray => resultArray.age);
        panel.append("h6").text(`age: ${resultAge}`);
        let resultBB= resultArray.map(resultArray => resultArray.bbtype);
        panel.append("h6").text(`bbtype: ${resultBB}`);
        let resultEthnic = resultArray.map(resultArray => resultArray.ethnicity);
        panel.append("h6").text(`ethnicity: ${resultEthnic}`);
        let resultGender = resultArray.map(resultArray => resultArray.gender);
        panel.append("h6").text(`gender: ${resultGender}`);
        let resultLocation = resultArray.map(resultArray => resultArray.location);
        panel.append("h6").text(`location: ${resultLocation}`);
        let resultWF = resultArray.map(resultArray => resultArray.wfreq);
        panel.append("h6").text(`wfreq: ${resultWF}`);
        })




d3.json(url).then(function (data) {
    let dropdownMenu = 940;
    let samples = data.samples;
    let xColumns = []
    let samplesArray = samples.filter(samples=> samples.id == dropdownMenu);
    let xStuff = samplesArray.map(samplesArray => samplesArray.otu_ids);
    let xSliced = xStuff[0].slice(0, 10);
    let yStuff = samplesArray.map(samplesArray => samplesArray.sample_values);
    let ySliced = yStuff[0].slice(0, 10);
    let zStuff = samplesArray.map(samplesArray => samplesArray.otu_labels);
    let zSliced = zStuff[0].slice(0, 10);
    
    for (i = 0; i < xSliced.length; i++){
        row = xSliced[i];
        xColumns.push(`OTU ${row}`);
    }
    console.log(xColumns);
    let trace1 = {
        x: ySliced,
        y: xColumns,
        transforms: [{
            type: 'sort',
            target: 'x',
            order: 'ascending'
        }],
        text: zSliced,
        name: "Horizontal Chart",
        type: "bar",
        orientation: "h"
    };
    let plotData = [trace1];
    let plotLayout = {
        title: "Top 10 OTU",
    };
    Plotly.newPlot("bar", plotData, plotLayout);
    });

d3.json(url).then(function (data) {
    let dropdownMenu = 940;
    let samples = data.samples;
    let samplesArray = samples.filter(samples=> samples.id == dropdownMenu);
    let xStuff = samplesArray.map(samplesArray => samplesArray.otu_ids);
    let xSliced = xStuff[0];
    let yStuff = samplesArray.map(samplesArray => samplesArray.sample_values);
    let ySliced = yStuff[0];
    let zStuff = samplesArray.map(samplesArray => samplesArray.otu_labels);
    let zSliced = zStuff[0];

    let trace1 = {
        x: xSliced,
        y: ySliced,
        mode: 'markers',
        text: zSliced,
        marker: {
          size: ySliced,
          color: xSliced,
        }
    };
    let plotData = [trace1];
    let plotLayout = {
    title: 'OTU ID Bubble Chart',
    showlegend: false
    }
    Plotly.newPlot('bubble', plotData, plotLayout)
});

d3.json(url).then(function (data) {
    let dropdownMenu = 940;
    let metaData = data.metadata;
    let resultArray = metaData.filter(metaData => metaData.id == dropdownMenu);
    let resultWF = resultArray.map(resultArray => resultArray.wfreq);
    console.log(resultWF);
    let gaugeData = [
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: resultWF[0],
		title: { text: "Belly ButtonWashing Frequency (Scrubs per week)" },
		type: "indicator",
		mode: "gauge+number"
	}
];

let layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', gaugeData, layout);
});