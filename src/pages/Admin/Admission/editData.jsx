import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { createUseStyles } from "react-jss";
import {
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Col,
  Row,
} from "reactstrap";
import {
  GetCityProvincesForHoKhau,
  GetDistrictsForHoKhau,
  GetWardsForHoKhau,
  GetCityProvincesForSchool,
  GetDistrictsForSchool,
  GetSchools,
  GetEthnics,
  GetReligions,
  GetNationalities,
  GetCertificateLanguages,
  GetNganhXetTuyen,
  GetToHopXetTuyen,
  ValidateCMND,
} from "../../../services/admissionService";
import ScoresTable from "../../Admission/components/ScoresTable";
import Input from "../../../components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import {
  DownloadAdmissionFiles,
  EditAdmission,
  GetAdmissionById,
  ReceiveAdmissionProfileById,
} from "../../../services/admissionAdminService";
import { toast } from "react-toastify";
import moment from "moment";
import PreviewMailBeforeSendModal from "./components/PreviewMailBeforeSendModal";
import DialogConfirm from "../../../components/DialogConfirm";

const useStyles = createUseStyles({
  container: {
    padding: "0 50px",
  },
  containerTitle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "30px",
    marginBottom: "15px",
  },
  title: {
    color: "#c61d23",
    fontSize: "24px",
    fontWeight: "bold",
    padding: "20px",
    paddingBottom: "10px",
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
    fontSize: "13px",
    fontWeight: "bold",
    color: "blue",
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
  radioButton: {
    marginTop: 0,
    width: "11px",
    height: "11px",
    // "&:checked": {
    //   backgroundColor: "#c61d23",
    //   borderColor: "#c61d23",
    // },
    // "&:focus": {
    //   outline: 0,
    //   boxShadow: "0 0 0 .25rem #dc354533",
    // },
  },
  labelSmall: {
    fontSize: "14px",
    fontWeight: "500",
  },
  programLabel: {
    fontSize: "14px",
    color: "#5b9bd1",
    fontWeight: "500",
    textDecoration: "none",
    paddingBottom: "10px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  containerProgram: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: "25px",
  },
  subContainerProgram: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "10px",
  },
  submit: {
    backgroundColor: "#2c9b91",
    border: "none",
    "&:hover": {
      backgroundColor: "#3bccbf",
    },
  },
  cancel: {
    backgroundColor: "#ff3037",
    border: "none",
    "&:hover": {
      backgroundColor: "#ff6065",
    },
  },
  sendMail: {
    backgroundColor: "#607d8b",
    border: "none",
    "&:hover": {
      backgroundColor: "#99a6ac",
    },
  },
  downloadFiles: {
    backgroundColor: "#295cb5",
    border: "none",
    "&:hover": {
      backgroundColor: "#407be2",
    },
  },
  receiveProfile: {
    backgroundColor: "#00bcd4",
    border: "none",
    "&:hover": {
      backgroundColor: "#53e8fb",
    },
  },
  error: {
    fontSize: "14px",
    color: "red",
    paddingTop: "5px",
  },
  radioError: {
    paddingLeft: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  radioError2: {
    display: "flex",
    alignItems: "center",
    paddingTop: "5px",
  },
});

const dataForm = {
  id: 0,
  hoVaTen: "",
  gioiTinh: "",
  ngaySinh: "",
  maNoiSinh: "",
  mamaDanToc: "",
  maTonGiao: "",
  cmnd: "",
  maQuocTich: "",
  diaChiHoKhau: "",
  hoKhauMaTinhTp: "",
  hoKhauMaQh: "",
  hoKhauMaPhuong: "",
  namTotNghiep: "",
  hocLucLop12: "",
  hanhKiemLop12: "",
  loaiHinhTn: "",
  truongThptMaTinhTp: "",
  truongThptMaQh: "",
  maTruongThpt: "",
  tenLop12: "",
  khuVuc: "3",
  doiTuongUuTien: "0",
  diaChiLienLac: "",
  lienLacMaTp: "",
  lienLacMaQh: "",
  lienLacMaPhuongXa: "",
  dienThoaiDd: "",
  email: "",
  dienThoaiPhuHuynh: "",
  phuongAn: "1",
  diemCnlop11: {
    diemtoan: "",
    diemvan: "",
    diemanh: "",
    diemphap: "",
    diemly: "",
    diemhoa: "",
    diemsinh: "",
    diemsu: "",
    diemdia: "",
    diemgdcd: "",
  },
  diemHk1lop12: {
    diemtoan: "",
    diemvan: "",
    diemanh: "",
    diemphap: "",
    diemly: "",
    diemhoa: "",
    diemsinh: "",
    diemsu: "",
    diemdia: "",
    diemgdcd: "",
  },
  diemCnlop12: {
    diemtoan: "",
    diemvan: "",
    diemanh: "",
    diemphap: "",
    diemly: "",
    diemhoa: "",
    diemsinh: "",
    diemsu: "",
    diemdia: "",
    diemgdcd: "",
  },
  maCcnn: "",
  maNganh1: "",
  maToHop1: "",
  chuongTrinhHoc1: "",
  maNganh2: "",
  maToHop2: "",
  chuongTrinhHoc2: "",
  maNganh3: "",
  maToHop3: "",
  chuongTrinhHoc3: "",
};

