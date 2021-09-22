import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'

const FormUp = (props) => {

	const url = "http://localhost:5000/admin/events/"
	const [ events, setEvents ] = useState([])
	const [ data, setData ] = useState({titleEvent: "", description: "", image: "", createDate: ""})
  const { id } = useParams(); 
  const history = useHistory()

	useEffect(() => 
    {
        async function fetchDataEvents()
        { 
            const request = await axios.get(url+id);
            setData(request.data);
            return request;
        }
        fetchDataEvents();
    }, [url]);

	function submit(e){
		e.preventDefault(e);

		axios.post("http://localhost:5000/admin/events/update/"+id,{
			titleOffre: data.titleEvent,
			creator: data.description,
			description: data.image
		})
		.then(res =>{
			console.log(res.data)
			history.push("/admin/Events")
		})
	}

    console.log(events)

	function handle(e){
		const newData={...data}
		newData[e.target.id] = e.target.value
		setData(newData)
		console.log(newData)
	}



return (

<fieldset class="offset-3" style={{marginTop: "150px"}}>
<form class="col-8 justify-content-center row" onSubmit={(e) => submit(e)}>

  <div class="row mb-4">
    <div class="col">
      <div class="form-outline">
	  <label class="form-label" for="titre">Titre :</label>
        <input onChange={(e) => handle(e)} id="titleOffre" value={data.titleEvent} type="text" class="form-control" />
        
      </div>
    </div>

  </div>


  <div class="form-outline mb-4">
  <label class="form-label" for="Description">Description :</label>
    <input onChange={(e) => handle(e)} id="description" value={data.description} type="text" id="form6Example3" class="form-control" />
    
  </div>


  <div class="form-outline mb-4">
  <label class="form-label" for="Image">Image :</label>
    <input onChange={(e) => handle(e)} id="image" value={data.image} type="text" id="form6Example4" class="form-control" />
   
  </div>


  <button variant="contained" type="submit" class="btn btn-warning btn-block mb-4">Mettre a Jour</button>
</form> 
</fieldset>

	)};

export default FormUp;