import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function CategoryFilter({ categories, onChange }) {
  return (
    <FormControl sx={{ minWidth: 368, maxWidth: "100%" }}>
      <InputLabel>Kategorie</InputLabel>
      <Select
        label="Kategorie"
        onChange={(e) => onChange(e.target.value)}
        defaultValue=""
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CategoryFilter;
