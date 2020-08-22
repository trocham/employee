import React from 'react';
import axios from 'axios';

  class App extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        employees:[],
        id:0,
        empleado:'',
        noEmpleado:0,
        sueldo:0,
        empresa:'',
      };
    }

    componentDidMount(){
      axios.get('http://localhost/api').then((res)=>{
          this.setState({
            employees: res.data,
            id:0,
            empleado:'',
            noEmpleado:0,
            sueldo:0,
            empresa:'',
          });
      })
    }

    empleadoChange = event =>{
      this.setState({
        empleado: event.target.value
      })
    }

    noEmpleadoChange = event =>{
      this.setState({
        noEmpleado: event.target.value
      })
    }

    sueldoChange = event =>{
      this.setState({
        sueldo: event.target.value
      })
    }

    empresaChange = event =>{
      this.setState({
        empresa: event.target.value
      })
    }

    submit(event,id){
      event.preventDefault();
      if(id === 0){
        axios.post('http://localhost/api',{
            empleado: this.state.empleado,
            noEmpleado: this.state.noEmpleado,
            sueldo: this.state.sueldo,
            empresa: this.state.empresa
          }).then(()=>{
              this.componentDidMount();
          });

      }else{
        axios.put(`http://localhost/api/${id}`,{
                  empleado: this.state.empleado,
                  noEmpleado: this.state.noEmpleado,
                  sueldo: this.state.sueldo,
                  empresa: this.state.empresa
              }).then(()=>{
                  this.componentDidMount();
              });

        this.componentDidMount();   
      }
        
    }

    edit(id){
      axios.get(`http://localhost/api/${id}`).then((res)=>{
          this.setState({
            id: res.data._id,
            empleado:res.data.empleado,
            noEmpleado:res.data.noEmpleado,
            sueldo:res.data.sueldo,
            empresa:res.data.empresa,
          });
      });
    }

    delete(id){
      axios.delete(`http://localhost/api/${id}`).then(()=>{
        this.componentDidMount();
      });
    }

  render(){
      return (
        <div className="row">
            <div className="col s12">
              <form onSubmit={(e)=>this.submit(e, this.state.id)}> 
                <div className="input-field col s12">
                  <i className="material-icons prefix">person</i>
                  <input onChange={(e)=>this.empleadoChange(e)} type="text" id="autocomplete-input" value={this.state.empleado} className="autocomplete"/>
                  <label htmlFor="autocomplete-input">Empleado</label>
                </div>

                <div className="input-field col s12">
                  <i className="material-icons prefix">casino</i>
                  <input onChange={(e)=>this.noEmpleadoChange(e)} type="number" id="autocomplete-input" value={this.state.noEmpleado} className="autocomplete"/>
                  <label htmlFor="autocomplete-input">No. Empleado</label>
                </div>

                <div className="input-field col s12">
                  <i className="material-icons prefix">attach_money</i>
                  <input onChange={(e)=>this.sueldoChange(e)} type="number" id="autocomplete-input" value={this.state.sueldo} className="autocomplete"/>
                  <label htmlFor="autocomplete-input">Sueldo</label>
                </div>

                <div className="input-field col s12">
                  <i className="material-icons prefix">business</i>
                  <input onChange={(e)=>this.empresaChange(e)} type="text" id="autocomplete-input" value={this.state.empresa} className="autocomplete"/>
                  <label htmlFor="autocomplete-input">Empresa</label>
                </div>

                <button className="btn-floating btn-large waves-effect waves-light orange right" type="submit" name="action">
                  <i className="material-icons right">add</i>
                </button>

              </form>
            </div>

            <div className="col s12">
            <table>
            <thead>
              <tr>
                 
                  <th>Acción</th>
                  <th>Empleado</th>
                  <th>noEmpleado</th>
                  <th>Sueldo</th>
                  <th>Empresa</th>
              </tr>
            </thead>

            <tbody>
              {this.state.employees.map(employee =>
                  <tr key={employee._id}>
                    
                    <td>
                      <a onClick={(e)=>this.edit(employee._id)}  type="submit" name="action" href="#">
                          Editar
                      </a> | 
                      <a onClick={(e)=>this.delete(employee._id)}  type="submit" name="action" href="#">
                           Eliminar
                      </a>
                    </td>
                    <td>{employee.empleado}</td>
                    <td>{employee.noEmpleado}</td>
                    <td>{employee.sueldo}</td>
                    <td>{employee.empresa}</td>
                </tr>
              )}

            </tbody>
          </table>
                
            </div>
        </div>
      );
    }  
}

export default App;
