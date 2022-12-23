import { useFormik } from "formik";
import { useState } from "react";

import * as Yup from 'yup'
const TeamForm = ({setTeams, teams }) => {
    const [isSubmitClicked, setIsSubmitClicked] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            body: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(10, "Your name is too long")
                .required("Please fill in this field"),

            
                
        }),
        onSubmit: (values) => {
            window.alert("Dodano!")
            console.log(values)
            setIsSubmitClicked(false)
            // const newTeam = new Team({
            //     name: formik.values.name,
            //     src: formik.values.image || wbl
            // })
            // console.log(newTeam)
            // setTeams([...teams,newTeam])
            
        }
    })
    return ( 
        <div className="TeamForm">
            <form onSubmit={formik.handleSubmit}>
                <div className="input-container">
                    <input 
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && <p className="validation-info">{formik.errors.name}</p>}
                </div>
                <div className="input-container">
                    <input 
                    type="text"
                    name="image"
                    id="image"
                    placeholder="Image"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && <p className="validation-info">{formik.errors.image}</p>}
                </div>

                {isSubmitClicked && <button className="clear-inputs-btn" type="button" onClick={() => {formik.handleReset(); setIsSubmitClicked(false)}}>Clear</button>}
                <button className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} >Submit</button>
            </form>
        </div>
     );
}
 
export default TeamForm;