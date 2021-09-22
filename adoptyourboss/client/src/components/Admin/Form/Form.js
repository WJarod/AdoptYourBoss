import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useHistory } from "react-router"

const Form = () => {

	const url = "http://localhost:5000/admin/offres";
	const [ data, setData ] = useState({titleOffre: "", creator: "", description: "", image: "", jobName: "", createDate: ""})
	const history = useHistory()

	function submit(e){
		e.preventDefault(e);
		axios.post(url,{
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

	function handle(e){
		const newData={...data}
		newData[e.target.id] = e.target.value
		setData(newData)
		console.log(newData)
	}


return (

<fieldset style={{marginTop: "150px"}}>
	<form onSubmit={(e) => submit(e)} action='./admin/' class="col-6 offset-3">

		<label for="titre">Titre :</label>
			<input onChange={(e) => handle(e)} id="titleOffre" value={data.titleOffre} type="text" variant="outlined" className="form-control" placeholder="Titre" name="titleOffre" />
		
		<label for="titre">Entreprise :</label>
			<input onChange={(e) => handle(e)} id="creator" value={data.creator} type="text" variant="outlined" className="form-control" placeholder="creator" name="creator" />
			
		<label for="titre">Description :</label>
			<input onChange={(e) => handle(e)} id="description" value={data.description} type="text" variant="outlined" className="form-control" placeholder="description" name="description" />
			
		<label for="titre">Image :</label>
			<input onChange={(e) => handle(e)} id="image" value={data.image} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />
			
		<label for="titre">Metier :</label>			
			<input onChange={(e) => handle(e)} id="jobName" value={data.jobName} type="text" variant="outlined" className="form-control" placeholder="jobName" name="jobName" />

			<button type="submit" class="btn btn-">Submit</button>
	
	</form>  
</fieldset>

	)};

export default Form;