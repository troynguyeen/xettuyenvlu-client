import React, {useState } from "react";
import { createUseStyles } from "react-jss";
import {
    Container,
    Button,
    Form,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import {AddImgPathHocBa} from "../../services/profileService"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const useStyles = createUseStyles({
    container: {
        padding: "2 20px",
        paddingLeft: "50px",
        backgroundColor: "white",
        maxWidth: "95%",
        minHeight: "680px",
    },

    centerBlueText: {
        textAlign: "center",
        fontSize: "26px",
        fontWeight: "bold",
        color: "#097fd9",
    },

    centerGraySmallText: {
        textAlign: "center",
        fontSize: "15px",
        fontWeight: "bold",
        color: "gray",
    },

    center: {
        textAlign: "center",
    },

    button: {
        textAlign: "center",
        margin: "5px",
        backgroundColor: "#26a69a",
        "&:hover": {
            backgroundColor: "#1f897f",
        },
    },

    button2: {
        textAlign: "center",
        margin: "5px",
        backgroundColor: "#3394f5",
        "&:hover": {
            backgroundColor: "#2877c7",
        },
        color: "white",
    },

    notifactionText: {
        textAlign: "center",
        fontSize: "30px",
        fontWeight: "bold",
        color: "red",
    },
    imgHocBa: {
        width: "300px",
    }
});

const initialFieldValues = [{
    imgSource: '',
    imgFile: [],
}
]
function Upload(props) {
    const classes = useStyles();
    const location = useLocation();
    const [values, setValues] = useState(initialFieldValues);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
          imgFile: [],
        },
      });
    const MAX_LENGTH = 5;
    const showPreview = (e) => {
      props.setIsLoading(true);
      if(Array.from(e.target.files).length > MAX_LENGTH){
        toast.error(`Không thể upload quá ${MAX_LENGTH} tập tin`,{theme: "colored"})
        setTimeout(() => props.setIsLoading(false), 1000);
      }
      else{
        let img = [];

        for (let i = 0; i < e.target.files.length; i++) {
          img.push({
            imgSource: URL.createObjectURL(e.target.files[i]),
            imgFile: e.target.files[i],
          });
        }
        setValues({
          imgSource: img.map((data) => data.imgSource),
          maHoSoThpt: location.state.MaHoSoThpt,
          imgFile: img.map((data) => data.imgFile),
        });
        setTimeout(() => props.setIsLoading(false), 1000);
      }
    }
    const onSubmit = () =>{
      props.setIsLoading(true);
      console.log(values.imgFile);
      const formData = new FormData();
        if(values.imgFile > MAX_LENGTH){
          setTimeout(() => props.setIsLoading(false), 1000);
          toast.error(`Không thể upload quá ${MAX_LENGTH} tập tin`,{theme: "colored"})
          reset("imgFile")
        }
        else if(values.imgFile==null){
          setTimeout(() => props.setIsLoading(false), 1000);
          toast.error("Chưa chọn tập tin nào",{theme: "colored"})
        }
        else{
          for(const key of Object.keys(values.imgFile)){
            formData.append("maHoSoThpt", values.maHoSoThpt);
            formData.append('imgFile', values.imgFile[key])
          }
          AddImgPathHocBa(formData)
          setTimeout(() => props.setIsLoading(false), 1000);
          toast.success("Bạn đã upload thành công!", { theme: "colored" });
        }
    }
  
    
    return (
      <Container className={classes.container}>
        <br></br>

        <div className={classes.centerBlueText}>
          UPLOAD học bạ/ phiếu điểm, CMND/CCCD ONLINE
        </div>
        <div className={classes.centerGraySmallText}>
          (Có thể chọn 1 hay nhiều file. Muốn chọn nhiều hơn 1 file vui lòng giữ
          phím CTRL rồi chọn hình tiếp theo)
        </div>
        <br></br>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.center}>
            <div className={classes.centerGraySmallText}>
              <input
                type="file"
                accept="image/*, .pdf, .gif"
                onChange={showPreview}
                id="imgFile"
                name="imgFile"
                multiple
              />
            </div>
            <Button type="submit" className={classes.button}>
              Nộp hình đã chọn
            </Button>
          </div>
        </Form>
      </Container>
    );
};

export default Upload

