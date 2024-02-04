// import * as d3 from "https://cdn.skypack.dev/d3@7.8.2";

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";


document.addEventListener("DOMContentLoaded", async () => {
  const getData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      addData(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  await getData();

  
  const addData = (data) => {
    const w = 1200;
    const h = 700;
    const p = 100;
    const dataArr = data.monthlyVariance;
    const baseTemp = data.baseTemperature;

    const svg = d3
      .select("div")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "heatmap");


    const xScale = d3
      .scaleLinear()
      .domain([d3.min(dataArr, (d) => d.year), d3.max(dataArr, (d) => d.year)])
      .range([p, w - p]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

    svg
      .append("g")
      .attr("id", "x-axis")
      .call(xAxis)
      .attr("transform", "translate(0," + (h - p) + ")")
      .style("font-family", "'Roboto Slab', sans-serif");


    const yScale = d3.scaleTime()
      .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
      .range([p, h - p]);

    const yAxis = d3.axisLeft(yScale)
      .tickFormat(d3.timeFormat("%B"))
      .tickSize(10, 1);

    svg
      .append("g")
      .attr("id", "y-axis")
      .call(yAxis)
      .attr("transform", "translate(" + p + ",0)")
      .style("font-family", "'Roboto Slab', sans-serif");


    const legend = svg
      .append("g")
      .attr("id", "legend")
      .attr("transform", "translate(" + 100 + "," + (h - 20) + ")")
      .attr("fill", "black");

 
    const text = legend.append("text");
    text.selectAll("tspan")
      .data(["-3 or less | ", "-2 or less | ", "-1 or less | ", "0 or less | ", "+1 or less | ", "+2 or less | ", "+3 or less | ", "+3 or more"])
      .enter()
      .append("tspan")
      .text(d => d);


    legend
      .append("rect")
      .attr("width", 76)
      .attr("height", 20)
      .attr("fill", "#03306Cff")
      .attr("stroke", "black")
      .attr("y", -35);

    legend
      .append("rect")
      .attr("width", 82)
      .attr("height", 20)
      .attr("fill", "#2170B4ff")
      .attr("stroke", "black")
      .attr("y", -35)
      .attr("x", 76);

    
    legend
      .append("rect")
      .attr("width", 79)
      .attr("height", 20)
      .attr("fill", "#6BABD7ff")
      .attr("stroke", "black")
      .attr("y", -35)
      .attr("x", 76 + 82);

    legend
      .append("rect")
      .attr("width", 78)
      .attr("height", 20)
      .attr("fill", "#C5DBF0ff")
      .attr("stroke", "black")
      .attr("y", -35)
      .attr("x", 76 + 82 + 79);

    
    legend
      .append("rect")
      .attr("width", 84)
      .attr("height", 20)
      .attr("fill", "#FDE1D2ff")
      .attr("stroke", "black")
      .attr("y", -35)
      .attr("x", 76 + 82 + 79 + 78);
    
    
    const legendXPosition1 = 76 + 82 + 79 + 78 + 84;
    legend
      .append("rect")
      .attr("width", 85)
      .attr("height", 20)
      .attr("fill", "#FC916Fff")
      .attr("stroke", "black")
      .attr("y", -35)
      .attr("x", legendXPosition1);

    
    const legendXPosition2 = 76 + 82 + 79 + 78 + 84 + 85;
    legend
      .append("rect")
      .attr("width", 85)
      .attr("height", 20)
      .attr("fill", "#C8181Bff")
      .attr("stroke", "black")
      .attr("y", -35)
      .attr("x", legendXPosition2);
      
    
    const legendXPosition3 = 76 + 82 + 79 + 78 + 84 + 85 + 85;
    legend
      .append("rect")
      .attr("width", 92)
      .attr("height", 20)
      .attr("fill", "#600005ff")
      .attr("stroke", "black")
      .attr("y", -35)
      .attr("x", legendXPosition3);

    svg
      .append("text")
      .text("Monthly Global Land-Surface Temperature")
      .attr("x", w / 2 - 220)
      .attr("y", 50)
      .attr("font-size", 20)
      .attr("id", "title");

    svg
      .append("text")
      .text(`${dataArr[0].year} - ${dataArr[dataArr.length - 1].year}: base temperature ${baseTemp}°C`)
      .attr("x", w / 2 - 110)
      .attr("y", 70)
      .attr("font-size", 12)
      .attr("id", "description");

    svg
      .append("text")
      .text("Heat Map (EPC) 2024")
      .attr("x", w / 2 - 70)
      .attr("y", 90)
      .attr("font-size", 12)
      .attr("id", "copyright");
    
   
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .style("opacity", 0);

    svg
      .selectAll("rect")
      .data(dataArr)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("cursor", "pointer")
      .attr("fill", (d) => {
        switch (true) {
          case d.variance <= -3:
          return "#03306Cff";
        case d.variance <= -2:
          return "#2170B4ff";
        case d.variance <= -1:
          return "#6BABD7ff";
        case d.variance <= 0:
          return "#C5DBF0ff";
        case d.variance <= 1:
          return "#FDE1D2ff";
        case d.variance <= 2:
          return "#FC916Fff";
        case d.variance <= 3:
          return "#600005ff";
        default:
          return "#C8181Bff";
          }
        }) 
      .attr("data-month", (d) => d.month - 1)
      .attr("data-year", (d) => d.year)
      .attr("data-temp", (d) => (baseTemp + d.variance).toFixed(1))
      .attr("index", (d, i) => i)
      .attr("height", (h - 2 * p) / 12)
      .attr("width", 4)
      .attr("x", (d) => xScale(d.year))
    
      .attr("y", item => yScale(new Date(0, item["month"] - 1, 0, 0, 0, 0, 0)))

      .on("mouseover", function (e) {
        const i = this.getAttribute("index");
        tooltip.transition().duration(200).style("opacity", 0.9);
        
        tooltip.html(() => {
          const date = new Date(0, dataArr[i].month - 1, 0);
          const month = date.toLocaleString("default", { month: "long" });
          const year = dataArr[i].year - month;
          const variance = dataArr[i].variance.toFixed(2);
          return `${year} <br>
            ${baseTemp}°C <br>
            ${variance}°C`;
        });

        tooltip
          .style("left", e.clientX - 50 + "px")
          .style("top", e.clientY + "px")
          .style("transform", "translateX(60px)")
          .attr("data-year", dataArr[i].year);
      })
      .on("mouseout", () => {
         tooltip.transition().duration(400).style("opacity", 0);
      });

  };

  getData();
  
});
