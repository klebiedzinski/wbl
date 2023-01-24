import React, { useEffect, useState } from "react";
import styles from "../Games.module.scss";
import axiosInstance from "../../../config/axios_config";
import { AiOutlineFilter } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setGamesReducer } from "../../../features/games/gamesSlice";
const GamesFiltersBar = () => {
  const dispatch = useDispatch();

  //filters state
  const [startDate, setStartDate] = useState("2022-06-01");
  const [endDate, setEndDate] = useState("2023-12-31");
  const [scheduled, setScheduled] = useState(true);
  const [finished, setFinished] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleFilter = () => {
    dispatch({ type: "SET_GAMES", payload: [] });
    const status =
      scheduled && finished
        ? "wszystkie"
        : scheduled
        ? "scheduled"
        : "finished";
    axiosInstance
      .get(
        `/games/filter/?page=${page}&limit=${limit}&from=${startDate}&to=${endDate}&status=${status}`
      )
      .then((res) => {
        dispatch(setGamesReducer(res.data.games));
      })
      .catch((err) => console.log(err));
  };

  const handleClearFilters = () => {
    setStartDate("2022-06-01");
    setEndDate("2023-12-31");
    setScheduled(true);
    setFinished(true);
    setPage(1);
    handleFilter();
  };

  useEffect(() => {
    dispatch(setGamesReducer([]));
    const status =
      scheduled && finished
        ? "wszystkie"
        : scheduled
        ? "scheduled"
        : "finished";
    axiosInstance
      .get(
        `/games/filter/?page=${page}&limit=${limit}&from=${startDate}&to=${endDate}&status=${status}`
      )
      .then((res) => {
        dispatch(setGamesReducer(res.data.games));
      })
      .catch((err) => console.log(err));
  }, [page, limit]);

  return (
    <div className={styles.GamesFiltersBar}>
      <div className={styles.pagination}>
        <button
          className={styles.paginationBtn}
          onClick={page === 1 ? null : () => setPage(page - 1)}
        >
          Prev
        </button>
        <button
          className={styles.paginationBtn}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <div className={filtersOpen ? styles.filtersActive : styles.filters}>
        <div className={styles.filterContainer}>
          <div className={styles.dateRange}>
            <div className={styles.dateContainer}>
              <label>Od:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className={styles.dateContainer}>
              <label>Do:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.statusChecks}>
            <div className={styles.statusLabel}>Status:</div>
            <div>
              <label>Nadchodzące</label>
              <input
                type="checkbox"
                checked={scheduled}
                onChange={() => setScheduled(!scheduled)}
              />
            </div>
            <div>
              <label>Zakończone</label>
              <input
                type="checkbox"
                checked={finished}
                onChange={() => setFinished(!finished)}
              />
            </div>
          </div>
        </div>
        <div className={styles.filterButtons}>
          <button onClick={handleFilter}>Filter</button>
          <button onClick={handleClearFilters}>Clear</button>
        </div>
      </div>
      <div className={styles.filtersBar}>
        <button onClick={() => setFiltersOpen(!filtersOpen)}>
          <AiOutlineFilter />
        </button>
      </div>
    </div>
  );
};

export default GamesFiltersBar;
