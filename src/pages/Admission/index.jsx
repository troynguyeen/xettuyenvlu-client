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
  GetPhase,
  ValidatePhaseIsExpired,
  GetNotificationForPhaseIsExpired,
} from "../../services/admissionService";
import ScoresTable from "./components/ScoresTable";
import Input from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";

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
  notificationExpired: {
    backgroundColor: "#FFF",
    padding: "50px",
    margin: "50px",
  },
  title: {
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
  button: {
    padding: "7px 15px",
    border: 0,
    backgroundColor: "#26a69a",
    "&:hover": {
      backgroundColor: "#1f897f",
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
  hovaten: "",
  gioitinh: "",
  ngaysinh: "",
  noisinh: "",
  dantoc: "",
  tongiao: "",
  cmnd: "",
  quoctich: 704,
  hokhauthuongtru: "",
  tinhthanhpho: "",
  quanhuyen: "",
  phuongxa: "",
  namtotnghiep: "",
  hocluclop12: "",
  hanhkiemlop12: "",
  hocchuongtrinh: "",
  tinhthanhpho_thpt: "",
  quanhuyen_thpt: "",
  tentruongthpt: "",
  tenlop12: "",
  khuvucuutien: "3",
  doituonguutien: "0",
  sudunghokhau: false,
  diachinha: "",
  tinhthanhpho_nha: "",
  quanhuyen_nha: "",
  phuongxa_nha: "",
  dienthoaididong: "",
  email: "",
  dienthoaiphuhuynh: "",
  phuongan: "1",
  diemtb_cnlop11: {
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
  diemtb_hk1lop12: {
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
  diemtb_cnlop12: {
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
  chungchingoaingu: "",
  nganh1: "",
  tohopmon1: "",
  chuongtrinh1: "",
  nganh2: "",
  tohopmon2: "",
  chuongtrinh2: "",
  nganh3: "",
  tohopmon3: "",
  chuongtrinh3: "",
};

const Admission = (props) => {
  let navigate = useNavigate();
  const classes = useStyles();
  const [data, setData] = useState(dataForm);
  const [phase, setPhase] = useState({
    id: 0,
    namXetTuyen: "",
    khoa: "",
    thuTuDot: "",
  });
  const [isPhaseExpired, setIsPhaseExpired] = useState(false);
  const [notificationForExpired, setNotificationForExpired] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      ...dataForm,
    },
  });
  const [isHaveData, setIsHaveData] = useState(false);
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
  const [nganh1, setNganh1] = useState([]);
  const [toHop1, setToHop1] = useState([]);
  const [isSpecialProgram1, setIsSpecialProgram1] = useState(false);
  const [nganh2, setNganh2] = useState([]);
  const [toHop2, setToHop2] = useState([]);
  const [isSpecialProgram2, setIsSpecialProgram2] = useState(false);
  const [nganh3, setNganh3] = useState([]);
  const [toHop3, setToHop3] = useState([]);
  const [isSpecialProgram3, setIsSpecialProgram3] = useState(false);
  const [specialProgramList, setSpecialProgramList] = useState([]);
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phoneNumberPattern =
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const namTotNghiepPattern = /^(19[5-9]\d|20[0-9]\d|2100)$/;
  const diemPattern = /^[+-]?\d+(\.\d+)?$/;

  useEffect(() => {
    props.setIsLoading(true);
    ValidatePhaseIsExpired()
      .then((response) => {
        setIsPhaseExpired(response.data);
      })
      .catch((error) => console.log(error));

    GetPhase()
      .then((response) => {
        setPhase(response.data);
      })
      .catch((error) => console.log(error));

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
        const quoctich = getValues("quoctich");
        setTimeout(() => setValue("quoctich", quoctich), 100);
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
        setNganh1(response.data);
        setNganh2(response.data);
        setNganh3(response.data);

        var listMajor = [];
        response.data.map((element) => {
          if (element.ctdb) {
            listMajor.push(element.maNganh);
          }
        });
        setSpecialProgramList(listMajor);
        setTimeout(() => props.setIsLoading(false), 1000);
      })
      .catch((error) => {
        setTimeout(() => props.setIsLoading(false), 1000);
        console.log(error);
      });

    //Get data from sessionStorage
    const dataSession = JSON.parse(sessionStorage.getItem("data"));
    if (dataSession !== null) {
      setIsHaveData(true);
      setData({ ...data, ...dataSession });
    }
  }, []);

  //Will run if phase is expired
  useEffect(() => {
    if (isPhaseExpired) {
      GetNotificationForPhaseIsExpired()
        .then((response) => {
          setNotificationForExpired(response.data.content);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isPhaseExpired]);

  //Reset data to the data on sessionStorage
  useEffect(() => {
    if (isHaveData) {
      onGetDataForDropdownList();
      setTimeout(() => reset(data), 200);
    }
  }, [isHaveData]);

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
    if (data.tinhthanhpho !== "") {
      onGetDistrictsForHoKhau(data.tinhthanhpho);
    }
    if (data.quanhuyen !== "") {
      onGetWardsForHoKhau(data.quanhuyen);
    }

    //Truong THPT
    if (data.tinhthanhpho_thpt !== "") {
      onGetDistrictsForSchool(data.tinhthanhpho_thpt);
    }
    if (data.tinhthanhpho_thpt !== "" && data.quanhuyen_thpt !== "") {
      onGetSchools(data.tinhthanhpho_thpt, data.quanhuyen_thpt);
    }

    //Home
    if (data.tinhthanhpho_nha) {
      onGetDistrictsForHome(data.tinhthanhpho_nha);
    }
    if (data.quanhuyen_nha) {
      onGetWardsForHome(data.quanhuyen_nha);
    }

    //Phuong an
    if (data.phuongan !== "") {
      setPhuongAn(data.phuongan);
      setValue("phuongan", data.phuongan);
    }

    //Nganh
    if (data.nganh1) {
      onGetToHopXetTuyen(data.nganh1)
        .then((response) => {
          setToHop1(response.data);
        })
        .catch((error) => console.log(error));
    }
    if (data.nganh2) {
      onGetToHopXetTuyen(data.nganh2)
        .then((response) => {
          setToHop2(response.data);
        })
        .catch((error) => console.log(error));
    }
    if (data.nganh3) {
      onGetToHopXetTuyen(data.nganh3)
        .then((response) => {
          setToHop3(response.data);
        })
        .catch((error) => console.log(error));
    }

    //Chuong trinh
    if (data.chuongtrinh1 !== "") {
      setIsSpecialProgram1(true);
    }
    if (data.chuongtrinh2 !== "") {
      setIsSpecialProgram2(true);
    }
    if (data.chuongtrinh3 !== "") {
      setIsSpecialProgram3(true);
    }
  }, [
    data.tinhthanhpho,
    data.quanhuyen,
    data.tinhthanhpho_thpt,
    data.quanhuyen_thpt,
    data.tinhthanhpho_nha,
    data.quanhuyen_nha,
    data.phuongan,
    data.nganh1,
    data.nganh2,
    data.nganh3,
    data.chuongtrinh1,
    data.chuongtrinh2,
    data.chuongtrinh3,
  ]);

  const onUseHoKhau = async () => {
    const sudunghokhau = getValues("sudunghokhau");
    const hokhauthuongtru = getValues("hokhauthuongtru");
    const tinhthanhpho = getValues("tinhthanhpho");
    const quanhuyen = getValues("quanhuyen");
    const phuongxa = getValues("phuongxa");

    if (sudunghokhau) {
      await setDistrictsForHome(districtsForHoKhau);
      await setWardsForHome(wardsForHoKhau);
      setValue("diachinha", hokhauthuongtru);
      setValue("tinhthanhpho_nha", tinhthanhpho);
      setValue("quanhuyen_nha", quanhuyen);
      setValue("phuongxa_nha", phuongxa);

      if (hokhauthuongtru) {
        clearErrors("diachinha");
      }
      if (tinhthanhpho) {
        clearErrors("tinhthanhpho_nha");
      }
      if (quanhuyen) {
        clearErrors("quanhuyen_nha");
      }
      if (phuongxa) {
        clearErrors("phuongxa_nha");
      }
    }
  };

  const onValidateBeforeSaving = (data) => {
    if (isSpecialProgram2) {
      if (data.tohopmon2 === "" || data.chuongtrinh2 === "") {
        data.nganh2 = "";
        data.tohopmon2 = "";
        data.chuongtrinh2 = "";
      }
    } else {
      if (data.tohopmon2 === "") {
        data.nganh2 = "";
        data.tohopmon2 = "";
      }
    }

    if (isSpecialProgram3) {
      if (data.tohopmon3 === "" || data.chuongtrinh3 === "") {
        data.nganh3 = "";
        data.tohopmon3 = "";
        data.chuongtrinh3 = "";
      }
    } else {
      if (data.tohopmon3 === "") {
        data.nganh3 = "";
        data.tohopmon3 = "";
      }
    }
  };

  const onReview = (data) => {
    onValidateBeforeSaving(data);
    sessionStorage.setItem(
      "data",
      JSON.stringify({ ...data, dotId: phase.id })
    );
    props.setDataAdmission(data);
    navigate("/preview", { replace: true });
  };

  const onError = (error) => {
    console.log("error", error);
  };

  return (
    <Container className={classes.container}>
      <div className={classes.containerTitle}>
        <div className={classes.title}>
          ????NG K?? X??T TUY???N {phase.namXetTuyen}
        </div>
        <div className={classes.subTitle}>
          (D??nh cho th?? sinh x??t k???t qu??? h???c b??? THPT - ?????t {phase.thuTuDot})
        </div>
      </div>
      {isPhaseExpired && notificationForExpired !== "" ? (
        <div
          className={classes.notificationExpired}
          dangerouslySetInnerHTML={{ __html: notificationForExpired }}
        />
      ) : (
        <Form
          className={classes.containerForm}
          onSubmit={handleSubmit(onReview, onError)}
        >
          <div>
            <div className={classes.section}>TH??NG TIN TH?? SINH</div>
            <div className={classes.subSection}>A. TH??NG TIN C?? NH??N</div>
          </div>
          <hr className={classes.line} />
          <FormGroup>
            <Row>
              <Label className={classes.label} for="hovaten" md={4}>
                H??? v?? t??n
                <span className={classes.require}>*</span>
              </Label>
              <Col md={5} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  placeholder="NGUY???N V??N A"
                  id="hovaten"
                  name="hovaten"
                  type="text"
                  {...register("hovaten", {
                    required: { value: true, message: "H??? v?? t??n l?? b???t bu???c" },
                  })}
                />
                {errors && (
                  <div className={classes.error}>{errors.hovaten?.message}</div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} md={4}>
                Gi???i t??nh
                <span className={classes.require}>*</span>
              </Label>
              <Col className={classes.radioError} md={5}>
                <div className={classes.radioError2}>
                  <Input
                    className={classes.radioButton}
                    id="nam"
                    name="gioitinh"
                    type="radio"
                    value="1"
                    {...register("gioitinh", {
                      required: {
                        value: true,
                        message: "Gi???i t??nh l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="nam">
                    Nam
                  </Label>
                  <Input
                    className={classes.radioButton}
                    id="nu"
                    name="gioitinh"
                    type="radio"
                    value="0"
                    {...register("gioitinh", {
                      required: {
                        value: true,
                        message: "Gi???i t??nh l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="nu">
                    N???
                  </Label>
                </div>
                {errors && (
                  <div className={classes.error}>
                    {errors.gioitinh?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="ngaysinh" md={4}>
                Ng??y sinh
                <span className={classes.require}>*</span>
              </Label>
              <Col md={2} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="ngaysinh"
                  name="ngaysinh"
                  type="date"
                  onKeyDown={(e) => e.preventDefault()}
                  {...register("ngaysinh", {
                    required: { value: true, message: "Ng??y sinh l?? b???t bu???c" },
                  })}
                />
                {errors && (
                  <div className={classes.error}>
                    {errors.ngaysinh?.message}
                  </div>
                )}
              </Col>

              <Label
                className={classes.label}
                for="noisinh"
                md={2}
                style={{ width: "95px" }}
              >
                N??i sinh
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3}>
                <Input
                  className={classes.fieldInput}
                  id="noisinh"
                  name="noisinh"
                  type="select"
                  {...register("noisinh", {
                    required: { value: true, message: "N??i sinh l?? b???t bu???c" },
                  })}
                >
                  <option value="">-- Ch???n n??i sinh --</option>
                  {cityProvincesForHoKhau &&
                    cityProvincesForHoKhau.map((data, index) => (
                      <option key={index} value={data.maTinhTP}>
                        {data.tenTinhTP}
                      </option>
                    ))}
                </Input>
                {errors && (
                  <div className={classes.error}>{errors.noisinh?.message}</div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="dantoc" md={4}>
                D??n t???c
                <span className={classes.require}>*</span>
              </Label>
              <Col md={2} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="dantoc"
                  name="dantoc"
                  type="select"
                  {...register("dantoc", {
                    required: { value: true, message: "D??n t???c l?? b???t bu???c" },
                  })}
                >
                  <option value="">-- Ch???n d??n t???c --</option>
                  {ethnics &&
                    ethnics.map((data, index) => (
                      <option key={index} value={data.maDantoc}>
                        {data.tenDantoc}
                      </option>
                    ))}
                </Input>
                {errors && (
                  <div className={classes.error}>{errors.dantoc?.message}</div>
                )}
              </Col>

              <Label
                className={classes.label}
                for="tongiao"
                md={2}
                style={{ width: "95px" }}
              >
                T??n gi??o
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3}>
                <Input
                  className={classes.fieldInput}
                  id="tongiao"
                  name="tongiao"
                  type="select"
                  {...register("tongiao", {
                    required: { value: true, message: "T??n gi??o l?? b???t bu???c" },
                  })}
                >
                  <option value="">-- Ch???n t??n gi??o --</option>
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
                S??? CMND/CCCD
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="cmnd"
                  name="cmnd"
                  placeholder="9 s??? ho???c 12 s???"
                  type="text"
                  {...register("cmnd", {
                    required: {
                      value: true,
                      message: "S??? CMND/CCCD l?? b???t bu???c",
                    },
                    validate: {
                      value: async (value) =>
                        (await ValidateCMND(value)).data == false ||
                        "S??? CMND/CCCD n??y ???? ???????c ????ng k?? tr?????c ????",
                    },
                    minLength: {
                      value: 9,
                      message: "S??? CMND/CCCD ph???i l?? 9 s??? ho???c 12 s???",
                    },
                    maxLength: {
                      value: 12,
                      message: "S??? CMND/CCCD ph???i l?? 9 s??? ho???c 12 s???",
                    },
                  })}
                />
                {errors && (
                  <div className={classes.error}>{errors.cmnd?.message}</div>
                )}
              </Col>

              <Label
                className={classes.label}
                for="quoctich"
                md={2}
                style={{ width: "100px" }}
              >
                Qu???c t???ch
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3}>
                <Input
                  className={classes.fieldInput}
                  id="quoctich"
                  name="quoctich"
                  type="select"
                  {...register("quoctich", {
                    required: { value: true, message: "Qu???c t???ch l?? b???t bu???c" },
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
                    {errors.quoctich?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="hokhauthuongtru" md={4}>
                H??? kh???u th?????ng tr??
                <span className={classes.require}>*</span>
              </Label>
              <Col md={5} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="hokhauthuongtru"
                  name="hokhauthuongtru"
                  placeholder="S??? nh??/ khu ph???, th??n, t??n ???????ng, ???p, t???"
                  type="text"
                  {...register("hokhauthuongtru", {
                    required: {
                      value: true,
                      message: "H??? kh???u th?????ng tr?? l?? b???t bu???c",
                    },
                  })}
                />
                {errors && (
                  <div className={classes.error}>
                    {errors.hokhauthuongtru?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="tinhthanhpho" md={4}>
                T???nh/Th??nh ph???
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="tinhthanhpho"
                  name="tinhthanhpho"
                  type="select"
                  {...register("tinhthanhpho", {
                    required: {
                      value: true,
                      message: "T???nh/Th??nh ph??? l?? b???t bu???c",
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
                  <option value="">-- Ch???n T???nh/Th??nh Ph??? --</option>
                  {cityProvincesForHoKhau &&
                    cityProvincesForHoKhau.map((data, index) => (
                      <option key={index} value={data.maTinhTP}>
                        {data.tenTinhTP}
                      </option>
                    ))}
                </Input>
                {errors && (
                  <div className={classes.error}>
                    {errors.tinhthanhpho?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="quanhuyen" md={4}>
                Qu???n/Huy???n
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="quanhuyen"
                  name="quanhuyen"
                  type="select"
                  {...register("quanhuyen", {
                    required: {
                      value: true,
                      message: "Qu???n/Huy???n l?? b???t bu???c",
                    },
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
                      <option value="">-- Ch???n Qu???n/Huy???n --</option>
                      {districtsForHoKhau &&
                        districtsForHoKhau.map((data, index) => (
                          <option key={index} value={data.maQH}>
                            {data.tenQH}
                          </option>
                        ))}
                      <option value={0}>Kh??c (ngo??i danh s??ch tr??n)</option>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Input>
                {errors && (
                  <div className={classes.error}>
                    {errors.quanhuyen?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="phuongxa" md={4}>
                Ph?????ng/X??
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="phuongxa"
                  name="phuongxa"
                  type="select"
                  {...register("phuongxa", {
                    required: { value: true, message: "Ph?????ng/X?? l?? b???t bu???c" },
                  })}
                >
                  {districtsForHoKhau.length > 0 ? (
                    <React.Fragment>
                      <option value="">-- Ch???n Ph?????ng/X?? --</option>
                      {wardsForHoKhau &&
                        wardsForHoKhau.map((data, index) => (
                          <option key={index} value={data.maPX}>
                            {data.tenPX}
                          </option>
                        ))}
                      <option value={0}>Kh??c (ngo??i danh s??ch tr??n)</option>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Input>
                {errors && (
                  <div className={classes.error}>
                    {errors.phuongxa?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="namtotnghiep" md={4}>
                N??m t???t nghi???p
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="namtotnghiep"
                  name="namtotnghiep"
                  placeholder="2022"
                  type="number"
                  {...register("namtotnghiep", {
                    required: {
                      value: true,
                      message: "N??m t???t nghi???p l?? b???t bu???c",
                    },
                    pattern: {
                      value: namTotNghiepPattern,
                      message: "N??m t???t nghi???p kh??ng h???p l???",
                    },
                  })}
                />
                {errors && (
                  <div className={classes.error}>
                    {errors.namtotnghiep?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} md={4}>
                H???c l???c l???p 12
                <span className={classes.require}>*</span>
              </Label>
              <Col className={classes.radioError} md={5}>
                <div className={classes.radioError2}>
                  <Input
                    className={classes.radioButton}
                    id="hoclucgioi"
                    name="hocluclop12"
                    type="radio"
                    value="Gi???i"
                    {...register("hocluclop12", {
                      required: {
                        value: true,
                        message: "H???c l???c l???p 12 l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="hoclucgioi">
                    Gi???i
                  </Label>

                  <Input
                    className={classes.radioButton}
                    id="hocluckha"
                    name="hocluclop12"
                    type="radio"
                    value="Kh??"
                    {...register("hocluclop12", {
                      required: {
                        value: true,
                        message: "H???c l???c l???p 12 l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="hocluckha">
                    Kh??
                  </Label>

                  <Input
                    className={classes.radioButton}
                    id="hocluctrungbinh"
                    name="hocluclop12"
                    type="radio"
                    value="Trung b??nh"
                    {...register("hocluclop12", {
                      required: {
                        value: true,
                        message: "H???c l???c l???p 12 l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="hocluctrungbinh">
                    Trung B??nh
                  </Label>

                  <Input
                    className={classes.radioButton}
                    id="hoclucyeu"
                    name="hocluclop12"
                    type="radio"
                    value="Y???u"
                    {...register("hocluclop12", {
                      required: {
                        value: true,
                        message: "H???c l???c l???p 12 l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="hoclucyeu">
                    Y???u
                  </Label>

                  <Input
                    className={classes.radioButton}
                    id="hocluckhac"
                    name="hocluclop12"
                    type="radio"
                    value="Kh??c"
                    {...register("hocluclop12", {
                      required: {
                        value: true,
                        message: "H???c l???c l???p 12 l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="hocluckhac">
                    Kh??c
                  </Label>
                </div>
                {errors && (
                  <div className={classes.error}>
                    {errors.hocluclop12?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} md={4}>
                H???nh ki???m l???p 12
                <span className={classes.require}>*</span>
              </Label>
              <Col className={classes.radioError} md={5}>
                <div className={classes.radioError2}>
                  <Input
                    className={classes.radioButton}
                    id="hanhkiemtot"
                    name="hanhkiemlop12"
                    type="radio"
                    value="T???t"
                    {...register("hanhkiemlop12", {
                      required: {
                        value: true,
                        message: "H???nh ki???m l???p 12 l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="hanhkiemtot">
                    T???t
                  </Label>

                  <Input
                    className={classes.radioButton}
                    id="hanhkiemkha"
                    name="hanhkiemlop12"
                    type="radio"
                    value="Kh??"
                    {...register("hanhkiemlop12", {
                      required: {
                        value: true,
                        message: "H???nh ki???m l???p 12 l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="hanhkiemkha">
                    Kh??
                  </Label>

                  <Input
                    className={classes.radioButton}
                    id="hanhkiemtrungbinh"
                    name="hanhkiemlop12"
                    type="radio"
                    value="Trung b??nh"
                    {...register("hanhkiemlop12", {
                      required: {
                        value: true,
                        message: "H???nh ki???m l???p 12 l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="hanhkiemtrungbinh">
                    Trung B??nh
                  </Label>

                  <Input
                    className={classes.radioButton}
                    id="hanhkiemyeu"
                    name="hanhkiemlop12"
                    type="radio"
                    value="Y???u"
                    {...register("hanhkiemlop12", {
                      required: {
                        value: true,
                        message: "H???nh ki???m l???p 12 l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="hanhkiemyeu">
                    Y???u
                  </Label>

                  <Input
                    className={classes.radioButton}
                    id="hanhkiemkhac"
                    name="hanhkiemlop12"
                    type="radio"
                    value="Kh??c"
                    {...register("hanhkiemlop12", {
                      required: {
                        value: true,
                        message: "H???nh ki???m l???p 12 l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="hanhkiemkhac">
                    Kh??c
                  </Label>
                </div>
                {errors && (
                  <div className={classes.error}>
                    {errors.hanhkiemlop12?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} md={4}>
                Th?? sinh h???c theo ch????ng tr??nh
                <span className={classes.require}>*</span>
              </Label>
              <Col className={classes.radioError} md={5}>
                <div className={classes.radioError2}>
                  <Input
                    className={classes.radioButton}
                    id="thpt"
                    name="hocchuongtrinh"
                    type="radio"
                    value="THPT"
                    {...register("hocchuongtrinh", {
                      required: {
                        value: true,
                        message: "Ch????ng tr??nh theo h???c l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="thpt">
                    THPT
                  </Label>
                  <Input
                    className={classes.radioButton}
                    id="gdtx"
                    name="hocchuongtrinh"
                    type="radio"
                    value="GDTX"
                    {...register("hocchuongtrinh", {
                      required: {
                        value: true,
                        message: "Ch????ng tr??nh theo h???c l?? b???t bu???c",
                      },
                    })}
                  />
                  <Label className={classes.labelRadio} for="gdtx">
                    GDTX
                  </Label>
                </div>
                {errors && (
                  <div className={classes.error}>
                    {errors.hocchuongtrinh?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="tinhthanhpho_thpt" md={4}>
                Tr?????ng THPT l???p 12 thu???c T???nh/TP
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="tinhthanhpho_thpt"
                  name="tinhthanhpho_thpt"
                  type="select"
                  {...register("tinhthanhpho_thpt", {
                    required: {
                      value: true,
                      message: "T???nh/TP tr?????ng THPT l?? b???t bu???c",
                    },
                    onChange: (e) => {
                      if (districtsForSchool.length > 0) {
                        setDistrictsForSchool([]);
                        setValue("quanhuyen_thpt", "");
                        setSchools([]);
                        setValue("tentruongthpt", "");
                      }
                      setMaTinhTP(e.target.value);
                      onGetDistrictsForSchool(e.target.value);
                    },
                  })}
                >
                  <option value="">-- Ch???n T???nh/Th??nh Ph??? --</option>
                  {cityProvincesForSchool &&
                    cityProvincesForSchool.map((data, index) => (
                      <option key={index} value={data.maTinhTP}>
                        {data.tenTinhTP}
                      </option>
                    ))}
                </Input>
                {errors && (
                  <div className={classes.error}>
                    {errors.tinhthanhpho_thpt?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="quanhuyen_thpt" md={4}>
                Qu???n/Huy???n
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="quanhuyen_thpt"
                  name="quanhuyen_thpt"
                  type="select"
                  {...register("quanhuyen_thpt", {
                    required: {
                      value: true,
                      message: "Qu???n/Huy???n tr?????ng THPT l?? b???t bu???c",
                    },
                    onChange: (e) => {
                      if (schools.length > 0) {
                        setSchools([]);
                        setValue("tentruongthpt", "");
                      }
                      if (maTinhTP !== "") {
                        onGetSchools(maTinhTP, e.target.value);
                      }
                    },
                  })}
                >
                  {districtsForSchool.length > 0 ? (
                    <React.Fragment>
                      <option value="">-- Ch???n Qu???n/Huy???n --</option>
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
                    {errors.quanhuyen_thpt?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="tentruongthpt" md={4}>
                T??n tr?????ng THPT
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="tentruongthpt"
                  name="tentruongthpt"
                  type="select"
                  {...register("tentruongthpt", {
                    required: {
                      value: true,
                      message: "T??n tr?????ng THPT l?? b???t bu???c",
                    },
                  })}
                >
                  {schools.length > 0 ? (
                    <React.Fragment>
                      <option value="">-- Ch???n Tr?????ng THPT --</option>
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
                    {errors.tentruongthpt?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="tenlop12" md={4}>
                T??n l???p 12
                <span className={classes.require}>*</span>
              </Label>
              <Col md={2} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="tenlop12"
                  name="tenlop12"
                  placeholder="T??n l???p 12"
                  type="text"
                  {...register("tenlop12", {
                    required: {
                      value: true,
                      message: "T??n l???p 12 l?? b???t bu???c",
                    },
                  })}
                />
                <div style={{ fontSize: "13px", color: "#777" }}>
                  (V?? d???: l???p 12A1)
                </div>
                {errors && (
                  <div className={classes.error}>
                    {errors.tenlop12?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="khuvucuutien" md={4}>
                Khu v???c
              </Label>
              <Col md={2} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="khuvucuutien"
                  name="khuvucuutien"
                  type="select"
                  {...register("khuvucuutien")}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="2NT">2NT</option>
                  <option value="3">3</option>
                </Input>
              </Col>

              <Label
                className={classes.label}
                for="doituonguutien"
                md={2}
                style={{}}
              >
                ?????i t?????ng ??u ti??n
              </Label>
              <Col md={2}>
                <Input
                  className={classes.fieldInput}
                  id="doituonguutien"
                  name="doituonguutien"
                  type="select"
                  {...register("doituonguutien")}
                >
                  <option value={0}>Kh??ng c??</option>
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
            <div className={classes.subSection}>B. TH??NG TIN LI??N H???</div>
          </div>
          <hr className={classes.line} />
          <FormGroup>
            <Row>
              <Label
                className={classes.label}
                md={4}
                style={{ fontSize: "14px", fontWeight: "500" }}
              >
                S??? d???ng th??ng tin c???a H??? kh???u
              </Label>
              <Col
                md={2}
                style={{
                  paddingLeft: "25px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Input
                  className={classes.fieldInput}
                  id="sudunghokhau"
                  name="sudunghokhau"
                  type="checkbox"
                  {...register("sudunghokhau", {
                    onChange: () => onUseHoKhau(),
                  })}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="diachinha" md={4}>
                ?????a ch??? g???i th?? b??o k???t qu???
                <span className={classes.require}>*</span>
              </Label>
              <Col md={5} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="diachinha"
                  name="diachinha"
                  placeholder="S??? nh??, T??n ???????ng"
                  type="text"
                  {...register("diachinha", {
                    required: {
                      value: true,
                      message: "?????a ch??? li??n h??? l?? b???t bu???c",
                    },
                  })}
                />
                {errors && (
                  <div className={classes.error}>
                    {errors.diachinha?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="tinhthanhpho_nha" md={4}>
                T???nh/Th??nh ph???
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="tinhthanhpho_nha"
                  name="tinhthanhpho_nha"
                  type="select"
                  {...register("tinhthanhpho_nha", {
                    required: {
                      value: true,
                      message: "T???nh/Th??nh ph??? li??n h??? l?? b???t bu???c",
                    },
                    onChange: (e) => {
                      if (districtsForHome.length > 0) {
                        setDistrictsForHome([]);
                        setValue("quanhuyen_nha", "");
                        setWardsForHome([]);
                        setValue("phuongxa_nha", "");
                      }
                      onGetDistrictsForHome(e.target.value);
                    },
                  })}
                >
                  <option value="">-- Ch???n T???nh/Th??nh Ph??? --</option>
                  {cityProvincesForHome &&
                    cityProvincesForHome.map((data, index) => (
                      <option key={index} value={data.maTinhTP}>
                        {data.tenTinhTP}
                      </option>
                    ))}
                </Input>
                {errors && (
                  <div className={classes.error}>
                    {errors.tinhthanhpho_nha?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="quanhuyen_nha" md={4}>
                Qu???n/Huy???n
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="quanhuyen_nha"
                  name="quanhuyen_nha"
                  type="select"
                  {...register("quanhuyen_nha", {
                    required: {
                      value: true,
                      message: "Qu???n/Huy???n li??n h??? l?? b???t bu???c",
                    },
                    onChange: (e) => {
                      if (wardsForHome.length > 0) {
                        setWardsForHome([]);
                        setValue("phuongxa_nha", "");
                      }
                      onGetWardsForHome(e.target.value);
                    },
                  })}
                >
                  {districtsForHome.length > 0 ? (
                    <React.Fragment>
                      <option value="">-- Ch???n Qu???n/Huy???n --</option>
                      {districtsForHome &&
                        districtsForHome.map((data, index) => (
                          <option key={index} value={data.maQH}>
                            {data.tenQH}
                          </option>
                        ))}
                      <option value={0}>Kh??c (ngo??i danh s??ch tr??n)</option>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Input>
                {errors && (
                  <div className={classes.error}>
                    {errors.quanhuyen_nha?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="phuongxa_nha" md={4}>
                Ph?????ng/X??
                <span className={classes.require}>*</span>
              </Label>
              <Col md={3} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="phuongxa_nha"
                  name="phuongxa_nha"
                  type="select"
                  {...register("phuongxa_nha", {
                    required: {
                      value: true,
                      message: "Ph?????ng/X?? li??n h??? l?? b???t bu???c",
                    },
                  })}
                >
                  {districtsForHome.length > 0 ? (
                    <React.Fragment>
                      <option value="">-- Ch???n Ph?????ng/X?? --</option>
                      {wardsForHome &&
                        wardsForHome.map((data, index) => (
                          <option key={index} value={data.maPX}>
                            {data.tenPX}
                          </option>
                        ))}
                      <option value={0}>Kh??c (ngo??i danh s??ch tr??n)</option>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Input>
                {errors && (
                  <div className={classes.error}>
                    {errors.phuongxa_nha?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="dienthoaididong" md={4}>
                ??i???n tho???i di ?????ng
                <span className={classes.require}>*</span>
              </Label>
              <Col md={5} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="dienthoaididong"
                  name="dienthoaididong"
                  placeholder="??i???n tho???i di ?????ng"
                  type="text"
                  {...register("dienthoaididong", {
                    required: {
                      value: true,
                      message: "??i???n tho???i di ?????ng l?? b???t bu???c",
                    },
                    pattern: {
                      value: phoneNumberPattern,
                      message: "S??? ??i???n tho???i kh??ng h???p l???",
                    },
                  })}
                />
                {errors && (
                  <div className={classes.error}>
                    {errors.dienthoaididong?.message}
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
                  placeholder="Email li??n l???c"
                  type="text"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email li??n l???c l?? b???t bu???c",
                    },
                    pattern: {
                      value: emailPattern,
                      message: "Email kh??ng h???p l???",
                    },
                  })}
                />
                <div style={{ fontSize: "13px", color: "#777" }}>
                  (Nh?? tr?????ng s??? g???i M?? h??? s?? qua email n??y)
                </div>
                {errors && (
                  <div className={classes.error}>{errors.email?.message}</div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="dienthoaiphuhuynh" md={4}>
                ??i???n tho???i ph??? huynh
                <span className={classes.require}>*</span>
              </Label>
              <Col md={5} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="dienthoaiphuhuynh"
                  name="dienthoaiphuhuynh"
                  placeholder="??i???n tho???i ph??? huynh"
                  type="text"
                  {...register("dienthoaiphuhuynh", {
                    required: {
                      value: true,
                      message: "??i???n tho???i ph??? huynh l?? b???t bu???c",
                    },
                    pattern: {
                      value: phoneNumberPattern,
                      message: "S??? ??i???n tho???i kh??ng h???p l???",
                    },
                  })}
                />
                <div style={{ fontSize: "13px", color: "#777" }}>
                  (Tr?????ng h???p kh??ng li??n l???c ???????c v???i th?? sinh, nh?? Tr?????ng s???
                  li??n l???c qua s??? n??y)
                </div>
                {errors && (
                  <div className={classes.error}>
                    {errors.dienthoaiphuhuynh?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>

          <div style={{ paddingTop: "30px" }}>
            <div className={classes.section}>TH??NG TIN X??T TUY???N</div>
            <div className={classes.subSection}>
              A. TH?? SINH CH???N 1 TRONG 2 PH????NG ??N D?????I ????Y
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
                    id="phuongan1"
                    name="phuongan"
                    type="radio"
                    value="1"
                    onClick={() => setPhuongAn("1")}
                    defaultChecked={phuongAn == "1"}
                    {...register("phuongan")}
                  />
                  <Label className={classes.labelRadio} for="phuongan1">
                    Ph????ng ??n 1
                  </Label>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Input
                    className={classes.radioButton}
                    id="phuongan2"
                    name="phuongan"
                    type="radio"
                    value="2"
                    onClick={() => setPhuongAn("2")}
                    defaultChecked={phuongAn == "2"}
                    {...register("phuongan")}
                  />
                  <Label className={classes.labelRadio} for="phuongan2">
                    Ph????ng ??n 2
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
                    for="diemtb_cnlop11"
                    md={3}
                  >
                    ??i???m{" "}
                    <span style={{ textDecoration: "underline" }}>
                      TB c??? n??m l???p 11
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
                      diemtoan={register("diemtb_cnlop11.diemtoan", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemvan={register("diemtb_cnlop11.diemvan", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemanh={register("diemtb_cnlop11.diemanh", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemphap={register("diemtb_cnlop11.diemphap", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemly={register("diemtb_cnlop11.diemly", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemhoa={register("diemtb_cnlop11.diemhoa", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemsinh={register("diemtb_cnlop11.diemsinh", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemsu={register("diemtb_cnlop11.diemsu", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemdia={register("diemtb_cnlop11.diemdia", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemgdcd={register("diemtb_cnlop11.diemgdcd", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                    />
                    {errors.diemtb_cnlop11 &&
                      (errors.diemtb_cnlop11?.diemtoan ||
                        errors.diemtb_cnlop11?.diemvan ||
                        errors.diemtb_cnlop11?.diemanh ||
                        errors.diemtb_cnlop11?.diemphap ||
                        errors.diemtb_cnlop11?.diemly ||
                        errors.diemtb_cnlop11?.diemhoa ||
                        errors.diemtb_cnlop11?.diemsinh ||
                        errors.diemtb_cnlop11?.diemsu ||
                        errors.diemtb_cnlop11?.diemdia ||
                        errors.diemtb_cnlop11?.diemgdcd) && (
                        <div className={classes.error}>
                          ??i???m c??c m??n h???c ph???i t??? 0-10. V?? d???: 7.5
                        </div>
                      )}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Label
                    className={classes.label + " " + classes.labelSmall}
                    for="diemtb_hk1lop12"
                    md={3}
                  >
                    ??i???m{" "}
                    <span style={{ textDecoration: "underline" }}>
                      HK1 n??m h???c l???p 12
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
                      diemtoan={register("diemtb_hk1lop12.diemtoan", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemvan={register("diemtb_hk1lop12.diemvan", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemanh={register("diemtb_hk1lop12.diemanh", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemphap={register("diemtb_hk1lop12.diemphap", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemly={register("diemtb_hk1lop12.diemly", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemhoa={register("diemtb_hk1lop12.diemhoa", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemsinh={register("diemtb_hk1lop12.diemsinh", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemsu={register("diemtb_hk1lop12.diemsu", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemdia={register("diemtb_hk1lop12.diemdia", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemgdcd={register("diemtb_hk1lop12.diemgdcd", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                    />
                    {errors.diemtb_hk1lop12 &&
                      (errors.diemtb_hk1lop12?.diemtoan ||
                        errors.diemtb_hk1lop12?.diemvan ||
                        errors.diemtb_hk1lop12?.diemanh ||
                        errors.diemtb_hk1lop12?.diemphap ||
                        errors.diemtb_hk1lop12?.diemly ||
                        errors.diemtb_hk1lop12?.diemhoa ||
                        errors.diemtb_hk1lop12?.diemsinh ||
                        errors.diemtb_hk1lop12?.diemsu ||
                        errors.diemtb_hk1lop12?.diemdia ||
                        errors.diemtb_hk1lop12?.diemgdcd) && (
                        <div className={classes.error}>
                          ??i???m c??c m??n h???c ph???i t??? 0-10. V?? d???: 7.5
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
                    for="diemtb_cnlop12"
                    md={3}
                  >
                    ??i???m{" "}
                    <span style={{ textDecoration: "underline" }}>
                      TB c??? n??m l???p 12
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
                      diemtoan={register("diemtb_cnlop12.diemtoan", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemvan={register("diemtb_cnlop12.diemvan", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemanh={register("diemtb_cnlop12.diemanh", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemphap={register("diemtb_cnlop12.diemphap", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemly={register("diemtb_cnlop12.diemly", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemhoa={register("diemtb_cnlop12.diemhoa", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemsinh={register("diemtb_cnlop12.diemsinh", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemsu={register("diemtb_cnlop12.diemsu", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemdia={register("diemtb_cnlop12.diemdia", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                      diemgdcd={register("diemtb_cnlop12.diemgdcd", {
                        required: true,
                        pattern: diemPattern,
                        min: 0,
                        max: 10,
                      })}
                    />
                    {errors.diemtb_cnlop12 &&
                      (errors.diemtb_cnlop12?.diemtoan ||
                        errors.diemtb_cnlop12?.diemvan ||
                        errors.diemtb_cnlop12?.diemanh ||
                        errors.diemtb_cnlop12?.diemphap ||
                        errors.diemtb_cnlop12?.diemly ||
                        errors.diemtb_cnlop12?.diemhoa ||
                        errors.diemtb_cnlop12?.diemsinh ||
                        errors.diemtb_cnlop12?.diemsu ||
                        errors.diemtb_cnlop12?.diemdia ||
                        errors.diemtb_cnlop12?.diemgdcd) && (
                        <div className={classes.error}>
                          ??i???m c??c m??n h???c ph???i t??? 0-10. V?? d???: 7.5
                        </div>
                      )}
                  </div>
                </Col>
              </Row>
            </FormGroup>
          )}
          <FormGroup>
            <Row style={{ marginTop: "30px" }}>
              <Label className={classes.label} for="chungchingoaingu" md={3}>
                Ch???ng ch??? ngo???i ng??? <i>(n???u c??)</i>
              </Label>
              <Col md={4} style={{ paddingLeft: "25px" }}>
                <Input
                  className={classes.fieldInput}
                  id="chungchingoaingu"
                  name="chungchingoaingu"
                  type="select"
                  {...register("chungchingoaingu")}
                >
                  <option value="">-- Ch???n Ch???ng ch??? ngo???i ng??? --</option>
                  {certificateLanguages &&
                    certificateLanguages.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.chungChi} - quy ?????i: {data.diemQuiDoi}??
                      </option>
                    ))}
                </Input>
              </Col>
            </Row>
          </FormGroup>

          <div style={{ paddingTop: "30px" }}>
            <div className={classes.subSection}>B. NG??NH ????NG K?? X??T TUY???N</div>
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
                  for="nganh1"
                >
                  Ng??nh x??t tuy???n ??u ti??n 1
                </Label>
                <Input
                  className={classes.fieldInput}
                  id="nganh1"
                  name="nganh1"
                  type="select"
                  {...register("nganh1", {
                    required: {
                      value: true,
                      message: "Ng??nh x??t tuy???n ??u ti??n 1 l?? b???t bu???c",
                    },
                    onChange: (e) => {
                      if (toHop1.length > 0) {
                        setToHop1([]);
                        setValue("tohopmon1", "");
                        setValue("chuongtrinh1", "");
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
                  <option value="">-- Ch???n ng??nh x??t tuy???n ??u ti??n 1 --</option>
                  {nganh1 &&
                    nganh1.map((data, index) => (
                      <option key={index} value={data.maNganh}>
                        {data.tenNganh}
                      </option>
                    ))}
                </Input>
                {errors && (
                  <div className={classes.error}>{errors.nganh1?.message}</div>
                )}
              </Col>

              <Col md={3}>
                <Label
                  className={classes.label + " " + classes.labelSmall}
                  for="tohopmon1"
                >
                  T??? h???p m??n
                </Label>
                <Input
                  className={classes.fieldInput}
                  id="tohopmon1"
                  name="tohopmon1"
                  type="select"
                  {...register("tohopmon1", {
                    required: {
                      value: true,
                      message: "T??? h???p m??n l?? b???t bu???c",
                    },
                  })}
                >
                  <option value="">-- Ch???n t??? h???p m??n --</option>
                  {toHop1 &&
                    toHop1.map((data, index) => (
                      <option key={index} value={data.maToHop}>
                        {data.maToHop} - {data.tenToHop}
                      </option>
                    ))}
                </Input>
                {errors && (
                  <div className={classes.error}>
                    {errors.tohopmon1?.message}
                  </div>
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
                      Ch???n ch????ng tr??nh h???c
                    </a>
                    <div className={classes.subContainerProgram}>
                      <Input
                        className={classes.radioButton}
                        id="chuongtrinhtieuchuan1"
                        name="chuongtrinh1"
                        type="radio"
                        value="Ti??u chu???n"
                        {...register("chuongtrinh1", {
                          required: {
                            value: true,
                            message: "Ch????ng tr??nh h???c l?? b???t bu???c",
                          },
                        })}
                      />
                      <Label
                        className={classes.labelRadio}
                        for="chuongtrinhtieuchuan1"
                      >
                        Ti??u chu???n
                      </Label>
                    </div>

                    <div className={classes.subContainerProgram}>
                      <Input
                        className={classes.radioButton}
                        id="chuongtrinhdacbiet1"
                        name="chuongtrinh1"
                        type="radio"
                        value="?????c bi???t"
                        {...register("chuongtrinh1", {
                          required: {
                            value: true,
                            message: "Ch????ng tr??nh h???c l?? b???t bu???c",
                          },
                        })}
                      />
                      <Label
                        className={classes.labelRadio}
                        for="chuongtrinhdacbiet1"
                      >
                        ?????c bi???t
                      </Label>
                    </div>

                    {errors && (
                      <div className={classes.error}>
                        {errors.chuongtrinh1?.message}
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
                  for="nganh2"
                >
                  Ng??nh x??t tuy???n ??u ti??n 2
                </Label>
                <Input
                  className={classes.fieldInput}
                  id="nganh2"
                  name="nganh2"
                  type="select"
                  {...register("nganh2", {
                    onChange: (e) => {
                      if (toHop2.length > 0) {
                        setToHop2([]);
                        setValue("tohopmon2", "");
                        setValue("chuongtrinh2", "");
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
                  <option value="">-- Ch???n ng??nh x??t tuy???n ??u ti??n 2 --</option>
                  {nganh2 &&
                    nganh2.map((data, index) => (
                      <option key={index} value={data.maNganh}>
                        {data.tenNganh}
                      </option>
                    ))}
                </Input>
              </Col>

              <Col md={3}>
                <Label
                  className={classes.label + " " + classes.labelSmall}
                  for="tohopmon2"
                >
                  T??? h???p m??n
                </Label>
                <Input
                  className={classes.fieldInput}
                  id="tohopmon2"
                  name="tohopmon2"
                  type="select"
                  {...register("tohopmon2")}
                >
                  <option value="">-- Ch???n t??? h???p m??n --</option>
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
                      Ch???n ch????ng tr??nh h???c
                    </a>
                    <div className={classes.subContainerProgram}>
                      <Input
                        className={classes.radioButton}
                        id="chuongtrinhtieuchuan2"
                        name="chuongtrinh2"
                        type="radio"
                        value="Ti??u chu???n"
                        {...register("chuongtrinh2")}
                      />
                      <Label
                        className={classes.labelRadio}
                        for="chuongtrinhtieuchuan2"
                      >
                        Ti??u chu???n
                      </Label>
                    </div>

                    <div className={classes.subContainerProgram}>
                      <Input
                        className={classes.radioButton}
                        id="chuongtrinhdacbiet2"
                        name="chuongtrinh2"
                        type="radio"
                        value="?????c bi???t"
                        {...register("chuongtrinh2")}
                      />
                      <Label
                        className={classes.labelRadio}
                        for="chuongtrinhdacbiet2"
                      >
                        ?????c bi???t
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
                  for="nganh3"
                >
                  Ng??nh x??t tuy???n ??u ti??n 3
                </Label>
                <Input
                  className={classes.fieldInput}
                  id="nganh3"
                  name="nganh3"
                  type="select"
                  {...register("nganh3", {
                    onChange: (e) => {
                      if (toHop3.length > 0) {
                        setToHop3([]);
                        setValue("tohopmon3", "");
                        setValue("chuongtrinh3", "");
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
                  <option value="">-- Ch???n ng??nh x??t tuy???n ??u ti??n 3 --</option>
                  {nganh3 &&
                    nganh3.map((data, index) => (
                      <option key={index} value={data.maNganh}>
                        {data.tenNganh}
                      </option>
                    ))}
                </Input>
              </Col>

              <Col md={3}>
                <Label
                  className={classes.label + " " + classes.labelSmall}
                  for="tohopmon3"
                >
                  T??? h???p m??n
                </Label>
                <Input
                  className={classes.fieldInput}
                  id="tohopmon3"
                  name="tohopmon3"
                  type="select"
                  {...register("tohopmon3")}
                >
                  <option value="">-- Ch???n t??? h???p m??n --</option>
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
                      Ch???n ch????ng tr??nh h???c
                    </a>
                    <div className={classes.subContainerProgram}>
                      <Input
                        className={classes.radioButton}
                        id="chuongtrinhtieuchuan3"
                        name="chuongtrinh3"
                        type="radio"
                        value="Ti??u chu???n"
                        {...register("chuongtrinh3")}
                      />
                      <Label
                        className={classes.labelRadio}
                        for="chuongtrinhtieuchuan3"
                      >
                        Ti??u chu???n
                      </Label>
                    </div>

                    <div className={classes.subContainerProgram}>
                      <Input
                        className={classes.radioButton}
                        id="chuongtrinhdacbiet3"
                        name="chuongtrinh3"
                        type="radio"
                        value="?????c bi???t"
                        {...register("chuongtrinh3")}
                      />
                      <Label
                        className={classes.labelRadio}
                        for="chuongtrinhdacbiet3"
                      >
                        ?????c bi???t
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
              justifyContent: "center",
              paddingBottom: "30px",
            }}
          >
            <Button className={classes.button} type="submit">
              XEM TR?????C H??? S??
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default React.memo(Admission);
