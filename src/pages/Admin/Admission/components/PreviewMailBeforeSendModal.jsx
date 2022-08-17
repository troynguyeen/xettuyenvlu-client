import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUseStyles } from "react-jss";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import Input from "../../../../components/CustomInput";
import { Paper, Modal } from "@mui/material";
import {
  GetMailBeforeSend,
  SendEmailForAdmission,
} from "../../../../services/admissionAdminService";
import { toast } from "react-toastify";

const useStyles = createUseStyles({
  title: {
    color: "#c61d23",
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
  label2: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
  },
  fieldContentInput: {
    height: "200px",
  },
  fieldFooterInput: {
    height: "100px",
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
  width: "1000px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

const PreviewMailBeforeSendModal = ({
  admission,
  open,
  handleClose,
  setIsLoading,
}) => {
  const classes = useStyles();
  const { register, reset } = useForm({
    defaultValues: { tenThongBao: "" },
  });
  const [notification, setNotification] = useState({});

  const handleSendMailForAdmission = () => {
    if (admission.id !== 0) {
      const formData = new FormData();
      formData.append("ToEmail", admission.email);
      formData.append("HoVaTen", admission.hoVaTen);
      setIsLoading(true);
      SendEmailForAdmission(formData)
        .then((response) => {
          if (response.data) {
            setTimeout(() => {
              setIsLoading(false);
              handleClose();
              toast.success("Gửi mail trúng tuyển thành công!", {
                theme: "colored",
              });
            }, 1000);
          }
        })
        .catch((error) =>
          setTimeout(() => {
            setIsLoading(false);
            toast.error(error.response.data, {
              theme: "colored",
            });
          }, 1000)
        );
    }
  };

  useEffect(() => {
    GetMailBeforeSend()
      .then((response) => {
        setNotification(response.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    if (Object.keys(notification).length !== 0) {
      reset(notification);
    }
  }, [notification]);

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Form className={classes.form}>
            <div style={{ textAlign: "center" }}>
              <h3 className={classes.title}>Mail thông báo trúng tuyển</h3>
            </div>
            <FormGroup>
              <Row>
                <Label className={classes.label} for="tenThongBao" md={3}>
                  Loại thông báo
                </Label>
                <Col style={{ paddingLeft: "25px" }} md={7}>
                  <Input
                    id="tenThongBao"
                    name="tenThongBao"
                    type="text"
                    disabled
                    {...register("tenThongBao")}
                  ></Input>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label className={classes.label2} md={12}>
                  Nội dung thông báo
                </Label>
                <Col style={{ paddingLeft: "25px" }} md={12}>
                  <div
                    dangerouslySetInnerHTML={{ __html: notification.content }}
                    style={{
                      height: "400px",
                      overflowY: "scroll",
                      backgroundColor: "#FFF",
                      padding: "30px",
                      border: "1px solid #B8B8B8",
                      borderRadius: "4px",
                    }}
                  />
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
              <Button
                className={classes.submit}
                onClick={handleSendMailForAdmission}
              >
                ĐỒNG Ý GỬI MAIL
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

export default PreviewMailBeforeSendModal;
