import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Landing() {

  // function defintion
  // redirect from one page to another page use useNavigate hook

  const Navigate=useNavigate()

  const handleNavigate = () => {

    Navigate('/home')

    


  }
  return (
    <div>

      <Row className='align-items-center'>

        <Col></Col>

        <Col lg={6}>

          <h1>WELCOME VLC PLAYER</h1>

          <p style={{ textAlign: 'justify' }}>lorem sjdchirub  sxudehfyr8f5</p>

          <button onClick={handleNavigate} className='btn btn-success'>Click here to know more</button>
        </Col>



        <Col lg={5}>

          <img className='img-fluid' height={350} width={'350px'} src="https://thumbs.dreamstime.com/b/editing-videos-mobile-phone-editing-videos-mobile-phone-using-video-editor-app-189278095.jpg" alt="no image" />

        </Col>
      </Row>

    </div>
  )
}

export default Landing
