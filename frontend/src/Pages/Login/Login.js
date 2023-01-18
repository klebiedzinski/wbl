import { useFormik } from "formik";
import { useState } from "react";
import { useLogin } from "../../hooks/auth/useLogin";
import * as Yup from 'yup'
import styles from "./Login.module.scss"
const Login = () => {
    const {login, error, isLoading} = useLogin();
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
            login(values.email, values.password)
            setIsSubmitClicked(false)

        }
    })
    return ( 
        <div className={styles.Login}>

            <form onSubmit={formik.handleSubmit}>

                <div className="input-container">
                    <label htmlFor="email">Email</label>
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
                    <label htmlFor="password">Hasło</label>
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
                <button className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} disabled={isLoading} >Login</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
            <p className="signup-link">Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
     );
}
 
export default Login;