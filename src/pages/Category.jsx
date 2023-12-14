import React, { useEffect } from "react";
import { useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCategory, deleteCategory, getCategory, getVideos, updateCategory } from "../service/allapi";
import { Trash2 } from "react-feather";
import VideoCard from "./VideoCard";


function Category() {
  const [categoryData, setCategoryData] = useState({
    id: "",
    caption: "",
    allVideos: []
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [allcategory, setAllcategory] = useState([]);

  //handleChange function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };
  console.log(categoryData);

  //handleCategoryAdd function

  const handleCategoryAdd = async (e) => {
    e.preventDefault()
    const { id, caption } = categoryData;

    if (!id || !caption) {
      toast("please fill the form completely");
    } else {
      let res = await addCategory(categoryData)

      if (res.status >= 200 && res.status < 300) {
        console.log(res.data);

        toast.success("category uploaded successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getAllCaptions();
        setShow(false);
      } else {
        toast("Please provide unique id");
      }
    }
  };

  useEffect(() => {
    getAllCaptions();
  }, []);

  const getAllCaptions = async () => {
    const res = await getCategory();
    setAllcategory(res.data);
  };
  console.log("allcategory", allcategory);


  const handleDeleteCategory = async (e, id) => {
    e.preventDefault()

    // api call for delete category 

    const res = await deleteCategory(id)
    console.log(res);
    getAllCaptions()
  }

  // define onDragOver

    const dragOver=(e)=>{
e.preventDefault()
console.log("dragging over the category");
    }

    const dropped=async(e,categoryId)=>{
      console.log("category id",categoryId);
      let sourceCardId=e.dataTransfer.getData("cardId")
      console.log("source Card Id",sourceCardId);
      getVideos('source Card Id',sourceCardId)
      const{data}= await getVideos(sourceCardId)

      console.log(data);

      let selectedCategory=allcategory.find(item=>item.id==categoryId)
      console.log("target category details",selectedCategory);
      selectedCategory.allVideos.push(data)
      console.log("updated category details",selectedCategory);
      updateCategory(categoryId,selectedCategory)
      getCategory()
    }

  return (
    <>
      <div className="d-grid">
        <div className="btn btn-dark m-2" onClick={handleShow}>
          Add Category
        </div>
      </div>

      {
        allcategory.map(item => (


          <div droppable onDragOver={e=>dragOver(e)} onDrop={e=>dropped(e,item?.id)}>
            <div className="d-flex justify-content-between border rounded mt-3 p-3">
              <h4>{item?.caption}</h4>
              <span onClick={e => handleDeleteCategory(e, item?.id)}><Trash2 color="red" /></span>

              <Row>

            {

              item?.allVideos.map((card)=>(


                <Col>
                
                <VideoCard card={card} insideCategory={true}/>
                
                </Col>


              ))


            }



              </Row>
      
      
      
      
      
            </div>
          </div>


        ))
      }


      {/* model */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel className="mb-3" controlId="floatingId" label="Id">
              <Form.Control
                type="text"
                placeholder="Category Id"
                name="id"
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel
              className="mb-3"
              controlId="floatingCaption"
              label="Caption"
            >
              <Form.Control
                type="text"
                placeholder="Caption"
                name="caption"
                onChange={handleChange}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCategoryAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default Category;
