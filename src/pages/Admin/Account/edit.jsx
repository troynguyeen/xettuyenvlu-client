import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUseStyles } from "react-jss";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import Input from "../../../components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import {
  EditAccount,
  GetAccountById,
  GetAllRoles,
} from "../../../services/accountService";
import { toast } from "react-toastify";

const useStyles = createUseStyles({
  container: {
    padding: "50px 350px",
    paddingBottom: "300px",
  },
  title: {
    fontSize: "25px",
    fontWeight: "bold",
    paddingBottom: "30px",
    paddingTop: "20px",
  },
  form: {
    backgroundColor: "#FFF",
    borderRadius: "4px",
    padding: "30px",
    paddingTop: "20px",
  },
  label: {
    textAlign: "right",
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
});

const AccountEdit = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  let { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 0,
      hoVaTen: "",
      tenDangNhap: "",
      vaiTroId: "",
    },
  });
  const [account, setAccount] = useState({});
  const [roles, setRoles] = useState([{}]);

  const onSubmit = (data) => {
    props.setIsLoading(true);
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("hoVaTen", data.hoVaTen);
    formData.append("tenDangNhap", data.tenDangNhap);
    formData.append("vaiTroId", data.vaiTroId);

    EditAccount(formData)
      .then((response) => {
        if (response.data) {
          setTimeout(() => {
            props.setIsLoading(false);
            navigate(-1);
            toast.success("Chỉnh sửa tài khoản thành công!", {
              theme: "colored",
            });
          }, 1000);
        }
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

  const onError = (error) => {
    console.log("error", error);
  };

  useEffect(() => {
    props.setIsLoading(true);
    GetAllRoles()
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => console.log(error));
    GetAccountById(id)
      .then((response) => {
        setAccount(response.data);
        setTimeout(() => props.setIsLoading(false), 1000);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => props.setIsLoading(false), 1000);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(account).length !== 0) {
      reset(account);
    }
  }, [account]);

  return (
    <Container className={classes.container}>
      <Form className={classes.form} onSubmit={handleSubmit(onSubmit, onError)}>
        <div style={{ textAlign: "center" }}>
          <h3 className={classes.title}>Chỉnh sửa thông tin tài khoản</h3>
        </div>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="id" md={3}>
              ID
            </Label>
            <Col style={{ paddingLeft: "25px" }} md={7}>
              <Input
                className={classes.fieldInput}
                placeholder="ID"
                id="id"
                name="id"
                type="text"
                disabled
                {...register("id")}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="hoVaTen" md={3}>
              Họ và tên
            </Label>
            <Col style={{ paddingLeft: "25px" }} md={7}>
              <Input
                className={classes.fieldInput}
                placeholder="Họ và tên"
                id="hoVaTen"
                name="hoVaTen"
                type="text"
                {...register("hoVaTen", {
                  required: {
                    value: true,
                    message: "Họ và tên là bắt buộc",
                  },
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
            <Label className={classes.label} for="tenDangNhap" md={3}>
              Email
            </Label>
            <Col style={{ paddingLeft: "25px" }} md={7}>
              <Input
                className={classes.fieldInput}
                placeholder="Email"
                id="tenDangNhap"
                name="tenDangNhap"
                type="text"
                disabled
                {...register("tenDangNhap")}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="vaiTroId" md={3}>
              Vai trò
            </Label>
            <Col style={{ paddingLeft: "25px" }} md={7}>
              <Input
                className={classes.fieldInput}
                id="vaiTroId"
                name="vaiTroId"
                type="select"
                {...register("vaiTroId", {
                  required: {
                    value: true,
                    message: "Vai trò là bắt buộc",
                  },
                })}
              >
                {roles &&
                  roles.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.tenVaiTro}
                    </option>
                  ))}
              </Input>
              {errors && (
                <div className={classes.error}>{errors.vaiTroId?.message}</div>
              )}
            </Col>
          </Row>
        </FormGroup>
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
          <Button className={classes.cancel} onClick={() => navigate(-1)}>
            QUAY LẠI
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AccountEdit;
