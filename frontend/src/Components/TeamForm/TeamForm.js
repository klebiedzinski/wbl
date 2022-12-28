import { useFormik } from "formik";
import { useState } from "react";
import axiosInstance from "../../config/axios_config";
import * as Yup from 'yup'
import styles from "./TeamForm.module.scss"
const TeamForm = () => {

    const [isSubmitClicked, setIsSubmitClicked] = useState(false)
    const [isAdded, setIsAdded] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: "",
            link: "https://wbl.klebiedzinski.pl/photos/sample_pictures/wbl.png",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Podaj nazwę drużyny"),
            link: Yup.string()
                .required("Podaj link do logo, zaczynając od https://wbl.klebiedzinski.pl/photos/")
        }),
        onSubmit: (values) => {
            setIsSubmitClicked(false)
            axiosInstance.post('/teams', {
                name: values.name,
                logo: values.link,
            })
            .then((response) => {
                if (response.status === 200) {
                    setIsAdded(true)
                }
                
            })
            .catch((error) => {
                console.log(error)
            })
        }
    })
    return ( 
        <div className={styles.TeamForm}>

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
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.name}</p>
                    }
                </div>
                
                <div className="input-container">
                    <input 
                    type="text"
                    name="link"
                    id="link"
                    placeholder="link"
                    value={formik.values.link}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.link}</p>
                    }
                </div>

                {isSubmitClicked && 
                <button className="clear-inputs-btn" type="button" onClick={() => {formik.handleReset(); setIsSubmitClicked(false)}}>Clear</button>
                }
                <button className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} >Submit</button>
                {isAdded && 
                <h2 className="validation-info">Dodano drużynę</h2>
                }
            </form>
        </div>
     );
}
 
export default TeamForm;