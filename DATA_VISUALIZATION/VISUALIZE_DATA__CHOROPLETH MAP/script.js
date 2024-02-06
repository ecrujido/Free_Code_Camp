// import * as d3 from "https://cdn.skypack.dev/d3@7.8.2";
// import * as topojson from "https://cdn.skypack.dev/topojson-client@3.1.0";

const allUrl = [
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
  
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
];


const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};


Promise.all(allUrl.map(fetchData))
  .then((data) => displayData(...data))
  .catch((error) => console.error("Error fetching data:", error));


const displayData = async (edu, map) => {
  const eduData = edu;
  const mapData = map;

  const w = 1100;
  const h = 820;
  const p = 30;

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "map");

  svg
    .append("text")
    .text("United States Educational Attainment")
    .attr("x", w / 2 - 230)
    .attr("y", 20)
    .attr("font-size", 20)
    .attr("id", "title");

  svg
    .append("text")
    .text(
      " Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
    )
    .attr("x", w / 2 - 340)
    .attr("y", 55)
    .attr("font-size", 17)
    .attr("id", "description");

  svg
    .append("text")
    .html(
      `Source: <a href="https://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx" target="_blank" class="link">USDA Economic Research Service</a>`
    )
    .attr("x", w - 360)
    .attr("y", h - 100)
    .attr("font-size", 13)
    .attr("id", "source");

    
    svg
    .append("text")
    .text("Choropleth Map (EPC) 2024")
    .attr("x", w - 700)
    .attr("y", h - 100)
    .attr("font-size", 12)
    .attr("id", "copyright");



  const legend = svg
    .append("g")
    .attr("id", "legend")
    .attr("transform", "translate(" + (w - 194) + "," + (h - 260) + ")")
    .attr("fill", "black");

  legend
    .append("text")
    .attr("font-size", "12px")
    .text("15% or less ")
    .attr("y", -50);

  legend
    .append("text")
    .attr("font-size", "12px")
    .text("25% or less")
    .attr("y", -30);

  legend
    .append("text")
    .attr("font-size", "12px")
    .text("35% or less")
    .attr("y", -10);

  legend
    .append("text")
    .attr("font-size", "12px")
    .text("45% or less")
    .attr("y", 10);

  legend
    .append("text")
    .attr("font-size", "12px")
    .text("more than 45%")
    .attr("y", 30);

  legend
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", "orange")
    .attr("y", -61)
    .attr("x", -15);

  legend
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", "magenta")
    .attr("y", -41)
    .attr("x", -15);

  legend
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", "red")
    .attr("y", -21)
    .attr("x", -15);
    
  legend
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", "blue")
    .attr("y", -1)
    .attr("x", -15);

  legend
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", "cyan")
    .attr("y", 20)
    .attr("x", -15);


  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);


  svg
    .append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(mapData, mapData.objects.counties).features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("cursor", "pointer")
    .attr("data-fips", (d) => d.id)

    .attr("alt", (d) => {
      const county = eduData.find((county) => county.fips === d.id);
      return `${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%`;
    })

   .attr("data-education", (d) => {
      const county = eduData.find((county) => county.fips === d.id);
      return county ? county.bachelorsOrHigher : null;
    })
	
    .attr("fill", (d) => {
      const county = eduData.find((county) => county.fips === d.id);
      const percentage = county.bachelorsOrHigher;
    
      if (percentage <= 15) return "orange";
      if (percentage <= 25) return "magenta";
      if (percentage <= 35) return "red";
      if (percentage <= 45) return "blue";
      return "cyan";
    })
    
    .on("mouseover", function (e) {
      const info = this.getAttribute("alt");
      const percent = this.getAttribute("data-education");
    
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(info)
        .style("left", `${e.clientX - 50}px`)
        .style("top", `${e.clientY}px`)
        .style("transform", "translateX(60px)")
        .attr("data-education", percent);
    })
    
    .on("mouseout", () => {
      tooltip.transition().duration(400).style("opacity", 0);
    });

};
