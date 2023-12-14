import React from 'react'
import { PlusCircle } from 'react-feather'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Toast } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addVideo } from '../service/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Add({handleResponse}) {

    const [uploadData, setuploadData] = useState({
        id: "", caption: "", thumbnail: "", url: ""
    })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // set input function definition

    const setInput = (e) => {

        const { name, value } = e.target

        setuploadData({ ...uploadData, [name]: value })
        // setuploadData(e.target.value)

    }
    console.log(uploadData);


    // extract youtube url

    const extractUrl = (e) => {
        // console.log(e.target.value);
        let youtubeUrl = e.target.value
        if (youtubeUrl.includes('v=')) {
            let index = youtubeUrl.indexOf('v=')

            console.log(index);

            let videourl = youtubeUrl.substring(index + 2, index + 13)
            console.log(videourl);


            let videoData = uploadData
            videoData.url = `https://www.youtube.com/embed/${videourl}`
            setuploadData(videoData)

        }




    }
    // define handleAdd function
    const handleAdd = async () => {
        const { id, caption, thumbnail, url } = uploadData
        if (!id || !caption || !thumbnail || !url) {

            toast("Please Fill the form Completetly")
        }
        else {

            let response = await addVideo(uploadData)


            if (response.status >= 200 && response.status < 300) {
                // console.log(response.data);
                handleResponse(response.data)


                toast.success("Video uploaded successfully!!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                setShow(false)

            }
            else {
                toast("Please provide a unique Id")
            }
        }

    }


    return (
        <>

            <div onClick={handleShow} className='btn'>
                <PlusCircle color='green' size={50} />

            </div>

            {/* modals */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload video details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>

                        {/* id */}
                        <FloatingLabel className='mb-3' controlId="floatingId" label="Id">
                            <Form.Control name='id' onChange={setInput} type="text" placeholder="Uploading Video Id" />
                        </FloatingLabel>


                        {/* caption */}


                        <FloatingLabel className='mb-3' controlId="floatingCaption" label="Uploading Video caption">
                            <Form.Control name='caption' onChange={setInput} type="text" placeholder="Uploading Video caption" />
                        </FloatingLabel>

                        {/* image url */}

                        <FloatingLabel className='mb-3' controlId="floatingimage" label="Video cover URl">
                            <Form.Control name='thumbnail' onChange={setInput} type="text" placeholder="video cover image URL" />
                        </FloatingLabel>

                        {/* video link */}

                        <FloatingLabel className='mb-3' controlId="floatingling" label="Uploading Video link">
                            <Form.Control name='url' onChange={extractUrl} type="text" placeholder="Uploading Video link" />
                        </FloatingLabel>
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleAdd} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>


            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />


        </>
    )
}

export default Add
