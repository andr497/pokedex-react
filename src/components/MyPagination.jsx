import { useState } from "react";
import { Link } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

export default function MyPagination({ page, count, pageClicked }) {
  return (
    <Pagination
      page={page}
      count={count}
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
