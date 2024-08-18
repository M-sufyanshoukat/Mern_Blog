import { Button } from "flowbite-react";
import { FaB } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";

const PasswordForgottenForm = () => {

  // const { token } = useParams();
  // const dispatch = useDispatch();
  // const [info, setinfo] = useState({
  //   password: "",
  //   cpassword: "",
  // });
  // const inputs = (value, name) => {
  //   try {
  //     setinfo({
  //       ...info,
  //       [name]: value,
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  return (<>
  

  <form
                className="w-full h-full text-center  text-black px-5 "
                action=""
              >
                {/* <Toaster /> */}
                <h1 className="text-[#00162b] text-4xl mb-10  font-sans font-[900] text-center uppercase">
                  Reset Password
                </h1>
                <div className="inputFeild flex items-center justify-start w-full mb-8  bg-white ">
                  <input
                    id="pass"
                    name="password"
                    placeholder="New Password"
                    type="password"
                    onChange={(e) => {
                      inputs(e.target.value, "password");
                    }}
                    className="outline-none bg-transparent border-none w-[87%]"
                  />
                  <div
                    onClick={() => showHidePassword()}
                    className="w-[13%] h-full px-2 flex items-center justify-end"
                  >
                    {/* {pass ? (
                      <IoEye className="text-[27px]" />
                    ) : (
                      <IoEyeOff className="text-[27px]" />
                    )} */}
                  </div>
                </div>

                <div className="inputFeild flex items-center justify-start w-full mb-8  bg-white ">
                  <input
                    id="cpass"
                    name="cpassword"
                    placeholder="Confirm Password"
                    type="password"
                    onChange={(e) => {
                      inputs(e.target.value, "cpassword");
                    }}
                    className="outline-none bg-transparent border-none w-[87%]"
                  />
                  <div
                    onClick={() => showHideCpassword()}
                    className="w-[13%] h-full px-2 flex items-center justify-end"
                  >
                    {/* {Cpass ? (
                      <IoEye className="text-[27px]" />
                    ) : (
                      <IoEyeOff className="text-[27px]" />
                    )} */}
                  </div>
                </div>
                {/* <Fab
                  onClick={() => {
                    HandleInputs(info.password, info.cpassword);
                  }}
                  size="medium"
                  variant="extended"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    backgroundColor: "#00162b",
                  }}
                  color="primary"
                >
                  Reset
                </Fab> */}
                <Button>Submit</Button>
              </form>

  </>)
}
export default PasswordForgottenForm;
