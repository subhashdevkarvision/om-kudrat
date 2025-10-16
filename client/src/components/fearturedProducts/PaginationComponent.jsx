import React from "react";
import {
  PaginationContent,
  Pagination,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../ui/pagination";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const PaginationComponent = () => {
  return (
    <Pagination className="justify-start">
      <PaginationContent>
        <PaginationLink className="bg-text-green text-white rounded-full">
          1
        </PaginationLink>
      </PaginationContent>
      <PaginationContent>
        <PaginationLink>2</PaginationLink>
      </PaginationContent>
      <PaginationContent>
        <PaginationEllipsis />
      </PaginationContent>
      <PaginationContent>
        <PaginationNext></PaginationNext>
      </PaginationContent>
      <PaginationContent>
        <Button
          variant="outline"
          className="rounded-full font-medium px-8 py-5"
        >
          Last
        </Button>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
