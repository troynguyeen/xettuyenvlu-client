import React from "react";
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
import logoMini from "../../../images/logo_mini.png";
import { LoginAPI } from "../../../services/accountService";
import { toast } from "react-toastify";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "150px 0",
    paddingBottom: "300px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    backgroundColor: "#FFF",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    borderRadius: "10px",
    padding: "30px",
    paddingTop: "20px",
  },
  label: {
    fontWeight: "bold",
    margin: "0",
  },
  button: {
    width: "100%",
    border: "0px",
    borderRadius: "6px",
    background:
      "linear-gradient(90deg, rgba(23,54,192,1) 0%, rgba(198,29,35,1) 100%)",
    marginTop: "20px",
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(36,70,222,1) 0%, rgba(222,24,32,1) 100%)",
    },
  },
  error: {
    fontSize: "14px",
    color: "red",
    paddingTop: "5px",
  },
});

const AccountLogin = (props) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const onLogin = (data) => {
    props.setIsLoading(true);
    const formData = new FormData();
    formData.append("TenDangNhap", data.email);
    formData.append("MatKhau", data.password);
    LoginAPI(formData)
      .then((response) => {
        setTimeout(() => {
          props.setIsLoading(false);
          localStorage.setItem("fullName", response.data.fullName);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("jwtToken", response.data.jwtToken);
          props.setUser(response.data.fullName);
          props.setRole(response.data.role);
          toast("🚀 Welcome " + response.data.fullName + " !");
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          props.setIsLoading(false);
          toast.error(error.response.data, { theme: "colored" });
        }, 1000);
      });
  };

  const onError = (error) => {
    console.log("error", error);
  };

  return (
    <Container className={classes.container}>
      <Form className={classes.form} onSubmit={handleSubmit(onLogin, onError)}>
        <div className={classes.title}>
          <img src={logoMini} style={{ width: "50px", paddingRight: "10px" }} />
          Login
        </div>
        <hr style={{ marginBottom: "35px" }} />
        <FormGroup>
          <Row>
            <Label className={classes.label} for="email" md={3}>
              Email
            </Label>
            <Col style={{ paddingLeft: "25px" }} md={9}>
              <Input
                className={classes.fieldInput}
                placeholder="Tên đăng nhập"
                id="email"
                name="email"
                type="text"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Tên đăng nhập là bắt buộc",
                  },
                  pattern: {
                    value: emailPattern,
                    message: "Tên đăng nhập phải là định dạng email",
                  },
                })}
              />
              {errors && (
                <div className={classes.error}>{errors.email?.message}</div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label className={classes.label} for="password" md={3}>
              Password
            </Label>
            <Col style={{ paddingLeft: "25px" }} md={9}>
              <Input
                className={classes.fieldInput}
                placeholder="Mật khẩu"
                id="password"
                name="password"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Mật khẩu là bắt buộc",
                  },
                })}
              />
              {errors && (
                <div className={classes.error}>{errors.password?.message}</div>
              )}
            </Col>
          </Row>
        </FormGroup>
        <Button className={classes.button} type="submit">
          ĐĂNG NHẬP
        </Button>
      </Form>
    </Container>
  );
};

export default AccountLogin;
