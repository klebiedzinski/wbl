import { useFormik } from 'formik';
import { useState } from 'react';
import axiosInstance from '../../../config/axios_config';
import ClipLoader from 'react-spinners/ClipLoader';
import useFetch from '../../../hooks/useFetch';
import styles from './PlayerForm.module.scss';
import * as Yup from 'yup';
import { usePlayersContext } from '../../../hooks/contexts/usePlayersContext';
import { useAuthContext } from '../../../hooks/contexts/useAuthContext';
import { useNavigate } from 'react-router-dom';
const PlayerForm = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const { data: teamsData, isLoading } = useFetch('/teams');
    const teams = teamsData ? teamsData.teams : null;

    const { dispatch } = usePlayersContext();

    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: 'test',
            lastName: 'test',
            picture: '',
            yearOfBirth: '2002',
            career: [],
            teamName: '',
        },

        validationSchema: Yup.object({
            firstName: Yup.string()
                .trim()
                .max(10, 'Your name is too long')
                .required('Uzupełnij to pole'),
            lastName: Yup.string()
                .trim()
                .max(20, 'Za długie nazwisko (max 20 znaków)')
                .required('Uzupełnij to pole'),
            picture: Yup.string(),
            yearOfBirth: Yup.string().required('Uzupełnij to pole'),

            career: Yup.array(),

            teamName: Yup.string().required('Uzupełnij to pole'),
        }),

        onSubmit: (values) => {
            setIsSubmitClicked(false);
            if (!user) {
                return;
            }
            const team_id = teams.find(
                (team) => team.name === values.teamName
            )._id;
            axiosInstance
                .post(
                    '/players',
                    {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        picture: values.picture,
                        yearOfBirth: values.yearOfBirth,
                        career: values.career,
                        team_id: team_id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                .then((response) => {
                    if (response.status === 200) {
                        setIsAdded(true);
                        dispatch({
                            type: 'ADD_PLAYER',
                            payload: response.data.player,
                        });
                        setTimeout(() => {
                            navigate('/players');
                        }, 1000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    });
    return (
        <>
            {isLoading && (
                <ClipLoader
                    loading={isLoading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            )}
            {teams && (
                <div className={styles.playerForm}>
                    <form
                        onSubmit={formik.handleSubmit}
                        encType="multipart/form-data"
                    >
                        <div className="input-container">
                            <label for="firstName">Imię</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                            />
                            {isSubmitClicked && (
                                <p className="validation-info">
                                    {formik.errors.firstName}
                                </p>
                            )}
                        </div>

                        <div className="input-container">
                            <label for="lastName">Nazwisko</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                            />
                            {isSubmitClicked && (
                                <p className="validation-info">
                                    {formik.errors.lastName}
                                </p>
                            )}
                        </div>

                        <div className="input-container">
                            <label for="yearOfBirth">Rok urodzenia</label>
                            <input
                                type="text"
                                name="yearOfBirth"
                                id="yearOfBirth"
                                placeholder="yearOfBirth"
                                value={formik.values.yearOfBirth}
                                onChange={formik.handleChange}
                            />
                            {isSubmitClicked && (
                                <p className="validation-info">
                                    {formik.errors.yearOfBirth}
                                </p>
                            )}
                        </div>

                        <div className="input-container">
                            <label for="picture">Zdjęcie w formacie .png</label>
                            <input
                                type="file"
                                id="picture"
                                placeholder="picture"
                                accept="image/png"
                                onChange={(e) =>
                                    formik.setFieldValue(
                                        'picture',
                                        e.target.files[0]
                                    )
                                }
                            />
                            {isSubmitClicked && (
                                <p className="validation-info">
                                    {formik.errors.picture}
                                </p>
                            )}
                        </div>

                        <div className="input-container">
                            <label for="teamName">Drużyna</label>
                            <select
                                name="teamName"
                                id="teamName"
                                value={formik.values.teamName}
                                onChange={formik.handleChange}
                            >
                                <option value="">Select team</option>
                                {teams.map((team) => (
                                    <option key={team._id} value={team.name}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                            {isSubmitClicked && (
                                <p className="validation-info">
                                    {formik.errors.teamName}
                                </p>
                            )}
                        </div>

                        {isSubmitClicked && (
                            <button
                                className="clear-inputs-btn"
                                type="button"
                                onClick={() => {
                                    formik.handleReset();
                                    setIsSubmitClicked(false);
                                }}
                            >
                                Clear
                            </button>
                        )}
                        <button
                            className="submit-btn"
                            type="submit"
                            onClick={() => setIsSubmitClicked(true)}
                        >
                            Submit
                        </button>
                        {isAdded && (
                            <p className="validation-info">Dodano zawodnika</p>
                        )}
                    </form>
                </div>
            )}
        </>
    );
};

export default PlayerForm;
