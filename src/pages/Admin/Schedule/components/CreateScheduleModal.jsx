import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUseStyles } from "react-jss";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import Input from "../../../../components/CustomInput";
import { toast } from "react-toastify";
import { Paper, Modal } from "@mui/material";
import {
  CreateSchedule,
  GetAllPhasesNotExpiry,
  GetCategoriesForSchedule,
} from "../../../../services/scheduleService";

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

const CreateScheduleModal = ({
  open,
  phases,
  categories,
  handleClose,
  setIsLoading,
  fetchAllSchedules,
  ValidateAllSchedulesWereExpired,
}) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dotId: "",
      hinhThucId: "",
      ngayBatDau: "",
      ngayKetThuc: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("dotId", data.dotId);
    formData.append("hinhThucId", data.hinhThucId);
    formData.append("ngayBatDau", data.ngayBatDau);
    formData.append("ngayKetThuc", data.ngayKetThuc);
    CreateSchedule(formData)
      .then((response) => {
        if (response.data) {
          ValidateAllSchedulesWereExpired();
          setTimeout(() => fetchAllSchedules(), 500);
          setTimeout(() => {
            setIsLoading(false);
            handleClose();
            reset("");
            toast.success("T???o l???ch tr??nh m???i th??nh c??ng!", {
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
              <h3 className={classes.title}>T???o l???ch tr??nh m???i</h3>
            </div>
            <FormGroup>
              <Row>
                <Label className={classes.label} for="dotId" md={4}>
                  ?????t x??t tuy???n
                </Label>
                <Col style={{ paddingLeft: "25px" }} md={8}>
                  <Input
                    id="dotId"
                    name="dotId"
                    type="select"
                    {...register("dotId", {
                      required: {
                        value: true,
                        message: "?????t x??t tuy???n l?? b???t bu???c",
                      },
                    })}
                  >
                    <option value="">-- Ch???n ?????t x??t tuy???n --</option>
                    {phases &&
                      phases.map((data, index) => (
                        <option key={index} value={data.id}>
                          ID {data.id} - ?????t {data.dotThu} - Kh??a {data.khoa}
                        </option>
                      ))}
                  </Input>
                  {errors && (
                    <div className={classes.error}>{errors.dotId?.message}</div>
                  )}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label className={classes.label} for="hinhThucId" md={4}>
                  Lo???i h??nh th???c
                </Label>
                <Col style={{ paddingLeft: "25px" }} md={8}>
                  <Input
                    id="hinhThucId"
                    name="hinhThucId"
                    type="select"
                    {...register("hinhThucId", {
                      required: {
                        value: true,
                        message: "Lo???i h??nh th???c l?? b???t bu???c",
                      },
                    })}
                  >
                    <option value="">-- Ch???n lo???i h??nh th???c --</option>
                    {categories &&
                      categories.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.tenHinhThuc}
                        </option>
                      ))}
                  </Input>
                  {errors && (
                    <div className={classes.error}>
                      {errors.hinhThucId?.message}
                    </div>
                  )}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label className={classes.label} for="ngayBatDau" md={4}>
                  Ng??y b???t ?????u
                </Label>
                <Col style={{ paddingLeft: "25px" }} md={8}>
                  <Input
                    className={classes.fieldInput}
                    id="ngayBatDau"
                    name="ngayBatDau"
                    type="date"
                    onKeyDown={(e) => e.preventDefault()}
                    {...register("ngayBatDau", {
                      required: {
                        value: true,
                        message: "Ng??y b???t ?????u l?? b???t bu???c",
                      },
                    })}
                  />
                  {errors && (
                    <div className={classes.error}>
                      {errors.ngayBatDau?.message}
                    </div>
                  )}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label className={classes.label} for="ngayKetThuc" md={4}>
                  Ng??y k???t th??c
                </Label>
                <Col style={{ paddingLeft: "25px" }} md={8}>
                  <Input
                    className={classes.fieldInput}
                    id="ngayKetThuc"
                    name="ngayKetThuc"
                    type="date"
                    onKeyDown={(e) => e.preventDefault()}
                    {...register("ngayKetThuc", {
                      required: {
                        value: true,
                        message: "Ng??y k???t th??c l?? b???t bu???c",
                      },
                    })}
                  />
                  {errors && (
                    <div className={classes.error}>
                      {errors.ngayKetThuc?.message}
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
                X??C NH???N
              </Button>
              <Button
                className={classes.cancel}
                onClick={() => {
                  reset("");
                  handleClose();
                }}
              >
                QUAY L???I
              </Button>
            </div>
          </Form>
        </Paper>
      </Modal>
    </div>
  );
};

export default CreateScheduleModal;
