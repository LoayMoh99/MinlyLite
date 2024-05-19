import './media-upload.css';
import DropFileInput from '../DropFileInput/DropFileInput';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from '../../config/firebase';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function MediaUpload() {
    const [file, setFile] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const onFileChange = (files: any) => {
        const currentFile = files[0]
        setFile(currentFile)
        console.log(files);
    }

    const uploadToDatabase = async (url: string, title: string) => {
        let docData = {
            mostRecentUploadURL: url,
            username: "jasondubon"
        }
        console.log(docData)
    }

    const handleClick = (formValue: { title: string }) => {
        const { title } = formValue;
        setMessage("");
        setLoading(true);

        if (file === null) {
            setMessage("No file selected to upload!");
            setLoading(false);
            return;
        }
        const fileRef = ref(storage, `videos/${file?.name + Date.now().toString()} `)
        const uploadTask = uploadBytesResumable(fileRef, file)

        uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress)
        }, (error) => {
            console.log("error :(")
            setMessage("Could not upload the media!")
            setLoading(false)
        }, () => {
            console.log("success!!")
            getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
                await uploadToDatabase(downloadURL, title ?? "No title provided")

                setMessage("Media uploaded successfully!")
                setLoading(false)
            })
        })
    }

    const initialValues: {
        title: string;
    } = {
        title: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("This field is required!") && Yup.string().max(50, "Title is too long!")
    });

    return (
        <div className="box">
            <h2 className="header">
                Minlylite Media Upload
            </h2>
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
            <br></br>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleClick}
            >
                <Form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <Field name="title" type="text" className="form-control" />
                        <ErrorMessage
                            name="title"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>{loading ? "Uploading..." : "Upload Media"}</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className={
                                message.includes("successfully") ? "alert alert-success" : "alert alert-danger"
                            } role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </Form>
            </Formik>

        </div>
    );
}

export default MediaUpload;
