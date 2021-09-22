import React, { useState, useEffect } from "react";
import axios from "../../../axios"

const Publier = () =>
{
    var sessionUser = JSON.parse(sessionStorage.getItem("user"));
    var Background = "https://diapogram.com/upload/2018/04/12/20180412105333-7fe74185.jpg";
    const link = `http://localhost:5000/offres/creator/${sessionUser.NomEntreprise}`;

    const [ publier, setpublier ] = useState(0)

    const [ offres, setOffres ] = useState([])

    useEffect(() => 
    {
        async function fetchDataOffres()
        {
            const request = await axios.get(link);
            setOffres(request.data);
            return request;
        }
        fetchDataOffres();
    }, [link]);

    const url = "http://localhost:5000/offres";
	const [ data, setData ] = useState({titleOffre: "", creator: sessionUser.NomEntreprise, description: "", image: "", jobName: ""})

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

	function handle(e){
		const newData={...data}
		newData[e.target.id] = e.target.value
		setData(newData)
		console.log(newData)
	}




    function FormOffre()
    {
        setpublier((publier) => publier = 1)
    }

    function offresEvents()
    {
        setpublier((publier) => publier = 0)
    }

    function retour()
    {
        return(
            <div class="col-2">
                <a class="btn btn-warning" onClick={offresEvents}>Retour</a>
            </div>
        )
    }

    function setOffresCreator(offre, date)
    {
        var link2 = `./Update/${offre._id}`
        return (
            <div class="row text-light justify-content-center mt-5 overflow-hidden">
                <div class="col-6 px-0 bg-dark news">
                    <div class="row mx-0">
                        <div class="col-8 px-0 imagetitre">
                            <div class="news-img opacity-50 position-absolute" style={{ backgroundImage: `url(${offre.image})`}}>
                            </div>
                            <div class="row h-75">
                                <h2 class="ps-4 pt-1">{offre.titleOffre}</h2>
                            </div>
                            <div class="row h-25 d-flex justify-content-end position-relative">
                                <div class="col d-flex justify-content-end align-self-end pe-4 text-warning">
                                    <p class="text-warning">{date}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 d-flex flex-column">
                            <div class="row mt-2">
                                <h5>Société : {offre.creator}</h5>
                                <h5>Poste : {offre.jobName}</h5>
                            </div>
                            <div class="row overflow-hidden descriptionOffres pe-4">
                                <p>{offre.description}</p>
                            </div>
                            <div class="row mt-auto mb-3">
                                <div class="text-center">
                                <a class="btn btn-warning" href={link2}>Modifier</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function setPublierOffres(sessionUser)
    {
        return(
            <form class="col-6 offset-3 bg-dark compte" style={{marginTop: "10px"}} onSubmit={(e) => submit(e)}>
                <div class="row img-container-consulter" style={{backgroundImage: `url(${data.image})`}}>
                    <div class="row" style={{marginTop: "1%"}}>
                        <div class="col text-light">
                            <div class="row">
                                <div class="col-2">
                                    <h1>Titre</h1>
                                </div>
                                <div class="col" style={{marginTop: "1%"}}>
                                    <input class="border-warning form-control mb-3 bg-transparent rounded text-light" value={data.titleOffre} id="titleOffre" onChange={(e) => handle(e)} required/>
                                </div>                                
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    <h1>Image <span class="fs-4">(url)</span></h1>
                                </div>                           
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    <input class="border-warning form-control mb-3 bg-transparent rounded text-light" value={data.image} id="image" onChange={(e) => handle(e)} required/>
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
                        <button type="submite" class="btn btn-warning" >Publier</button>
                    </div>
                </div>
            </form>
        )
    }

    return (
        <div style={{marginTop: "150px"}}>
            <div class="row">
                <div class="col-6 offset-3">
                    <div class="row" >
                        <div class="col-3 offset-7">
                            <a class="btn btn-warning" onClick={FormOffre}>Publier une offre</a>
                        </div>
                        { publier == 1 && retour() }
                    </div>
                </div>
            </div>

            {publier === 0 && 
                offres.map((value, index) =>
                {
                    function zero(s) { return (s < 10) ? '0' + s : s; }
                    var d = new Date(value.createDate)
                    var date = "publier le "+ zero(d.getDate()) +"/"+ zero(d.getMonth()+1);
                    return(
                        setOffresCreator(value, date)
                    )
                })
            }
            {publier === 1 && setPublierOffres(sessionUser)}
            
        </div>
    )
}

export default Publier
