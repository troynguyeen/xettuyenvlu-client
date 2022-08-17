import React, { useEffect, useState } from "react";
import { Container, Button } from "reactstrap";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageAccountsOutlined from "@mui/icons-material/ManageAccountsOutlined";
import {
  DeleteAccount,
  GetAllAccounts,
} from "../../../services/accountService";
import { useNavigate } from "react-router-dom";
import DialogConfirm from "../../../components/DialogConfirm";
import { toast } from "react-toastify";

const useStyles = createUseStyles({
  container: {
    padding: "50px 200px",
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

const admin_role_id = 1;

const Account = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([
    { id: 0, hoVaTen: "", tenDangNhap: "", vaiTroId: 0, tenVaiTro: "" },
  ]);
  const [id, setId] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [content, setContent] = useState("");

  const fetchAllAccounts = () => {
    props.setIsLoading(true);
    GetAllAccounts()
      .then((response) => {
        setAccounts(response.data);
        setTimeout(() => props.setIsLoading(false), 1000);
      })
      .catch((error) => {
        setTimeout(() => props.setIsLoading(false), 1000);
        console.log("error", error);
      });
  };

  const handleDeleteAccount = () => {
    if (id !== 0) {
      props.setIsLoading(true);
      DeleteAccount(id)
        .then((response) => {
          if (response.data) {
            setTimeout(() => {
              props.setIsLoading(false);
              toast.success(`Xóa tài khoản ID ${id} thành công!`, {
                theme: "colored",
              });
            }, 1000);
            setId(0);
            setOpenDialog(false);
            fetchAllAccounts();
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

  const handleOpenDialog = (id) => {
    setId(id);
    setContent(
      `Bạn có chắc chắn muốn xóa toàn bộ thông tin tài khoản ID ${id} ?`
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setId(0);
    setOpenDialog(false);
  };

  const ToggleEditIcon = ({ params }) => {
    var account = accounts.find((x) => x.id === params.id);
    return account.vaiTroId === admin_role_id ? (
      <ManageAccountsOutlined sx={{ color: "#a9a9a9" }} />
    ) : (
      <Link to={"/xettuyen-vlu-admin/account/" + params.id}>
        <ManageAccountsOutlined sx={{ color: "#3bb077" }} />
      </Link>
    );
  };

  const ToggleDeleteIcon = ({ params }) => {
    var account = accounts.find((x) => x.id === params.id);
    return account.vaiTroId === admin_role_id ? (
      <DeleteForeverIcon sx={{ color: "#a9a9a9" }} />
    ) : (
      <DeleteForeverIcon
        onClick={() => handleOpenDialog(params.id)}
        sx={{ cursor: "pointer", color: "red" }}
      />
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "hoVaTen", headerName: "Họ và tên", width: 200 },
    { field: "tenDangNhap", headerName: "Email", width: 300 },
    { field: "tenVaiTro", headerName: "Vai trò", width: 150 },
    {
      field: "action",
      headerName: "Chức năng",
      sortble: false,
      type: "actions",
      width: 150,
      renderCell: (params) => (
        <React.Fragment>
          <ToggleEditIcon params={params} />
          <div style={{ paddingLeft: "20px" }}>
            <ToggleDeleteIcon params={params} />
          </div>
        </React.Fragment>
      ),
    },
  ];

  useEffect(() => {
    fetchAllAccounts();
  }, []);

  return (
    <Container className={classes.container}>
      <DialogConfirm
        title="Thông báo xóa tài khoản"
        content={content}
        open={openDialog}
        handleClose={handleCloseDialog}
        onConfirm={handleDeleteAccount}
      />
      <h2 className={classes.title}>Quản lý tài khoản</h2>
      <Button
        className={classes.buttonCreate}
        onClick={() => navigate("/xettuyen-vlu-admin/account/create")}
      >
        Tạo mới
      </Button>
      <DataGrid
        className={classes.table}
        rows={accounts}
        columns={columns}
        pageSize={10}
      />
    </Container>
  );
};

export default Account;
