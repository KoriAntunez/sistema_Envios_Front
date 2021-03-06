import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


class Cambiar extends React.Component{


  constructor(props) {
    super(props);

    this.state = {
        list: []
    }

    this.consultar();
}

consultar(){
  fetch('http://localhost:5000/data')
  .then(response => response.json())
  .then( (data) => {
      let state = this.state;
      state.list = data;
      this.setState(state)
  });
}
/*
delete(id){ 
  let confirmation = window.confirm('¿Estas seguro de resevar?') ? true : false

  if (confirmation) {
      axios.delete('http://localhost:5000/reserva/'+id).
          then( () => {
              alert("RESERVADO")
              window.location.reload()
      }).catch(function () {
          alert("Error inesperado !!!")
      })
  }
}
*/

actualizar(id,status){ 
  let confirmation = window.confirm('¿Estas seguro de actualizar el estado?') ? true : false
  console.log(status)
  if (confirmation) {
      axios.put('http://localhost:5000/data/reserva/'+id,[status]).
          then( () => {
              alert("ACTUALIZADO")
              window.location.reload()
              
      }).catch(function () {
          alert("Error inesperado !!!")
      })
  }
}



    render (){
        return ( <Form>
    <Container >
      
      <Row>
      {
                    this.state.list.map((prodct) =>
                   
                    <Card  style={{width: "32rem" ,  margin:"0.5rem", borderColor:"blue", borderRadius:"1rem"}}>
                    <Card.Body>   
                   <Container fluid  >
                     <Row><Col>Codigo de envío: {prodct.cod_envio} </Col></Row>
                      
                     <Row><Col>DNI emisor : {prodct.DNI_emisor} </Col></Row>
                  <Row><Col>Emisor: {prodct.address_from_name} </Col></Row>
                     <Row><Col>DNI recepcionista : {prodct.DNI_recepcion} </Col></Row>
                     <Row><Col>Recepcionista: {prodct.address_to_name} </Col></Row>
                     <Row><Col>Estado: {prodct.status} </Col></Row>
                  
                   </Container>
                  
                   <Container><Row>
                       <Col xs={3}><Button variant="primary" onClick={() => this.actualizar(prodct.cod_envio,prodct.status="En proceso")} >En proceso</Button> </Col>
                       <Col xs={3}> <Button variant="primary" onClick={() => this.actualizar(prodct.cod_envio,prodct.status="En camino")} >En camino</Button></Col>
                       <Col xs={3} ><Button variant="primary" onClick={() => this.actualizar(prodct.cod_envio,prodct.status="Recibio paquete")} >Recibio paquete</Button></Col>
                       <Col xs={3}> <Button variant="danger" onClick={() => this.actualizar(prodct.cod_envio,prodct.status="Cancelado")} >Cancelado</Button></Col>
                   
                   </Row></Container>
                  </Card.Body>
                 </Card>
                  )
                }
     </Row>
    </Container></Form>);
    }
}
export default Cambiar;