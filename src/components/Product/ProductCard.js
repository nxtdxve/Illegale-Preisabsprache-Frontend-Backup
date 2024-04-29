import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea
        component={Link}
        to={`/product/${product._id}`}
        sx={{ flex: 1 }}
      >
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ minHeight: 60 }}>
            {" "}
            {/* Einstellen der minimalen Höhe für den Produktname */}
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flex: 1,
              mt: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Kategorie: {product.category}
            </Typography>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" color="text.secondary">
                Hochpreis: {product.price_details.highest_price_current} CHF
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tiefpreis: {product.price_details.lowest_price_current} CHF
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
