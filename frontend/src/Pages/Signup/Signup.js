import { FieldArray, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import styles from "./Signup.module.scss";
import { useSignup } from "../../hooks/auth/useSignup";
import ClipLoader from "react-spinners/ClipLoader";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import axiosInstance from "../../config/axios_config";
import { usePlayersContext } from "../../hooks/contexts/usePlayersContext";
import { useEffect } from "react";
const Signup = () => {
  const { players, dispatch } = usePlayersContext();
  const {
    data: teamsData,
    isLoading: teamsLoading,
    error: teamsError,
  } = useFetch("/teams");
  const {
    data: playersData,
    isLoading: playersLoading,
    error: playersError,
  } = useFetch("/players");
  const teams = teamsData?.teams;
  const { signup, error, isLoading, isCompleted } = useSignup();
  useEffect(() => {
    if (playersData) {
      dispatch({ type: "SET_PLAYERS", payload: playersData.players });
    }
  }, [playersData]);

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isSignedup, setIsSignedUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    if (players) {
      if (!searchTerm) {
        dispatch({ type: "SET_PLAYERS", payload: playersData.players });
      } else {
        const filteredPlayers = playersData.players.filter(
          (player) =>
            player.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        dispatch({ type: "SET_PLAYERS", payload: filteredPlayers });
      }
    }
  }, [searchTerm]);

  useEffect(() => {
    if (playersData) {
      dispatch({ type: "SET_PLAYERS", payload: playersData.players });
    }
  }, [playersData]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      auth_players: [],
      auth_teams: [],
      stolik: false,
      admin: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("Podaj imię")
        .max(10, "Imię nie może być dłuższe niż 10 znaków")
        .matches(
          /^[a-zA-ZĄĆŁĘÓŚŻŹąćłęóśżź]+$/,
          "Imię może zawierać tylko litery"
        ),

      lastName: Yup.string()
        .required("Podaj nazwisko")
        .matches(/^[a-zA-ZZĄĆŁĘÓŚŻŹ]+$/, "Nazwisko może zawierać tylko litery"),

      email: Yup.string()
        .required("Podaj email")
        .email("Nieprawidłowy adres email"),

      password: Yup.string()
        .required("Podaj hasło")
        .min(6, "Hasło musi mieć przynajmniej 6 znaków")
        .matches(
          /(?=.*[A-Z])/,
          "Hasło musi zawierać co najmniej jedną dużą literę"
        )
        .matches(/(?=.*[0-9])/, "Hasło musi zawierać co najmniej jedną cyfrę")
        .matches(confirmPassword, "Hasła nie są takie same"),
      auth_players: Yup.array().required("Podaj graczy"),
      auth_teams: Yup.array().required("Podaj drużyny"),
      stolik: Yup.boolean(),
      admin: Yup.boolean(),
    }),

    onSubmit: async (values) => {
      setIsSubmitClicked(false);
      await signup(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        values.auth_teams,
        values.auth_players,
        values.stolik,
        values.admin
      );
    },
  });
  return (
    <>
      {(!teams || !players) && (
        <ClipLoader
          color="#ffffff"
          loading={[teamsLoading, playersLoading]}
          size={150}
        />
      )}
      {teams && players && (
        <div className={styles.Signup}>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.inputContainer}>
              <label htmlFor="firstName">Imię</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              {isSubmitClicked && (
                <p className={styles.validationInfo}>
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="lastName">Nazwisko</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              {isSubmitClicked && (
                <p className={styles.validationInfo}>
                  {formik.errors.lastName}
                </p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {isSubmitClicked && (
                <p className={styles.validationInfo}>{formik.errors.email}</p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {isSubmitClicked && (
                <p className={styles.validationInfo}>
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className={styles.inputContainer}>
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

            <div className={styles.inputContainer_2}>
              <div className={styles.inputContainer}>
                <label>Wybierz drużyny którymi chcesz zarządzać</label>
                <ul className={styles.listItems}>
                  {teams.map((team) => (
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
                {isSubmitClicked && (
                  <p className={styles.validationInfo}>
                    {formik.errors.auth_teams}
                  </p>
                )}
              </div>

              <div className={styles.inputContainer}>
                <label>Wybierz graczy którymi chcesz zarządzać</label>
                <input
                  type="text"
                  name="search"
                  id="search"
                  autoComplete="off"
                  placeholder="Wyszukaj gracza"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <ul className={styles.listItems}>
                  {players.map((player) => (
                    <li key={player._id}>
                      <input
                        type="checkbox"
                        checked={formik.values.auth_players.includes(
                          player._id
                        )}
                        name="auth_players"
                        id={player._id}
                        value={player._id}
                        onChange={formik.handleChange}
                      />
                      {player.firstName + " " + player.lastName}
                    </li>
                  ))}
                </ul>
                {isSubmitClicked && (
                  <p className={styles.validationInfo}>
                    {formik.errors.auth_players}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label>Czy będziesz na stoliku?</label>
              <input
                type="checkbox"
                name="stolik"
                id="stolik"
                placeholder="czy będziesz na stoliku?"
                value={formik.values.stolik}
                onChange={formik.handleChange}
              />
              {isSubmitClicked && (
                <p className={styles.validationInfo}>{formik.errors.stolik}</p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label>Włodarz?</label>
              <input
                type="checkbox"
                name="admin"
                id="admin"
                placeholder="Włodarz?"
                value={formik.values.admin}
                onChange={formik.handleChange}
              />
              {isSubmitClicked && (
                <p className={styles.validationInfo}>{formik.errors.admin}</p>
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
            {isCompleted ? (
              <div className={styles.success}>
                <p>Zarejestrowano, co dalej?</p>
                <li>
                  <ul>
                    1. Wysłaliśmy Ci maila potwierdzającego, w celu weryfikacji
                    konta. Potwierdź go
                  </ul>
                  <ul>2. Poczekaj na admina aż zatwierdzi zaznaczone role.</ul>
                </li>
              </div>
            ) : (
              <button
                disabled={isLoading}
                className="submit-btn"
                type="submit"
                onClick={() => setIsSubmitClicked(true)}
              >
                Sign up
              </button>
            )}
            {isLoading && <ClipLoader />}
            {error && <p className={styles.Error}>{error}</p>}
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
