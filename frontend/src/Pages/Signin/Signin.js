import { useFormik } from "formik";
import { useState } from "react";
import axiosInstance from "../../config/axios_config";
import * as Yup from 'yup'
import styles from "./Signin.module.scss"
const Signin = () => {
    
    const [isSubmitClicked, setIsSubmitClicked] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Podaj email"),
            password: Yup.string()
                .required("Podaj hasło")
        }),
        onSubmit: (values) => {
            setIsSubmitClicked(false)
            console.log(values)
        }
    })
    return ( 
        <div className={styles.Signin}>

            <form onSubmit={formik.handleSubmit}>

                <div className="input-container">
                    <input 
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.email}</p>
                    }
                </div>
                
                <div className="input-container">
                    <input 
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.password}</p>
                    }
                </div>

                {isSubmitClicked && 
                <button className="clear-inputs-btn" type="button" onClick={() => {formik.handleReset(); setIsSubmitClicked(false)}}>Clear</button>
                }
                <button className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} >Sign in</button>
                
            </form>
            <p className="signup-link">Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
     );
}
 
export default Signin;