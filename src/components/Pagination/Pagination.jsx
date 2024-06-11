
export default function Pagination({color, page, pageCount, handlePrevious, handleNext}) {

    const button = 2
    
    return (
        <>
        <button className="m-4" onClick={handlePrevious} disabled={page===1}>PREVIOUS</button>
        <button className="m-4" onClick={handleNext} disabled={page===pageCount} >NEXT</button>

        <p>Page: {page} </p>
        <p>PageCount: {pageCount}</p>
        </>
    )
}



//     return (
//         <div className="flex items-center justify-between px-4 py-3 sm:px-6">
//             <div className="flex flex-1 justify-between sm:hidden">
//                 <a
//                     href="#"
//                     className="relative inline-flex items-center rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-theme hover:bg-hover"
//                 >
//                     Previous
//                 </a>
//                 <a
//                     href="#"
//                     className="relative ml-3 inline-flex items-center rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-theme hover:bg-hover"
//                 >
//                     Next
//                 </a>
//             </div>
//             <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//                 <div>
//                     <p className="text-sm text-theme">
//                         Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
//                         <span className="font-medium">97</span> results
//                     </p>
//                 </div>
//                 <div>
//                     <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//                         <a
//                             href="#"
//                             className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-hover focus:z-20 focus:outline-offset-0"
//                         >
//                             <span className="sr-only" onClick={handlePrevious} disabled={page===1}>Previous</span>
//                             <div className="h-5 w-5" aria-hidden="true"><span className="material-symbols-outlined">
//                                 arrow_back_ios
//                             </span></div>
//                         </a>
//                         {/* Current: "z-10 bg-lightblue text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme", Default: "text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-hover focus:outline-offset-0" */}
//                         <a
//                             href="#"
//                             aria-current="page"
//                             className={`relative z-10 inline-flex items-center ${color} px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme`}
//                         >
//                             1
//                         </a>
//                         <a
//                             href="#"
//                             className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-hover focus:z-20 focus:outline-offset-0"
//                         >
//                             2
//                         </a>
//                         <a
//                             href="#"
//                             className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-hover focus:z-20 focus:outline-offset-0 md:inline-flex"
//                         >
//                             3
//                         </a>
//                         <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-theme ring-1 ring-inset ring-gray-400 focus:outline-offset-0">
//                             ...
//                         </span>
//                         <a
//                             href="#"
//                             className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-hover focus:z-20 focus:outline-offset-0 md:inline-flex"
//                         >
//                             8
//                         </a>
//                         <a
//                             href="#"
//                             className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-hover focus:z-20 focus:outline-offset-0"
//                         >
//                             9
//                         </a>
//                         <a
//                             href="#"
//                             className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-hover focus:z-20 focus:outline-offset-0"
//                         >
//                             10
//                         </a>
//                         <a
//                             href="#"
//                             className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-hover focus:z-20 focus:outline-offset-0"
//                         >
//                             <span className="sr-only">Next</span>
//                             <div className="h-5 w-5" aria-hidden="true" onClick={handleNext} disabled={page===pageCount} ><span className="material-symbols-outlined">
//                                 arrow_forward_ios
//                             </span></div>
//                         </a>
//                     </nav>
//                 </div>
//             </div>
//         </div>
//     )
// }
