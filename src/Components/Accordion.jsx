import { useState } from "react";
import Data from "./Data";

function Accordion() {
    const [select, setSelect] = useState("");
    const [multiBtn, setMultiBtn] = useState(false);
    const [multiple, setMultiple] = useState([]);

    const handleSingleSelect = (getCurrentValue) => {
        setSelect(getCurrentValue === select ? null : getCurrentValue);
        // console.log(getCurrentValue);
    };

    const handleMultipleSelect = (getCurrentValue) => {
        const multipleValues = [...multiple]
        const indexOfMultipleValues = multipleValues.indexOf(getCurrentValue)
        
        if(indexOfMultipleValues === -1) multipleValues.push(getCurrentValue)
        else multipleValues.splice(indexOfMultipleValues, 1)

        setMultiple(multipleValues)
    };
    // console.log(select, multiple)

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center flex-col gap-5 mb-20">
                <div className=" text-white flex justify-center items-center flex-col gap-5">
                    <button
                        className="p-2 mt-40 bg-orange-500 rounded-xl hover:bg-orange-700"
                        onClick={() => setMultiBtn(!multiBtn)}
                    >
                        Enable multiple Selection
                    </button>
                    {Data && Data.length > 0 ? (
                        Data.map((data) => (
                            <div
                                key={data.id}
                                className="w-60 h-26 bg-orange-700 text-white cursor-pointer hover:bg-orange-600 rounded-xl "
                                onClick={
                                    multiBtn
                                        ? () => handleMultipleSelect(data.id)
                                        : () => handleSingleSelect(data.id)
                                }
                            >
                                <div className="text-center p-4">
                                    <h1>{data.question}</h1>
                                    <span>The answer is :</span>
                                    <div>
                                        {multiBtn 
                                            ? multiple.indexOf(data.id) !== -1 &&  <p>{data.answer}</p>
                                            : select === data.id && <p>{data.answer}</p>
                                    }
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>No Data Found !</h1>
                    )}
                </div>
            </div>
        </>
    );
}

export default Accordion;
