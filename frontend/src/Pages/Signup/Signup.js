import { FieldArray, useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup'
import styles from "./Signup.module.scss"
import { useSignup } from "../../hooks/auth/useSignup";
import ClipLoader from "react-spinners/ClipLoader";
import useFetch from "../../hooks/useFetch";

const Signup = () => {
    
    const { data: teamsData, isLoading: teamsLoading, error: teamsError} = useFetch('/teams')
    const { data: playersData, isLoading: playersLoading, error: playersError} = useFetch('/players')
    const teams = teamsData?.teams;
    const players = playersData?.players;
    const {signup, error, isLoading} = useSignup();

    const [isSubmitClicked, setIsSubmitClicked] = useState(false)
    const [isSignedup, setIsSignedUp] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            auth_players: [],
            auth_teams: [],
            stolik: false,
            admin: false
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required("Podaj imię")
                .max(10, "Imię nie może być dłuższe niż 10 znaków")
                .matches(/^[a-zA-Z]+$/, "Imię może zawierać tylko litery"),

            lastName: Yup.string()
                            .required("Podaj nazwisko")
                            .matches(/^[a-zA-Z]+$/, "Nazwisko może zawierać tylko litery"),

            email: Yup.string()
                            .required("Podaj email")
                            .email("Nieprawidłowy adres email"),

            password: Yup.string()
                            .required("Podaj hasło")
                            .min(8, "Hasło musi mieć przynajmniej 8 znaków")
                            .matches(/(?=.*[A-Z])/, "Hasło musi zawierać co najmniej jedną dużą literę")
                            .matches(/(?=.*[0-9])/, "Hasło musi zawierać co najmniej jedną cyfrę")
                            .matches(/(?=.*[!@#\$%\^&])/, "Hasło musi zawierać co najmniej jeden znak specjalny (!, @, #, $, %, ^, &)")
                            .matches(confirmPassword, "Hasła nie są takie same"),
            auth_players: Yup.array()
                .required("Podaj graczy"),
            auth_teams: Yup.array()
                .required("Podaj drużyny"),
            stolik: Yup.boolean(),
            admin: Yup.boolean()
        }),

        onSubmit: async (values) => {
            setIsSubmitClicked(false);
            await signup(values.firstName, values.lastName, values.email, values.password,values.auth_teams, values.auth_players, values.stolik, values.admin)
            setIsSignedUp(true);
        }
    })
    return ( 
    <>
        {(!teams && !players) &&
            <ClipLoader color="#ffffff" loading={[teamsLoading, playersLoading]} size={150} />
        }
        {(teams && players) && 
            <div className={styles.Signup}>

            <form onSubmit={formik.handleSubmit}>

                <div className="input-container">
                    <label htmlFor="firstName">Imię</label>
                    <input 
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.firstName}</p>
                }
                </div>

                <div className="input-container">
                    <label htmlFor="lastName">Nazwisko</label>
                    <input 
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.lastName}</p>
                }
                </div>

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

                <div className="input-container">
                    <label htmlFor="password">Potwierdź hasło</label>
                    <input 
                    type="password"
                    name="password"
                    id="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    
                </div>
                
                <div className="input-container">

                    <label>Wybierz drużyny którymi chcesz zarządzać</label>
                       <ul className={styles.listItems}>
                            {teams.map(team => (
                                <li key={team._id}>
                                    <input
                                    type="checkbox"
                                    name="auth_teams"
                                    id={team._id}
                                    value={team._id}
                                    onChange={formik.handleChange}
                                    />
                                    {team.name}
                                </li>
                            ))}
                       </ul>
                       { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.auth_teams}</p>
                }
                </div>

                <div className="input-container">
                <label>Wybierz graczy którymi chcesz zarządzać</label>
                <ul className={styles.listItems}>
                        {players.map(player => (
                            <li key={player._id}>
                                <input
                                type="checkbox"
                                name="auth_players"
                                id={player._id}
                                value={player._id}
                                onChange={formik.handleChange}
                                />
                                {player.firstName + " " + player.lastName}
                            </li>
                        ))}
                </ul>
                { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.auth_players}</p>
                }
                </div>

                <div className="input-container">
                    <label>Czy będziesz na stoliku?</label>
                    <input 
                    type="checkbox"
                    name="stolik"
                    id="stolik"
                    placeholder="czy będziesz na stoliku?"
                    value={formik.values.stolik}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.stolik}</p>
                }
                </div>

                <div className="input-container">
                    <label>Włodarz?</label>
                    <input 
                    type="checkbox"
                    name="admin"
                    id="admin"
                    placeholder="Włodarz?"
                    value={formik.values.admin}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.admin}</p>
                }
                </div>

                {isSubmitClicked && 
                <button className="clear-inputs-btn" type="button" onClick={() => {formik.handleReset(); setIsSubmitClicked(false)}}>Clear</button>
            }
                {isSignedup ? <p>Zarejestrowano, wysłaliśmy Ci maila z potwierdzeniem</p> : <button disabled={isLoading}className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} >Sign up</button>}
                {error && <p className={styles.Error}>{error}</p>}
            </form>

        </div>
        }
    </>
     );
}
 
export default Signup;