export default function Box({title, contents}) {

    return(
        <div
        className="border border-theme mx-2 sm:mx-6 my-6" >

            <div 
            className="relative flex justify-center" >
                <h3 
                className="h3 w-fit absolute z-2 -top-10 bg-white text-center">
                    {title}
                </h3>
            </div>

            <div
            className="p-6 pt-8">
                {contents}
            </div>

        </div>
    )
}