import React, { useEffect, useState } from "react";
import { Container, Button } from "reactstrap";
import { DataGrid } from "@mui/x-data-grid";
import { createUseStyles } from "react-jss";
import moment from "moment";
import {
  ChangeStatusNotification,
  GetAllNotifications,
  GetNotificationById,
} from "../../../services/notificationService";
import CreateNotificationModal from "./components/CreateNotificationModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewNotificationModal from "./components/ViewNotificationModal";
import { Switch } from "@mui/material";
import DialogConfirm from "../../../components/DialogConfirm";
import { toast } from "react-toastify";

const useStyles = createUseStyles({
  container: {
    padding: "50px 230px",
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

const Notification = (props) => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState({});
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openTemplateModal, setOpenTemplateModal] = useState(false);
  const [id, setId] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [content, setContent] = useState("");

  const fetchAllNotifications = () => {
    props.setIsLoading(true);
    GetAllNotifications()
      .then((response) => {
        var list = response.data.map((data) => ({
          ...data,
          ngayTao: moment(data.ngayTao).format("DD/MM/YYYY"),
        }));
        setNotifications(list);
        setTimeout(() => props.setIsLoading(false), 1000);
      })
      .catch((error) => {
        setTimeout(() => props.setIsLoading(false), 1000);
        console.log("error", error);
      });
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleOpenTemplateModal = () => {
    setOpenTemplateModal(true);
  };

  const handleCloseTemplateModal = () => {
    setOpenTemplateModal(false);
  };

  const handleOpenDialog = (id) => {
    setId(id);
    setContent(
      `Bạn có chắc chắn muốn chuyển trạng thái thông báo ID ${id} thành Active ?`
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setId(0);
    setOpenDialog(false);
  };

  const handleActiveNotification = () => {
    if (id !== 0) {
      props.setIsLoading(true);
      ChangeStatusNotification(id)
        .then((response) => {
          if (response.data) {
            setTimeout(() => {
              props.setIsLoading(false);
              toast.success(`Active thông báo ID ${id} thành công!`, {
                theme: "colored",
              });
            }, 1000);
            setId(0);
            setOpenDialog(false);
            fetchAllNotifications();
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

  const onGetNotificationById = (id) => {
    GetNotificationById(id)
      .then((response) => {
        setNotification(response.data);
      })
      .catch((error) => console.log("error", error));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "tenThongBao", headerName: "Loại thông báo", width: 170 },
    { field: "tenTrangThai", headerName: "Trạng thái", width: 100 },
    { field: "tenNguoiTao", headerName: "Người tạo", width: 170 },
    { field: "ngayTao", headerName: "Ngày tạo", width: 150 },
    {
      field: "action",
      headerName: "Chức năng",
      type: "actions",
      sortble: false,
      width: 150,
      renderCell: (params) => (
        <React.Fragment>
          <VisibilityIcon
            sx={{ color: "#009304", cursor: "pointer" }}
            onClick={() => {
              onGetNotificationById(params.id);
              handleOpenTemplateModal();
            }}
          />
          <div style={{ paddingLeft: "10px" }}>
            <Switch
              checked={
                notifications.find((x) => x.id === params.id).trangThaiId === 1
                  ? true
                  : false
              }
              disabled={
                notifications.find((x) => x.id === params.id).trangThaiId === 1
                  ? true
                  : false
              }
              onChange={() => handleOpenDialog(params.id)}
            />
          </div>
        </React.Fragment>
      ),
    },
  ];

  useEffect(() => {
    fetchAllNotifications();
  }, []);

  return (
    <Container className={classes.container}>
      <DialogConfirm
        title="Thông báo chuyển trạng thái"
        content={content}
        open={openDialog}
        handleClose={handleCloseDialog}
        onConfirm={handleActiveNotification}
      />
      {openCreateModal ? (
        <CreateNotificationModal
          open={openCreateModal}
          handleClose={handleCloseCreateModal}
          setIsLoading={props.setIsLoading}
          fetchAllNotifications={fetchAllNotifications}
        />
      ) : (
        ""
      )}
      {openTemplateModal ? (
        <ViewNotificationModal
          notification={notification}
          open={openTemplateModal}
          setIsLoading={props.setIsLoading}
          handleClose={handleCloseTemplateModal}
        />
      ) : (
        ""
      )}
      <h2 className={classes.title}>Lịch sử chỉnh sửa thông báo</h2>
      <Button className={classes.buttonCreate} onClick={handleOpenCreateModal}>
        Tạo mới
      </Button>
      <DataGrid
        className={classes.table}
        rows={notifications}
        columns={columns}
        pageSize={10}
      />
    </Container>
  );
};

export default Notification;
