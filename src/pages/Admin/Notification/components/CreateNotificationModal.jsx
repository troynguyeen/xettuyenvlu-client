import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUseStyles } from "react-jss";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import Input from "../../../../components/CustomInput";
import { toast } from "react-toastify";
import { Paper, Modal } from "@mui/material";
import {
  CreateNotification,
  GetAllNotificationCategories,
} from "../../../../services/notificationService";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

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
    height: "300px",
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
  width: "800px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

const CreateNotificationModal = (
  { open, handleClose, setIsLoading, fetchAllNotifications },
  ref
) => {
  const classes = useStyles();
  const { quill, quillRef } = useQuill();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      loaiThongBao: "",
    },
  });
  const [categories, setCategories] = useState([]);

  const onSubmit = (data) => {
    if (quill.getText().trim() !== "") {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("content", quill.root.innerHTML);
      formData.append("loaiThongBaoId", data.loaiThongBao);
      CreateNotification(formData)
        .then((response) => {
          if (response.data) {
            fetchAllNotifications();
            setTimeout(() => {
              setIsLoading(false);
              handleClose();
              reset("");
              toast.success("Tạo thông báo mới thành công!", {
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
    } else {
      toast.error("Nội dung thông báo là bắt buộc!", {
        theme: "colored",
      });
    }
  };

  const onError = (error) => {
    console.log("error", error);
  };

  useEffect(() => {
    GetAllNotificationCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
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
            <h3 className={classes.title}>Tạo thông báo mới</h3>
          </div>
          <FormGroup>
            <Row>
              <Label className={classes.label} for="loaiThongBao" md={3}>
                Loại thông báo
              </Label>
              <Col style={{ paddingLeft: "25px" }} md={7}>
                <Input
                  id="loaiThongBao"
                  name="loaiThongBao"
                  type="select"
                  {...register("loaiThongBao", {
                    required: {
                      value: true,
                      message: "Loại thông báo là bắt buộc",
                    },
                  })}
                >
                  <option value="">-- Chọn loại thông báo --</option>
                  {categories &&
                    categories.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.tenThongBao}
                      </option>
                    ))}
                </Input>
                {errors && (
                  <div className={classes.error}>
                    {errors.loaiThongBao?.message}
                  </div>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className={classes.label2} md={12}>
                Nội dung thông báo
              </Label>
              <Col style={{ paddingLeft: "25px" }} md={12}>
                <div className={classes.fieldContentInput} ref={quillRef} />
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
              XÁC NHẬN
            </Button>
            <Button
              className={classes.cancel}
              onClick={() => {
                reset("");
                handleClose();
              }}
            >
              QUAY LẠI
            </Button>
          </div>
        </Form>
      </Paper>
    </Modal>
  );
};

export default CreateNotificationModal;
