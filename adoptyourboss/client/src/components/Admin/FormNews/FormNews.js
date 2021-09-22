import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useHistory } from "react-router"


const FormNews = () => {

	const url = "http://localhost:5000/admin/news";
	const [ data, setData ] = useState({titleNews: "", description: "", image: "", createDate: ""})
	const history = useHistory()


	function submit(e){
		e.preventDefault(e);
		axios.post(url,{
			titleNews: data.titleNews,
			description: data.description,
			image: data.image
		})
		.then(res =>{
			console.log(res.data)
			history.push("/admin/News")
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
	<form onSubmit={(e)=>submit(e)} class="col-6 offset-3">

		<label for="titre">Titre :</label>
			<input onChange={(e) => handle(e)} id="titleNews" value={data.titleNews} type="text" variant="outlined" className="form-control" placeholder="Titre" name="titleNews" />
		
		<label for="titre">Description :</label>
			<input onChange={(e) => handle(e)} id="description" value={data.description} type="text" variant="outlined" className="form-control" placeholder="description" name="description" />
			
		<label for="titre">Image :</label>
			<input onChange={(e) => handle(e)} id="image" value={data.image} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />
			
			<button  type="submit" class="btn btn-warning">Submit</button>
	
	</form>  
</fieldset>

	)};

export default FormNews;