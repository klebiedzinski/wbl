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

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            auth_players: [],
            auth_teams: [],
            stolik: false
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Podaj email"),
            password: Yup.string()
                .required("Podaj hasło"),
            auth_players: Yup.array()
                .required("Podaj graczy")
                .min(1, "Musisz wybrać przynajmniej jednego gracza"),
            auth_teams: Yup.array()
                .required("Podaj drużyny"),
            stolik: Yup.boolean()
        }),

        onSubmit: async (values) => {
            setIsSubmitClicked(false)
            
            await signup(values.email, values.password, values.auth_players, values.auth_teams, values.stolik)
            
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

                {isSubmitClicked && 
                <button className="clear-inputs-btn" type="button" onClick={() => {formik.handleReset(); setIsSubmitClicked(false)}}>Clear</button>
            }
                <button disabled={isLoading}className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} >Sign up</button>
                {error && <p className={styles.Error}>{error}</p>}
            </form>

        </div>
        }
    </>
     );
}
 
export default Signup;