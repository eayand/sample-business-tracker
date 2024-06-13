import { useNavigate, Link } from "react-router-dom"

export default function Pagination({ textColor, bgColor, wsurl, page, pageCount, handlePrevious, handleNext }) {

    const navigate = useNavigate()
    
    const boxStyle = `relative inline-flex items-center justify-center w-10 px-0 py-2 text-sm font-semibold ${textColor} ring-1 ring-inset ring-gray-400 hover:bg-hover disabled:hover:none focus:z-20 focus:outline-offset-0`

    const threshold = pageCount > 7 && page > 7 ? "above" : "below"

    const options = {
        below: {
            box1: {
                style: pageCount > 1 ? boxStyle : "hidden",
                content: 1
            },
            box2: {
                style: pageCount > 1 ? boxStyle : "hidden",
                content: 2
            },
            box3: {
                style: pageCount > 2 ? boxStyle : "hidden",
                content: 3
            },
            box4: {
                style: pageCount > 3 ? boxStyle : "hidden",
                content: 4
            },
            box5: {
                style: pageCount > 4 ? boxStyle : "hidden",
                content: 5
            },
            box6: {
                style: pageCount > 5 ? boxStyle : "hidden",
                content: 6
            },
            box7: {
                style: pageCount > 6 ? boxStyle : "hidden",
                content: 7
            }
        },
        above : {
            box1: {
                style: boxStyle,
                content: (page-3) < (pageCount-6) ? (page-3) : (pageCount-6)
            },
            box2: {
                style: boxStyle,
                content:(page-2) < (pageCount-5) ? (page-2) : (pageCount-5)
            },
            box3: {
                style: boxStyle,
                content: (page-1) < (pageCount-4) ? (page-1) : (pageCount-4)
            },
            box4: {
                style: boxStyle,
                content: (page) < (pageCount-3) ? (page) : (pageCount-3)
            },
            box5: {
                style: boxStyle,
                content: (page+1) < (pageCount-2) ? (page+1) : (pageCount-2)
            },
            box6: {
                style: boxStyle,
                content: (page+2) < (pageCount-1) ? (page+2) : (pageCount-1)
            },
            box7: {
                style: boxStyle,
                content: (page+3) < pageCount ? (page+3) : pageCount
            }
        }
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">

                <div className="flex flex-1 justify-between sm:hidden">
                    <div onClick={handlePrevious}
                        className="relative inline-flex items-center rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-theme hover:bg-hover"
                    >
                        Previous
                    </div>
                    <div onClick={handleNext}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-theme hover:bg-hover"
                    >
                        Next
                    </div>
                </div>

                <div className={pageCount > 1 ? "pagination hidden sm:flex sm:flex-1 sm:items-center sm:justify-end" : "hidden"} >

                    <div>
                        <p className="text-sm text-theme mr-10 align-text-bottom">
                            Page {page} of {pageCount}
                        </p>
                    </div>

                    <div >
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <div
                                className={"relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-hover focus:z-20 focus:outline-offset-0"}
                            >
                                <span className="sr-only">Previous</span>
                                <div className="h-5 w-5" aria-hidden="true" onClick={handlePrevious} disabled={page === 1} ><span className="material-symbols-outlined leading-5">
                                    arrow_back_ios
                                </span></div>
                            </div>

                            {/* Current: "z-10 bg-bluetext text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme", Default: "text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-hover focus:outline-offset-0" */}

                            <Link
                                to={`/customers/${wsurl}?page=${options[threshold].box1.content}`}
                                aria-current="page"
                                className={options[threshold].box1.content===page ? options[threshold].box1.style.concat(' ', `text-white ${bgColor}`) : options[threshold].box1.style}
                            >
                                {options[threshold].box1.content}
                            </Link>

                            <Link
                                to={`/customers/${wsurl}?page=${options[threshold].box2.content}`}
                                className={options[threshold].box2.content===page ? options[threshold].box2.style.concat(' ', `text-white ${bgColor}`) : options[threshold].box2.style}
                            >
                                {options[threshold].box2.content}
                            </Link>

                            <Link
                                to={`/customers/${wsurl}?page=${options[threshold].box3.content}`}
                                className={options[threshold].box3.content===page ? options[threshold].box3.style.concat(' ', `text-white ${bgColor}`) : options[threshold].box3.style}
                            >
                                {options[threshold].box3.content}
                            </Link>

                            <Link
                                to={`/customers/${wsurl}?page=${options[threshold].box4.content}`}
                                className={options[threshold].box4.content===page ? options[threshold].box4.style.concat(' ', `text-white ${bgColor}`) : options[threshold].box4.style}
                            >
                                {options[threshold].box4.content}
                            </Link>
                            
                            <Link
                                to={`/customers/${wsurl}?page=${options[threshold].box5.content}`}
                                className={options[threshold].box5.content===page ? options[threshold].box5.style.concat(' ', `text-white ${bgColor}`) : options[threshold].box5.style}
                            >
                                {options[threshold].box5.content}
                            </Link>
                            <Link
                                to={`/customers/${wsurl}?page=${options[threshold].box6.content}`}
                                className={options[threshold].box6.content===page ? options[threshold].box6.style.concat(' ', `text-white ${bgColor}`) : options[threshold].box6.style}
                            >
                                {options[threshold].box6.content}
                            </Link>
                            <Link
                                to={`/customers/${wsurl}?page=${options[threshold].box7.content}`}
                                className={options[threshold].box7.content===page ? options[threshold].box7.style.concat(' ', `text-white ${bgColor}`) : options[threshold].box7.style}
                            >
                                {options[threshold].box7.content}
                            </Link>
                            <div
                                className={"relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-hover focus:z-20 focus:outline-offset-0"}
                            >
                                <span className="sr-only">Next</span>
                                <div className="h-5 w-5" aria-hidden="true" onClick={handleNext} disabled={page === pageCount} ><span className="material-symbols-outlined leading-5">
                                    arrow_forward_ios
                                </span></div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}