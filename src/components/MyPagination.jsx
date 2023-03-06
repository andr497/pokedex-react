import { useState } from "react";
import { Link } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

export default function MyPagination({ page, count, pageClicked }) {
  return (
    <Pagination
      sx={{ display: "flex", justifyContent: "center" }}
      page={page}
      count={count}
      siblingCount={1}
      boundaryCount={1}
      renderItem={(item) => {
        return (
          <PaginationItem
            component={Link}
            to={`/${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
            onClick={() => {
              pageClicked(item.page);
            }}
          />
        );
      }}
    />
  );
}
