
import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  const [school, setSchool] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")


  const [newSchools, setNewSchools] = useState('')
  const [schoolList, setSchoolList] = useState([])


  const [searchValue, setSearchValue] = useState("");
  const [schoolSearch, setSchoolSearch] = useState([])

  const searchSchool = () => {
    Axios.post("http://localhost:8000/create", {

      school_name: school,
      school_city: city,
      school_state: state
    }).then(() => {
      setSchoolList([...schoolList, {
        school_name: school,
        school_city: city,
        school_state: state,
      },])
    })
  }

useEffect(()=>{
  const getSchoolList = async () => {
    try {
      // eslint-disable-next-line
      const  data  = await
        Axios.get("http://localhost:8000/schoolsID").then((response) => {
          setSchoolList(response.data)
          setSchoolSearch(response.data)
        })
    } catch (err) {
      console.log(err)
    }
  }
  getSchoolList()
},[])
  useEffect(() => {
    
  }, [])
  const updateSchools = (id) => {
    Axios.put('http://localhost:8000/update', { school_name: newSchools, client_id: id }).then((response) => {
      setSchoolList(
        schoolList.map((val) => {
          return (
            val.client_id === id ? {
              client_id: val.client_id,
              school_name: val.newSchools,
              school_city: val.school_city,
              school_state: val.school_state
            }
              : val
          )
        })
      )
    })

  }

  const deleteSchools = (client_id) => {
    Axios.delete(`http://localhost:8000/delete/${client_id}`).then((response) => {
      setSchoolList(
        schoolList.filter((val) => {
          return val.client_id !== client_id
        })
      )
    })

  }


  const handleSearch = async (e) => {
    setSearchValue(e.target.value);
  }


  return (
    <>
      <Container>


        <Form.Group>

          <Table>
            <InputGroup className='my-3'>

              <Form.Control className='text-center mt-4' type='text' placeholder='search...' onChange={handleSearch} />
              <Table striped bordered hover>

                <thead style={{ backgroundColor: '#34322D', color: 'white' }}>
                  <tr>
                    <th>Client ID</th>
                    <th>School Name</th>
                    <th>City</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>

                  {schoolSearch
                    .filter(school => school.school_name.toString().toLowerCase().includes(searchValue.toString().toLowerCase()))
                    .map((school, index) => (
                      <tr key={index}>
                      <td>{school.client_id}</td>
                        <td>{school.school_name}</td>
                        <td>{school.school_city}</td>
                        <td>{school.school_state}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </InputGroup>


        <Container size='lg'>
          <Row className='mb-3'>
            <Form.Group as={Col} className='mb-3' controlId='formBasicEmail' >
              <Form.Label>School:</Form.Label>
              <Form.Control type="text" onChange={(e) => { setSchool(e.target.value) }} />
              <Form.Label>City:</Form.Label>
              <Form.Control type="text" onChange={(e) => { setCity(e.target.value) }} />
              <Form.Label >State:</Form.Label>
              <Form.Control type="text" onChange={(e) => { setState(e.target.value) }} />
              <div style={{ minHeight: '10px' }} ></div>
              <Button variant='primary' type='submit' onClick={searchSchool}>Add School</Button>
            </Form.Group>
            <Form.Group as={Col}>
            </Form.Group>
          </Row>


        </Container>
          </Table>
          <Container>
            <div style={{ minHeight: '100px' }} >
              <Row sm={5}>
                <Button onClick={setSchoolList}>Show All Schools</Button>
              </Row>
            </div>
          </Container>


          {schoolList.map((val, key) => {
            return (
              <>
                <ListGroup>
                  <div key={key}>
                    <ListGroup.Item>
                      <div>School: {val.school_name}</div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <div>City: {val.school_city}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div>State: {val.school_state}</div>
                    </ListGroup.Item>

                  </div>
                  <div style={{ minHeight: '20px' }} />
                  <ListGroup>
                    <Form.Group>
                      <ListGroup.Item>
                        <div style={{ minHeight: '20px' }} >
                          <Row xs={2}>
                            <Col md={{ span: 6 }}>
                          <div style={{ minHeight: '10px' }} />
                              <Form.Control type='text' placeholder='update school name...' onChange={(e) => { setNewSchools(e.target.value) }} />
                            </Col>
                          </Row>
                          <div style={{ minHeight: '10px' }} />
                          <Row>
                            <Col md={3}>

                              <Button size='sm' variant='primary' type='submit' onClick={() => { updateSchools(val.client_id) }}>Update </Button>
                            </Col>
                            <div style={{ minHeight: '10px' }} />
                            <Col md={{ span: 4 }}  >
                              <Button size='sm' variant='primary' type='submit' onClick={() => { deleteSchools(val.client_id) }}>Delete </Button>
                            </Col>
                          </Row>
                        </div>

                      </ListGroup.Item>
                          <div style={{ minHeight: '100px' }} />

                    </Form.Group>
                  </ListGroup>
                </ListGroup>

              </>
            )

          })}


        </Form.Group>
      </Container>


    </>

  );
}


export default App;
