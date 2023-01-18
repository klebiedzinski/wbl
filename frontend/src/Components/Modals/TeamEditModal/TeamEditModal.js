import { useFormik } from "formik";
import { useState } from "react";
import axiosInstance from "../../../config/axios_config";
import * as Yup from 'yup'
import styles from "./TeamEditModal.module.scss"
import {useTeamsContext} from "../../../hooks/contexts/useTeamsContext";
import { useAuthContext } from "../../../hooks/contexts/useAuthContext";
import { useNavigate } from "react-router-dom";
import isUploadSupported from "../../../config/uploadSupported";
const TeamEditModal = ({team, setIsModalOpen,id}) => {

    const navigate = useNavigate();
    const {user} = useAuthContext();
    const {dispatch} = useTeamsContext();

    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isSubmitClicked, setIsSubmitClicked] = useState(false)
    const [isEdited, setIsEdited] = useState(false)

    const deleteTeam = () => {
        axiosInstance.delete('/teams/' + id, {headers: {'Authorization': `Bearer ${user.token}`}})
        .then(res => {
            if (res.status === 200) {
                dispatch({type: "DELETE_TEAM", payload: id})
                setIsDeleted(true);
                setTimeout(() => {
                    window.location.replace("/teams")
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
            name: team.name,
            link: team.logo,
            teamPicture: team.teamPicture
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Podaj nazwę drużyny"),
            link: Yup.string()
                .required("Podaj link do logo, zaczynając od https://wbl.klebiedzinski.pl/photos/teams_pictures"),
            teamPicture: Yup.string()
        }),
        onSubmit: (values) => {
            setIsSubmitClicked(false)
            axiosInstance.patch(`/teams/${team._id}`, {
                name: values.name,
                logo: values.link,
                teamPicture: values.teamPicture
            }, {headers: {
                'Authorization': `Bearer ${user.token}`,
                "Content-Type": "multipart/form-data"
            }}
                    )
            .then((response) => {
                if (response.status === 200) {
                    dispatch({type: "UPDATE_TEAM", payload: {_id: team._id, name: values.name, logo: values.link}})
                    setIsEdited(true)
                    setTimeout(() => {
                        setIsModalOpen(false)
                        // refresh page
                    }, 1000)
                }
                
            })
            .catch((error) => {
                console.log(error)
            })
        }
    })
    return ( 
        <>
        {team && 
        <div className={styles.overlayStyle}>
            <div className={styles.teamEditModal}>
            <button className={styles.closeModalBtn} onClick={() => setIsModalOpen(false)}>X</button>
            <h1 className="modal-title">Edytuj drużynę</h1>
            <div className="TeamForm">

                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">

                    <div className="input-container">
                        <label htmlFor="name">Nazwa drużyny</label>
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
                    <label htmlFor="logo">Podaj link do loga</label>
                        <input 
                        type="text"
                        name="link"
                        id="link"
                        placeholder="link"
                        value={formik.values.link}
                        onChange={formik.handleChange}
                        />
                        { isSubmitClicked && <p className="validation-info">{formik.errors.link}</p>}
                    </div>

                    <div className="input-container">
                        <label htmlFor="teamPicture">Zmień zdjęcie drużyny</label>
                        <input 
                        type="file"
                        name="teamPicture"
                        id="teamPicture"
                        accept="image/png"
                        placeholder="teamPicture"
                        onChange={(e) => formik.setFieldValue("teamPicture", e.target.files[0])}
                        />
                        { isSubmitClicked && <p className="validation-info">{formik.errors.teamPicture}</p>}
                    </div>

                    {isSubmitClicked && <button className="clear-inputs-btn" type="button" onClick={() => {formik.handleReset(); setIsSubmitClicked(false)}}>Clear</button>}
                    <button className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} >Submit</button>
                    {isEdited && <h2 className="validation-info">Edytowano drużynę</h2>}
                </form>
            </div>
            <div className={styles.removeBtn}>
                <img src="https://wbl.klebiedzinski.pl/photos/icons/remove-icon.png" alt="" onClick={() => setDeleteConfirmation(!deleteConfirmation)} />
            </div>
            { deleteConfirmation && 
            <div className={styles.deleteConfirmation}>
                <h2>Czy na pewno chcesz usunąć drużynę?</h2>
                <h2>Wraz z nią usuną się wszyscy zawodnicy jak i mecze tej drużyny, cała tabela sie zmieni</h2>
                <div className={styles.deleteConfirmationBtns}>
                    <button className="submit-btn" onClick={() => deleteTeam()}>Tak</button>
                    <button className="clear-inputs-btn" onClick={() => setDeleteConfirmation(!deleteConfirmation)}>Nie</button>
                </div>
            </div> 
            }
            { isDeleted && 
            <div className={styles.deleteConfirmation}>
                <h2>Drużyna została usunięta</h2>
            </div> 
            }
        </div>
        </div>
        }
        </>
     );
    }
 
export default TeamEditModal;