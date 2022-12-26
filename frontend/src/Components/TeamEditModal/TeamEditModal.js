import { useFormik } from "formik";
import { useState } from "react";
import axiosInstance from "../../config/axios_config";
import * as Yup from 'yup'
import styles from "./TeamEditModal.module.scss"

const TeamEditModal = ({setIsModalOpen, team, isModalOpen, id}) => {

    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const deleteTeam = () => {
        axiosInstance.delete('/teams/' + id)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const [isSubmitClicked, setIsSubmitClicked] = useState(false)
    const [isEdited, setIsEdited] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: team.team.name,
            link: team.team.logo,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Podaj nazwę drużyny"),
            link: Yup.string()
                .required("Podaj link do logo, zaczynając od https://wbl.klebiedzinski.pl/photos/")
            
        }),
        onSubmit: (values) => {
            setIsSubmitClicked(false)
            axiosInstance.patch(`/teams/${team.team._id}`, {
                name: values.name,
                logo: values.link,
            })
            .then((response) => {
                if (response.status === 200) {
                    setIsEdited(true)
                    console.log("Dodano drużynę")
                }
                
            }
            )
            .catch((error) => {
                console.log(error)
            }
            )
            
        }
    })
    return ( 
        <div className={styles.overlayStyle}>
        <div className={styles.teamEditModal}>

            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>X</button>

            <h1 className="modal-title">Edytuj drużynę</h1>

            <div className="TeamForm">
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
                        { isSubmitClicked && <p className="validation-info">{formik.errors.name}</p>}
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
                        { isSubmitClicked && <p className="validation-info">{formik.errors.link}</p>}
                    </div>

                    {isSubmitClicked && <button className="clear-inputs-btn" type="button" onClick={() => {formik.handleReset(); setIsSubmitClicked(false)}}>Clear</button>}
                    <button className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} >Submit</button>
                    {isEdited && <h2 className="validation-info">Edytowano drużynę</h2>}
                </form>
            </div>
            <div className={styles.removeBtn}>
                <img src="https://wbl.klebiedzinski.pl/photos/icons/remove-icon.png" alt="" onClick={() => setDeleteConfirmation(!deleteConfirmation)} />
            </div>
            { deleteConfirmation && <div className={styles.deleteConfirmation}>
                <h2>Czy na pewno chcesz usunąć drużynę?</h2>
                <div className={styles.deleteConfirmationBtns}>
                    <button className="submit-btn" onClick={() => deleteTeam()}>Tak</button>
                    <button className="clear-inputs-btn" onClick={() => setDeleteConfirmation(!deleteConfirmation)}>Nie</button>
                </div>
            </div> }
            
        </div>
        </div>
     );
    }
 
export default TeamEditModal;