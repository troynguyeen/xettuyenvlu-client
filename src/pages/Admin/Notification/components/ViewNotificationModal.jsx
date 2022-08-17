import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUseStyles } from "react-jss";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import Input from "../../../../components/CustomInput";
import { Paper, Modal } from "@mui/material";
import { GetNotificationById } from "../../../../services/notificationService";

const useStyles = createUseStyles({
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
  label2: {
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
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

const ViewNotificationModal = ({ open, handleClose, notification }) => {
  const classes = useStyles();
  const { register, reset } = useForm({
    defaultValues: { tenThongBao: "" },
  });

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
              <h3 className={classes.title}>Xem thông báo</h3>
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
                justifyContent: "center",
                paddingTop: "50px",
                paddingBottom: "20px",
              }}
            >
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

export default ViewNotificationModal;
