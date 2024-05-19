import './media-upload.css';
import DropFileInput from '../DropFileInput/DropFileInput';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from '../../config/firebase';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createMedia } from '../../services/media.service';
import toast from 'react-hot-toast';

function MediaUpload() {
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [filetype, setFileType] = useState<string>("");

    const onFileChange = (files: any) => {
        let validFileIndex = -1;
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            // check that the type of this file is image or video
            if (file.type.startsWith('image/')) {
                validFileIndex = index;
                setFileType('image');
                break;
            } else if (file.type.startsWith('video/')) {
                validFileIndex = index;
                setFileType('video');
                break;
            }

        }
        if (validFileIndex === -1) {
            setMessage("No valid file - Please add image or video!");
        } else {
            setMessage("");
            const currentFile = files[0]
            setFile(currentFile)
        }

    }

    const handleClick = (formValue: { title: string }) => {
        const { title } = formValue;
        setMessage("");
        setLoading(true);

        if (file === null) {
            setMessage("No valid file selected to upload!");
            setLoading(false);
            return;
        }
        const fileRef = ref(storage, `medias/${file?.name + Date.now().toString()} `)
        const uploadTask = uploadBytesResumable(fileRef, file)

        uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress)
        }, (error) => {
            console.log("error :(")
            setMessage("Could not upload the media!")
            setLoading(false)
            return;
        }, () => {
            console.log("success!!")
            getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
                try {
                    const response = await createMedia(downloadURL, title ?? "No title provided", filetype);
                    if (response.status !== 200) {
                        if (response.status === 401) toast.error('You need to login first!');
                        setMessage("Could not upload the media!")
                        setLoading(false)
                    }
                } catch (error) {
                    setMessage("Could not upload the media!")
                    setLoading(false)
                    return;
                }
                toast.success('"Media uploaded successfully!')
                setMessage("")
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
