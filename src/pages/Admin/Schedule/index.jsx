import React, { useEffect, useState } from "react";
import { Container, Button } from "reactstrap";
import { DataGrid } from "@mui/x-data-grid";
import { createUseStyles } from "react-jss";
import moment from "moment";
import { Switch } from "@mui/material";
import DialogConfirm from "../../../components/DialogConfirm";
import { toast } from "react-toastify";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import CreateScheduleModal from "./components/CreateScheduleModal";
import {
  ChangeStatusSchedule,
  GetAllPhasesNotExpiry,
  GetAllSchedules,
  GetCategoriesForSchedule,
  ValidateAllSchedulesWereExpired,
} from "../../../services/scheduleService";

const useStyles = createUseStyles({
  container: {
    padding: "50px 0px",
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
});

const Schedule = (props) => {
  const classes = useStyles();
  const [schedules, setSchedules] = useState([]);
  const [phases, setPhases] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [content, setContent] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchAllSchedules = () => {
    props.setIsLoading(true);
    GetAllSchedules()
      .then((response) => {
        var list = response.data.map((data) => {
          return {
            ...data,
            ngayBatDau: moment(data.ngayBatDau).format("DD/MM/YYYY"),
            ngayKetThuc: moment(data.ngayKetThuc).format("DD/MM/YYYY"),
            ngayTao: moment(data.ngayTao).format("DD/MM/YYYY"),
          };
        });
        setSchedules(list);
        setTimeout(() => props.setIsLoading(false), 1000);
      })
      .catch((error) => {
        setTimeout(() => props.setIsLoading(false), 1000);
        console.log("error", error);
      });
  };

  const fetchAllPhasesNotExpiry = () => {
    props.setIsLoading(true);
    GetAllPhasesNotExpiry()
      .then((response) => {
        setPhases(response.data);
        setTimeout(() => props.setIsLoading(false), 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          props.setIsLoading(false);
          toast.error(error.response.data, {
            theme: "colored",
          });
        }, 1000);
      });
  };

  const fetchCategoriesForSchedule = () => {
    props.setIsLoading(true);
    GetCategoriesForSchedule()
      .then((response) => {
        setCategories(response.data);
        setTimeout(() => props.setIsLoading(false), 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          props.setIsLoading(false);
          toast.error(error.response.data, {
            theme: "colored",
          });
        }, 1000);
      });
  };

  const handleOpenDialog = (id) => {
    setId(id);
    setContent(
      `Bạn có chắc chắn muốn chuyển trạng thái lịch trình ID ${id} thành Active ?`
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setId(0);
    setOpenDialog(false);
  };

  const handleActiveSchedule = () => {
    if (id !== 0) {
      props.setIsLoading(true);
      ChangeStatusSchedule(id)
        .then((response) => {
          if (response.data) {
            setTimeout(() => {
              props.setIsLoading(false);
              toast.success(`Active lịch trình ID ${id} thành công!`, {
                theme: "colored",
              });
            }, 1000);
            setId(0);
            setOpenDialog(false);
            fetchAllSchedules();
          }
        })
        .catch((error) => {
          setTimeout(() => {
            props.setIsLoading(false);
            toast.error(error.response.data, {
              theme: "colored",
            });
          }, 1000);
          setId(0);
          setOpenDialog(false);
        });
    }
  };

  const IsExpiredComponent = ({ params }) => {
    console.log('schedules', schedules.find((x) => x.id === params.id).isExpired)
    return schedules.find((x) => x.id === params.id).isExpired ? (
      <CloseIcon sx={{ color: "red" }} />
    ) : (
      <DoneIcon sx={{ color: "green" }} />
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "dotThu", headerName: "Đợt thứ", width: 100 },
    { field: "khoa", headerName: "Khoa", width: 100 },
    { field: "tenHinhThuc", headerName: "Hình thức", width: 180 },
    { field: "ngayBatDau", headerName: "Ngày bắt đầu", width: 120 },
    { field: "ngayKetThuc", headerName: "Ngày kết thúc", width: 120 },
    { field: "tenTrangThai", headerName: "Trạng thái", width: 100 },
    {
      field: "isExpired",
      headerName: "Hiệu lực",
      type: "actions",
      width: 100,
      renderCell: (params) => <IsExpiredComponent params={params} />,
    },
    { field: "tenNguoiTao", headerName: "Người tạo", width: 200 },
    { field: "ngayTao", headerName: "Ngày tạo", width: 120 },
    {
      field: "action",
      headerName: "Chức năng",
      type: "actions",
      sortble: false,
      width: 100,
      renderCell: (params) => (
        <React.Fragment>
          <Switch
            checked={
              schedules.find((x) => x.id === params.id).trangThaiId === 1
                ? true
                : false
            }
            disabled={
              schedules.find((x) => x.id === params.id).trangThaiId === 1
                ? true
                : false
            }
            onChange={() => handleOpenDialog(params.id)}
          />
        </React.Fragment>
      ),
    },
  ];

  useEffect(() => {
    ValidateAllSchedulesWereExpired();
    fetchAllSchedules();
    fetchAllPhasesNotExpiry();
    fetchCategoriesForSchedule();
  }, []);

  return (
    <Container className={classes.container}>
      <DialogConfirm
        title="Thông báo chuyển trạng thái"
        content={content}
        open={openDialog}
        handleClose={handleCloseDialog}
        onConfirm={handleActiveSchedule}
      />
      {openModal ? (
        <CreateScheduleModal
          open={openModal}
          phases={phases}
          categories={categories}
          handleClose={handleCloseModal}
          setIsLoading={props.setIsLoading}
          fetchAllSchedules={fetchAllSchedules}
          ValidateAllSchedulesWereExpired={ValidateAllSchedulesWereExpired}
        />
      ) : (
        ""
      )}
      <h2 className={classes.title}>Lịch sử chỉnh sửa lịch trình</h2>
      <Button className={classes.buttonCreate} onClick={handleOpenModal}>
        Tạo mới
      </Button>
      <DataGrid
        className={classes.table}
        rows={schedules}
        columns={columns}
        pageSize={10}
      />
    </Container>
  );
};

export default Schedule;
