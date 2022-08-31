import { Component } from "react";
import styles from "../../styles/createTeam.module.css";
import { useRouter } from "next/router";

export default class MemberField extends Component {
  
  constructor(props) {
    super(props);
    //console.log("**************************************************************************memberField: "+props.username);
    this.state = { members: [""], teamName: "", username: props.username};
  }

  handleDelete = (e) => {
    if (this.state.members.length != 1) {
      let aux = this.state.members;
      let index = aux.indexOf(e.target.name);
      aux.splice(index, 1);
      this.setState({
        members: aux,
      });
    }
  };

  handleAdd = (e) => {

    let value = e.target.name;
    let length = this.state.members.length;
    
    if (value.length !== 0) {
      if(this.state.members.every(element => element !== ""
      )){
        let aux = this.state.members;
        aux.push("");
        for (let i = 0; i < aux.length; i ++){
          while (aux[i].charAt(aux[i].length-1) == ' ') 
          aux[i] = aux[i].substring(0,aux[i].length-1)
        }
        this.setState({
        members: aux,
        });
      } 
    }
  };

  handleSubmit = async (e) =>{
    let tm = this.state;
    /*let config1 = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({tm})
    }*/
    
    
    let responseO = await fetch('http://localhost:3000/api/team/teamInsert',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({tm})
    });
    const responseData = await responseO.json();

    if(responseData.success){
      alert("Equipo creado exitosamente");
      this.props.router.push('/'+this.props.username);
    }else{
      alert("No se pudo crear el equipo");
    }
    //router.push('/');

    /*
    let config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.members)
    }

    let r = await fetch('http://localhost:3000/api/team/[id]',config);
    */
  }

  handleChangedName = (e) => {

    let aux = this.state.name;
    aux = e.target.value; 
    
    if (aux.charAt(0) == ' ') aux = aux.replace(" ", "")

    this.setState({
      teamName: aux,
    });

  };

  handleChanged = (e) => {

    let aux = this.state.members;
    let index = aux.indexOf(e.target.name);
    aux[index] = e.target.value; 
    
    if (aux[index].charAt(0) == ' ') aux[index] = aux[index].replace(" ", "")
      aux = aux.filter((item,index)=>{
      return aux.indexOf(item) === index;
    })
    
    this.setState({
      members: aux,
    });
  };

  
  render() {
    const membersList = this.state.members.map((e) => (
      
      <div key={this.state.members.indexOf(e)}>
        <input
          type="text"
          onChange={this.handleChanged}
          name={e}
          value={e}
        ></input>
        <button
          type="button"
          name={e}
          onClick={this.handleDelete}
          className={styles.button}
        >
          -
        </button>
        <button
          type="button"
          name={e}
          onClick={this.handleAdd}
          className={styles.button}
        >
          +
        </button> 
      </div>
    ));

    return <div>
      <h5 className={styles.h5}>¿Cómo se llaman?</h5>    
      <input
            name = "teamField"
            onChange={this.handleChangedName}
            className={styles.inputWidth}
            type="text"
            placeholder="Nombre del equipo..."
      ></input>
      <h5 className={styles.h5}>¿Quiénes son?</h5>  

      {membersList}

      <button 
          className={styles.submitBtn}
          onClick = {this.handleSubmit}
      >
            Crear equipo
      </button>
    </div>;
  }
}
