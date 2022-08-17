import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Container } from "reactstrap";
import { GetPhase } from "../../services/admissionService";

const useStyles = createUseStyles({
  container: {
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "500px",
  },
  top: {
    fontSize: "25px",
    color: "red",
    fontWeight: "bold",
    paddingTop: "20px",
  },
  middle: {
    fontSize: "18px",
    padding: "10px",
  },
  code: {
    fontWeight: "bold",
  },
  bottom: {
    fontSize: "25px",
    color: "#3598dc",
    fontWeight: "bold",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
});

const AdmissionNotification = (props) => {
  const classes = useStyles();
  const [phase, setPhase] = useState({
    namXetTuyen: "",
    khoa: "",
    thuTuDot: "",
  });

  useEffect(() => {
    GetPhase()
      .then((response) => {
        setPhase(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        Chúc mừng! Bạn đã đăng ký xét tuyển thành công.
      </div>
      <div className={classes.middle}>
        Mã hồ sơ của bạn là:{" "}
        <span className={classes.code}>{props.admissionCode}</span>
      </div>
      <div className={classes.middle}>
        Nhà Trường đã gửi thông báo đến email (bạn đã đăng ký). Hãy kiểm tra
        email để nắm thông tin và làm theo hướng dẫn nhé.
      </div>
      <div className={classes.bottom}>
        Chúc bạn đạt kết quả như ý và gia nhập thế hệ sinh viên khóa{" "}
        {phase.khoa} của Văn Lang!
      </div>
    </div>
  );
};

export default AdmissionNotification;
