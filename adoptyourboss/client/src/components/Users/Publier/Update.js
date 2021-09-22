import React, { useState, useEffect } from "react";
import axios from "../../../axios"
import { BrowserRouter as Router, Route, useLocation, useParams } from 'react-router-dom'

const Update = () =>
{
    const { id } = useParams();

    console.log(id)
    
    var sessionUser = JSON.parse(sessionStorage.getItem("user"));

    const [ data, setData ] = useState({titleOffre: "", creator: sessionUser.NomEntreprise, description: "", image: "", jobName: ""})

    const link = `http://localhost:5000/offres/offre/${id}`;

    useEffect(() => 
    {
        async function fetchDataOffre()
        {
            const request = await axios.get(link);
            setData(request.data);
            return request;
        }
        fetchDataOffre();
    }, [link]);

    console.log(data)

    function handle(e){
		const newData={...data}
		newData[e.target.id] = e.target.value
		setData(newData)
		console.log(newData)
	}

    const url = `http://localhost:5000/offres/update/${id}`;

    function submit(e){
		axios.post(url,{
			titleOffre: data.titleOffre,
			creator: data.creator,
			description: data.description,
			image: data.image,
			jobName: data.jobName
		})
		.then(res =>{
			console.log(res.data)
		})
	}

    return(
        <div style={{marginTop: "150px"}}>
        <div class="row">
            <div class="col-6 offset-3">
                <div class="row" >
                    <div class="col-2 offset-10">
                        <a class="btn btn-warning" href="/recruteur/Publier">Retour</a>
                    </div>
                </div>
            </div>
        </div>
        <form class="col-6 offset-3 bg-dark compte" style={{marginTop: "10px"}} onSubmit={(e) => submit(e)} action="/recruteur/Publier">
            <div class="row img-container-consulter" style={{backgroundImage: `url(${data.image})`}}>
                <div class="row" style={{marginTop: "1%"}}>
                    <div class="col text-light">
                        <div class="row">
                            <div class="col-2">
                                <h1 class="text-warning">Titre</h1>
                            </div>
                            <div class="col" style={{marginTop: "1%"}}>
                                <input class="border-warning form-control mb-3 bg-dark opacity-75 rounded text-light" value={data.titleOffre} id="titleOffre" onChange={(e) => handle(e)} required/>
                            </div>                                
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <h1 class="text-warning">Image <span class="fs-4">(url)</span></h1>
                            </div>                           
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <input class="border-warning form-control mb-3 bg-dark opacity-75 rounded text-light " value={data.image} id="image" onChange={(e) => handle(e)} required/>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="row text-light" style={{marginTop: "1%"}}>
                <div class="col-10 offset-1">
                    <select class="form-select bg-dark border-warning rounded text-light mb-3 form-select-sm" aria-label="Default select example" value={data.jobName} id="jobName" onChange={(e) => handle(e)} required>
                        <option selected>Choisissez votre Métier</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Bâtiment et travaux publics">Bâtiment et travaux publics</option>
                        <option value="Sécurité">Sécurité</option>
                        <option value="Mode">Mode</option>
                        <option value="Arts du spectacle">Arts du spectacle</option>
                        <option value="Audiovisuel">Audiovisuel</option>
                        <option value="Journalisme">Journalisme</option>
                        <option value="Communication">Communication</option>
                        <option value="Hôtellerie, restauration">Hôtellerie, restauration</option>
                        <option value="Enseignement">Enseignement</option>
                        <option value="Mécanique">Mécanique</option>
                        <option value="Logistique et transport">Logistique et transport</option>
                        <option value="Automobile">Automobile</option>
                        <option value="Informatique et réseaux">Informatique et réseaux</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Électronique">Électronique</option>
                        <option value="Développeurs">Développeurs</option>
                    </select>
                    <h6>{sessionUser.NomEntreprise}</h6>
                </div>
            </div>
            <div class="row text-light">
                <div class="col-10 offset-1">
                    <h3>Description : </h3>
                </div>
            </div>
            <div class="row text-light">
                <div class="col-10 offset-1">
                    <textarea class="form-control mb-3 border-warning bg-transparent rounded text-light" rows="4" id="description" value={data.description} onChange={(e) => handle(e)} required></textarea>
                </div>
            </div>
            <div class="row ">
                <div class="col-2 offset-8">
                    <button type="submite" class="btn btn-warning" >Modifier</button>
                </div>
            </div>
        </form>
    </div>
    )
}

export default Update;