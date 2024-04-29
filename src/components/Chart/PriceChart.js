import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function PriceChart({ priceData }) {
  const [retailerNames, setRetailerNames] = useState({});

  // Retailer-Daten abrufen
  useEffect(() => {
    fetch("https://api.zettler.dev/retailers")
      .then((res) => res.json())
      .then((data) => {
        const namesMap = {};
        data.forEach((retailer) => {
          namesMap[retailer._id.$oid] = retailer.name;
        });
        setRetailerNames(namesMap);
      })
      .catch((error) => console.error("Error fetching retailer data:", error));
  }, []);

  // Hilfsfunktion zur Gruppierung der Daten nach `retailer_id` und Erweiterung der Daten
  const groupAndExtendDataByRetailer = (data) => {
    const groups = {};

    data.forEach((record) => {
      const { retailer_id, price, timestamp } = record;
      if (!groups[retailer_id]) {
        groups[retailer_id] = [];
      }
      groups[retailer_id].push([
        new Date(timestamp).getTime(),
        parseFloat(price),
      ]);
    });

    return groups;
  };

  const groupedData = groupAndExtendDataByRetailer(priceData.price_records);
  const earliestDate = Math.min(
    ...Object.values(groupedData)
      .flat()
      .map((d) => d[0])
  );
  const today = new Date().getTime();

  // Erstellen der Datenreihen für das Diagramm
  const series = Object.keys(groupedData).map((retailer_id) => ({
    name: retailerNames[retailer_id] || `Händler ${retailer_id}`,
    data: groupedData[retailer_id],
  }));

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Preisentwicklung pro Händler",
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        hour: "%e %b %Y, %H:%M", // zeigt '5 Jan 2024, 15:00'
        day: "%e %b %Y, %H:%M", // zeigt '5 Jan 2024, 15:00'
        month: "%b '%y", // zeigt 'Jan '24'
        year: "%Y", // zeigt '2024'
      },
      title: {
        text: "Datum",
      },
      min: earliestDate,
      max: today,
    },
    yAxis: {
      title: {
        text: "Preis",
      },
    },
    tooltip: {
      xDateFormat: "%e %b %Y, %H:%M:%S",
      shared: true,
    },
    series: series,
    credits: {
      enabled: false, // Deaktiviert das Highcharts.com-Credit-Logo
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default PriceChart;
