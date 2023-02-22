// Setting up constant variables 
const height = 550;
const width = 600;
const margin = {left: 50, right: 50,
				top: 50, bottom: 50};

// Constants for scaling the visualizations 
const vis_height = height - margin.top - margin.bottom;
const vis_width = width - margin.left - margin.right;

// Create bar element
const bar = d3.select("#chart")
					.append("svg")
						.attr("height", height)
						.attr("width", width)
						.attr("class", "frame");


                        // function to build barchart
                        function build_barchart() {
                            // read data from csv file
                            d3.csv("data/data.csv").then((data) => {

                                // set up scales
                                const MAX_Y2 = d3.max(data, (d) => {return parseInt(d.Value); });

                                const X_SCALE2 = d3.scaleBand()
                                                    .domain(data.map((d) => {return d.Category}))
                                                    .range([0, vis_width]);

                                const Y_SCALE2 = d3.scaleLinear()
                                                    .range([vis_height, 0])
                                                    .domain([0, MAX_Y2])

                                // create bars
                                bar.selectAll(".bar")
                                                .data(data)
                                                .enter().append("rect")
                                                            .attr("class", "bar")
                                                            .attr("x", d => {
                                                                    return X_SCALE2(d.Category) + margin.left
                                                                })
                                                            .attr("y", d => {
                                                                return (Y_SCALE2(d.Value) + margin.bottom)
                                                            })
                                                            .attr("width", X_SCALE2.bandwidth() - 5)
                                                            .attr("height", d => {
                                                                return (vis_height - Y_SCALE2(d.Value))
                                                            }).style("fill", "steelblue");

                                // add x-axis
                                // create x-axis
                                bar.append("g")
                                          .attr("transform", "translate(" + 
                                              margin.left+ "," + (margin.top + vis_height) + ")")
                                              .call(d3.axisBottom(X_SCALE2).ticks(10));

                                // create y-axis
                                bar.append("g")
                                          .attr("transform", "translate(" + 
                                              margin.left + "," + (margin.top) + ")")
                                          .call(d3.axisLeft(Y_SCALE2).ticks(10));

                        ;


                            });
                        }

                        build_barchart();