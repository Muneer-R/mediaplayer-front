import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import {  getVideo } from '../service/allapi'


function View({ serverResponse }) {
  const [allVideos, setAllVideos] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false)
 

  //useEffect

  useEffect(() => {
    getAllVideos();
    
  }, [serverResponse, deleteStatus]);


  const handleDeleteStatus = (res) => {
    setDeleteStatus(res)
  }

  //define a function for api call

  const getAllVideos = async () => {
    //api call
    const response = await getVideo();
    // console.log(response.data);
    setAllVideos(response.data);
  };

  console.log(allVideos);

 

  return (
    <>
      <div className="border p-3 rounded m-4">
        <Row>
          {allVideos.map((video, i) => (
            <Col sm={12} md={6} key={i}>
              <VideoCard card={video} handleDeleteStatus={handleDeleteStatus} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default View