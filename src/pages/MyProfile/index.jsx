import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import {
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Col,
  Row,
  Collapse,
} from "reactstrap";
import {
  GetScheduleForEditProfile,
} from "../../services/admissionService";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/CustomInput";
import { GetProfileByCMND, GetBangDiem } from "../../services/profileService";
import moment from "moment";

const useStyles = createUseStyles({
  container: {
    padding: "2 20px",
    paddingLeft: "50px",
    backgroundColor: "white",
    maxWidth: "95%",
    minHeight: "680px",
  },

  smallContainer: {
    maxWidth: "95%",
    backgroundColor: "white",
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
    textAlign: "center",
    fontSize: "25px",
    color: "blue",
    fontStyle: "bold",
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

  error: {
    fontSize: "14px",
    color: "red",
    paddingTop: "5px",
  },

  errorResult: {
    textAlign: "center",
    fontSize: "25px",
    color: "blue",
    fontWeight: "bold",
  },

  noWrap: {
    whiteSpace: "nowrap",
  },
});

const MyProfile = (props) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [showTableOption1, setShowTableOption1] = React.useState(false);
  const [showTableOption2, setShowTableOption2] = React.useState(false);

  const [button, setButton] = React.useState(true);


  const [profileData, setProfileData] = useState("");

  const [diemCaNam11, setDiemCaNam11] = useState("");
  const [diemCaNam12, setDiemCaNam12] = useState("");
  const [diemHK1Lop12, setdiemHK1Lop12] = useState("");

  var nv1 = Array[2],
    nv2 = Array[2],
    nv3 = Array[2];

  const [xet1MaNganh, setNV1MaNganh] = useState("");
  const [xet1MaToHop, setNV1MaToHop] = useState("");

  const [xet2MaNganh, setNV2MaNganh] = useState("");
  const [xet2MaToHop, setNV2MaToHop] = useState("");

  const [xet3MaNganh, setNV3MaNganh] = useState("");
  const [xet3MaToHop, setNV3MaToHop] = useState("");

  const [phuongAn, setPhuongAN] = useState("");


  const navigate = useNavigate();
  const toPrint = () => {
    navigate("/inhoso", {
      state: {
        phuongan: phuongAn,
        id: profileData.id.toString(),
        hoVaTen: profileData.hoVaTen,
        gioiTinh: profileData.gioiTinh === true ? "Nam" : "N???",
        tenNoiSinh: profileData.tenNoiSinh,
        ngaySinh: moment(profileData.ngaySinh)
          .utc()
          .format("DD-MM-YYYY")
          .toString(),
        tenDanToc: profileData.tenDanToc,
        tenTonGiao: profileData.tenTonGiao,
        cmnd: profileData.cmnd,
        quocTich: profileData.quocTich,
        hoKhauTenQh: profileData.hoKhauTenQh,
        hoKhauTenPhuong: profileData.hoKhauTenPhuong,
        hoKhauTenTinhTp: profileData.hoKhauTenTinhTp,
        namTotNghiep: profileData.namTotNghiep,
        hocLucLop12: profileData.hocLucLop12,
        hanhKiemLop12: profileData.hanhKiemLop12,
        loaiHinhTn: profileData.loaiHinhTn,
        maTruongThpt: profileData.maTruongThpt,
        tenTruongThpt: profileData.tenTruongThpt,
        truongThptTenTinhTp: profileData.truongThptTenTinhTp,
        tenLop12: profileData.tenLop12,
        khuVuc: profileData.khuVuc,
        doiTuongUuTien: profileData.doiTuongUuTien,
        ccnn: profileData.ccnn,
        tenNganh1: profileData.tenNganhTenToHop1?.split("#")[0],
        tenNganh2: profileData.tenNganhTenToHop2?.split("#")[0],
        tenNganh3: profileData.tenNganhTenToHop3?.split("#")[0],
        xet1MaNganh: profileData.xet1MaNganh,
        xet1MaNganh: xet1MaNganh,
        xet1MaToHop: xet1MaToHop,
        xet2MaNganh: xet2MaNganh,
        xet2MaToHop: xet2MaToHop,
        xet3MaNganh: xet3MaNganh,
        xet3MaToHop: xet3MaToHop,
        dienthoaiDd: profileData.dienThoaiDd,
        dienThoaiPhuHuynh: profileData.dienThoaiPhuHuynh,
        email: profileData.email,
        chuongTrinhHoc1: profileData.chuongTrinhHoc1,
        chuongTrinhHoc2: profileData.chuongTrinhHoc2,
        chuongTrinhHoc3: profileData.chuongTrinhHoc3,
        diemCaNam11Toan: diemCaNam11.toan,
        diemCaNam11Van: diemCaNam11.van,
        diemCaNam11Anh: diemCaNam11.anh,
        diemCaNam11Phap: diemCaNam11.phap,
        diemCaNam11Ly: diemCaNam11.ly,
        diemCaNam11Hoa: diemCaNam11.hoa,
        diemCaNam11Sinh: diemCaNam11.sinh,
        diemCaNam11Su: diemCaNam11.su,
        diemCaNam11Dia: diemCaNam11.dia,
        diemCaNam11Gdcd: diemCaNam11.gdcd,
        diemHK1Lop12Toan: diemHK1Lop12.toan,
        diemHK1Lop12Van: diemHK1Lop12.van,
        diemHK1Lop12Anh: diemHK1Lop12.anh,
        diemHK1Lop12Phap: diemHK1Lop12.phap,
        diemHK1Lop12Ly: diemHK1Lop12.ly,
        diemHK1Lop12Hoa: diemHK1Lop12.hoa,
        diemHK1Lop12Sinh: diemHK1Lop12.sinh,
        diemHK1Lop12Su: diemHK1Lop12.su,
        diemHK1Lop12Dia: diemHK1Lop12.dia,
        diemHK1Lop12Gdcd: diemHK1Lop12.gdcd,
        diemCaNam12Toan: diemCaNam12.toan,
        diemCaNam12Van: diemCaNam12.van,
        diemCaNam12Anh: diemCaNam12.anh,
        diemCaNam12Phap: diemCaNam12.phap,
        diemCaNam12Ly: diemCaNam12.ly,
        diemCaNam12Hoa: diemCaNam12.hoa,
        diemCaNam12Sinh: diemCaNam12.sinh,
        diemCaNam12Su: diemCaNam12.su,
        diemCaNam12Dia: diemCaNam12.dia,
        diemCaNam12Gdcd: diemCaNam12.gdcd,
      },
    });
  };
  const toEdit = () => {
    navigate("/suahoso", {
      state: {
        phuongAn: phuongAn,
        id: profileData.id.toString(),
        hovaten: profileData.hoVaTen,
        gioitinh: profileData.gioiTinh === true ? "1" : "0",
        noisinh: profileData.maNoiSinh,
        ngaysinh: moment(profileData.ngaySinh)
          .utc()
          .format("YYYY-MM-DD")
          .toString(),
        dantoc: profileData.maDanToc,
        tongiao: profileData.maTonGiao,
        cmnd: profileData.cmnd,
        quoctich: profileData.quocTich?.split("|")[0],
        diachinha: profileData.lienLacDiaChi,
        quanhuyen: profileData.hoKhauMaQh,
        phuongxa: profileData.hoKhauMaPhuong,
        tinhthanhpho: profileData.hoKhauMaTinhTp,
        hokhauthuongtru: profileData.hoKhauTenPhuong + ", " + profileData.hoKhauTenQh + ", " + profileData.hoKhauTenTinhTp,
        namtotnghiep: profileData.namTotNghiep,
        hocluclop12: profileData.hocLucLop12,
        hanhkiemlop12: profileData.hanhKiemLop12,
        hocchuongtrinh: profileData.loaiHinhTn,
        tentruongthpt: profileData.maTruongThpt,
        tinhthanhpho_thpt: profileData.truongThptMaTinhTp,
        quanhuyen_thpt: profileData.truongThptMaQh,
        truongThptTenTinhTp: profileData.truongThptTenTinhTp,
        tenlop12: profileData.tenLop12,
        khuvucuutien: profileData.khuVuc,
        doituonguutien: profileData.doiTuongUuTien,
        chungchingoaingu: profileData.maCcnn,
        nganh1: profileData.tenNganhTenToHop1?.split("#")[0],
        nganh2: profileData.tenNganhTenToHop2?.split("#")[0],
        nganh3: profileData.tenNganhTenToHop3?.split("#")[0],
        nganh1: xet1MaNganh,
        tohopmon1: xet1MaToHop,
        chuongtrinh1: profileData.chuongTrinhHoc1,
        nganh2: xet2MaNganh,
        tohopmon2: xet2MaToHop,
        chuongtrinh2: profileData.chuongTrinhHoc2,
        nganh3: xet3MaNganh,
        tohopmon3: xet3MaToHop,
        chuongtrinh3: profileData.chuongTrinhHoc3,
        tinhthanhpho_nha: profileData.lienLacMaTp,
        quanhuyen_nha: profileData.lienLacMaQh,
        phuongxa_nha: profileData.lienLacMaPhuongXa,       
        dienthoaididong: profileData.dienThoaiDd,
        dienthoaiphuhuynh: profileData.dienThoaiPhuHuynh,
        email: profileData.email,
        chuongTrinhHoc1: profileData.chuongTrinhHoc1,
        chuongTrinhHoc2: profileData.chuongTrinhHoc2,
        chuongTrinhHoc3: profileData.chuongTrinhHoc3,
        diemtb_cnlop11: {
          diemtoan: diemCaNam11.toan,
          diemvan: diemCaNam11.van,
          diemanh: diemCaNam11.anh,
          diemphap: diemCaNam11.phap,
          diemly: diemCaNam11.ly,
          diemhoa: diemCaNam11.hoa,
          diemsinh: diemCaNam11.sinh,
          diemsu: diemCaNam11.su,
          diemdia: diemCaNam11.dia,
          diemgdcd: diemCaNam11.gdcd,
      },
      diemtb_hk1lop12: {
          diemtoan: diemHK1Lop12.toan,
          diemvan: diemHK1Lop12.van,
          diemanh: diemHK1Lop12.anh,
          diemphap: diemHK1Lop12.phap,
          diemly: diemHK1Lop12.ly,
          diemhoa: diemHK1Lop12.hoa,
          diemsinh: diemHK1Lop12.sinh,
          diemsu: diemHK1Lop12.su,
          diemdia: diemHK1Lop12.dia,
          diemgdcd: diemHK1Lop12.gdcd,
      },
      diemtb_cnlop12: {
          diemtoan: diemCaNam12.toan,
          diemvan: diemCaNam12.van,
          diemanh: diemCaNam12.anh,
          diemphap: diemCaNam12.phap,
          diemly: diemCaNam12.ly,
          diemhoa: diemCaNam12.hoa,
          diemsinh: diemCaNam12.sinh,
          diemsu: diemCaNam12.su,
          diemdia: diemCaNam12.dia,
          diemgdcd: diemCaNam12.gdcd,
      },
      },
    });
  };

  const toUpload = () => {
    navigate("/uploadhocba", {
      state: {
       MaHoSoThpt: profileData.id,
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.setIsLoading(true);
    if (data != null) {
 


      GetScheduleForEditProfile().then((response) =>{
        
        var dateFrom = response.data.ngayBatDau;
        var dateTo = response.data.ngayKetThuc;
        var dateCheck = moment().format("DD/MM/YYYY");
      
        var d1 = dateFrom.split("/");
        var d2 = dateTo.split("/");
        var c = dateCheck.split("/");

        var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]); 
        var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
        var check = new Date(c[2], parseInt(c[1])-1, c[0]);
        if(check >= from && check <= to == true){
          setButton(false);
        }else{
          setButton(true);
        }
      })

      


      GetProfileByCMND(data.cmnd,data.dotxettuyen)
        .then((response) => {
          setProfileData(response.data);
          console.log(response.data);
          
          //console.log(response.data[0])
          setNV1MaNganh("");
          setNV2MaNganh("");
          setNV3MaNganh("");
          setNV1MaToHop("");
          setNV2MaToHop("");
          setNV3MaToHop("");
          setPhuongAN("");


          if (response.data.maNganhToHop1 != null) {
            nv1 = response.data.maNganhToHop1.split("#");
            setNV1MaNganh(nv1[0]);
            setNV1MaToHop(nv1[1]);
          }
          if (response.data.maNganhToHop2 != null) {
            nv2 = response.data.maNganhToHop2.split("#");
            setNV2MaNganh(nv2[0]);
            setNV2MaToHop(nv2[1]);
          }
          if (response.data.maNganhToHop3 != null) {
            nv3 = response.data.maNganhToHop3.split("#");
            setNV3MaNganh(nv3[0]);
            setNV3MaToHop(nv3[1]);
          }

          GetBangDiem(response.data.id)
            .then((response2) => {
              if (response2.data.length == 2) {
                setPhuongAN("1");
                if (response2.data[0].maHocKyLop == "CN_LOP11") {
                  setDiemCaNam11(response2.data[0]);
                  setdiemHK1Lop12(response2.data[1]);
                } else {
                  setDiemCaNam11(response2.data[1]);
                  setdiemHK1Lop12(response2.data[0]);
                }

                setShowTableOption2(false);
                setShowTableOption1(true);
              } else if (response2.data.length == 1) {
                setPhuongAN("2");
                setDiemCaNam12(response2.data[0]);
                setShowTableOption1(false);
                setShowTableOption2(true);
              } else {
                console.log("error");
              }
              setTimeout(() => props.setIsLoading(false), 1000);
            })
            .catch((error) => {
              console.log(error);
              setTimeout(() => props.setIsLoading(false), 1000);
            });

          setShow(true);
          setShowError(false);
        })
        .catch((error) => {
          setTimeout(() => props.setIsLoading(false), 1000);
          console.log("not found", error);
          setShowError(true);
          setShow(false);
        });
    } else {
      console.log("not exist");
      setTimeout(() => props.setIsLoading(false), 1000);
      setShow(false);
    }
  };

  const onError = (error) => {
    console.log("error", error);
  };

  const ShowTableOption1 = () => (
    <table className={classes.table}>
      <tbody>
        <tr>
          <th className={classes.tableTitle}>M??N H???C</th>
          <th className={classes.tableCenter}>TO??N</th>
          <th className={classes.tableCenter}>V??N</th>
          <th className={classes.tableCenter}>ANH</th>
          <th className={classes.tableCenter}>PH??P</th>
          <th className={classes.tableCenter}>L??</th>
          <th className={classes.tableCenter}>H??A</th>
          <th className={classes.tableCenter}>SINH</th>
          <th className={classes.tableCenter}>S???</th>
          <th className={classes.tableCenter}>?????A</th>
          <th className={classes.tableCenter}>GDCD</th>
        </tr>
        <tr>
          <td
            className={classes.boldText}
            style={{ border: "1px solid", borderColor: "#bfbfbf" }}
          >
            ??i???m TB n??m h???c l???p 11
          </td>
          <td className={classes.tableCenter}>{diemCaNam11.toan}</td>
          <td className={classes.tableCenter}>{diemCaNam11.van}</td>
          <td className={classes.tableCenter}>{diemCaNam11.anh}</td>
          <td className={classes.tableCenter}>{diemCaNam11.phap}</td>
          <td className={classes.tableCenter}>{diemCaNam11.ly}</td>
          <td className={classes.tableCenter}>{diemCaNam11.hoa}</td>
          <td className={classes.tableCenter}>{diemCaNam11.sinh}</td>
          <td className={classes.tableCenter}>{diemCaNam11.su}</td>
          <td className={classes.tableCenter}>{diemCaNam11.dia}</td>
          <td className={classes.tableCenter}>{diemCaNam11.gdcd}</td>
        </tr>
        <tr>
          <td
            className={classes.boldText}
            style={{ border: "1px solid", borderColor: "#bfbfbf" }}
          >
            ??i???m TB HK1 l???p 12
          </td>
          <td className={classes.tableCenter}>{diemHK1Lop12.toan}</td>
          <td className={classes.tableCenter}>{diemHK1Lop12.van}</td>
          <td className={classes.tableCenter}>{diemHK1Lop12.anh}</td>
          <td className={classes.tableCenter}>{diemHK1Lop12.phap}</td>
          <td className={classes.tableCenter}>{diemHK1Lop12.ly}</td>
          <td className={classes.tableCenter}>{diemHK1Lop12.hoa}</td>
          <td className={classes.tableCenter}>{diemHK1Lop12.sinh}</td>
          <td className={classes.tableCenter}>{diemHK1Lop12.su}</td>
          <td className={classes.tableCenter}>{diemHK1Lop12.dia}</td>
          <td className={classes.tableCenter}>{diemHK1Lop12.gdcd}</td>
        </tr>
      </tbody>
    </table>
  );

  const ShowTableOption2 = () => (
    <table className={classes.table}>
      <tbody>
        <tr>
          <th className={classes.tableTitle}>M??N H???C</th>
          <th className={classes.tableCenter}>TO??N</th>
          <th className={classes.tableCenter}>V??N</th>
          <th className={classes.tableCenter}>ANH</th>
          <th className={classes.tableCenter}>PH??P</th>
          <th className={classes.tableCenter}>L??</th>
          <th className={classes.tableCenter}>H??A</th>
          <th className={classes.tableCenter}>SINH</th>
          <th className={classes.tableCenter}>S???</th>
          <th className={classes.tableCenter}>?????A</th>
          <th className={classes.tableCenter}>GDCD</th>
        </tr>
        <tr>
          <td
            className={classes.boldText}
            style={{ border: "1px solid", borderColor: "#bfbfbf" }}
          >
            ??i???m TB n??m h???c l???p 12
          </td>
          <td className={classes.tableCenter}>{diemCaNam12.toan}</td>
          <td className={classes.tableCenter}>{diemCaNam12.van}</td>
          <td className={classes.tableCenter}>{diemCaNam12.anh}</td>
          <td className={classes.tableCenter}>{diemCaNam12.phap}</td>
          <td className={classes.tableCenter}>{diemCaNam12.ly}</td>
          <td className={classes.tableCenter}>{diemCaNam12.hoa}</td>
          <td className={classes.tableCenter}>{diemCaNam12.sinh}</td>
          <td className={classes.tableCenter}>{diemCaNam12.su}</td>
          <td className={classes.tableCenter}>{diemCaNam12.dia}</td>
          <td className={classes.tableCenter}>{diemCaNam12.gdcd}</td>
        </tr>
      </tbody>
    </table>
  );

  const Results = () => (
    <div id="results" className="search-results">
      <p></p>
      <Container className={classes.container}>
        <Form>
          <Row>
            <Col>
              <div className={classes.subSection}>TH??NG TIN TH?? SINH</div>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col>
              <span className={classes.smallText}>M?? H??? S??: </span>
              <span className={classes.redText}>DVL_{profileData.id}</span>{" "}
              <span className={classes.boldText}>
                {profileData.daNhanHoSo === "N"
                  ? "(???? nh???n h??? s??)"
                  : "(Ch??a nh???n h??? s??)"}
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>1. H??? t??n th?? sinh:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>{profileData.hoVaTen}</span>
            </Col>
            <Col>
              <span className={classes.boldText}>Gi???i t??nh: </span>
              <span className={classes.smallText}>
                {profileData.gioiTinh === true ? "Nam" : "N???"}
              </span>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>2. Ng??y th??ng n??m sinh:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {moment(profileData.ngaySinh).utc().format("DD-MM-YYYY")}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>3. N??i sinh: </span>
              <span className={classes.smallText}>
                {profileData.tenNoiSinh}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>4. D??n t???c: </span>
              <span className={classes.smallText}>{profileData.tenDanToc}</span>
            </Col>
            <Col>
              <span className={classes.boldText}>5. T??n gi??o: </span>
              <span className={classes.smallText}>
                {profileData.tenTonGiao}
              </span>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>
                6. S??? ch???ng minh d??n d??n/ C??n c?????c c??ng d??n:
              </span>
            </Col>
            <Col>
              <span className={classes.smallText}>{profileData.cmnd} -</span>
              <span className={classes.boldText}> Qu???c t???ch: </span>
              <span className={classes.smallText}>{profileData.quocTich}</span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>7. H??? kh???u th?????ng tr??:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {profileData.hoKhauTenPhuong}, {profileData.hoKhauTenQh},{" "}
                {profileData.hoKhauTenTinhTp}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <span className={classes.boldText}>Ph?????ng x??: </span>
              <span className={classes.smallText}>
                {profileData.hoKhauTenPhuong}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>Qu???n/Huy???n: </span>
              <span className={classes.smallText}>
                {profileData.hoKhauTenQh}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>T???nh/Th??nh ph???: </span>
              <span className={classes.smallText}>
                {profileData.hoKhauTenTinhTp}
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>8. N??m t???t nghi???p THPT:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {profileData.namTotNghiep}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>9. H???c l???c l???p 12:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {profileData.hocLucLop12}
              </span>
            </Col>
            <Col>
              <span className={classes.boldText}>10. H???nh ki???m l???p 12:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {profileData.hanhKiemLop12}
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>
                11. Th?? sinh h???c ch????ng tr??nh:
              </span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {profileData.loaiHinhTn}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>12. N??i h???c THPT l???p 12:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {profileData.maTruongThpt} - {profileData.tenTruongThpt} -{" "}
              </span>
              <span className={classes.boldText}>L???p: </span>
              <span className={classes.smallText}>{profileData.tenLop12}</span>
            </Col>
            <Col></Col>
            <Col>
              <span className={classes.boldText}>M?? t???nh: </span>
              <span>{profileData.truongThptTenTinhTp}</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>13. Khu v???c:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>{profileData.khuVuc}</span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>14. ?????i t?????ng ??u ti??n:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>
                {profileData.doiTuongUuTien}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <p></p>
          <Row>
            <Col>
              <div className={classes.subSection}>TH??NG TIN X??T TUY???N</div>
            </Col>
            <Col>
              <span className={classes.boldText}>Ph????ng ??n x??t tuy???n: </span>
              <span className={classes.smallText}>{phuongAn}</span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          {showTableOption1 ? <ShowTableOption1 /> : null}
          {showTableOption2 ? <ShowTableOption2 /> : null}
          <Row>
            <Col className={classes.noWrap}>
              <span className={classes.boldText}>Ch???ng ch??? ngo???i ng???:</span>{" "}
              <span className={classes.smallText}>
                (n???u c??) {profileData.ccnn}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>
                Ng??nh ????ng k?? x??t tuy???n 1:{" "}
              </span>{" "}
              <span
                className={classes.smallText}
                style={{ paddingLeft: "5px" }}
              >
                {profileData.tenNganhTenToHop1?.split("#")[0]}
              </span>
            </Col>
            <Col></Col>
            <Col>
              <span className={classes.boldText}>M?? ng??nh: </span>{" "}
              <span className={classes.smallText}>{xet1MaNganh}</span>
            </Col>
            <Col>
              <span className={classes.boldText}>M?? t??? h???p: </span>{" "}
              <span className={classes.smallText}>{xet1MaToHop}</span>
            </Col>
          </Row>
          <Row style={{ paddingBottom: "10px" }}>
            <Col>
              <span className={classes.smallText}>
                Ch????ng tr??nh h???c: {profileData.chuongTrinhHoc1}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>
                Ng??nh ????ng k?? x??t tuy???n 2:{" "}
              </span>{" "}
              <span
                className={classes.smallText}
                style={{ paddingLeft: "5px" }}
              >
                {profileData.tenNganhTenToHop2?.split("#")[0]}
              </span>
            </Col>
            <Col></Col>
            <Col>
              <span className={classes.boldText}>M?? ng??nh: </span>{" "}
              <span className={classes.smallText}>{xet2MaNganh}</span>
            </Col>
            <Col>
              <span className={classes.boldText}>M?? t??? h???p: </span>{" "}
              <span className={classes.smallText}>{xet2MaToHop}</span>
            </Col>
          </Row>
          <Row style={{ paddingBottom: "10px" }}>
            <Col>
              <span className={classes.smallText}>
                Ch????ng tr??nh h???c: {profileData.chuongTrinhHoc2}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.boldText}>
                Ng??nh ????ng k?? x??t tuy???n 3:{" "}
              </span>{" "}
              <span
                className={classes.smallText}
                style={{ paddingLeft: "5px" }}
              >
                {profileData.tenNganhTenToHop3?.split("#")[0]}
              </span>
            </Col>
            <Col></Col>
            <Col>
              <span className={classes.boldText}>M?? ng??nh: </span>{" "}
              <span className={classes.smallText}>{xet3MaNganh}</span>
            </Col>
            <Col>
              <span className={classes.boldText}>M?? t??? h???p: </span>{" "}
              <span className={classes.smallText}>{xet3MaToHop}</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className={classes.smallText}>
                Ch????ng tr??nh h???c: {profileData.chuongTrinhHoc3}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <p></p>
          <Row>
            <Col>
              <div className={classes.subSection}>TH??NG TIN LI??N H???</div>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col md={1}>
              <span className={classes.boldText}>?????a ch??? li??n h???:</span>
            </Col>
            <Col md={4}>
              <span className={classes.smallText}>
                {profileData.hoKhauTenPhuong}, {profileData.hoKhauTenQh},{" "}
                {profileData.hoKhauTenTinhTp}
              </span>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col md={1}>
              <span className={classes.boldText}>??i???n tho???i:</span>
            </Col>
            <Col md={3}>
              <span className={classes.smallText}>
                {profileData.dienThoaiDd} -{" "}
              </span>
              <span className={classes.boldText}>??i???n tho???i ph??? huynh: </span>
              <span className={classes.smallText}>
                {profileData.dienThoaiPhuHuynh}
              </span>
            </Col>
            <Col md={1}>
              <span className={classes.boldText}>Email:</span>
            </Col>
            <Col>
              <span className={classes.smallText}>{profileData.email}</span>
            </Col>
          </Row>
          <br></br>
          <hr></hr>
          <Container className={classes.buttonContainer}>
            <Button className={classes.button1} onClick={() => toPrint()}>
              IN PHI???U
            </Button>
            <Button className={classes.button2} onClick={() => toUpload()}>UPLOAD H???C B???</Button>
            <Button className={classes.button3} disabled={button} onClick={() => toEdit()}>??I???U CH???NH TH??NG TIN</Button>
          </Container>
          <br></br>
          <br></br>
          <br></br>
        </Form>
      </Container>
    </div>
  );

  const ErrorResults = () => (
    <Container>
      <p></p>
      <p className={classes.errorResult}>
        Kh??ng t??m th???y h??? s?? c???a b???n tr??n h??? th???ng!
      </p>
      <p className={classes.errorResult}>
        B???n c???n nh???p ????ng S??? CMND/CCCD ???? ????ng k?? h??? s??.
      </p>
      <p></p>
      <p className={classes.errorResult}>
        N???u c???n h??? tr???, b???n c?? th??? li??n h??? hotline: (028) 7105 9999
      </p>
    </Container>
  );

  return (
    <Container className={classes.container}>
      <Form
        style={{ textAlign: "center" }}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Row>
          <p></p>
          <Col md={3} style={{ paddingLeft: "25px" }}>
            <Input
              className={classes.fieldInput}
              id="dotxettuyen"
              name="dotxettuyen"
              type="select"
              {...register("dotxettuyen", {
                required: {
                  value: true,
                },
              })}
            >
              <option value="1" defaultValue>
                ?????t 1
              </option>
              <option value="2">?????t 2</option>
              <option value="3">?????t 3</option>
              <option value="4">?????t 4</option>
            </Input>
          </Col>
          <Col md={3} style={{ paddingLeft: "25px" }}>
            <Input
              className={classes.fieldInput}
              id="phuongthucxettuyen"
              name="phuongthucxettuyen"
              type="select"
            >
              <option value={0} defaultValue>
                H???c b???
              </option>
              <option value={1}>????nh gi?? n??ng l???c</option>
            </Input>
          </Col>
          <Col md={4} style={{ paddingLeft: "25px" }}>
            <Input
              className={classes.fieldInput}
              id="cmnd"
              name="cmnd"
              placeholder="NH???P CMND/CCCD"
              type="text"
              {...register("cmnd", {
                required: {
                  value: true,
                  message: "S??? CMND/CCCD l?? b???t bu???c",
                },
              })}
            />
            {errors && (
              <div className={classes.error}>{errors.cmnd?.message}</div>
            )}
          </Col>
          <Col md={2}>
            <Button className={classes.button} type="submit">
              T??M H??? S??
            </Button>
          </Col>
        </Row>
      </Form>

      <div>
        {show ? <Results /> : null}
        {showError ? <ErrorResults /> : null}
      </div>
    </Container>
  );
};

export default MyProfile;
