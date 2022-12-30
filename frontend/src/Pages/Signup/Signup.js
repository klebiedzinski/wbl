import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup'
import styles from "./Signup.module.scss"
import { useSignup } from "../../hooks/useSignup";
const Signup = () => {
    
    const {signup, error, isLoading} = useSignup();

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
        onSubmit: async (values) => {
            setIsSubmitClicked(false)
            
            console.log(values.email, values.password)
            await signup(values.email, values.password)
            
        }
    })
    return ( 
        <div className={styles.Signup}>

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
                <button disabled={isLoading}className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} >Sign up</button>
                {error && <p className={styles.Error}>{error}</p>}
            </form>
        </div>
     );
}
 
export default Signup;