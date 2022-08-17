import React, { useEffect, useState, Component } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageAccountsOutlined from "@mui/icons-material/ManageAccountsOutlined";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import {
  GetDataForHoso,
  DeleteDataForHosoThpt,
  DeleteBangDiemForBangDiemThpt,
  GetPhase
} from "../../../services/admissionAdminService";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Container, Button, Input } from "reactstrap";
import moment from "moment";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import * as XLSX from "xlsx";

const useStyles = createUseStyles({
  containerAdmin: {
    padding: "50px 20px",
    marginBottom: "150px",
    width: "100%",
    height: "700px",
  },
  containerCollaborator: {
    padding: "50px 270px",
    marginBottom: "150px",
    width: "100%",
    height: "700px",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    backgroundColor: "#FFF",
  },
  buttonCreate: {
    backgroundColor: "#2c9b91",
    margin: "20px 0",
    border: "none",
    "&:hover": {
      backgroundColor: "#3bccbf",
    },
  },
  btnExport: {
    backgroundColor: "#2c9b91",
    margin: "20px 0",
    border: "none",
    marginLeft: "0",
    "&:hover": {
      backgroundColor: "#3bccbf",
    },
  },
  fieldInput: {
    fontSize: "15px",
    width: "150px"
  },
});

const AdmissionAdmin = (props) => {
  const classes = useStyles();
  const [DataForHoso, setDataForHoso] = useState([]);
  const [phase, setPhase] = useState([]);

  const exportData = () => {
    props.setIsLoading(true);
    GetDataForHoso()
    .then((response) => {
      var list = response.data.map((data) => {
        return{
          ...data,
        ngaySinh: moment(data.ngaySinh).format("DD/MM/YYYY"),
        tenNganhTenToHop1: data.tenNganhTenToHop1?.split("#")[0],
        tenNganhTenToHop2: data.tenNganhTenToHop2?.split("#")[0],
        tenNganhTenToHop3: data.tenNganhTenToHop3?.split("#")[0],
        quocTich: data.quocTich?.split("|")[1],
        tenTruongThpt: data.tenTruongThpt?.split("-")[1],
        dotId: null,
        khoa: null,
        phase: "Đợt "+data.phase+" Khóa "+data.khoa,
        };
      });
      setDataForHoso(list);
      setTimeout(() => props.setIsLoading(false), 1000);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const handleOnExport = () => {
    props.setIsLoading(true);
    const wb = XLSX.utils.book_new();
    const myHeader = [[
      "ID",
      "HỌ VÀ TÊN",
      "EMAIL",
      "CMND/CCCD",
      "SỐ ĐIỆN THOẠI",
      "NƠI SINH",
      "GIỚI TÍNH",
      "NGÀY SINH",
      "DÂN TỘC",
      "TÔN GIÁO",
      "QUỐC TỊCH",
      "HỘ KHẨU",
      "NĂM TỐT NGHIỆP",
      "SỐ BÁO DANH",
      "HỌC LỰC LỚP 12",
      "HẠNH KIỂM LỚP 12",
      "LOẠI HÌNH TỐT NGHIỆP",
      "TÊN TRƯỜNG THPT",
      "TÊN LỚP 12",
      "KHU VỰC",
      "ĐỐI TƯỢNG ƯU TIÊN",
      "CHỨNG CHỈ NGOẠI NGỮ",
      "TÊN NGÀNH XÉT TUYỂN 1",
      "CHƯƠNG TRÌNH HỌC",
      "TÊN NGÀNH XÉT TUYỂN 2",
      "CHƯƠNG TRÌNH HỌC",
      "TÊN NGÀNH XÉT TUYỂN 3",
      "CHƯƠNG TRÌNH HỌC",
      "ĐỊA CHỈ LIÊN LẠC",
      "TRẠNG THÁI HỒ SƠ",
      "ĐIỂM MỸ THUẬT",
      "ĐIỂM NĂNG KHIẾU",
      "ĐỢT XÉT TUYỂN"
    ]
    ];
    var wscols = [
      { width: 7 }, 
      { width: 30 }, 
      { width: 40 },
      { width: 20 },
      { width: 20 },
      { width: 30 }, 
      { width: 10 }, 
      { width: 30 }, 
      { width: 10 },
      { width: 10 },
      { width: 15 },
      { width: 80 },
      { width: 10 },
      { width: 20 },
      { width: 10 },
      { width: 10 },
      { width: 10 },
      { width: 40 },
      { width: 10 },
      { width: 10 },
      { width: 10 },
      { width: 40 },
      { width: 40 },
      { width: 20 },
      { width: 40 },
      { width: 20 },
      { width: 40 },
      { width: 20 },
      { width: 20 },
      { width: 15 },
      { width: 15 },
      { width: 15 },
      { width: 15 }
    ];
    const ws = XLSX.utils.json_to_sheet([]);
    ws['!cols'] = wscols;
    XLSX.utils.sheet_add_aoa(ws, myHeader);
    if(DataForHoso.length != 0){
      XLSX.utils.sheet_add_json(ws, DataForHoso, { origin: 'A2',skipHeader: true });
      XLSX.utils.book_append_sheet(wb, ws, "");
      XLSX.writeFile(wb, "hoso.xlsx");
      setTimeout(() => props.setIsLoading(false), 1000);
      toast.success("Xuất dữ liệu thành công!", { theme: "colored" });
    }
    else{
      setTimeout(() => props.setIsLoading(false), 1000);
      toast.error("Không có dữ liệu để xuất", {theme: "colored"})
    }
  }

  const handleDelete = async (Id) => {
    confirmAlert({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa dữ liệu này không?",
      buttons: [
        {
          label: "Xóa",
          onClick: () => {
            DeleteDataForHosoThpt(Id);
            DeleteBangDiemForBangDiemThpt(Id);
            GetDataForHoso()
              .then((response) => {
                setDataForHoso(
                  response.data.filter((data) => data.id !== Id),
                  toast.success("Xóa dữ liệu thành công!", { theme: "colored" })
                );
              })
              .catch((error) => {
                toast.error(error.response.data, { theme: "colored" });
              });
          },
        },
        {
          label: "Không",
        },
      ],
    });
  };

  const handleOnSelect = (event) => {
    props.setIsLoading(true);
    GetDataForHoso()
    .then((response) => {
      var list = [];
      response.data.map((data) => {
        if(event.target.value == data.dotId){
          list.push({...data,
            ngaySinh: moment(data.ngaySinh).format("DD/MM/YYYY"),
            tenNganhTenToHop1: data.tenNganhTenToHop1?.split("#")[0],
            tenNganhTenToHop2: data.tenNganhTenToHop2?.split("#")[0],
            tenNganhTenToHop3: data.tenNganhTenToHop3?.split("#")[0],
            quocTich: data.quocTich?.split("|")[1],
            tenTruongThpt: data.tenTruongThpt?.split("-")[1],
            dotId: null,
            khoa: null,
            phase: "Đợt "+data.phase+" Khóa "+data.khoa,
            })
        }
        else if(event.target.value == "all"){
          list.push({...data,
            ngaySinh: moment(data.ngaySinh).format("DD/MM/YYYY"),
            tenNganhTenToHop1: data.tenNganhTenToHop1?.split("#")[0],
            tenNganhTenToHop2: data.tenNganhTenToHop2?.split("#")[0],
            tenNganhTenToHop3: data.tenNganhTenToHop3?.split("#")[0],
            quocTich: data.quocTich?.split("|")[1],
            tenTruongThpt: data.tenTruongThpt?.split("-")[1],
            dotId: null,
            khoa: null,
            phase: "Đợt "+data.phase+" Khóa "+data.khoa,
          })
        }
      })
      setDataForHoso(list)
      setTimeout(() => props.setIsLoading(false), 1000);
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => props.setIsLoading(false), 1000);
    })
  }

  const IsExpiredComponent = ({ params }) => {
    return DataForHoso.find((x) => x.id === params.id).daNhanHoSo ? (
      <DoneIcon sx={{ color: "green" }} />
    ) : (
      <CloseIcon sx={{ color: "red" }} />
    );
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      hide: props.role === "Admin" ? false : true,
    },
    {
      field: "hoVaTen",
      headerName: "Họ Tên",
      width: props.role === "Admin" ? 200 : 250,
    },
    {
      field: "gioiTinh",
      headerName: "Giới tính",
      width: 100,
    },
    {
      field: "ngaySinh",
      headerName: "Ngày sinh",
      width: props.role === "Admin" ? 100 : 150,
    },
    {
      field: "tenNoiSinh",
      headerName: "Địa Chỉ",
      width: props.role === "Admin" ? 150 : 250,
    },
    {
      field: "cmnd",
      headerName: "Số CMND",
      width: 120,
      hide: props.role === "Admin" ? false : true,
    },
    {
      field: "dienThoaiDd",
      headerName: "Số điện thoại",
      width: 120,
      hide: props.role === "Admin" ? false : true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      hide: props.role === "Admin" ? false : true,
    },
    {
      field: "daNhanHoSo",
      headerName: "Đã nhận",
      type: "actions",
      width: 100,
      hide: props.role === "Admin" ? false : true,
      renderCell: (params) => <IsExpiredComponent params={params} />,
    },
    {
      field: "tuychon",
      headerName: "Tùy chọn",
      width: 100,
      type: "actions",
      hide: props.role === "Admin" ? false : true,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/xettuyen-vlu-admin/admission/edit/" + params.id}>
              <ManageAccountsOutlined sx={{ color: "#3bb077" }} />
            </Link>
            <div style={{ paddingLeft: "20px" }}>
              <DeleteForeverIcon
                sx={{ color: "red" }}
                onClick={() => handleDelete(params.id)}
              />
            </div>
          </>
        );
      },
    },
  ];
  useEffect(() =>{
    exportData();
    handleOnSelect();
    GetPhase()
      .then((response) => {
        setPhase(response.data);
      })
      .catch((error) => {
        console.log(error)
      });
  },[])
  useEffect(() => {
    props.setIsLoading(true);
    GetDataForHoso()
      .then((response) => {
        var list = response.data.map((data) => ({
          ...data,
          ngaySinh: moment(data.ngaySinh).format("DD/MM/YYYY"),
        }));
        setDataForHoso(list);
        setTimeout(() => props.setIsLoading(false), 1000);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => props.setIsLoading(false), 1000);
      });
  }, []);

  

  if(props.role === "Admin" ? false : true) {
    return (
      <Container
        className={
          props.role === "Admin"
            ? classes.containerAdmin
            : classes.containerCollaborator
        }
      >
        <h2 className={classes.title}>Quản lý hồ sơ xét tuyển</h2>
        <DataGrid
          className={classes.table}
          rows={DataForHoso}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          // checkboxSelection
        />
      </Container>
    );
  }
  else{
    return (
      <Container
        className={
          props.role === "Admin"
            ? classes.containerAdmin
            : classes.containerCollaborator
        }
      >
        <h2 className={classes.title}>Quản lý hồ sơ xét tuyển</h2>
        <Button className={classes.btnExport} onClick={handleOnExport}>
          Xuất dữ liệu ra Excel
        </Button>
        <Input
          className={classes.fieldInput}
          type="select"
          onChange={handleOnSelect}
        >
          <option value="all">Tất cả các đợt</option>
          {phase.map((data, index) => (
            <option key={index} value={data.id}>
              Đợt {data.dotThu} Khóa {data.khoa}
            </option>
          ))}
        </Input>
        <DataGrid
          className={classes.table}
          rows={DataForHoso}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          // checkboxSelection
        />
      </Container>
    );
  } 
};
export default AdmissionAdmin;
