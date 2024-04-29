import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"; // Import the icon

function RetailerLinks({ retailerInfo }) {
  return (
    <div>
      {retailerInfo.map((retailer) => (
        <Card
          key={retailer.retailer_id}
          sx={{ mb: 2, display: "flex", alignItems: "center" }}
        >
          <CardActionArea
            href={retailer.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ flex: 1, display: "flex", alignItems: "center" }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" component="div">
                {retailer.name}: {retailer.price} CHF
              </Typography>
            </CardContent>
            <ArrowForwardIosIcon sx={{ mr: 2 }} />{" "}
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}

export default RetailerLinks;
