import React, { useEffect, useState } from "react";
import { Container, Button } from "reactstrap";
import { DataGrid } from "@mui/x-data-grid";
import { createUseStyles } from "react-jss";
import {
  ChangeStatusPhase,
  GetAllPhases,
  ValidateAllPhasesWereExpired,
} from "../../../services/phaseService";
import CreatePhaseModal from "./components/CreatePhaseModal";
import moment from "moment";
import { Switch } from "@mui/material";
import DialogConfirm from "../../../components/DialogConfirm";
import { toast } from "react-toastify";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = createUseStyles({
  container: {
    padding: "50px 80px",
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

const Phase = (props) => {
  const classes = useStyles();
  const [phases, setPhases] = useState([]);
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

  const fetchAllPhases = () => {
    props.setIsLoading(true);
    GetAllPhases()
      .then((response) => {
        var list = response.data.map((data) => ({
          ...data,
          ngayBatDau: moment(data.ngayBatDau).format("DD/MM/YYYY"),
          ngayKetThuc: moment(data.ngayKetThuc).format("DD/MM/YYYY"),
          ngayTao: moment(data.ngayTao).format("DD/MM/YYYY"),
        }));
        setPhases(list);
        setTimeout(() => props.setIsLoading(false), 1000);
      })
      .catch((error) => {
        setTimeout(() => props.setIsLoading(false), 1000);
        console.log("error", error);
      });
  };

  const handleOpenDialog = (id) => {
    setId(id);
    setContent(
      `Bạn có chắc chắn muốn chuyển trạng thái đợt xét tuyển ID ${id} thành Active ?`
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setId(0);
    setOpenDialog(false);
  };

  const handleActivePhase = () => {
    if (id !== 0) {
      props.setIsLoading(true);
      ChangeStatusPhase(id)
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
            fetchAllPhases();
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
    return phases.find((x) => x.id === params.id).isExpired ? (
      <CloseIcon sx={{ color: "red" }} />
    ) : (
      <DoneIcon sx={{ color: "green" }} />
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "dotThu", headerName: "Đợt thứ", width: 100 },
    { field: "khoa", headerName: "Khóa", width: 100 },
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
              phases.find((x) => x.id === params.id).trangThaiId === 1
                ? true
                : false
            }
            disabled={
              phases.find((x) => x.id === params.id).trangThaiId === 1
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
    ValidateAllPhasesWereExpired();
    fetchAllPhases();
  }, []);

  return (
    <Container className={classes.container}>
      <DialogConfirm
        title="Thông báo chuyển trạng thái"
        content={content}
        open={openDialog}
        handleClose={handleCloseDialog}
        onConfirm={handleActivePhase}
      />
      <CreatePhaseModal
        open={openModal}
        handleClose={handleCloseModal}
        setIsLoading={props.setIsLoading}
        fetchAllPhases={fetchAllPhases}
        ValidateAllPhasesWereExpired={ValidateAllPhasesWereExpired}
      />
      <h2 className={classes.title}>Lịch sử đợt xét tuyển</h2>
      <Button className={classes.buttonCreate} onClick={handleOpenModal}>
        Tạo mới
      </Button>
      <DataGrid
        className={classes.table}
        rows={phases}
        columns={columns}
        pageSize={10}
      />
    </Container>
  );
};

export default Phase;
