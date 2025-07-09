import { Button } from "@mui/material";
import React from "react";

export default function NavigationButton({ action, title }) {
  return (
    <Button
      sx={{ margin: 1 }}
      variant="contained"
      color="warning"
      onClick={action}
      title={title}
    >
      {title}
    </Button>
  );
}
