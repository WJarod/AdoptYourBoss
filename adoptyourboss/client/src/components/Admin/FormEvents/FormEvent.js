import React, { useState, useEffect } from "react";
import axios from 'axios'
import $ from 'jquery'
import { datetimepicker } from 'jquery'
import { useHistory } from "react-router"

const FormEvents = () => {

	const url = "http://localhost:5000/admin/events";
	const [ data, setData ] = useState({titleEvent: "", description: "", image: "", createDate: "", lieu: "", dates: ""})
    const [ searchTerm, setSearchTerm ] = useState([])
	const history = useHistory()
 

	function submit(e){
		e.preventDefault(e);
		axios.post(url,{
			titleEvent: data.titleEvent,
			description: data.description,
			image: data.image,
			lieu: data.lieu,
			dates: data.dates
		})
		.then(res =>{
			console.log(res.data)
			history.push("/admin/Évènements")
		})
	}

	function handle(e){
		const newData={...data}
		newData[e.target.id] = e.target.value
		setData(newData)
		console.log(newData)
	}

	const handleSearchTerm = (e) =>{
        
        var value = e.target.value;
        setSearchTerm(value);
    }


return (

<fieldset style={{marginTop: "150px"}}>
	<form onSubmit={(e) => submit(e)} action='./admin/' class="col-6 offset-3">

		<label for="titre">Titre :</label>
			<input onChange={(e) => handle(e)} id="titleEvent" value={data.titleEvent} type="text" variant="outlined" className="form-control" placeholder="Titre" name="titleEvent" />
		
	
		<label for="titre">Description :</label>
			<input onChange={(e) => handle(e)} id="description" value={data.description} type="text" variant="outlined" className="form-control" placeholder="description" name="description" />
			
		<label for="titre">Image :</label>
			<input onChange={(e) => handle(e)} id="image" value={data.image} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />
			
		<label for="titre">Lieu :</label>
			<input onChange={(e) => handle(e)} id="image" value={data.lieu} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />
			
		<label for="titre">Date :</label>
			<input onChange={(e) => handle(e)} class="text-dark" id="dates" type="date" name="dates" />
		
			<button class="btn btn-warning" type="submit">Submit</button>
	
	</form>  
</fieldset>

	)};


export default FormEvents;