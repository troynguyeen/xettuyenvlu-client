import React, { useCallback, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { Button, Container, Table } from "reactstrap";
import {
  GetCityProvincesForHoKhau,
  GetDistrictsForHoKhau,
  GetWardsForHoKhau,
  GetCityProvincesForSchool,
  GetNationalities,
  GetCertificateLanguages,
  GetNganhXetTuyen,
  GetToHopXetTuyen,
  GetSchools,
} from "../../services/admissionService";

import { EditProfile } from "../../services/profileService";
import AdmissionNotification from "../Admission/notification";
import { toast } from "react-toastify";


const useStyles = createUseStyles({
  container: {
    padding: "0 50px",
  },
  title1: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2B67FE",
    padding: "20px 0",
  },
  title2: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#d7373d",
    padding: "20px 0",
  },
  label: {
    fontWeight: "bold",
  },
  vertical: {
    padding: "0 10px",
  },
  editButton: {
    backgroundColor: "#dfba49",
    marginRight: "10px",
    border: "none",
    "&:hover": {
      backgroundColor: "#efcb5f",
    },
  },
  acceptButton: {
    backgroundColor: "#26c281",
    border: "none",
    "&:hover": {
      backgroundColor: "#41dd9c",
    },
  },
  "@global": {
    table: {},
    tbody: {
      borderTop: "none !important",
    },
  },
});

