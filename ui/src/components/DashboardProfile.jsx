import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

const DashboardProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);

  const AdminOrEditor = currentUser.isAdmin || currentUser.isEditor;

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showmodel, setShowModel] = useState(false);

  const [formdata, setFormData] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  // const [usernameError, setUsernameError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const filePickerRef = useRef();

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleDeletUser = async () => {
    setShowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const uploadImage = () => {
    //     rules_version = '2';

    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if request.resource.size < 2 * 1024 && request.resource.contentType.matches('image/.*');
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formdata, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formdata.username) {
    //   setUsernameError("Username cannot be empty");
    //   return;
    // }
    // setUsernameError(null);

    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formdata).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [updateUserError, updateUserSuccess]);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer  rounded-md"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />

        <div className="relative">
          <TextInput
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="password"
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
          </button>
        </div>

        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading || imageFileUploading}
        >
          Update
        </Button>

        {AdminOrEditor && (
          <Link to="/create-post">
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              className="w-full"
            >
              Create a Post
            </Button>
          </Link>
        )}

        <div className="text-red-500 flex justify-between mt-5">
          <span className="cursor-pointer" onClick={() => setShowModel(true)}>
            Delete Account
          </span>
          <span className="cursor-pointer" onClick={handleSignout}>
            Sign Out
          </span>
        </div>
        {updateUserSuccess && (
          <Alert color="success" className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert color="failure" className="mt-5">
            {updateUserError}
          </Alert>
        )}

        {/* {usernameError && <Alert color="failure">{usernameError}</Alert>} */}
        {/* {error && (
          <Alert color="failure" className="mt-5">
            {error}
          </Alert>
        )} */}
      </form>
      <Modal
        show={showmodel}
        onClose={() => setShowModel(false)}
        popup
        size="md"
      >
        <Modal.Header />

        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete you account?
            </h3>

            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletUser}>
                Yes. I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModel(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashboardProfile;
