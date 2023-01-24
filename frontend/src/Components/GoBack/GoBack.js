import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styles from "./GoBack.module.scss";

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.goBack}>
      <AiOutlineArrowLeft onClick={() => navigate(-1)} />
    </div>
  );
};

export default GoBack;
