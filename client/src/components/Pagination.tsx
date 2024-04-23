import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import clsx from "clsx";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { generatePagination } from "../utils/generatePagination.ts";

export default function Pagination({ totalPages }: { totalPages: number }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
    const allPages = generatePagination(currentPage, totalPages);

    const handlePageChange = (pageNumber: number | string) => {
        setCurrentPage(Number(pageNumber));

        if (Number(pageNumber) > 1) {
            searchParams.set("page", pageNumber.toString());
            setSearchParams(searchParams);
        } else {
            searchParams.delete("page");
            setSearchParams(searchParams);
        }
    };

    return (
        <>
            <div className="w-full pt-3 inline-flex items-center justify-center">
                <PaginationArrow
                    direction="left"
                    onClick={() => handlePageChange(currentPage - 1)}
                    isDisabled={currentPage <= 1}
                />

                <div className="flex -space-x-px">
                    {allPages.map((page, index) => {
                        let position: "first" | "last" | "single" | "middle" | undefined;

                        if (index === 0) position = "first";
                        if (index === allPages.length - 1) position = "last";
                        if (allPages.length === 1) position = "single";
                        if (page === "...") position = "middle";

                        return (
                            <PaginationNumber
                                key={index}
                                page={page}
                                position={position}
                                isActive={currentPage === page}
                                onClick={() => handlePageChange(page)}
                            />
                        );
                    })}
                </div>

                <PaginationArrow
                    direction="right"
                    onClick={() => handlePageChange(currentPage + 1)}
                    isDisabled={currentPage >= totalPages}
                />
            </div>
        </>
    );
}

function PaginationNumber({
                              page,
                              isActive,
                              position,
                              onClick,
                          }: {
    page: number | string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
    onClick: () => void;
}) {
    const className = clsx("flex h-7 w-7 sm:h-10 sm:w-10  items-center justify-center text-sm border", {
        "rounded-l-md": position === "first" || position === "single",
        "rounded-r-md": position === "last" || position === "single",
        "z-10 bg-blue-600 border-blue-600 text-white": isActive,
        "hover:bg-gray-100": !isActive && position !== "middle",
        "text-gray-300": position === "middle",
    });

    return isActive || position === "middle" ? (
        <div className={className} onClick={onClick}>
            {page}
        </div>
    ) : (
        <button aria-label={`pagination page ${page}`} className={className} onClick={onClick}>
            {page}
        </button>
    );
}

function PaginationArrow({
                             direction,
                             isDisabled,
                             onClick,
                         }: {
    direction: "left" | "right";
    isDisabled?: boolean;
    onClick: () => void;
}) {
    const className = clsx("flex h-7 w-7 sm:h-10 sm:w-10  items-center justify-center rounded-md border", {
        "pointer-events-none text-gray-300": isDisabled,
        "hover:bg-gray-100": !isDisabled,
        "mr-2 md:mr-4": direction === "left",
        "ml-2 md:ml-4": direction === "right",
    });

    const icon =
        direction === "left" ? <IconArrowNarrowLeft className="w-4" /> : <IconArrowNarrowRight className="w-4" />;

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <button aria-label={`pagination arrow ${direction}`} onClick={onClick} className={className}>
            {icon}
        </button>
    );
}