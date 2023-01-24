import GoBack from "../GoBack/GoBack";

const PleaseFlipYourPhone = () => {
  return (
    <>
      <GoBack />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", fontSize: "20px" }}>
          Obróć telefon
        </div>
        <img
          src="mobile-portrait-mode-icon.png"
          alt="portrait mode phone"
          style={{
            marginRight: "1px",
            width: "50px",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </div>
    </>
  );
};

export default PleaseFlipYourPhone;
