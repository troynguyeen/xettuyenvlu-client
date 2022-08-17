import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import {
  Container,
  Form,
  Button,
  FormGroup,
  Input,
  Label,
  Col,
  Row,
  Collapse,
} from "reactstrap";
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const useStyles = createUseStyles({
  container: {
    padding: "2 20px",
    paddingLeft: "50px",
    backgroundColor: "white",
    maxWidth: "100%",
    minHeight: "680px",
  },

  wrapper: {
    maxWidth: "100%",
  },

  tableTitle: {
    color: "#c61d23",
    fontSize: "24px",
    fontWeight: "bold",
    paddingBottom: "5px",
  },
  subTitle: {
    color: "#2F39B1",
    fontSize: "18px",
    fontWeight: "bold",
  },
  containerForm: {
    backgroundColor: "#FFF",
    marginBottom: "50px",
    padding: "10px 20px",
  },
  section: {
    fontSize: "17px",
    backgroundColor: "red",
    color: "#FFF",
    padding: "0 15px",
    marginTop: "10px",
  },
  subSection: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#097fd9",
    padding: "5px 0",
  },
  line: {
    border: 0,
    borderTop: "1px solid #9e8787",
    margin: "10px 0",
    marginBottom: "30px",
  },
  label: {
    textAlign: "right",
    fontSize: "15px",
  },
  fieldInput: {
    fontSize: "15px",
  },
  require: {
    color: "red",
    paddingLeft: "5px",
  },
  labelRadio: {
    fontSize: "15px",
    marginLeft: "5px",
    marginRight: "20px",
    marginBottom: 0,
  },

  labelSmall: {
    fontSize: "14px",
    fontWeight: "500",
  },

  redText: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "red",
  },

  boldText: {
    fontSize: "13px",
    fontWeight: "bold",
  },

  smallText: {
    fontSize: "13px",
  },

  table: {
    textAlign: "left",
    borderColor: "#bfbfbf",
    border: "1px solid",
    margin: "10px 0",
  },

  button: {
    padding: "7px 20px",
    border: 0,
    backgroundColor: "#26a69a",
    "&:hover": {
      backgroundColor: "#1f897f",
    },
  },

  tableTitle: {
    textAlign: "center",
    width: "20%",
    borderColor: "#bfbfbf",
    minWidth: "100px",
    border: "1px solid",
  },

  tableCenter: {
    textAlign: "center",
    borderColor: "#bfbfbf",
    minWidth: "100px",
    border: "1px solid",
    fontSize: "13px",
  },

  buttonContainer: {
    textAlign: "center",
  },

  button1: {
    margin: "5px",
    backgroundColor: "#26a69a",
    "&:hover": {
      backgroundColor: "#1f897f",
    },
  },

  button2: {
    margin: "5px",
    backgroundColor: "#d4a304",
    "&:hover": {
      backgroundColor: "#997603",
    },
  },

  button3: {
    margin: "5px",
    backgroundColor: "#3394f5",
    "&:hover": {
      backgroundColor: "#2877c7",
    },
  },
});

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const location = useLocation();
  const [showTableOption1, setShowTableOption1] = React.useState(false);
  const [showTableOption2, setShowTableOption2] = React.useState(false);

  const ShowTableOption1 = () => (
    <table className={classes.table}>
      <tbody>
        <tr>
          <th className={classes.tableTitle}>MÔN HỌC</th>
          <th className={classes.tableCenter}>TOÁN</th>
          <th className={classes.tableCenter}>VĂN</th>
          <th className={classes.tableCenter}>ANH</th>
          <th className={classes.tableCenter}>PHÁP</th>
          <th className={classes.tableCenter}>LÝ</th>
          <th className={classes.tableCenter}>HÓA</th>
          <th className={classes.tableCenter}>SINH</th>
          <th className={classes.tableCenter}>SỬ</th>
          <th className={classes.tableCenter}>ĐỊA</th>
          <th className={classes.tableCenter}>GDCD</th>
        </tr>
        <tr>
          <td
            className={classes.boldText}
            style={{ border: "1px solid", borderColor: "#bfbfbf" }}
          >
            Điểm TB năm học lớp 11
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam11Toan}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam11Van}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam11Anh}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam11Phap}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam11Ly}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam11Hoa}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam11Sinh}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam11Su}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam11Dia}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam11Gdcd}
          </td>
        </tr>
        <tr>
          <td
            className={classes.boldText}
            style={{ border: "1px solid", borderColor: "#bfbfbf" }}
          >
            Điểm TB HK1 lớp 12
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemHK1Lop12Toan}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemHK1Lop12Van}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemHK1Lop12Anh}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemHK1Lop12Phap}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemHK1Lop12Ly}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemHK1Lop12Hoa}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemHK1Lop12Sinh}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemHK1Lop12Su}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemHK1Lop12Dia}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemHK1Lop12Gdcd}
          </td>
        </tr>
      </tbody>
    </table>
  );

  const ShowTableOption2 = () => (
    <table className={classes.table}>
      <tbody>
        <tr>
          <th className={classes.tableTitle}>MÔN HỌC</th>
          <th className={classes.tableCenter}>TOÁN</th>
          <th className={classes.tableCenter}>VĂN</th>
          <th className={classes.tableCenter}>ANH</th>
          <th className={classes.tableCenter}>PHÁP</th>
          <th className={classes.tableCenter}>LÝ</th>
          <th className={classes.tableCenter}>HÓA</th>
          <th className={classes.tableCenter}>SINH</th>
          <th className={classes.tableCenter}>SỬ</th>
          <th className={classes.tableCenter}>ĐỊA</th>
          <th className={classes.tableCenter}>GDCD</th>
        </tr>
        <tr>
          <td
            className={classes.boldText}
            style={{ border: "1px solid", borderColor: "#bfbfbf" }}
          >
            Điểm TB năm học lớp 12
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam12Toan}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam12Van}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam12Anh}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam12Phap}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam12Ly}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam12Hoa}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam12Sinh}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam12Su}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam12Dia}
          </td>
          <td className={classes.tableCenter}>
            {location.state.diemCaNam12Gdcd}
          </td>
        </tr>
      </tbody>
    </table>
  );

  useEffect(() => {
    if (location.state.diemCaNam11Toan != null) {
      setShowTableOption1(true);
      setShowTableOption2(false);
    } else {
      setShowTableOption1(false);
      setShowTableOption2(true);
    }
  }, []);

  return (
    <Container className={classes.container}>
      <div className={classes.container} ref={ref}>
        <div className={classes.wrapper}>
          <br></br>

          <Row>
            <Col>
              <Link to="/">
                <img src={logo} />
              </Link>
            </Col>
            <Col></Col>
            <Col>
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </p>
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Độc Lập - Tự Do - Hạnh Phúc
              </p>
            </Col>
          </Row>
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "22px",
              color: "red",
            }}
          >
            ĐĂNG KÝ XÉT TUYỂN 2022 - ĐỢT 1
          </p>
          <p style={{ textAlign: "center", fontSize: "15px" }}>
            (Dành cho thí sinh xét kết quả học bạ THPT)
          </p>
          <Row>
            <Col>
              <div className={classes.subSection}>THÔNG TIN THÍ SINH</div>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col>
              <span className={classes.smallText}>MÃ HỒ SƠ: </span>
              <span className={classes.redText}>DVL_{location.state.id}</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>1. Họ tên thí sinh:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {location.state.hoVaTen}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>Giới tính: </span>
              <span className={classes.smallText}>
                {location.state.gioiTinh}
              </span>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>2. Ngày tháng năm sinh:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {location.state.ngaySinh}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>3. Nơi sinh: </span>
              <span className={classes.smallText}>
                {location.state.tenNoiSinh}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>4. Dân tộc: </span>
              <span className={classes.smallText}>
                {location.state.tenDanToc}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>5. Tôn giáo: </span>
              <span className={classes.smallText}>
                {location.state.tenTonGiao}
              </span>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>
                6. Số chứng minh dân dân/ Căn cước công dân:
              </span>
            </Col>
            <Col>
              <span className={classes.smallText}>{location.state.cmnd} -</span>
              <span className={classes.boldText}> Quốc tịch: </span>
              <span className={classes.smallText}>
                {location.state.quocTich}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>7. Hộ khẩu thường trú:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {location.state.hoKhauTenQH}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <span className={classes.boldText}>Phường xã: </span>
              <span className={classes.smallText}>
                {location.state.hoKhauTenPhuong}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>Quận/Huyện: </span>
              <span className={classes.smallText}>
                {location.state.hoKhauTenQh}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>Tỉnh/Thành phố: </span>
              <span className={classes.smallText}>
                {location.state.hoKhauTenTinhTp}
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>8. Năm tốt nghiệp THPT:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {location.state.namTotNghiep}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>9. Học lực lớp 12:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {location.state.hocLucLop12}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>10. Hạnh kiểm lớp 12:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {location.state.hanhKiemLop12}
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>
                11. Thí sinh học chương trình:
              </span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {location.state.loaiHinhTn}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>12. Nơi học THPT lớp 12:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {location.state.maTruongThpt} - {location.state.tenTruongThpt} -{" "}
              </span>
              <span className={classes.boldText}>Lớp: </span>
              <span className={classes.smallText}>
                {location.state.tenLop12}
              </span>
            </Col>
            <Col></Col>
            <Col>
              <span className={classes.boldText}>Mã tỉnh: </span>
              <span>{location.state.truongThptTenTinhTp}</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>13. Khu vực:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>{location.state.khuVuc}</span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>14. Đối tượng ưu tiên:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {location.state.doiTuongUuTien}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <p></p>
          <Row>
            <Col>
              <div className={classes.subSection}>THÔNG TIN XÉT TUYỂN</div>
            </Col>
            <Col>
              <span className={classes.boldText}>Phương án xét tuyển: </span>
              <span className={classes.smallText}>{location.state.phuongan}</span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          {showTableOption1 ? <ShowTableOption1 /> : null}
          {showTableOption2 ? <ShowTableOption2 /> : null}
          <Row>
            <Col>
              <span className={classes.boldText}>Chứng chỉ ngoại ngữ:</span>{" "}
              <span className={classes.smallText}>
                (nếu có) {location.state.ccnn}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>
                Ngành đăng ký xét tuyển 1:{" "}
              </span>{" "}
              <span className={classes.smallText}>
                {location.state.tenNganh1}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>Mã ngành: </span>{" "}
              <span className={classes.smallText}>
                {location.state.xet1MaNganh}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>Mã tổ hợp: </span>{" "}
              <span className={classes.smallText}>
                {location.state.xet1MaToHop}
              </span>
            </Col>
          </Row>
          <Row style={{ paddingBottom: "10px" }}>
            <Col>
              <span className={classes.smallText}>
                Chương trình học: {location.state.chuongTrinhHoc1}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>
                Ngành đăng ký xét tuyển 2:{" "}
              </span>{" "}
              <span className={classes.smallText}>
                {location.state.tenNganh2}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>Mã ngành: </span>{" "}
              <span className={classes.smallText}>
                {location.state.xet2MaNganh}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>Mã tổ hợp: </span>{" "}
              <span className={classes.smallText}>
                {location.state.xet2MaToHop}
              </span>
            </Col>
          </Row>
          <Row style={{ paddingBottom: "10px" }}>
            <Col>
              <span className={classes.smallText}>
                Chương trình học: {location.state.chuongTrinhHoc2}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>
                Ngành đăng ký xét tuyển 3:{" "}
              </span>{" "}
              <span className={classes.smallText}>
                {location.state.tenNganh3}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>Mã ngành: </span>{" "}
              <span className={classes.smallText}>
                {location.state.xet3MaNganh}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>Mã tổ hợp: </span>{" "}
              <span className={classes.smallText}>
                {location.state.xet3MaToHop}
              </span>
            </Col>
          </Row>
          <Row style={{ paddingBottom: "10px" }}>
            <Col>
              <span className={classes.smallText}>
                Chương trình học: {location.state.chuongTrinhHoc3}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <p></p>
          <Row>
            <Col>
              <div className={classes.subSection}>THÔNG TIN LIÊN HỆ</div>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col md={1}>
              <span className={classes.boldText}>Địa chỉ liên hệ:</span>
            </Col>
            <Col md={4}>
              <span className={classes.smallText}>
                {location.state.hoKhauTenPhuong}, {location.state.hoKhauTenQH},{" "}
                {location.state.hoKhauTenTinhTp}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col md={1}>
              <span className={classes.boldText}>Điện thoại:</span>
            </Col>
            <Col md={3}>
              <span className={classes.smallText}>
                {location.state.dienThoaiDd} -{" "}
              </span>
              <span className={classes.boldText}>Điện thoại phụ huynh: </span>
              <span className={classes.smallText}>
                {location.state.dienThoaiPhuHuynh}
              </span>
            </Col>
            <Col md={1}>
              <span className={classes.boldText}>Email:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>{location.state.email}</span>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <div style={{ columnSpan: "7" }}>
                <table style={{ borderStyle: "dashed", borderWidth: "1px" }}>
                  <tbody>
                    <tr>
                      <td>
                        <b>Hồ sơ gồm có</b>:
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <ul style={{ listStyleType: "none" }}>
                          <li>
                            <span style={{ fontSize: "1.5em" }}>□</span> Học bạ
                            THPT (bản photocopy công chứng);
                          </li>
                          <li>
                            <span style={{ fontSize: "1.5em" }}>□</span> Bằng
                            tốt nghiệp THPT/Giấy chứng nhận TN tạm thời (bản
                            photocopy công chứng);
                          </li>
                          <li>
                            <span style={{ fontSize: "1.5em" }}>□</span> Điểm
                            thi năng khiếu;
                          </li>
                          <li>
                            <span style={{ fontSize: "1.5em" }}>□</span> Chứng
                            chỉ ngoại ngữ (bản photocopy công chứng);
                          </li>
                          <li>
                            <span style={{ fontSize: "1.5em" }}>□</span>{" "}
                            CMND/CCCD (bản photocopy công chứng);
                          </li>
                          <li>
                            <span style={{ fontSize: "1.5em" }}>□</span> Giấy
                            chứng nhận ưu tiên.
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
            <Col>
              <div style={{ textAlign: "center", paddingLeft: "150px" }}>
                Ngày ....... tháng ....... năm 2022
                <br></br>
                <b>Chữ ký của thí sinh</b>
                <br></br>
                <i>(Ký và ghi rõ họ tên)</i>
                <p></p>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                {location.state.hoVaTen}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
});
