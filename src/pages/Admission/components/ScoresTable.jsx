import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Label } from "reactstrap";
import Input from "../../../components/CustomInput";

const useStyles = createUseStyles({
  label: {
    textAlign: "right",
    fontSize: "15px",
  },
  fieldInput: {
    fontSize: "15px",
  },
  labelSubject: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: "14px",
  },
});

const ScoresTable = (props) => {
  const classes = useStyles();

  return (
    <table style={{ width: "450px" }}>
      <tbody>
        <tr>
          <td>
            <Label
              className={classes.label + " " + classes.labelSubject}
              for="diemtoan"
              md={4}
            >
              TOÁN
            </Label>
            <Input
              className={classes.fieldInput}
              id="diemtoan"
              name="diemtoan"
              placeholder="Điểm"
              type="text"
              style={{ width: "70px" }}
              {...props.diemtoan}
            />
          </td>
          <td>
            <Label
              className={classes.label + " " + classes.labelSubject}
              for="diemvan"
              md={4}
            >
              VĂN
            </Label>
            <Input
              className={classes.fieldInput}
              id="diemvan"
              name="diemvan"
              placeholder="Điểm"
              type="text"
              style={{ width: "70px" }}
              {...props.diemvan}
            />
          </td>
          <td>
            <Label
              className={classes.label + " " + classes.labelSubject}
              for="diemanh"
              md={4}
            >
              ANH
            </Label>
            <Input
              className={classes.fieldInput}
              id="diemanh"
              name="diemanh"
              placeholder="Điểm"
              type="text"
              style={{ width: "70px" }}
              {...props.diemanh}
            />
          </td>
          <td>
            <Label
              className={classes.label + " " + classes.labelSubject}
              for="diemphap"
              md={4}
            >
              PHÁP
            </Label>
            <Input
              className={classes.fieldInput}
              id="diemphap"
              name="diemphap"
              placeholder="Điểm"
              type="text"
              style={{ width: "70px" }}
              {...props.diemphap}
            />
          </td>
          <td>
            <Label
              className={classes.label + " " + classes.labelSubject}
              for="diemly"
              md={4}
            >
              LÝ
            </Label>
            <Input
              className={classes.fieldInput}
              id="diemly"
              name="diemly"
              placeholder="Điểm"
              type="text"
              style={{ width: "70px" }}
              {...props.diemly}
            />
          </td>
        </tr>

        <tr>
          <td>
            <Label
              className={classes.label + " " + classes.labelSubject}
              for="diemhoa"
              md={4}
            >
              HÓA
            </Label>
            <Input
              className={classes.fieldInput}
              id="diemhoa"
              name="diemhoa"
              placeholder="Điểm"
              type="text"
              style={{ width: "70px" }}
              {...props.diemhoa}
            />
          </td>
          <td>
            <Label
              className={classes.label + " " + classes.labelSubject}
              for="diemsinh"
              md={4}
            >
              SINH
            </Label>
            <Input
              className={classes.fieldInput}
              id="diemsinh"
              name="diemsinh"
              placeholder="Điểm"
              type="text"
              style={{ width: "70px" }}
              {...props.diemsinh}
            />
          </td>
          <td>
            <Label
              className={classes.label + " " + classes.labelSubject}
              for="diemsu"
              md={4}
            >
              SỬ
            </Label>
            <Input
              className={classes.fieldInput}
              id="diemsu"
              name="diemsu"
              placeholder="Điểm"
              type="text"
              style={{ width: "70px" }}
              {...props.diemsu}
            />
          </td>
          <td>
            <Label
              className={classes.label + " " + classes.labelSubject}
              for="diemdia"
              md={4}
            >
              ĐỊA
            </Label>
            <Input
              className={classes.fieldInput}
              id="diemdia"
              name="diemdia"
              placeholder="Điểm"
              type="text"
              style={{ width: "70px" }}
              {...props.diemdia}
            />
          </td>
          <td>
            <Label
              className={classes.label + " " + classes.labelSubject}
              for="diemgdcd"
              md={4}
            >
              GDCD
            </Label>
            <Input
              className={classes.fieldInput}
              id="diemgdcd"
              name="diemgdcd"
              placeholder="Điểm"
              type="text"
              style={{ width: "70px" }}
              {...props.diemgdcd}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ScoresTable;
