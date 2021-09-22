import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom"
import { useHistory } from "react-router"


const FormUp = (props) => {

	const url = "http://localhost:5000/admin/users/"
	const [ events, setEvents ] = useState([])
	const [ data, setData ] = useState({Nom: "", Prénom: "", job: "", adresse: "", CplAdresse: "", CP: "", Ville: "", Tel: "", Email: "", MDP: "", Roles: "", siret: "", NomEntreprise: "", image: ""})
	const { id } = useParams()
	const history = useHistory()

	useEffect(() => 
    {
        async function fetchDataUsers()
        {

            const request = await axios.get(url+id);
            setData(request.data);
            return request;
        }
        fetchDataUsers();
    }, [url]);

	function submit(e){
		e.preventDefault(e);
		axios.post("http://localhost:5000/admin/users/update/"+id,{
			Nom: data.Nom,
			Prénom: data.Prénom,
			job: data.job,
            adresse: data.adresse,
            CplAdresse: data.CplAdresse,
            CP: data.CP,
            Ville: data.Ville,
            tel: data.Tel, 
            Email: data.Email,
            MDP: data.MDP,
            Roles: data.Roles,
            siret: data.siret, 
            NomEntreprise: data.NomEntreprise,
            image: data.image
		})
		.then(res =>{
			console.log(res.data)
			history.push("/admin/Candidats")
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

<fieldset style={{marginTop: "150px"}}>
	<form onSubmit={(e) => submit(e)} action='./admin/' class="col-6 offset-3">

		<label for="Nom">Nom :</label>
			<input onChange={(e) => handle(e)} id="Nom" value={data.Nom} type="text" variant="outlined" className="form-control" placeholder="Titre" name="titleEvent" />
		
		<label for="Prénom">Prénom :</label>
			<input onChange={(e) => handle(e)} id="Prénom" value={data.Prénom} type="text" variant="outlined" className="form-control" placeholder="description" name="description" />
			
		<label for="job">Métier :</label>
			<input onChange={(e) => handle(e)} id="job" value={data.job} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />
			
		<label for="adresse">Adresse :</label>
			<input onChange={(e) => handle(e)} id="adresse" value={data.adresse} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />
			
		<label for="Complément d'adresse">Complément d'adresse :</label>
			<input onChange={(e) => handle(e)} id="CplAdresse" value={data.CplAdresse} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />

			<label for="Code Postal">Code Postal :</label>
			<input onChange={(e) => handle(e)} id="CP" value={data.CP} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />

			<label for="Ville">Ville :</label>
			<input onChange={(e) => handle(e)} id="Ville" value={data.Ville} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />

			<label for="Tel">Tel :</label>
			<input onChange={(e) => handle(e)} id="Tel" value={data.Tel} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />

			<label for="Email">eMail :</label>
			<input onChange={(e) => handle(e)} id="Email" value={data.Email} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />
				
			<label for="MDP">Mot de passe :</label>
			<input onChange={(e) => handle(e)} id="MDP" value={data.MDP} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />
			
			<label for="Roles">Roles :</label>
			<input onChange={(e) => handle(e)} id="Roles" value={data.Roles} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />
			
			<label for="siret">N° Siret :</label>
			<input onChange={(e) => handle(e)} id="siret" value={data.siret} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />
			
			<label for="NomEntreprise">Nom d'entreprise :</label>
			<input onChange={(e) => handle(e)} id="NomEntreprise" value={data.NomEntreprise} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />
			
			<label for="image">Image :</label>
			<input onChange={(e) => handle(e)} id="image" value={data.image} type="text" variant="outlined" className="form-control" placeholder="image" name="image" />
			
			<button class="btn btn-warning" type="submit" >Submit</button>
	
	</form>  
</fieldset>

	)};

export default FormUp;