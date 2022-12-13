import { useFormik } from "formik";
import { useState } from "react";
import { Team,Player } from "../Data";
import player from "../Data/player.jpg"
import { useParams } from "react-router-dom";
import * as Yup from 'yup'

const PlayerForm = ({setTeams, teams}) => {
    const {name} = useParams();
    const targetTeam = teams.find(el => el.name===name)
    console.log(targetTeam)
    const [isSubmitClicked, setIsSubmitClicked] = useState(false)
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            age: 0,
            image: player
            
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(10, "Your name is too long")
                .required("Please fill in this field"),
            lastName: Yup.string()
                .max(20, "Your name is too long")
                .required("Please fill in this field"),
            age: Yup.number()
                .required("Please fill in this field")
                .integer()
                .moreThan(0)
        }),
        onSubmit: (values) => {
            window.alert("Dodano!")
            setIsSubmitClicked(false)
            const newPlayer = new Player({
                firstName: values.firstName,
                lastName: values.lastName,
                age: values.age,
                src: values.image
            })
            const updatedPlayersList = [...targetTeam.players, newPlayer]
            const newTeams = teams.map(team => {
                if (team.id === targetTeam.id) return new Team({
                    name: targetTeam.name,
                    id: targetTeam.id,
                    src: targetTeam.image.src,
                    players: updatedPlayersList
                })
                return team
            })
            setTeams(newTeams)

        }
    })
    return ( 
        <div className="PlayerForm">
            <form onSubmit={formik.handleSubmit}>
                <div className="input-container">
                    <input 
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="firstName"
                    value={formik.values.name}
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
                    type="age"
                    name="age"
                    id="age"
                    placeholder="age"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && <p className="validation-info">{formik.errors.age}</p>}
                </div>
                
                <div className="input-container">
                    <input 
                    type="text"
                    name="image"
                    id="image"
                    placeholder="Image"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    />
                    { isSubmitClicked && <p className="validation-info">{formik.errors.image}</p>}
                </div>

                {isSubmitClicked && <button className="clear-inputs-btn" type="button" onClick={() => {formik.handleReset(); setIsSubmitClicked(false)}}>Clear</button>}
                <button className="submit-btn" type="submit"onClick={() => setIsSubmitClicked(true)} >Submit</button>
            </form>
        </div>
     );
}
 
export default PlayerForm;