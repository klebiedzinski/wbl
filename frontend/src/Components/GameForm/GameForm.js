import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup'
import styles from "./GameForm.module.scss"
import {useGamesContext} from "../../hooks/contexts/useGamesContext";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import axiosInstance from "../../config/axios_config";
const GameForm = ({allTeams: teams}) => {

    const {dispatch} = useGamesContext()
    const {user} = useAuthContext()
    const [isSubmitClicked, setIsSubmitClicked] = useState(false)
    const [isAdded, setIsAdded] = useState(false)

    const formik = useFormik({
        initialValues: {
            // all values from game model
            status: "scheduled",
            team1: "",
            team2: "",
            team1Score: 0,
            team2Score: 0,
            date: "",
            location: "ONZ Arena"
        },
        validationSchema: Yup.object({
            status: Yup.string()
                .required("Podaj status meczu (scheduled, live, finished)"),
            team1: Yup.string()
                .required("Podaj nazwę drużyny 1"),
            team2: Yup.string()
                .required("Podaj nazwę drużyny 2"),
            team1Score: Yup.number(),
            team2Score: Yup.number(),
            date: Yup.string()
                .required("Podaj datę meczu (format: YYYY-MM-DD)"),
            location: Yup.string()
                .required("Podaj lokalizację meczu")

        }),
        onSubmit: (values) => {
            setIsSubmitClicked(false)
            const team1_id = teams.find(team => team.name === values.team1)._id
            const team2_id = teams.find(team => team.name === values.team2)._id
            console.log(team1_id, team2_id)
            axiosInstance.post('/games', {
                status: values.status,
                team1_id: team1_id,
                team2_id: team2_id,
                team1Score: values.team1Score,
                team2Score: values.team2Score,
                date: values.date,
                location: values.location
            }, {headers: {'Authorization': `Bearer ${user.token}`}}
            )
            .then((response) => {
                if (response.data) {
                    setIsAdded(true)
                    console.log(response.data)
                    // dispatch({type: "ADD_GAME", payload: response.data.Game})
                }
                
            })
            .catch((error) => {
                console.log(error)
            })
        }
    })
    return ( 
        <div className={styles.GameForm}>
            <form onSubmit={formik.handleSubmit}>
                <div className="input-container">
                    <label htmlFor="status">Status</label>
                    <select
                    name="status"
                    id="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    >
                        <option value="scheduled">scheduled</option>
                        <option value="live">live</option>
                        <option value="finished">finished</option>
                    </select>
                    { isSubmitClicked &&
                    <p className="validation-info">{formik.errors.status}</p>
                    }
                </div>
                    

                <div className="input-container">
                    <label htmlFor="team1">Drużyna 1</label>
                    <select
                    name="team1"
                    id="team1"
                    value={formik.values.team1}
                    onChange={formik.handleChange}
                    >
                        <option value="">Wybierz drużynę 1</option>
                        {teams.map(team => (
                            <option key={team._id} value={team.name}>{team.name}</option>
                        ))}
                    </select>
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.team1}</p>
                    }
                </div>

                <div className="input-container">
                    <label htmlFor="team2">Drużyna 2</label>
                    <select
                    name="team2"
                    id="team2"
                    value={formik.values.team2}
                    onChange={formik.handleChange}
                    >
                        <option value="">Wybierz drużynę 2</option>
                        {teams.map(team => (
                            <option key={team._id} value={team.name}>{team.name}</option>
                        ))}
                    </select>
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.team2}</p>
                    }
                </div>
                { formik.values.status === "finished" &&
                <>
                <div className="input-container">
                    <label htmlFor="team1Score">Wynik drużyny 1</label>
                    <input 
                    type="number"
                    name="team1Score"
                    id="team1Score"
                    placeholder="team1Score"
                    value={formik.values.team1Score}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.team1Score}</p>
                }
                </div>

                <div className="input-container">
                    <label htmlFor="team2Score">Wynik drużyny 2</label>
                    <input 
                    type="number"
                    name="team2Score"
                    id="team2Score"
                    placeholder="team2Score"
                    value={formik.values.team2Score}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.team2Score}</p>
                }
                </div>
                </>
}

                <div className="input-container">
                    <label htmlFor="date">Data</label>
                    <input 
                    type="date"
                    name="date"
                    id="date"
                    placeholder="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.date}</p>
                    }
                </div>

                <div className="input-container">
                    <label htmlFor="location">Lokalizacja</label>
                    <input 
                    type="location"
                    name="location"
                    id="location"
                    placeholder="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && 
                    <p className="validation-info">{formik.errors.location}</p>
                    }
                </div>

                {isSubmitClicked && 
                <button className="clear-inputs-btn" type="button" onClick={() => {formik.handleReset(); setIsSubmitClicked(false)}}>Clear</button>
                }
                <button className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} >Submit</button>
                {isAdded && 
                <h2 className="validation-info">Dodano mecz</h2>
                }
            </form>

        </div>
     );
}
 
export default GameForm;