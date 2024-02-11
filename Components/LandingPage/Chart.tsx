import React, { useEffect } from "react";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { image_type } from "../../interfaces/interfaces";

type Props = {
  data: {
    name: string;
    depth: number;
    value: number;
    color: string;
    icon: image_type;
    hover_text: string;
  }[];
};

const Chart = (props: Props) => {
  useEffect(() => {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    if (chart.logo) {
      chart.logo.disabled = true;
    }

    chart.data = props?.data
    chart.innerRadius = 70;
    chart.radius = 150;

    chart.depth = 100;

    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.depthValue = "depth";
    series.dataFields.category = "name";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

    // series.labels.template.disabled = true;

    series.ticks.template.disabled = true;
    series.slices.template.propertyFields.fill = "color";
    if (series.tooltip) {
      series.tooltip.label.wrap = true
    }
    series.slices.template.tooltipHTML = "<div style='width:300px;'>{hover_text}</div>";

    series.alignLabels = false;
    series.labels.template.wrap = true;
    series.labels.template.html = "<div style='display:flex;flex-direction:column;align-items:center;width:80px;height:40px'><img src={icon.data.attributes.url} alt='icon' width=15/><p style='font-size:9px;font-weight:700;text-align:center'>{name}</p></div>";
    series.labels.template.radius = am4core.percent(-28);
    series.labels.template.fill = am4core.color("white");
    // hs.properties.scale = 1.1;

    // let as = series.slices.template.states.getKey("active");
    // as.properties.shiftRadius = 0.1;

    // series.labels.template.text = "{hi}";
  }, []);
  return <div id="chartdiv" style={{ width: "100%", height: "333px" }}></div>;
};

export default Chart;
