import React from "react";

const Spinner = () => {
    return (
        <div style={{display:"flex"}}>
            <div
                style={{ position: "absolute", fontSize: "5rem", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}
            > 로딩중입니다......</div>
        </div>

    )
}

export default Spinner;