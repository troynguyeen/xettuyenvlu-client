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
import Input from "../../../../components/CustomInput";
import { ChangePassword } from "../../../../services/accountService";
import { toast } from "react-toastify";
import { Paper, Modal } from "@mui/material";

const useStyles = createUseStyles({
  container: {},
  modal: {},
  title: {
    fontSize: "25px",
    fontWeight: "bold",
    paddingBottom: "30px",
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
  error: {
    fontSize: "14px",
    color: "red",
    paddingTop: "5px",
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

const ChangePasswordModal = ({ open, handleClose, setIsLoading }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      matKhauCu: "",
      matKhauMoi1: "",
      matKhauMoi2: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("matKhauCu", data.matKhauCu);
    formData.append("matKhauMoi", data.matKhauMoi2);
    ChangePassword(formData)
      .then((response) => {
        if (response.data) {
          setTimeout(() => {
            setIsLoading(false);
            handleClose();
            reset("");
            toast.success("Thay đổi mật khẩu thành công!", {
              theme: "colored",
            });
          }, 1000);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          toast.error(error.response.data, {
            theme: "colored",
          });
        }, 1000);
      });
  };

  const onError = (error) => {
    console.log("error", error);
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div style={{ textAlign: "center" }}>
              <h3 className={classes.title}>Thay đổi mật khẩu</h3>
            </div>
            <FormGroup>
              <Row>
                <Label className={classes.label} for="matKhauCu" md={4}>
                  Mật khẩu cũ
                </Label>
                <Col style={{ paddingLeft: "25px" }} md={8}>
                  <Input
                    className={classes.fieldInput}
                    placeholder="Mật khẩu cũ"
                    id="matKhauCu"
                    name="matKhauCu"
                    type="password"
                    {...register("matKhauCu", {
                      required: {
                        value: true,
                        message: "Mật khẩu cũ là bắt buộc",
                      },
                    })}
                  />
                  {errors && (
                    <div className={classes.error}>
                      {errors.matKhauCu?.message}
                    </div>
                  )}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label className={classes.label} for="matKhauMoi1" md={4}>
                  Mật khẩu mới
                </Label>
                <Col style={{ paddingLeft: "25px" }} md={8}>
                  <Input
                    className={classes.fieldInput}
                    placeholder="Mật khẩu mới"
                    id="matKhauMoi1"
                    name="matKhauMoi1"
                    type="password"
                    {...register("matKhauMoi1", {
                      required: {
                        value: true,
                        message: "Mật khẩu mới là bắt buộc",
                      },
                    })}
                  />
                  {errors && (
                    <div className={classes.error}>
                      {errors.matKhauMoi1?.message}
                    </div>
                  )}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label className={classes.label} for="matKhauMoi2" md={4}>
                  Nhập lại mật khẩu
                </Label>
                <Col style={{ paddingLeft: "25px" }} md={8}>
                  <Input
                    className={classes.fieldInput}
                    placeholder="Nhập lại mật khẩu mới"
                    id="matKhauMoi2"
                    name="matKhauMoi2"
                    type="password"
                    {...register("matKhauMoi2", {
                      required: {
                        value: true,
                        message: "Nhập lại mật khẩu mới là bắt buộc",
                      },
                      validate: (value) =>
                        value === getValues("matKhauMoi1") ||
                        "Nhập lại phải giống với mật khẩu mới",
                    })}
                  />
                  {errors && (
                    <div className={classes.error}>
                      {errors.matKhauMoi2?.message}
                    </div>
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
              <Button className={classes.cancel} onClick={handleClose}>
                QUAY LẠI
              </Button>
            </div>
          </Form>
        </Paper>
      </Modal>
    </div>
  );
};

export default ChangePasswordModal;
