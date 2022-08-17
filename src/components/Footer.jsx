import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    backgroundColor: "#1736C0",
    height: "100px",
    color: "#bbb",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: 'space-between',
    padding: '10px 200px'
  },
  footerItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <span className="glyphicon glyphicon-home"></span>
        <strong>Trường Đại học Văn Lang </strong>

        <div>Phòng Tuyển sinh và Truyền thông</div>
        <div>
          Cơ sở chính: 69/68 Đặng Thùy Trâm, P. 13, Q. Bình Thạnh, Tp.HCM
        </div>
        <div>Cơ sở 1: 45 Nguyễn Khắc Nhu, P. Cô Giang, Quận 1, Tp.HCM</div>
      </div>

      <div className={classes.footerItem}>
        <div>
          Website:{" "}
          <a href="#" style={{ textDecoration: "none", color: "#5b9bd1" }}>
            tuyensinh.vanlanguni.edu.vn{" "}
          </a>{" "}
        </div>
        <div>Hotline: (028) 7105 9999</div>
        <div>Zalo: 0904214254 (Trường Đại học Văn Lang)</div>
        <div>Email : tuyensinh@vanlanguni.edu.vn</div>
      </div>
    </div>
  );
};

export default Footer;