const AdmissionPreview = (props) => {
  let navigate = useNavigate();
  const classes = useStyles();
  const [tenTruong, setTenTruong] = useState("");
  const [tinhTP_Truong, setTinhTP_Truong] = useState("");
  const [tinhTP_HoKhau, setTinhTP_HoKhau] = useState("");
  const [quanHuyen_HoKhau, setQuanHuyen_HoKhau] = useState("");
  const [phuongXa_HoKhau, setPhuongXa_HoKhau] = useState("");
  const [tinhTP_LienHe, setTinhTP_LienHe] = useState("");
  const [quanHuyen_LienHe, setQuanHuyen_LienHe] = useState("");
  const [phuongXa_LienHe, setPhuongXa_LienHe] = useState("");
  const [quocTich, setQuocTich] = useState("");
  const [chungChi, setChungChi] = useState("");
  const [tenNganh1, setTenNganh1] = useState("");
  const [tenNganh2, setTenNganh2] = useState("");
  const [tenNganh3, setTenNganh3] = useState("");
  const [tenToHop1, setTenToHop1] = useState("");
  const [tenToHop2, setTenToHop2] = useState("");
  const [tenToHop3, setTenToHop3] = useState("");
  const [admissionCode, setAdmissionCode] = useState("");

  useEffect(() => {
    props.setIsLoading(true);
    GetNationalities()
      .then((response) => {
        const quoctich = response.data.find(
          (x) => x.maQt == props.dataEdit.quoctich
        );
        setQuocTich(quoctich.maQt + "|" + quoctich.tenQt);
      })
      .catch((error) => {
        console.log(error);
      });

    GetCityProvincesForHoKhau()
      .then((response) => {
        //Ho khau
        const tinhTP_HoKhau = response.data.find(
          (x) => x.maTinhTP === props.dataEdit.tinhthanhpho
        );
        setTinhTP_HoKhau(tinhTP_HoKhau.tenTinhTP);
        //Lien he
        const tinhTP_LienHe = response.data.find(
          (x) => x.maTinhTP === props.dataEdit.tinhthanhpho_nha
        );
        setTinhTP_LienHe(tinhTP_LienHe.tenTinhTP);
      })
      .catch((error) => {
        console.log(error);
      });

    //Ho khau
    GetDistrictsForHoKhau(props.dataEdit.tinhthanhpho)
      .then((response) => {
        const quanhuyen = response.data.find(
          (x) => x.maQH === props.dataEdit.quanhuyen
        );
        setQuanHuyen_HoKhau(quanhuyen.tenQH);
      })
      .catch((error) => console.log(error));

    GetWardsForHoKhau(props.dataEdit.quanhuyen)
      .then((response) => {
        const phuongxa = response.data.find(
          (x) => x.maPX === props.dataEdit.phuongxa
        );
        setPhuongXa_HoKhau(phuongxa.tenPX);
      })
      .catch((error) => console.log(error));

    //Lien he
    GetDistrictsForHoKhau(props.dataEdit.tinhthanhpho_nha)
      .then((response) => {
        const quanhuyen = response.data.find(
          (x) => x.maQH === props.dataEdit.quanhuyen_nha
        );
        setQuanHuyen_LienHe(quanhuyen.tenQH);
      })
      .catch((error) => console.log(error));

    GetWardsForHoKhau(props.dataEdit.quanhuyen_nha)
      .then((response) => {
        const phuongxa = response.data.find(
          (x) => x.maPX === props.dataEdit.phuongxa_nha
        );
        setPhuongXa_LienHe(phuongxa.tenPX);
      })
      .catch((error) => console.log(error));

    //Truong hoc
    GetCityProvincesForSchool()
      .then((response) => {
        const tinhTP = response.data.find(
          (x) => x.maTinhTP === props.dataEdit.tinhthanhpho_thpt
        );
        setTinhTP_Truong(tinhTP.tenTinhTP);
      })
      .catch((error) => {
        console.log(error);
      });

    GetSchools(
      props.dataEdit.tinhthanhpho_thpt,
      props.dataEdit.quanhuyen_thpt
    )
      .then((response) => {
        const truonghoc = response.data.find(
          (x) => x.maTruong === props.dataEdit.tentruongthpt
        );
        setTenTruong(truonghoc.tenTruong);
      })
      .catch((error) => console.log(error));

    if (props.dataEdit.chungchingoaingu !== "") {
      GetCertificateLanguages()
        .then((response) => {
          const chungchi = response.data.find(
            (x) => x.id == props.dataEdit.chungchingoaingu
          );
          setChungChi(
            chungchi.chungChi + " - quy đổi: " + chungchi.diemQuiDoi + "đ"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }

    GetNganhXetTuyen()
      .then((response) => {
        const nganh1 = response.data.find(
          (x) => x.maNganh === props.dataEdit.nganh1
        );
        setTenNganh1(nganh1.tenNganh);

        if (props.dataEdit.nganh2 !== "") {
          const nganh2 = response.data.find(
            (x) => x.maNganh === props.dataEdit.nganh2
          );
          setTenNganh2(nganh2.tenNganh);
        }

        if (props.dataEdit.nganh3 !== "") {
          const nganh3 = response.data.find(
            (x) => x.maNganh === props.dataEdit.nganh3
          );
          setTenNganh3(nganh3.tenNganh);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //To hop mon 1
    GetToHopXetTuyen(props.dataEdit.nganh1)
      .then((response) => {
        const tohop = response.data.find(
          (x) => x.maToHop === props.dataEdit.tohopmon1
        );
        setTenToHop1(tohop.tenToHop);
        setTimeout(() => props.setIsLoading(false), 1000);
      })
      .catch((error) => {
        setTimeout(() => props.setIsLoading(false), 1000);
        console.log(error);
      });

    //To hop mon 2
    if (props.dataEdit.nganh2 !== "") {
      GetToHopXetTuyen(props.dataEdit.nganh2)
        .then((response) => {
          const tohop = response.data.find(
            (x) => x.maToHop === props.dataEdit.tohopmon2
          );
          setTenToHop2(tohop.tenToHop);
        })
        .catch((error) => console.log(error));
    }

    //To hop mon 3
    if (props.dataEdit.nganh3 !== "") {
      GetToHopXetTuyen(props.dataEdit.nganh3)
        .then((response) => {
          const tohop = response.data.find(
            (x) => x.maToHop === props.dataEdit.tohopmon3
          );
          setTenToHop3(tohop.tenToHop);
        })
        .catch((error) => console.log(error));
    }
  }, []);


  const onSubmit = useCallback(() => {
    props.setIsLoading(true);
    const formData = new FormData();
    for (var key in props.dataEdit) {
      key === "diemtb_cnlop11" ||
      key === "diemtb_hk1lop12" ||
      key === "diemtb_cnlop12"
        ? formData.append(key, JSON.stringify(props.dataEdit[key]))
        : formData.append(key, props.dataEdit[key]);
    }

    EditProfile(formData)
      .then((response) => {
    
        if(response.data){
            setTimeout(() => {
                setAdmissionCode(response.data);
                props.setIsLoading(false);
                sessionStorage.removeItem("dataEdit");
                toast.success("Chỉnh sửa hồ sơ thành công!", {
                    theme: "colored",
                  });
                navigate(-1);
              }, 1000);
        }
      })
      .catch((error) => {
        setTimeout(() => props.setIsLoading(false), 1000);
        console.log(error);
      });
  }, [props.dataEdit]);

  return admissionCode !== "" ? (
    <AdmissionNotification admissionCode={admissionCode} />
  ) : (
    <Container className={classes.container}>
      <div className={classes.title1}>THÔNG TIN THÍ SINH</div>
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th colSpan={4}>
                <span className={classes.label}>Mã hồ sơ: </span>
                <span style={{ color: "red" }}>
                  DVL_{props.dataEdit.id}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className={classes.label}>Họ và tên: </span>
                <span>{props.dataEdit.hovaten}</span>
              </td>
              <td>
                <span className={classes.label}>Ngày sinh: </span>
                <span>{props.dataEdit.ngaysinh}</span>
              </td>
              <td>
                <span className={classes.label}>Giới tính: </span>
                <span>
                  {props.dataEdit.gioitinh === "1" ? "Nam" : "Nữ"}
                </span>
              </td>
              <td>
                <span className={classes.label}>Số CMND/CCCD: </span>
                <span>{props.dataEdit.cmnd}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className={classes.label}>Tên trường THPT: </span>
                <span>
                  {props.dataEdit.tentruongthpt} - {tenTruong} - Lớp:{" "}
                  {props.dataEdit.tenlop12}
                </span>
              </td>
              <td>
                <span className={classes.label}>
                  Trường THPT thuộc Tỉnh/TP:{" "}
                </span>
                <span>{tinhTP_Truong}</span>
              </td>
              <td>
                <span className={classes.label}>Năm tốt nghiệp: </span>
                <span>{props.dataEdit.namtotnghiep}</span>
              </td>
              <td>
                <span className={classes.label}>Loại hình tốt nghiệp: </span>
                <span>{props.dataEdit.hocchuongtrinh}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className={classes.label}>Điện thoại di động: </span>
                <span>{props.dataEdit.dienthoaididong}</span>
              </td>
              <td>
                <span className={classes.label}>Email: </span>
                <span>{props.dataEdit.email}</span>
              </td>
              <td>
                <span className={classes.label}>Khu vực: </span>
                <span>{props.dataEdit.khuvucuutien}</span>
              </td>
              <td>
                <span className={classes.label}>Đối tượng ưu tiên: </span>
                <span>{props.dataEdit.doituonguutien}</span>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <span className={classes.label}>Hộ khẩu: </span>
                <span>
                  {props.dataEdit.hokhauthuongtru}, {phuongXa_HoKhau},{" "}
                  {quanHuyen_HoKhau}, {tinhTP_HoKhau}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <span className={classes.label}>Địa chỉ liên hệ: </span>
                <span>
                  {props.dataEdit.diachinha}, {phuongXa_LienHe},{" "}
                  {quanHuyen_LienHe}, {tinhTP_LienHe}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <span className={classes.label}>Quốc tịch: </span>
                <span>{quocTich}</span>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      {/* THÔNG TIN XÉT TUYỂN */}
      <div className={classes.title2}>THÔNG TIN XÉT TUYỂN</div>
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th>
                <span className={classes.label}>Phương án xét tuyển: </span>
                <span style={{ fontWeight: "normal" }}>
                  {props.dataEdit.phuongan}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.dataEdit.phuongan === "1" ? (
              <React.Fragment>
                <tr>
                  <td style={{ display: "flex", flexDirection: "column" }}>
                    <span className={classes.label}>
                      Điểm TB Cả năm lớp 11:{" "}
                    </span>
                    <span>
                      <span className={classes.label}>Toán: </span>
                      <span>
                        {props.dataEdit?.diemtb_cnlop11?.diemtoan}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Văn: </span>
                      <span>
                        {props.dataEdit?.diemtb_cnlop11?.diemvan}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Anh: </span>
                      <span>
                        {props.dataEdit?.diemtb_cnlop11?.diemanh}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Pháp: </span>
                      <span>
                        {props.dataEdit?.diemtb_cnlop11?.diemphap}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Lý: </span>
                      <span>{props.dataEdit?.diemtb_cnlop11?.diemly}</span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Hóa: </span>
                      <span>
                        {props.dataEdit?.diemtb_cnlop11?.diemhoa}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Sinh: </span>
                      <span>
                        {props.dataEdit?.diemtb_cnlop11?.diemsinh}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Sử: </span>
                      <span>{props.dataEdit?.diemtb_cnlop11?.diemsu}</span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Địa: </span>
                      <span>
                        {props.dataEdit?.diemtb_cnlop11?.diemdia}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>GDCD: </span>
                      <span>
                        {props.dataEdit?.diemtb_cnlop11?.diemgdcd}
                      </span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ display: "flex", flexDirection: "column" }}>
                    <span className={classes.label}>Điểm TB HK1 lớp 12: </span>
                    <span>
                      <span className={classes.label}>Toán: </span>
                      <span>
                        {props.dataEdit?.diemtb_hk1lop12?.diemtoan}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Văn: </span>
                      <span>
                        {props.dataEdit?.diemtb_hk1lop12?.diemvan}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Anh: </span>
                      <span>
                        {props.dataEdit?.diemtb_hk1lop12?.diemanh}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Pháp: </span>
                      <span>
                        {props.dataEdit?.diemtb_hk1lop12?.diemphap}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Lý: </span>
                      <span>
                        {props.dataEdit?.diemtb_hk1lop12?.diemly}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Hóa: </span>
                      <span>
                        {props.dataEdit?.diemtb_hk1lop12?.diemhoa}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Sinh: </span>
                      <span>
                        {props.dataEdit?.diemtb_hk1lop12?.diemsinh}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Sử: </span>
                      <span>
                        {props.dataEdit?.diemtb_hk1lop12?.diemsu}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>Địa: </span>
                      <span>
                        {props.dataEdit?.diemtb_hk1lop12?.diemdia}
                      </span>
                      <span className={classes.vertical}>|</span>
                      <span className={classes.label}>GDCD: </span>
                      <span>
                        {props.dataEdit?.diemtb_hk1lop12?.diemgdcd}
                      </span>
                    </span>
                  </td>
                </tr>
              </React.Fragment>
            ) : (
              <tr>
                <td style={{ display: "flex", flexDirection: "column" }}>
                  <span className={classes.label}>Điểm TB Cả năm lớp 12: </span>
                  <span>
                    <span className={classes.label}>Toán: </span>
                    <span>{props.dataEdit?.diemtb_cnlop12?.diemtoan}</span>
                    <span className={classes.vertical}>|</span>
                    <span className={classes.label}>Văn: </span>
                    <span>{props.dataEdit?.diemtb_cnlop12?.diemvan}</span>
                    <span className={classes.vertical}>|</span>
                    <span className={classes.label}>Anh: </span>
                    <span>{props.dataEdit?.diemtb_cnlop12?.diemanh}</span>
                    <span className={classes.vertical}>|</span>
                    <span className={classes.label}>Pháp: </span>
                    <span>{props.dataEdit?.diemtb_cnlop12?.diemphap}</span>
                    <span className={classes.vertical}>|</span>
                    <span className={classes.label}>Lý: </span>
                    <span>{props.dataEdit?.diemtb_cnlop12?.diemly}</span>
                    <span className={classes.vertical}>|</span>
                    <span className={classes.label}>Hóa: </span>
                    <span>{props.dataEdit?.diemtb_cnlop12?.diemhoa}</span>
                    <span className={classes.vertical}>|</span>
                    <span className={classes.label}>Sinh: </span>
                    <span>{props.dataEdit?.diemtb_cnlop12?.diemsinh}</span>
                    <span className={classes.vertical}>|</span>
                    <span className={classes.label}>Sử: </span>
                    <span>{props.dataEdit?.diemtb_cnlop12?.diemsu}</span>
                    <span className={classes.vertical}>|</span>
                    <span className={classes.label}>Địa: </span>
                    <span>{props.dataEdit?.diemtb_cnlop12?.diemdia}</span>
                    <span className={classes.vertical}>|</span>
                    <span className={classes.label}>GDCD: </span>
                    <span>{props.dataEdit?.diemtb_cnlop12?.diemgdcd}</span>
                  </span>
                </td>
              </tr>
            )}

            <tr>
              <td>
                <span className={classes.label}>
                  Chứng chỉ ngoại ngữ <i>(nếu có)</i>:{" "}
                </span>
                <span>{chungChi}</span>
              </td>
            </tr>
          </tbody>
        </Table>
        {/* Nguyện vọng */}
        <Table bordered style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>Nguyện vọng</th>
              <th>Ngành xét tuyển</th>
              <th>Mã ngành</th>
              <th>Mã tổ hợp</th>
              <th>Tổ hợp môn xét tuyển</th>
              <th>Chương trình học</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{tenNganh1}</td>
              <td>{props.dataEdit.nganh1}</td>
              <td>{props.dataEdit.tohopmon1}</td>
              <td>{tenToHop1}</td>
              <td>
                {props.dataEdit.chuongtrinh1 == ""
                  ? "Tiêu chuẩn"
                  : props.dataEdit.chuongtrinh1}
              </td>
            </tr>
            {props.dataEdit.nganh2 !== "" ? (
              <tr>
                <td>2</td>
                <td>{tenNganh2}</td>
                <td>{props.dataEdit.nganh2}</td>
                <td>{props.dataEdit.tohopmon2}</td>
                <td>{tenToHop2}</td>
                <td>
                  {props.dataEdit.chuongtrinh2 == ""
                    ? "Tiêu chuẩn"
                    : props.dataEdit.chuongtrinh2}
                </td>
              </tr>
            ) : (
              ""
            )}
            {props.dataEdit.nganh3 !== "" ? (
              <tr>
                <td>3</td>
                <td>{tenNganh3}</td>
                <td>{props.dataEdit.nganh3}</td>
                <td>{props.dataEdit.tohopmon3}</td>
                <td>{tenToHop3}</td>
                <td>
                  {props.dataEdit.chuongtrinh3 == ""
                    ? "Tiêu chuẩn"
                    : props.dataEdit.chuongtrinh3}
                </td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "15px",
            paddingBottom: "100px",
          }}
        >
          <Button
            className={classes.editButton}
            onClick={() => navigate("/suahoso", { replace: true })}
          >
            QUAY LẠI CHỈNH SỬA
          </Button>
          <Button className={classes.acceptButton} onClick={() => onSubmit()}>
            ĐỒNG Ý CHỈNH SỬA
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(AdmissionPreview);
