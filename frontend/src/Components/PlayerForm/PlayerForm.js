import { useFormik } from "formik";
import { useState } from "react";
import axiosInstance from "../../config/axios_config";
import ClipLoader from "react-spinners/ClipLoader";
import useFetch from "../../hooks/useFetch";
import styles from "./PlayerForm.module.scss";
import * as Yup from 'yup'

const PlayerForm = () => {
    
    const { data: teams, isLoading, error} = useFetch('/teams')

    const [isSubmitClicked, setIsSubmitClicked] = useState(false)
    const [isAdded, setIsAdded] = useState(false)

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            picture: "https://wbl.klebiedzinski.pl/photos/sample_pictures/player.png",
            yearOfBirth: "",
            career: [],
            teamName: "",
        },

        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(10, "Your name is too long")
                .required("Please fill in this field"),
            lastName: Yup.string()
                .max(20, "Your name is too long")
                .required("Please fill in this field"),
            picture: Yup.string(),

            yearOfBirth: Yup.string()
                .required("Please fill in this field"),

            career: Yup.array(),

            teamName: Yup.string()
                .required("Please fill in this field"),
        }),

        onSubmit: (values) => {
            setIsSubmitClicked(false)
            axiosInstance.post('/players', {
                firstName: values.firstName,
                lastName: values.lastName,
                picture: values.picture,
                yearOfBirth: values.yearOfBirth,
                career: values.career,
                teamName: values.teamName,
            })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    setIsAdded(true)
                }
                
            })
            .catch((error) => {
                console.log(error)
            })
        }
    })
    return ( 
        <>
        {isLoading && <ClipLoader
                    loading={isLoading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />}
        {teams && 
        <div className={styles.playerForm}>
            <form onSubmit={formik.handleSubmit}>

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
                    value={formik.values.name}
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
                    type="text"
                    name="picture"
                    id="picture"
                    placeholder="picture"
                    value={formik.values.picture}
                    onChange={formik.handleChange}
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

                {isSubmitClicked && 
                <button className="clear-inputs-btn" type="button" onClick={() => {formik.handleReset(); setIsSubmitClicked(false)}}>Clear</button>
                }
                <button className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} >Submit</button>
                {isAdded && 
                <p className="validation-info">Dodano zawodnika</p>
                }
            </form>
        </div>}
        </>
     );
}
 
export default PlayerForm;