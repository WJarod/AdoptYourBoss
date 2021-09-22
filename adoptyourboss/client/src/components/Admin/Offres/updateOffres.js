import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'


const FormUp = () => {

	const url = "http://localhost:5000/admin/offres/"
	const [ offres, setOffres ] = useState([])
	const [ data, setData ] = useState({titleOffre: "", creator: "", description: "", image: "", jobName: "", createDate: ""})
  const { id } = useParams(); 
  const history = useHistory()
	useEffect(() => 
    {
        async function fetchDataOffres()
        {
			
            const request = await axios.get(url+id);
            setData(request.data);
            return request;
        }
        fetchDataOffres();
    }, [url]);

	function submit(e){
		e.preventDefault(e);
		
		axios.post("http://localhost:5000/admin/offres/update/"+id,{
			titleOffre: data.titleOffre,
			creator: data.creator,
			description: data.description,
			image: data.image,
			jobName: data.jobName
		})
		.then(res =>{
			console.log(res.data)
			history.push("/admin/Offres")
		})
	}

    console.log(offres)

	function handle(e){
		const newData={...data}
		newData[e.target.id] = e.target.value
		setData(newData)
		console.log(newData)
	}



return (

<fieldset  style={{marginTop: "150px"}}>
<form onSubmit={(e) => submit(e)} class="col-6 offset-3">

  <div class="row mb-4">
    <div class="col">
      <div class="form-outline">
	  <label class="form-label" for="titre">Titre :</label>
        <input onChange={(e) => handle(e)} id="titleOffre" value={data.titleOffre} type="text" class="form-control" />
        
      </div>
    </div>
    <div class="col">
      <div class="form-outline">
	  <label class="form-label" for="Entreprise">Entreprise :</label>
        <input onChange={(e) => handle(e)} id="creator" value={data.creator} type="text" id="form6Example2" class="form-control" />
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


  <div class="form-outline mb-4">
  <label class="form-label" for="Metier">Metier :</label>
    <input onChange={(e) => handle(e)} id="jobName" value={data.jobName} type="text" id="form6Example5" class="form-control" />
   
  </div>


  <button variant="contained" type="submit" class="btn btn-warning btn-block mb-4">Mettre a Jour</button>
</form> 
</fieldset>

)};

export default FormUp;