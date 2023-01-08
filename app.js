// set url

let url = `https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json`;


// Create function to plot data and populate

function StartDashboard(){
  // select the dropdown menu
  let DropMenu = d3.select('#selDataset');
    


// Get the JSON data 
  d3.json(url).then(function(data) {
    let DataNames = data.names;
    let NamesList = []
    for (i = 0; i < DataNames.length; i++){
      row = DataNames[i];
      NamesList.push(row);  
    }

    // add name list to dropdown menu
    for (i = 0; i < NamesList.length; i++){
      let id = NamesList[i];
      DropMenu.append("option").text(id);
    }
  });
};


// Call the data into the inital loaded dashboard
function initDashboard() {
  const selector = d3.select("#selDataset");

  // Populate the selector with "Test Subject ID"
  d3.json("samples.json").then((data) => {
    console.log(data);
    const idVal = data.names;
    idVal.forEach((sample) => {
      selector.append("option")
      .text(sample)
      .property("value", sample);
      });
    let initialSample = idVal[0];
    metadata(initialSample);
    console.log(initialSample);
    dashboardCharts(initialSample);
  });
};



// New_sample variable 
function optionChanged(selectedSample) {
  metadata(selectedSample);
  console.log(selectedSample);
  dashboardCharts(selectedSample);
};




// Demographic Info Panel
function metadata(PatientId) {
  d3.json("samples.json").then((data) => {
    // Set data as constant variables
    const metaData = data.metadata;
    const selectResult = metaData.filter(
      (sampleobj) => sampleobj.id == PatientId);
    const result = selectResult[0];
    const PANEL = d3.select("#sample-metadata");
    // Clear existing data
    PANEL.html("");
    //Add key value pair to the panel
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      //console.log(result);
    });


    //Gauge using above result 
    const washFreq = parseFloat(result.wfreq);
    //console.log(washFreq);
    var gaugeData = [
      {
        domain: { x: [0, 5], y: [0, 1] },
        value: washFreq,
        text: washFreq,
        type: "indicator",
        mode: "gauge+bignum+bullet",
        title: "Scrubs per Week",
        number: { font: { size: 50 }},
        
        gauge: {
          axis: { range: [null, 9], dtick: 1 },
          bar: { color: "white" },
          steps: [
            { range: [0, 3], color: "#C34B4B" },
            { range: [3, 5], color: "#C16F44" },
            { range: [5, 7], color: "#C4924F" },
            { range: [7, 9], color: "#7BC34B" },
            ],
        },
      },
    ];

    var layout = {
      width: 400,
      height: 400,
      margin: { t: 50, r: 25, l: 25, b: 25 },
      };
    Plotly.newPlot("gauge", gaugeData, layout);

  });
}

// Initialize the page with a default plot.
function dashboardCharts(PatientId) {
  d3.json("samples.json").then((data) => {
    let plotData = data.samples;
    let subject = plotData.filter(
      (sampleobject) => sampleobject.id == PatientId
    )[0];

    console.log(subject);
    let id = subject.otu_ids;
    let label = subject.otu_labels;
    let value = subject.sample_values;

    // Hide unwanted buttons on the modebar
    const plotConfig = {
        responsive: true, 
        displaylogo: false, 
        modeBarButtonsToRemove: [
          "zoom2d",
          "pan2d",
          "select2d",
          "lasso2d",
          "zoomIn2d",
          "zoomOut2d",
          "autoScale2d",
          //"resetScale2d",
          "hoverClosestCartesian",
          "hoverCompareCartesian",
          "toggleSpikelines",
        ],
      };


    // Horizontal Bar Char
    var trace1 = {
      x: value.slice(0, 10).reverse(),
      y: id
        .slice(0, 10)
        .map((otuID) => `OTU ${otuID}`)
        .reverse(),
      text: label.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };

    var data = [trace1];

    var layout = {
      title: "Top 10 Cultures Found in Patient",
      xaxis: { autorange: true },
      yaxis: { autorange: true },
      margin: { t: 70, l: 100 },
      height: 400,
      hovermode: "closest",
      hoverlabel: { bgcolor: "lightgrey" },
    };

    Plotly.newPlot("bar", data, layout, plotConfig);

    // Bubble Chart
    var trace1 = {
      x: id,
      y: value,
      text: label,
      mode: "markers",
      marker: {
        color: id,
        size: value,
        colorscale: "turbo",
      },
    };

    var data = [trace1];

    var layout = {
      margin: { t: 0 },
      xaxis: { title: "OTU ID" },
      hovermode: "x unified",
      height: 400,
      width: window.width,
      };


    Plotly.newPlot("bubble", data, layout, plotConfig);

  });
}


// Initialize the dashboard
initDashboard();