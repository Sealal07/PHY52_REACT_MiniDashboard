import React, {useRef} from "react";

function FocusInput(){
    // 1. создаем реф
    const inputRef = useRef(null);

    const handleButtonClick = () => {
        // 3. через .current получаем доступ
        // к html элементу
        inputRef.current.focus();
    }

    return (
        <div>
            {/* 2. привязываем реф к элементу */}
            <input ref={inputRef} type="text "/>
            <button onClick={handleButtonClick}>
                FOCUS
            </button>
        </div>
    );
}
export default FocusInput;