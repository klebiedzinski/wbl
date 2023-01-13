import { useFormik } from "formik";
import { useState } from "react";
import axiosInstance from "../../../config/axios_config";
import * as Yup from 'yup'
import styles from "./GameEditFormModal.module.scss"
import {useTeamsContext} from "../../../hooks/contexts/useTeamsContext";
import { useAuthContext } from "../../../hooks/contexts/useAuthContext";
import { AiFillEdit, AiFillDelete, AiOutlineCheck, AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const GameEditFormModal = ({game, setIsModalOpen, team1,team2}) => {
    const {user} = useAuthContext();
    const {dispatch} = useTeamsContext();

    const [isSubmitClicked, setIsSubmitClicked] = useState(false)
    const [isEdited, setIsEdited] = useState(false)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            team1Score: game.team1Score,
            team2Score: game.team2Score,
            location: game.location,
            date: game.date,
            status: game.status,
        },
        validationSchema: Yup.object({
            team1Score: Yup.number(),
            team2Score: Yup.number(),
            location: Yup.string()
                .required("Podaj lokalizację meczu"),
            date: Yup.string()
                .required("Podaj datę meczu (format: YYYY-MM-DD)"),
            status: Yup.string()
            
        }),
        onSubmit: (values) => {
            setIsSubmitClicked(false)
            axiosInstance.patch(`/games/${game._id}`, {
                status: values.status,
                team1Score: values.team1Score,
                team2Score: values.team2Score,
                location: values.location,
                date: values.date
            }, {headers: {'Authorization': `Bearer ${user.token}`}}
                    )
            .then((response) => {
                if (response.status === 200) {
                    setIsEdited(true)
                    dispatch({type: "UPDATE_GAME", payload: {team1Score: values.team1Score, team2Score: values.team2Score, location: values.location, date: values.date}})
                    setTimeout(() => {
                        navigate("/games")
                    }
                    , 1000)
                }
                
            })
            .catch((error) => {
                console.log(error)
            })
        }
    })
    return ( 
        <>
        {game && 
        <div className={styles.overlayStyle}>
            <div className={styles.gameEditModal}>
            <button className={styles.closeModalBtn} onClick={() => setIsModalOpen(false)}>X</button>
            <h1 className="modal-title">Edytuj mecz </h1>
            <h1>{team1.name} vs {team2.name}</h1>
            <div className="GameForm">

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
                        <option value="finished">finished</option>
                    </select>
                    { isSubmitClicked &&
                    <p className="validation-info">{formik.errors.status}</p>
                    }
                </div>
                    
                    
                { formik.values.status === "finished" &&
                <>
                <div className="input-container">
                    <label htmlFor="team1Score">Wynik - {team1.name}</label>
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
                    <label htmlFor="team2Score">Wynik - {team2.name}</label>
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


                    {isSubmitClicked && <button className="clear-inputs-btn" type="button" onClick={() => {formik.handleReset(); setIsSubmitClicked(false)}}>Clear</button>}
                    <button className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} ><AiOutlineCheck/></button>
                    {isEdited && <h2 className="validation-info">Edytowano mecz</h2>}
                </form>
            </div>
        </div>
        </div>
        }
        </>
     );
}
 
export default GameEditFormModal;