const EditData = (props) => {
  let navigate = useNavigate();
  let { id } = useParams();
  const classes = useStyles();
  const [admission, setAdmission] = useState(dataForm);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...dataForm,
    },
  });
  const [phuongAn, setPhuongAn] = useState("1");
  const [cityProvincesForHoKhau, setCityProvincesForHoKhau] = useState([]);
  const [districtsForHoKhau, setDistrictsForHoKhau] = useState([]);
  const [wardsForHoKhau, setWardsForHoKhau] = useState([]);
  const [cityProvincesForHome, setCityProvincesForHome] = useState([]);
  const [districtsForHome, setDistrictsForHome] = useState([]);
  const [wardsForHome, setWardsForHome] = useState([]);
  const [cityProvincesForSchool, setCityProvincesForSchool] = useState([]);
  const [districtsForSchool, setDistrictsForSchool] = useState([]);
  const [maTinhTP, setMaTinhTP] = useState("");
  const [schools, setSchools] = useState([]);
  const [ethnics, setEthnics] = useState([]);
  const [religions, setReligions] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [certificateLanguages, setCertificateLanguages] = useState([]);
  const [maNganh1, setMaNganh1] = useState([]);
  const [toHop1, setToHop1] = useState([]);
  const [isSpecialProgram1, setIsSpecialProgram1] = useState(false);
  const [maNganh2, setMaNganh2] = useState([]);
  const [toHop2, setToHop2] = useState([]);
  const [isSpecialProgram2, setIsSpecialProgram2] = useState(false);
  const [maNganh3, setMaNganh3] = useState([]);
  const [toHop3, setToHop3] = useState([]);
  const [isSpecialProgram3, setIsSpecialProgram3] = useState(false);
  const [specialProgramList, setSpecialProgramList] = useState([]);
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phoneNumberPattern =
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const namTotNghiepPattern = /^(19[5-9]\d|20[0-9]\d|2100)$/;
  const diemPattern = /^[+-]?\d+(\.\d+)?$/;

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchInitialData = () => {
    GetEthnics()
      .then((response) => {
        setEthnics(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    GetReligions()
      .then((response) => {
        setReligions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    GetNationalities()
      .then((response) => {
        setNationalities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    GetCityProvincesForHoKhau()
      .then((response) => {
        setCityProvincesForHoKhau(response.data);
        setCityProvincesForHome(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    GetCityProvincesForSchool()
      .then((response) => {
        setCityProvincesForSchool(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    GetCertificateLanguages()
      .then((response) => {
        setCertificateLanguages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    GetNganhXetTuyen()
      .then((response) => {
        setMaNganh1(response.data);
        setMaNganh2(response.data);
        setMaNganh3(response.data);

        var listMajor = [];
        response.data.map((element) => {
          if (element.ctdb) {
            listMajor.push(element.maNganh);
          }
        });
        setSpecialProgramList(listMajor);
      })
      .catch((error) => console.log(error));
  };

  const handleGetAdmission = () => {
    GetAdmissionById(id)
      .then((response) => {
        setAdmission({ ...response.data });
        setTimeout(() => props.setIsLoading(false), 1000);
      })
      .catch((error) =>
        setTimeout(() => {
          props.setIsLoading(false);
          toast.error(error.response.data, {
            theme: "colored",
          });
        }, 1000)
      );
  };

  useEffect(() => {
    if (id > 0) {
      props.setIsLoading(true);
      fetchInitialData();
      handleGetAdmission();
    }
  }, []);

  useEffect(() => {
    if (admission.id !== 0) {
      onGetDataForDropdownList();
      setTimeout(() => reset(admission), 1000);
    }
  }, [admission]);

  //Ho khau
  const onGetDistrictsForHoKhau = (MaTinhTP) => {
    GetDistrictsForHoKhau(MaTinhTP)
      .then((response) => {
        setDistrictsForHoKhau(response.data);
      })
      .catch((error) => console.log(error));
  };

  const onGetWardsForHoKhau = (MaQH) => {
    GetWardsForHoKhau(MaQH)
      .then((response) => {
        setWardsForHoKhau(response.data);
      })
      .catch((error) => console.log(error));
  };

  //Truong THPT
  const onGetDistrictsForSchool = (MaTinhTP) => {
    GetDistrictsForSchool(MaTinhTP)
      .then((response) => {
        setDistrictsForSchool(response.data);
      })
      .catch((error) => console.log(error));
  };

  const onGetSchools = (MaTinhTP, MaQH) => {
    GetSchools(MaTinhTP, MaQH)
      .then((response) => {
        setSchools(response.data);
      })
      .catch((error) => console.log(error));
  };

  //Home
  const onGetDistrictsForHome = (MaTinhTP) => {
    GetDistrictsForHoKhau(MaTinhTP)
      .then((response) => {
        setDistrictsForHome(response.data);
      })
      .catch((error) => console.log(error));
  };

  const onGetWardsForHome = (MaQH) => {
    GetWardsForHoKhau(MaQH)
      .then((response) => {
        setWardsForHome(response.data);
      })
      .catch((error) => console.log(error));
  };

  const onGetToHopXetTuyen = (MaNganh) => {
    return GetToHopXetTuyen(MaNganh);
  };

  const onGetDataForDropdownList = useCallback(() => {
    //Ho khau
    if (admission.hoKhauMaTinhTp) {
      onGetDistrictsForHoKhau(admission.hoKhauMaTinhTp);
    }
    if (admission.hoKhauMaQh) {
      onGetWardsForHoKhau(admission.hoKhauMaQh);
    }

    //Truong THPT
    if (admission.truongThptMaTinhTp) {
      onGetDistrictsForSchool(admission.truongThptMaTinhTp);
    }
    if (admission.truongThptMaTinhTp && admission.truongThptMaQh) {
      onGetSchools(admission.truongThptMaTinhTp, admission.truongThptMaQh);
    }

    //Home
    if (admission.lienLacMaTp) {
      onGetDistrictsForHome(admission.lienLacMaTp);
    }
    if (admission.lienLacMaQh) {
      onGetWardsForHome(admission.lienLacMaQh);
    }

    //Phuong an
    if (admission.phuongAn) {
      setPhuongAn(admission.phuongAn);
    }

    //Nganh
    if (admission.maNganh1) {
      onGetToHopXetTuyen(admission.maNganh1)
        .then((response) => {
          setToHop1(response.data);
        })
        .catch((error) => console.log(error));
    }
    if (admission.maNganh2) {
      onGetToHopXetTuyen(admission.maNganh2)
        .then((response) => {
          setToHop2(response.data);
        })
        .catch((error) => console.log(error));
    }
    if (admission.maNganh3) {
      onGetToHopXetTuyen(admission.maNganh3)
        .then((response) => {
          setToHop3(response.data);
        })
        .catch((error) => console.log(error));
    }

    //Chuong trinh
    if (specialProgramList.includes(admission.maNganh1)) {
      setIsSpecialProgram1(true);
    }
    if (specialProgramList.includes(admission.maNganh2)) {
      setIsSpecialProgram2(true);
    }
    if (specialProgramList.includes(admission.maNganh3)) {
      setIsSpecialProgram3(true);
    }
  }, [
    admission.hoKhauMaTinhTp,
    admission.hoKhauMaQh,
    admission.truongThptMaTinhTp,
    admission.truongThptMaQh,
    admission.lienLacMaTp,
    admission.lienLacMaQh,
    admission.phuongAn,
    admission.maNganh1,
    admission.maNganh2,
    admission.maNganh3,
  ]);

  const onValidateBeforeSaving = (data) => {
    if (isSpecialProgram2) {
      if (data.maToHop2 === "" || data.chuongTrinhHoc2 === "") {
        data.maNganh2 = "";
        data.maToHop2 = "";
        data.chuongTrinhHoc2 = "";
      }
    } else {
      if (data.maToHop2 === "") {
        data.maNganh2 = "";
        data.maToHop2 = "";
      }
    }

    if (isSpecialProgram3) {
      if (data.maToHop3 === "" || data.chuongTrinhHoc3 === "") {
        data.maNganh3 = "";
        data.maToHop3 = "";
        data.chuongTrinhHoc3 = "";
      }
    } else {
      if (data.maToHop3 === "") {
        data.maNganh3 = "";
        data.maToHop3 = "";
      }
    }
  };

  const handleReceiveAdmissionProfile = () => {
    if (id !== 0) {
      props.setIsLoading(true);
      ReceiveAdmissionProfileById(id)
        .then((response) => {
          if (response.data) {
            setTimeout(() => {
              props.setIsLoading(false);
              toast.success(`Nhận hồ sơ xét tuyển thành công!`, {
                theme: "colored",
              });
            }, 1000);
            setOpenDialog(false);
            handleGetAdmission();
          }
        })
        .catch((error) => {
          setTimeout(() => {
            props.setIsLoading(false);
            toast.error(error.response.data, {
              theme: "colored",
            });
          }, 1000);
          setOpenDialog(false);
        });
    }
  };

  const handleDownloadAdmissionFiles = () => {
    if (id !== 0) {
      props.setIsLoading(true);
      DownloadAdmissionFiles(id)
        .then((response) => {
          window.location.assign(response.request.responseURL);
          setTimeout(() => {
            props.setIsLoading(false);
            toast.success(`Tải học bạ thành công!`, {
              theme: "colored",
            });
          }, 1000);
        })
        .catch((error) => {
          setTimeout(() => {
            props.setIsLoading(false);
            toast.error(error.response.data, {
              theme: "colored",
            });
          }, 1000);
          setOpenDialog(false);
        });
    }
  };

  const onSubmit = useCallback(
    (data) => {
      props.setIsLoading(true);
      onValidateBeforeSaving(data);
      const formData = new FormData();
      for (var key in data) {
        key === "diemCnlop11" || key === "diemHk1lop12" || key === "diemCnlop12"
          ? formData.append(key, JSON.stringify(data[key]))
          : formData.append(key, data[key]);
      }

      EditAdmission(formData)
        .then((response) => {
          if (response.data) {
            setTimeout(() => {
              props.setIsLoading(false);
              navigate(-1);
              toast.success("Chỉnh sửa hồ sơ xét tuyển thành công!", {
                theme: "colored",
              });
            }, 1000);
          }
        })
        .catch((error) =>
          setTimeout(() => {
            props.setIsLoading(false);
            toast.error(error.response.data, {
              theme: "colored",
            });
          }, 1000)
        );
    },
    [admission]
  );

  const onError = (error) => {
    console.log("error", error);
  };

  return (
    <Container className={classes.container}>
      <DialogConfirm
        title="Thông báo nhận hồ sơ xét tuyển"
        content="Bạn có chắc chắn muốn nhận hồ sơ này không ?"
        open={openDialog}
        handleClose={handleCloseDialog}
        onConfirm={handleReceiveAdmissionProfile}
      />
      {openModal ? (
        <PreviewMailBeforeSendModal
          admission={admission}
          open={openModal}
          setIsLoading={props.setIsLoading}
          handleClose={handleCloseModal}
        />
      ) : (
        ""
      )}
      <div className={classes.containerTitle}>
        <div className={classes.title}>CHỈNH SỬA HỒ SƠ XÉT TUYỂN</div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div
              style={{ color: "#c61d23", fontSize: "18px", fontWeight: "bold" }}
            >
              Đợt {admission.dotThu} - Khóa {admission.khoa}
            </div>
            <div
              style={{
                color: "#1736C0",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              ({moment(admission.ngayBatDau).format("DD/MM/YYYY")} -{" "}
              {moment(admission.ngayKetThuc).format("DD/MM/YYYY")})
            </div>
          </div>
          <div
            style={{
              fontSize: "17px",
            }}
          >
            Đã nhận hồ sơ:
            <span
              style={{
                fontWeight: "bold",
                paddingLeft: "7px",
                color: admission.daNhanHoSo == "C" ? "red" : "green",
              }}
            >
              {admission.daNhanHoSo == "C" ? "CHƯA" : "ĐÃ NHẬN"}
            </span>
          </div>
        </div>
      </div>
      <Form
        className={classes.containerForm}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div>
          <div className={classes.section}>THÔNG TIN THÍ SINH</div>
          <div className={classes.subSection}>A. THÔNG TIN CÁ NHÂN</div>
        </div>
        <hr className={classes.line} />
        <FormGroup>
          <Row>
            <Label className={classes.label} for="hoVaTen" md={4}>
              Họ và tên
              <span className={classes.require}>*</span>
            </Label>
            <Col md={5} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                placeholder="NGUYỄN VĂN A"
                id="hoVaTen"
                name="hoVaTen"
                type="text"
                {...register("hoVaTen", {
                  required: { value: true, message: "Họ và tên là bắt buộc" },
                })}
              />
              {errors && (
                <div className={classes.error}>{errors.hoVaTen?.message}</div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} md={4}>
              Giới tính
              <span className={classes.require}>*</span>
            </Label>
            <Col className={classes.radioError} md={5}>
              <div className={classes.radioError2}>
                <Input
                  className={classes.radioButton}
                  id="nam"
                  name="gioiTinh"
                  type="radio"
                  value="1"
                  {...register("gioiTinh", {
                    required: { value: true, message: "Giới tính là bắt buộc" },
                  })}
                />
                <Label className={classes.labelRadio} for="nam">
                  Nam
                </Label>
                <Input
                  className={classes.radioButton}
                  id="nu"
                  name="gioiTinh"
                  type="radio"
                  value="0"
                  {...register("gioiTinh", {
                    required: { value: true, message: "Giới tính là bắt buộc" },
                  })}
                />
                <Label className={classes.labelRadio} for="nu">
                  Nữ
                </Label>
              </div>
              {errors && (
                <div className={classes.error}>{errors.gioiTinh?.message}</div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="ngaySinh" md={4}>
              Ngày sinh
              <span className={classes.require}>*</span>
            </Label>
            <Col md={2} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="ngaySinh"
                name="ngaySinh"
                type="date"
                onKeyDown={(e) => e.preventDefault()}
                {...register("ngaySinh", {
                  required: { value: true, message: "Ngày sinh là bắt buộc" },
                })}
              />
              {errors && (
                <div className={classes.error}>{errors.ngaySinh?.message}</div>
              )}
            </Col>

            <Label
              className={classes.label}
              for="maNoiSinh"
              md={2}
              style={{ width: "95px" }}
            >
              Nơi sinh
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3}>
              <Input
                className={classes.fieldInput}
                id="maNoiSinh"
                name="maNoiSinh"
                type="select"
                {...register("maNoiSinh", {
                  required: { value: true, message: "Nơi sinh là bắt buộc" },
                })}
              >
                <option value="">-- Chọn nơi sinh --</option>
                {cityProvincesForHoKhau &&
                  cityProvincesForHoKhau.map((data, index) => (
                    <option key={index} value={data.maTinhTP}>
                      {data.tenTinhTP}
                    </option>
                  ))}
              </Input>
              {errors && (
                <div className={classes.error}>{errors.maNoiSinh?.message}</div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="maDanToc" md={4}>
              Dân tộc
              <span className={classes.require}>*</span>
            </Label>
            <Col md={2} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="maDanToc"
                name="maDanToc"
                type="select"
                {...register("maDanToc", {
                  required: { value: true, message: "Dân tộc là bắt buộc" },
                })}
              >
                <option value="">-- Chọn dân tộc --</option>
                {ethnics &&
                  ethnics.map((data, index) => (
                    <option key={index} value={data.maDantoc}>
                      {data.tenDantoc}
                    </option>
                  ))}
              </Input>
              {errors && (
                <div className={classes.error}>{errors.maDanToc?.message}</div>
              )}
            </Col>

            <Label
              className={classes.label}
              for="maTonGiao"
              md={2}
              style={{ width: "95px" }}
            >
              Tôn giáo
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3}>
              <Input
                className={classes.fieldInput}
                id="maTonGiao"
                name="maTonGiao"
                type="select"
                {...register("maTonGiao", {
                  required: { value: true, message: "Tôn giáo là bắt buộc" },
                })}
              >
                <option value="">-- Chọn tôn giáo --</option>
                {religions &&
                  religions.map((data, index) => (
                    <option key={index} value={data.maTongiao}>
                      {data.tenTongiao}
                    </option>
                  ))}
              </Input>
              {errors && (
                <div className={classes.error}>{errors.tongiao?.message}</div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="cmnd" md={4}>
              Số CMND/CCCD
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="cmnd"
                name="cmnd"
                placeholder="9 số hoặc 12 số"
                type="text"
                {...register("cmnd", {
                  required: {
                    value: true,
                    message: "Số CMND/CCCD là bắt buộc",
                  },
                  validate: {
                    value: async (value) =>
                      (await ValidateCMND(value)).data == false ||
                      value === admission.cmnd ||
                      "Số CMND/CCCD này đã được đăng ký trước đó",
                  },
                  minLength: {
                    value: 9,
                    message: "Số CMND/CCCD phải là 9 số hoặc 12 số",
                  },
                  maxLength: {
                    value: 12,
                    message: "Số CMND/CCCD phải là 9 số hoặc 12 số",
                  },
                })}
              />
              {errors && (
                <div className={classes.error}>{errors.cmnd?.message}</div>
              )}
            </Col>

            <Label
              className={classes.label}
              for="maQuocTich"
              md={2}
              style={{ width: "100px" }}
            >
              Quốc tịch
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3}>
              <Input
                className={classes.fieldInput}
                id="maQuocTich"
                name="maQuocTich"
                type="select"
                {...register("maQuocTich", {
                  required: { value: true, message: "Quốc tịch là bắt buộc" },
                })}
              >
                {nationalities &&
                  nationalities.map((data, index) => (
                    <option
                      key={index}
                      value={data.maQt}
                      defaultChecked={data.maQt == 704}
                    >
                      {data.tenQt}
                    </option>
                  ))}
              </Input>
              {errors && (
                <div className={classes.error}>
                  {errors.maQuocTich?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="diaChiHoKhau" md={4}>
              Hộ khẩu thường trú
              <span className={classes.require}>*</span>
            </Label>
            <Col md={5} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="diaChiHoKhau"
                name="diaChiHoKhau"
                placeholder="Số nhà/ khu phố, thôn, tên đường, ấp, tổ"
                type="text"
                {...register("diaChiHoKhau", {
                  required: {
                    value: true,
                    message: "Hộ khẩu thường trú là bắt buộc",
                  },
                })}
              />
              {errors && (
                <div className={classes.error}>
                  {errors.diaChiHoKhau?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="hoKhauMaTinhTp" md={4}>
              Tỉnh/Thành phố
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="hoKhauMaTinhTp"
                name="hoKhauMaTinhTp"
                type="select"
                {...register("hoKhauMaTinhTp", {
                  required: {
                    value: true,
                    message: "Tỉnh/Thành phố là bắt buộc",
                  },
                  onChange: (e) => {
                    if (districtsForHoKhau.length > 0) {
                      setDistrictsForHoKhau([]);
                      setValue("quanhuyen", "");
                      setWardsForHoKhau([]);
                      setValue("phuongxa", "");
                    }
                    onGetDistrictsForHoKhau(e.target.value);
                  },
                })}
              >
                <option value="">-- Chọn Tỉnh/Thành Phố --</option>
                {cityProvincesForHoKhau &&
                  cityProvincesForHoKhau.map((data, index) => (
                    <option key={index} value={data.maTinhTP}>
                      {data.tenTinhTP}
                    </option>
                  ))}
              </Input>
              {errors && (
                <div className={classes.error}>
                  {errors.hoKhauMaTinhTp?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="hoKhauMaQh" md={4}>
              Quận/Huyện
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="hoKhauMaQh"
                name="hoKhauMaQh"
                type="select"
                {...register("hoKhauMaQh", {
                  required: { value: true, message: "Quận/Huyện là bắt buộc" },
                  onChange: (e) => {
                    if (wardsForHoKhau.length > 0) {
                      setWardsForHoKhau([]);
                      setValue("phuongxa", "");
                    }
                    onGetWardsForHoKhau(e.target.value);
                  },
                })}
              >
                {districtsForHoKhau.length > 0 ? (
                  <React.Fragment>
                    <option value="">-- Chọn Quận/Huyện --</option>
                    {districtsForHoKhau &&
                      districtsForHoKhau.map((data, index) => (
                        <option key={index} value={data.maQH}>
                          {data.tenQH}
                        </option>
                      ))}
                    <option value={0}>Khác (ngoài danh sách trên)</option>
                  </React.Fragment>
                ) : (
                  ""
                )}
                F
              </Input>
              {errors && (
                <div className={classes.error}>
                  {errors.hoKhauMaQh?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="hoKhauMaPhuong" md={4}>
              Phường/Xã
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="hoKhauMaPhuong"
                name="hoKhauMaPhuong"
                type="select"
                {...register("hoKhauMaPhuong", {
                  required: { value: true, message: "Phường/Xã là bắt buộc" },
                })}
              >
                {districtsForHoKhau.length > 0 ? (
                  <React.Fragment>
                    <option value="">-- Chọn Phường/Xã --</option>
                    {wardsForHoKhau &&
                      wardsForHoKhau.map((data, index) => (
                        <option key={index} value={data.maPX}>
                          {data.tenPX}
                        </option>
                      ))}
                    <option value={0}>Khác (ngoài danh sách trên)</option>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </Input>
              {errors && (
                <div className={classes.error}>
                  {errors.hoKhauMaPhuong?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="namTotNghiep" md={4}>
              Năm tốt nghiệp
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="namTotNghiep"
                name="namTotNghiep"
                placeholder="2022"
                type="number"
                {...register("namTotNghiep", {
                  required: {
                    value: true,
                    message: "Năm tốt nghiệp là bắt buộc",
                  },
                  pattern: {
                    value: namTotNghiepPattern,
                    message: "Năm tốt nghiệp không hợp lệ",
                  },
                })}
              />
              {errors && (
                <div className={classes.error}>
                  {errors.namTotNghiep?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} md={4}>
              Học lực lớp 12
              <span className={classes.require}>*</span>
            </Label>
            <Col className={classes.radioError} md={5}>
              <div className={classes.radioError2}>
                <Input
                  className={classes.radioButton}
                  id="hoclucgioi"
                  name="hocLucLop12"
                  type="radio"
                  value="Giỏi"
                  {...register("hocLucLop12", {
                    required: {
                      value: true,
                      message: "Học lực lớp 12 là bắt buộc",
                    },
                  })}
                />
                <Label className={classes.labelRadio} for="hoclucgioi">
                  Giỏi
                </Label>

                <Input
                  className={classes.radioButton}
                  id="hocluckha"
                  name="hocLucLop12"
                  type="radio"
                  value="Khá"
                  {...register("hocLucLop12", {
                    required: {
                      value: true,
                      message: "Học lực lớp 12 là bắt buộc",
                    },
                  })}
                />
                <Label className={classes.labelRadio} for="hocluckha">
                  Khá
                </Label>

                <Input
                  className={classes.radioButton}
                  id="hocluctrungbinh"
                  name="hocLucLop12"
                  type="radio"
                  value="Trung bình"
                  {...register("hocLucLop12", {
                    required: {
                      value: true,
                      message: "Học lực lớp 12 là bắt buộc",
                    },
                  })}
                />
                <Label className={classes.labelRadio} for="hocluctrungbinh">
                  Trung Bình
                </Label>

                <Input
                  className={classes.radioButton}
                  id="hoclucyeu"
                  name="hocLucLop12"
                  type="radio"
                  value="Yếu"
                  {...register("hocLucLop12", {
                    required: {
                      value: true,
                      message: "Học lực lớp 12 là bắt buộc",
                    },
                  })}
                />
                <Label className={classes.labelRadio} for="hoclucyeu">
                  Yếu
                </Label>

                <Input
                  className={classes.radioButton}
                  id="hocluckhac"
                  name="hocLucLop12"
                  type="radio"
                  value="Khác"
                  {...register("hocLucLop12", {
                    required: {
                      value: true,
                      message: "Học lực lớp 12 là bắt buộc",
                    },
                  })}
                />
                <Label className={classes.labelRadio} for="hocluckhac">
                  Khác
                </Label>
              </div>
              {errors && (
                <div className={classes.error}>
                  {errors.hocLucLop12?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} md={4}>
              Hạnh kiểm lớp 12
              <span className={classes.require}>*</span>
            </Label>
            <Col className={classes.radioError} md={5}>
              <div className={classes.radioError2}>
                <Input
                  className={classes.radioButton}
                  id="hanhkiemtot"
                  name="hanhKiemLop12"
                  type="radio"
                  value="Tốt"
                  {...register("hanhKiemLop12", {
                    required: {
                      value: true,
                      message: "Hạnh kiểm lớp 12 là bắt buộc",
                    },
                  })}
                />
                <Label className={classes.labelRadio} for="hanhkiemtot">
                  Tốt
                </Label>

                <Input
                  className={classes.radioButton}
                  id="hanhkiemkha"
                  name="hanhKiemLop12"
                  type="radio"
                  value="Khá"
                  {...register("hanhKiemLop12", {
                    required: {
                      value: true,
                      message: "Hạnh kiểm lớp 12 là bắt buộc",
                    },
                  })}
                />
                <Label className={classes.labelRadio} for="hanhkiemkha">
                  Khá
                </Label>

                <Input
                  className={classes.radioButton}
                  id="hanhkiemtrungbinh"
                  name="hanhKiemLop12"
                  type="radio"
                  value="Trung bình"
                  {...register("hanhKiemLop12", {
                    required: {
                      value: true,
                      message: "Hạnh kiểm lớp 12 là bắt buộc",
                    },
                  })}
                />
                <Label className={classes.labelRadio} for="hanhkiemtrungbinh">
                  Trung Bình
                </Label>

                <Input
                  className={classes.radioButton}
                  id="hanhkiemyeu"
                  name="hanhKiemLop12"
                  type="radio"
                  value="Yếu"
                  {...register("hanhKiemLop12", {
                    required: {
                      value: true,
                      message: "Hạnh kiểm lớp 12 là bắt buộc",
                    },
                  })}
                />
                <Label className={classes.labelRadio} for="hanhkiemyeu">
                  Yếu
                </Label>

                <Input
                  className={classes.radioButton}
                  id="hanhkiemkhac"
                  name="hanhKiemLop12"
                  type="radio"
                  value="Khác"
                  {...register("hanhKiemLop12", {
                    required: {
                      value: true,
                      message: "Hạnh kiểm lớp 12 là bắt buộc",
                    },
                  })}
                />
                <Label className={classes.labelRadio} for="hanhkiemkhac">
                  Khác
                </Label>
              </div>
              {errors && (
                <div className={classes.error}>
                  {errors.hanhKiemLop12?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} md={4}>
              Thí sinh học theo chương trình
              <span className={classes.require}>*</span>
            </Label>
            <Col className={classes.radioError} md={5}>
              <div className={classes.radioError2}>
                <Input
                  className={classes.radioButton}
                  id="thpt"
                  name="loaiHinhTn"
                  type="radio"
                  value="THPT"
                  {...register("loaiHinhTn", {
                    required: {
                      value: true,
                      message: "Chương trình theo học là bắt buộc",
                    },
                  })}
                />
                <Label className={classes.labelRadio} for="thpt">
                  THPT
                </Label>
                <Input
                  className={classes.radioButton}
                  id="gdtx"
                  name="loaiHinhTn"
                  type="radio"
                  value="GDTX"
                  {...register("loaiHinhTn", {
                    required: {
                      value: true,
                      message: "Chương trình theo học là bắt buộc",
                    },
                  })}
                />
                <Label className={classes.labelRadio} for="gdtx">
                  GDTX
                </Label>
              </div>
              {errors && (
                <div className={classes.error}>
                  {errors.loaiHinhTn?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="truongThptMaTinhTp" md={4}>
              Trường THPT lớp 12 thuộc Tỉnh/TP
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="truongThptMaTinhTp"
                name="truongThptMaTinhTp"
                type="select"
                {...register("truongThptMaTinhTp", {
                  required: {
                    value: true,
                    message: "Tỉnh/TP trường THPT là bắt buộc",
                  },
                  onChange: (e) => {
                    if (districtsForSchool.length > 0) {
                      setDistrictsForSchool([]);
                      setValue("truongThptMaQh", "");
                      setSchools([]);
                      setValue("maTruongThpt", "");
                    }
                    setMaTinhTP(e.target.value);
                    onGetDistrictsForSchool(e.target.value);
                  },
                })}
              >
                <option value="">-- Chọn Tỉnh/Thành Phố --</option>
                {cityProvincesForSchool &&
                  cityProvincesForSchool.map((data, index) => (
                    <option key={index} value={data.maTinhTP}>
                      {data.tenTinhTP}
                    </option>
                  ))}
              </Input>
              {errors && (
                <div className={classes.error}>
                  {errors.truongThptMaTinhTp?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="truongThptMaQh" md={4}>
              Quận/Huyện
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="truongThptMaQh"
                name="truongThptMaQh"
                type="select"
                {...register("truongThptMaQh", {
                  required: {
                    value: true,
                    message: "Quận/Huyện trường THPT là bắt buộc",
                  },
                  onChange: (e) => {
                    if (schools.length > 0) {
                      setSchools([]);
                      setValue("maTruongThpt", "");
                    }
                    if (maTinhTP) {
                      onGetSchools(maTinhTP, e.target.value);
                    }
                  },
                })}
              >
                {districtsForSchool.length > 0 ? (
                  <React.Fragment>
                    <option value="">-- Chọn Quận/Huyện --</option>
                    {districtsForSchool &&
                      districtsForSchool.map((data, index) => (
                        <option key={index} value={data.maQH}>
                          {data.tenQH}
                        </option>
                      ))}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </Input>
              {errors && (
                <div className={classes.error}>
                  {errors.truongThptMaQh?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="maTruongThpt" md={4}>
              Tên trường THPT
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="maTruongThpt"
                name="maTruongThpt"
                type="select"
                {...register("maTruongThpt", {
                  required: {
                    value: true,
                    message: "Tên trường THPT là bắt buộc",
                  },
                })}
              >
                {schools.length > 0 ? (
                  <React.Fragment>
                    <option value="">-- Chọn Trường THPT --</option>
                    {schools &&
                      schools.map((data, index) => (
                        <option key={index} value={data.maTruong}>
                          {data.maTruong} - {data.tenTruong}
                        </option>
                      ))}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </Input>
              {errors && (
                <div className={classes.error}>
                  {errors.maTruongThpt?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="tenLop12" md={4}>
              Tên lớp 12
              <span className={classes.require}>*</span>
            </Label>
            <Col md={2} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="tenLop12"
                name="tenLop12"
                placeholder="Tên lớp 12"
                type="text"
                {...register("tenLop12", {
                  required: { value: true, message: "Tên lớp 12 là bắt buộc" },
                })}
              />
              <div style={{ fontSize: "13px", color: "#777" }}>
                (Ví dụ: lớp 12A1)
              </div>
              {errors && (
                <div className={classes.error}>{errors.tenLop12?.message}</div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="khuVuc" md={4}>
              Khu vực
            </Label>
            <Col md={2} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="khuVuc"
                name="khuVuc"
                type="select"
                {...register("khuVuc")}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2NT">2NT</option>
                <option value="3">3</option>
              </Input>
            </Col>

            <Label
              className={classes.label}
              for="doiTuongUuTien"
              md={2}
              style={{}}
            >
              Đối tượng ưu tiên
            </Label>
            <Col md={2}>
              <Input
                className={classes.fieldInput}
                id="doiTuongUuTien"
                name="doiTuongUuTien"
                type="select"
                {...register("doiTuongUuTien")}
              >
                <option value={0}>Không có</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>

        <div style={{ paddingTop: "30px" }}>
          <div className={classes.subSection}>B. THÔNG TIN LIÊN HỆ</div>
        </div>
        <hr className={classes.line} />
        <FormGroup>
          <Row>
            <Label className={classes.label} for="diaChiLienLac" md={4}>
              Địa chỉ gửi thư báo kết quả
              <span className={classes.require}>*</span>
            </Label>
            <Col md={5} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="diaChiLienLac"
                name="diaChiLienLac"
                placeholder="Số nhà, Tên đường"
                type="text"
                {...register("diaChiLienLac", {
                  required: {
                    value: true,
                    message: "Địa chỉ liên hệ là bắt buộc",
                  },
                })}
              />
              {errors && (
                <div className={classes.error}>
                  {errors.diaChiLienLac?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="lienLacMaTp" md={4}>
              Tỉnh/Thành phố
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="lienLacMaTp"
                name="lienLacMaTp"
                type="select"
                {...register("lienLacMaTp", {
                  required: {
                    value: true,
                    message: "Tỉnh/Thành phố liên hệ là bắt buộc",
                  },
                  onChange: (e) => {
                    if (districtsForHome.length > 0) {
                      setDistrictsForHome([]);
                      setValue("lienLacMaQh", "");
                      setWardsForHome([]);
                      setValue("lienLacMaPhuongXa", "");
                    }
                    onGetDistrictsForHome(e.target.value);
                  },
                })}
              >
                <option value="">-- Chọn Tỉnh/Thành Phố --</option>
                {cityProvincesForHome &&
                  cityProvincesForHome.map((data, index) => (
                    <option key={index} value={data.maTinhTP}>
                      {data.tenTinhTP}
                    </option>
                  ))}
              </Input>
              {errors && (
                <div className={classes.error}>
                  {errors.lienLacMaTp?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="lienLacMaQh" md={4}>
              Quận/Huyện
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="lienLacMaQh"
                name="lienLacMaQh"
                type="select"
                {...register("lienLacMaQh", {
                  required: {
                    value: true,
                    message: "Quận/Huyện liên hệ là bắt buộc",
                  },
                  onChange: (e) => {
                    if (wardsForHome.length > 0) {
                      setWardsForHome([]);
                      setValue("lienLacMaPhuongXa", "");
                    }
                    onGetWardsForHome(e.target.value);
                  },
                })}
              >
                {districtsForHome.length > 0 ? (
                  <React.Fragment>
                    <option value="">-- Chọn Quận/Huyện --</option>
                    {districtsForHome &&
                      districtsForHome.map((data, index) => (
                        <option key={index} value={data.maQH}>
                          {data.tenQH}
                        </option>
                      ))}
                    <option value={0}>Khác (ngoài danh sách trên)</option>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </Input>
              {errors && (
                <div className={classes.error}>
                  {errors.lienLacMaQh?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="lienLacMaPhuongXa" md={4}>
              Phường/Xã
              <span className={classes.require}>*</span>
            </Label>
            <Col md={3} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="lienLacMaPhuongXa"
                name="lienLacMaPhuongXa"
                type="select"
                {...register("lienLacMaPhuongXa", {
                  required: {
                    value: true,
                    message: "Phường/Xã liên hệ là bắt buộc",
                  },
                })}
              >
                {districtsForHome.length > 0 ? (
                  <React.Fragment>
                    <option value="">-- Chọn Phường/Xã --</option>
                    {wardsForHome &&
                      wardsForHome.map((data, index) => (
                        <option key={index} value={data.maPX}>
                          {data.tenPX}
                        </option>
                      ))}
                    <option value={0}>Khác (ngoài danh sách trên)</option>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </Input>
              {errors && (
                <div className={classes.error}>
                  {errors.lienLacMaPhuongXa?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="dienThoaiDd" md={4}>
              Điện thoại di động
              <span className={classes.require}>*</span>
            </Label>
            <Col md={5} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="dienThoaiDd"
                name="dienThoaiDd"
                placeholder="Điện thoại di động"
                type="text"
                {...register("dienThoaiDd", {
                  required: {
                    value: true,
                    message: "Điện thoại di động là bắt buộc",
                  },
                  pattern: {
                    value: phoneNumberPattern,
                    message: "Số điện thoại không hợp lệ",
                  },
                })}
              />
              {errors && (
                <div className={classes.error}>
                  {errors.dienThoaiDd?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="email" md={4}>
              Email
              <span className={classes.require}>*</span>
            </Label>
            <Col md={5} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="email"
                name="email"
                placeholder="Email liên lạc"
                type="text"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email liên lạc là bắt buột",
                  },
                  pattern: {
                    value: emailPattern,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              <div style={{ fontSize: "13px", color: "#777" }}>
                (Nhà trường sẽ gửi Mã hồ sơ qua email này)
              </div>
              {errors && (
                <div className={classes.error}>{errors.email?.message}</div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="dienThoaiPhuHuynh" md={4}>
              Điện thoại phụ huynh
              <span className={classes.require}>*</span>
            </Label>
            <Col md={5} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="dienThoaiPhuHuynh"
                name="dienThoaiPhuHuynh"
                placeholder="Điện thoại phụ huynh"
                type="text"
                {...register("dienThoaiPhuHuynh", {
                  required: {
                    value: true,
                    message: "Điện thoại phụ huynh là bắt buộc",
                  },
                  pattern: {
                    value: phoneNumberPattern,
                    message: "Số điện thoại không hợp lệ",
                  },
                })}
              />
              <div style={{ fontSize: "13px", color: "#777" }}>
                (Trường hợp không liên lạc được với thí sinh, nhà Trường sẽ liên
                lạc qua số này)
              </div>
              {errors && (
                <div className={classes.error}>
                  {errors.dienThoaiPhuHuynh?.message}
                </div>
              )}
            </Col>
          </Row>
        </FormGroup>

        <div style={{ paddingTop: "30px" }}>
          <div className={classes.section}>THÔNG TIN XÉT TUYỂN</div>
          <div className={classes.subSection}>
            A. THÍ SINH CHỌN 1 TRONG 2 PHƯƠNG ÁN DƯỚI ĐÂY
          </div>
        </div>
        <hr className={classes.line} />
        <FormGroup>
          <Row>
            <Col
              md={4}
              style={{
                paddingLeft: "25px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  className={classes.radioButton}
                  id="phuongAn1"
                  name="phuongAn"
                  type="radio"
                  value="1"
                  onClick={() => setPhuongAn("1")}
                  {...register("phuongAn")}
                />
                <Label className={classes.labelRadio} for="phuongAn1">
                  Phương án 1
                </Label>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  className={classes.radioButton}
                  id="phuongAn2"
                  name="phuongAn"
                  type="radio"
                  value="2"
                  onClick={() => setPhuongAn("2")}
                  {...register("phuongAn")}
                />
                <Label className={classes.labelRadio} for="phuongAn2">
                  Phương án 2
                </Label>
              </div>
            </Col>
          </Row>
        </FormGroup>
        {phuongAn == "1" ? (
          <FormGroup>
            <Row>
              <Col>
                <Label
                  className={classes.label + " " + classes.labelSmall}
                  for="diemCnlop11"
                  md={3}
                >
                  Điểm{" "}
                  <span style={{ textDecoration: "underline" }}>
                    TB cả năm lớp 11
                  </span>
                  <span className={classes.require}>*</span>
                </Label>
                <div></div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ScoresTable
                    diemtoan={register("diemCnlop11.diemtoan", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemvan={register("diemCnlop11.diemvan", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemanh={register("diemCnlop11.diemanh", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemphap={register("diemCnlop11.diemphap", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemly={register("diemCnlop11.diemly", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemhoa={register("diemCnlop11.diemhoa", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemsinh={register("diemCnlop11.diemsinh", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemsu={register("diemCnlop11.diemsu", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemdia={register("diemCnlop11.diemdia", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemgdcd={register("diemCnlop11.diemgdcd", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                  />
                  {errors.diemCnlop11 &&
                    (errors.diemCnlop11?.diemtoan ||
                      errors.diemCnlop11?.diemvan ||
                      errors.diemCnlop11?.diemanh ||
                      errors.diemCnlop11?.diemphap ||
                      errors.diemCnlop11?.diemly ||
                      errors.diemCnlop11?.diemhoa ||
                      errors.diemCnlop11?.diemsinh ||
                      errors.diemCnlop11?.diemsu ||
                      errors.diemCnlop11?.diemdia ||
                      errors.diemCnlop11?.diemgdcd) && (
                      <div className={classes.error}>
                        Điểm các môn học phải từ 0-10. Ví dụ: 7.5
                      </div>
                    )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <Label
                  className={classes.label + " " + classes.labelSmall}
                  for="diemHk1lop12"
                  md={3}
                >
                  Điểm{" "}
                  <span style={{ textDecoration: "underline" }}>
                    HK1 năm học lớp 12
                  </span>
                  <span className={classes.require}>*</span>
                </Label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ScoresTable
                    diemtoan={register("diemHk1lop12.diemtoan", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemvan={register("diemHk1lop12.diemvan", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemanh={register("diemHk1lop12.diemanh", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemphap={register("diemHk1lop12.diemphap", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemly={register("diemHk1lop12.diemly", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemhoa={register("diemHk1lop12.diemhoa", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemsinh={register("diemHk1lop12.diemsinh", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemsu={register("diemHk1lop12.diemsu", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemdia={register("diemHk1lop12.diemdia", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemgdcd={register("diemHk1lop12.diemgdcd", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                  />
                  {errors.diemHk1lop12 &&
                    (errors.diemHk1lop12?.diemtoan ||
                      errors.diemHk1lop12?.diemvan ||
                      errors.diemHk1lop12?.diemanh ||
                      errors.diemHk1lop12?.diemphap ||
                      errors.diemHk1lop12?.diemly ||
                      errors.diemHk1lop12?.diemhoa ||
                      errors.diemHk1lop12?.diemsinh ||
                      errors.diemHk1lop12?.diemsu ||
                      errors.diemHk1lop12?.diemdia ||
                      errors.diemHk1lop12?.diemgdcd) && (
                      <div className={classes.error}>
                        Điểm các môn học phải từ 0-10. Ví dụ: 7.5
                      </div>
                    )}
                </div>
              </Col>
            </Row>
          </FormGroup>
        ) : (
          <FormGroup>
            <Row>
              <Col>
                <Label
                  className={classes.label + " " + classes.labelSmall}
                  for="diemCnlop12"
                  md={3}
                >
                  Điểm{" "}
                  <span style={{ textDecoration: "underline" }}>
                    TB cả năm lớp 12
                  </span>
                  <span className={classes.require}>*</span>
                </Label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ScoresTable
                    diemtoan={register("diemCnlop12.diemtoan", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemvan={register("diemCnlop12.diemvan", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemanh={register("diemCnlop12.diemanh", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemphap={register("diemCnlop12.diemphap", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemly={register("diemCnlop12.diemly", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemhoa={register("diemCnlop12.diemhoa", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemsinh={register("diemCnlop12.diemsinh", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemsu={register("diemCnlop12.diemsu", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemdia={register("diemCnlop12.diemdia", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                    diemgdcd={register("diemCnlop12.diemgdcd", {
                      required: true,
                      pattern: diemPattern,
                      min: 0,
                      max: 10,
                    })}
                  />
                  {errors.diemCnlop12 &&
                    (errors.diemCnlop12?.diemtoan ||
                      errors.diemCnlop12?.diemvan ||
                      errors.diemCnlop12?.diemanh ||
                      errors.diemCnlop12?.diemphap ||
                      errors.diemCnlop12?.diemly ||
                      errors.diemCnlop12?.diemhoa ||
                      errors.diemCnlop12?.diemsinh ||
                      errors.diemCnlop12?.diemsu ||
                      errors.diemCnlop12?.diemdia ||
                      errors.diemCnlop12?.diemgdcd) && (
                      <div className={classes.error}>
                        Điểm các môn học phải từ 0-10. Ví dụ: 7.5
                      </div>
                    )}
                </div>
              </Col>
            </Row>
          </FormGroup>
        )}
        <FormGroup>
          <Row style={{ marginTop: "30px" }}>
            <Label className={classes.label} for="maCcnn" md={3}>
              Chứng chỉ ngoại ngữ <i>(nếu có)</i>
            </Label>
            <Col md={4} style={{ paddingLeft: "25px" }}>
              <Input
                className={classes.fieldInput}
                id="maCcnn"
                name="maCcnn"
                type="select"
                {...register("maCcnn")}
              >
                <option value="">-- Chọn Chứng chỉ ngoại ngữ --</option>
                {certificateLanguages &&
                  certificateLanguages.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.chungChi} - quy đổi: {data.diemQuiDoi}đ
                    </option>
                  ))}
              </Input>
            </Col>
          </Row>
        </FormGroup>

        <div style={{ paddingTop: "30px" }}>
          <div className={classes.subSection}>B. NGÀNH ĐĂNG KÝ XÉT TUYỂN</div>
        </div>
        <hr className={classes.line} />
        <FormGroup>
          <Row
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Col md={4} style={{ paddingLeft: "25px" }}>
              <Label
                className={classes.label + " " + classes.labelSmall}
                for="maNganh1"
              >
                Ngành xét tuyển ưu tiên 1
              </Label>
              <Input
                className={classes.fieldInput}
                id="maNganh1"
                name="maNganh1"
                type="select"
                {...register("maNganh1", {
                  required: {
                    value: true,
                    message: "Ngành xét tuyển ưu tiên 1 là bắt buộc",
                  },
                  onChange: (e) => {
                    if (toHop1.length > 0) {
                      setToHop1([]);
                      setValue("maToHop1", "");
                      setValue("chuongTrinhHoc1", "");
                    }
                    setIsSpecialProgram1(
                      specialProgramList.includes(e.target.value)
                    );
                    onGetToHopXetTuyen(e.target.value)
                      .then((response) => {
                        setToHop1(response.data);
                      })
                      .catch((error) => console.log(error));
                  },
                })}
              >
                <option value="">-- Chọn ngành xét tuyển ưu tiên 1 --</option>
                {maNganh1 &&
                  maNganh1.map((data, index) => (
                    <option key={index} value={data.maNganh}>
                      {data.tenNganh}
                    </option>
                  ))}
              </Input>
              {errors && (
                <div className={classes.error}>{errors.maNganh1?.message}</div>
              )}
            </Col>

            <Col md={3}>
              <Label
                className={classes.label + " " + classes.labelSmall}
                for="maToHop1"
              >
                Tổ hợp môn
              </Label>
              <Input
                className={classes.fieldInput}
                id="maToHop1"
                name="maToHop1"
                type="select"
                {...register("maToHop1", {
                  required: { value: true, message: "Tổ hợp môn là bắt buộc" },
                })}
              >
                <option value="">-- Chọn tổ hợp môn --</option>
                {toHop1 &&
                  toHop1.map((data, index) => (
                    <option key={index} value={data.maToHop}>
                      {data.maToHop} - {data.tenToHop}
                    </option>
                  ))}
              </Input>
              {errors && (
                <div className={classes.error}>{errors.maToHop1?.message}</div>
              )}
            </Col>

            <Col className={classes.containerProgram} md={3}>
              {isSpecialProgram1 ? (
                <React.Fragment>
                  <a
                    className={classes.programLabel}
                    href="https://tuyensinh.vanlanguni.edu.vn/co-bao-nhieu-lua-chon-xet-tuyen-dai-hoc-cho-ban-tai-truong-dai-hoc-van-lang/"
                    target="_blank"
                  >
                    Chọn chương trình học
                  </a>
                  <div className={classes.subContainerProgram}>
                    <Input
                      className={classes.radioButton}
                      id="chuongtrinhtieuchuan1"
                      name="chuongTrinhHoc1"
                      type="radio"
                      value="Tiêu chuẩn"
                      {...register("chuongTrinhHoc1", {
                        required: {
                          value: true,
                          message: "Chương trình học là bắt buộc",
                        },
                      })}
                    />
                    <Label
                      className={classes.labelRadio}
                      for="chuongtrinhtieuchuan1"
                    >
                      Tiêu chuẩn
                    </Label>
                  </div>

                  <div className={classes.subContainerProgram}>
                    <Input
                      className={classes.radioButton}
                      id="chuongtrinhdacbiet1"
                      name="chuongTrinhHoc1"
                      type="radio"
                      value="Đặc biệt"
                      {...register("chuongTrinhHoc1", {
                        required: {
                          value: true,
                          message: "Chương trình học là bắt buộc",
                        },
                      })}
                    />
                    <Label
                      className={classes.labelRadio}
                      for="chuongtrinhdacbiet1"
                    >
                      Đặc biệt
                    </Label>
                  </div>

                  {errors && (
                    <div className={classes.error}>
                      {errors.chuongTrinhHoc1?.message}
                    </div>
                  )}
                </React.Fragment>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Col md={4} style={{ paddingLeft: "25px" }}>
              <Label
                className={classes.label + " " + classes.labelSmall}
                for="maNganh2"
              >
                Ngành xét tuyển ưu tiên 2
              </Label>
              <Input
                className={classes.fieldInput}
                id="maNganh2"
                name="maNganh2"
                type="select"
                {...register("maNganh2", {
                  onChange: (e) => {
                    if (toHop2.length > 0) {
                      setToHop2([]);
                      setValue("maToHop2", "");
                      setValue("chuongTrinhHoc2", "");
                    }
                    setIsSpecialProgram2(
                      specialProgramList.includes(e.target.value)
                    );
                    onGetToHopXetTuyen(e.target.value)
                      .then((response) => {
                        setToHop2(response.data);
                      })
                      .catch((error) => console.log(error));
                  },
                })}
              >
                <option value="">-- Chọn ngành xét tuyển ưu tiên 2 --</option>
                {maNganh2 &&
                  maNganh2.map((data, index) => (
                    <option key={index} value={data.maNganh}>
                      {data.tenNganh}
                    </option>
                  ))}
              </Input>
            </Col>

            <Col md={3}>
              <Label
                className={classes.label + " " + classes.labelSmall}
                for="maToHop2"
              >
                Tổ hợp môn
              </Label>
              <Input
                className={classes.fieldInput}
                id="maToHop2"
                name="maToHop2"
                type="select"
                {...register("maToHop2")}
              >
                <option value="">-- Chọn tổ hợp môn --</option>
                {toHop2 &&
                  toHop2.map((data, index) => (
                    <option key={index} value={data.maToHop}>
                      {data.maToHop} - {data.tenToHop}
                    </option>
                  ))}
              </Input>
            </Col>

            <Col className={classes.containerProgram} md={3}>
              {isSpecialProgram2 ? (
                <React.Fragment>
                  <a
                    className={classes.programLabel}
                    href="https://tuyensinh.vanlanguni.edu.vn/co-bao-nhieu-lua-chon-xet-tuyen-dai-hoc-cho-ban-tai-truong-dai-hoc-van-lang/"
                    target="_blank"
                  >
                    Chọn chương trình học
                  </a>
                  <div className={classes.subContainerProgram}>
                    <Input
                      className={classes.radioButton}
                      id="chuongtrinhtieuchuan2"
                      name="chuongTrinhHoc2"
                      type="radio"
                      value="Tiêu chuẩn"
                      {...register("chuongTrinhHoc2")}
                    />
                    <Label
                      className={classes.labelRadio}
                      for="chuongtrinhtieuchuan2"
                    >
                      Tiêu chuẩn
                    </Label>
                  </div>

                  <div className={classes.subContainerProgram}>
                    <Input
                      className={classes.radioButton}
                      id="chuongtrinhdacbiet2"
                      name="chuongTrinhHoc2"
                      type="radio"
                      value="Đặc biệt"
                      {...register("chuongTrinhHoc2")}
                    />
                    <Label
                      className={classes.labelRadio}
                      for="chuongtrinhdacbiet2"
                    >
                      Đặc biệt
                    </Label>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Col md={4} style={{ paddingLeft: "25px" }}>
              <Label
                className={classes.label + " " + classes.labelSmall}
                for="maNganh3"
              >
                Ngành xét tuyển ưu tiên 3
              </Label>
              <Input
                className={classes.fieldInput}
                id="maNganh3"
                name="maNganh3"
                type="select"
                {...register("maNganh3", {
                  onChange: (e) => {
                    if (toHop3.length > 0) {
                      setToHop3([]);
                      setValue("maToHop3", "");
                      setValue("chuongTrinhHoc3", "");
                    }
                    setIsSpecialProgram3(
                      specialProgramList.includes(e.target.value)
                    );
                    onGetToHopXetTuyen(e.target.value)
                      .then((response) => {
                        setToHop3(response.data);
                      })
                      .catch((error) => console.log(error));
                  },
                })}
              >
                <option value="">-- Chọn ngành xét tuyển ưu tiên 3 --</option>
                {maNganh3 &&
                  maNganh3.map((data, index) => (
                    <option key={index} value={data.maNganh}>
                      {data.tenNganh}
                    </option>
                  ))}
              </Input>
            </Col>

            <Col md={3}>
              <Label
                className={classes.label + " " + classes.labelSmall}
                for="maToHop3"
              >
                Tổ hợp môn
              </Label>
              <Input
                className={classes.fieldInput}
                id="maToHop3"
                name="maToHop3"
                type="select"
                {...register("maToHop3")}
              >
                <option value="">-- Chọn tổ hợp môn --</option>
                {toHop3 &&
                  toHop3.map((data, index) => (
                    <option key={index} value={data.maToHop}>
                      {data.maToHop} - {data.tenToHop}
                    </option>
                  ))}
              </Input>
            </Col>

            <Col className={classes.containerProgram} md={3}>
              {isSpecialProgram3 ? (
                <React.Fragment>
                  <a
                    className={classes.programLabel}
                    href="https://tuyensinh.vanlanguni.edu.vn/co-bao-nhieu-lua-chon-xet-tuyen-dai-hoc-cho-ban-tai-truong-dai-hoc-van-lang/"
                    target="_blank"
                  >
                    Chọn chương trình học
                  </a>
                  <div className={classes.subContainerProgram}>
                    <Input
                      className={classes.radioButton}
                      id="chuongtrinhtieuchuan3"
                      name="chuongTrinhHoc3"
                      type="radio"
                      value="Tiêu chuẩn"
                      {...register("chuongTrinhHoc3")}
                    />
                    <Label
                      className={classes.labelRadio}
                      for="chuongtrinhtieuchuan3"
                    >
                      Tiêu chuẩn
                    </Label>
                  </div>

                  <div className={classes.subContainerProgram}>
                    <Input
                      className={classes.radioButton}
                      id="chuongtrinhdacbiet3"
                      name="chuongTrinhHoc3"
                      type="radio"
                      value="Đặc biệt"
                      {...register("chuongTrinhHoc3")}
                    />
                    <Label
                      className={classes.labelRadio}
                      for="chuongtrinhdacbiet3"
                    >
                      Đặc biệt
                    </Label>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </FormGroup>

        <hr className={classes.line} style={{ marginTop: "30px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            paddingTop: "50px",
            paddingBottom: "20px",
          }}
        >
          <Button className={classes.submit} type="submit">
            LƯU THAY ĐỔI
          </Button>
          <Button
            className={classes.downloadFiles}
            onClick={handleDownloadAdmissionFiles}
          >
            TẢI HỌC BẠ
          </Button>
          <Button className={classes.receiveProfile} onClick={handleOpenDialog}>
            NHẬN HỒ SƠ
          </Button>
          <Button className={classes.sendMail} onClick={handleOpenModal}>
            GỬI MAIL TRÚNG TUYỂN
          </Button>
          <Button className={classes.cancel} onClick={() => navigate(-1)}>
            QUAY LẠI
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default React.memo(EditData);
