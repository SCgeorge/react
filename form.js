import React from "react";

const Form = props =>(
    <form onSubmit ={props.wMethod}>
                <input type="text" name="city" placeholder="City"/>
                <button>Get a weather</button>
            </form>
)



export default Form;