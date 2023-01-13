import { useFormik } from "formik";
import { useState } from "react";
import axiosInstance from "../../../config/axios_config";
import * as Yup from 'yup'
import styles from "./PlayerEditFormModal.module.scss"
import useFetch from "../../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
import {usePlayersContext} from "../../../hooks/contexts/usePlayersContext";
import {useAuthContext} from "../../../hooks/contexts/useAuthContext";
import { useNavigate } from "react-router-dom";
const PlayerEditFormModal = ({setIsModalOpen, player}) => {

    const {user} = useAuthContext();
    const {dispatch} = usePlayersContext()

    const navigate = useNavigate()

    const { _id: id, firstName, lastName, picture, yearOfBirth, career, teamName } = player;

    const { data: teams, isLoading} = useFetch('/teams')

    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEdited, setIsEdited] = useState(false)
    const [isSubmitClicked, setIsSubmitClicked] = useState(false)

    const deletePlayer = () => {
        axiosInstance.delete('/players/' + id, {headers: {'Authorization': `Bearer ${user.token}`}})
        .then(res => {
            if (res.status === 200) {
                setIsDeleted(true);
                dispatch({type: "DELETE_PLAYER", payload: id})
                setTimeout(() => {
                    navigate("/players")
                }
                , 1000)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }


    const formik = useFormik({
        initialValues: {
            firstName: firstName,
            lastName: lastName,
            picture: picture,
            yearOfBirth: yearOfBirth,
            career: career,
            teamName: teamName,
        },

        validationSchema: Yup.object({
            firstName: Yup.string()
                .required("Please fill in this field"),
            lastName: Yup.string()
                .required("Please fill in this field"),
            picture: Yup.string(),

            yearOfBirth: Yup.string()
                .max(4, "Please enter a valid year")
                .required("Please fill in this field"),

            career: Yup.array(),

            teamName: Yup.string()
                .required("Please fill in this field"),
        }),
        onSubmit: (values) => {
            setIsSubmitClicked(false)
            axiosInstance.patch('/players/' + id, {
                firstName: values.firstName,
                lastName: values.lastName,
                picture: values.picture,
                yearOfBirth: values.yearOfBirth,
                career: values.career,
                teamName: values.teamName,
                },{headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                }})
                .then((response) => {
                    if (response.status === 200) {
                        setIsEdited(true)
                        dispatch({type: "UPDATE_PLAYER", payload: response.data})
                        setTimeout(() => {
                            navigate("/players")
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
        {isLoading && 
        <ClipLoader
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />}
        {teams && 
        <div className={styles.overlayStyle}>
            <div className={styles.playerEditModal}>
                <button className={styles.closeModalBtn} onClick={() => setIsModalOpen(false)}>X</button>
                <h1 className="modal-title">Edytuj zawodnika</h1>
            <div>
            {isLoading && 
            <ClipLoader
                loading={isLoading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />}
            <div className={styles.playerForm}>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">

                    <div className="input-container">
                        <input 
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        />
                        { isSubmitClicked && <p className="validation-info">{formik.errors.firstName}</p>}
                    </div>

                    <div className="input-container">
                        <input 
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        />
                        { isSubmitClicked && <p className="validation-info">{formik.errors.lastName}</p>}
                    </div>

                    <div className="input-container">
                        <input 
                        type="text"
                        name="yearOfBirth"
                        id="yearOfBirth"
                        placeholder="yearOfBirth"
                        value={formik.values.yearOfBirth}
                        onChange={formik.handleChange}
                        />
                        { isSubmitClicked && <p className="validation-info">{formik.errors.yearOfBirth}</p>}
                    </div>
                
                    <div className="input-container">
                        <input 
                        type="file"
                        name="picture"
                        id="picture"
                        placeholder="picture"
                        accept="image/png"
                        onChange={(e) => formik.setFieldValue("picture", e.target.files[0])}
                        />
                        { isSubmitClicked && <p className="validation-info">{formik.errors.picture}</p>}
                    </div>

                    <div className="input-container">
                        <input
                        type="text"
                        name="career"
                        id="career"
                        placeholder="career"
                        value={formik.values.career}
                        onChange={formik.handleChange}
                        />
                        { isSubmitClicked && <p className="validation-info">{formik.errors.career}</p>}
                    </div>

                    <div className="input-container">
                        <select
                        name="teamName"
                        id="teamName"
                        value={formik.values.teamName}
                        onChange={formik.handleChange}
                        >
                            <option value="">Select team</option>
                            {teams.teams.map(team => (
                                <option key={team._id} value={team.name}>{team.name}</option>
                            ))}
                        </select>
                        { isSubmitClicked && <p className="validation-info">{formik.errors.teamName}</p>}
                    </div>

                    {isSubmitClicked && <button className="clear-inputs-btn" type="button" onClick={() => {formik.handleReset(); setIsSubmitClicked(false)}}>Clear</button>}
                    <button className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} >Submit</button>
                    {isEdited && <p className="validation-info">Edytowano zawodnika</p>}
                </form>
            </div>
            <div className={styles.removeBtn}>
                <img src="https://wbl.klebiedzinski.pl/photos/icons/remove-icon.png" alt="" onClick={() => setDeleteConfirmation(!deleteConfirmation)} />
            </div>
            { deleteConfirmation && 
            <div className={styles.deleteConfirmation}>
                <h2>Czy na pewno chcesz usunąć zawodnika?</h2>
                <div className={styles.deleteConfirmationBtns}>
                    <button className="submit-btn" onClick={() => deletePlayer()}>Tak</button>
                    <button className="clear-inputs-btn" onClick={() => setDeleteConfirmation(!deleteConfirmation)}>Nie</button>
                </div>
            </div> }
            { isDeleted && 
            <div className={styles.deleteConfirmation}>
                <h2>Zawodnik został usunięty</h2>
            </div> }
        </div>
        </div>
        </div>}
    </>
     );
    }
 
export default PlayerEditFormModal;