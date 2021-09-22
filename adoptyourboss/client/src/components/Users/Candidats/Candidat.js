import { useState, useEffect } from 'react'
import axios from "../../../axios"
import { BrowserRouter as Router, Route, useLocation, useParams } from 'react-router-dom'

const Candidat = () => 
{
    const { id } = useParams();
    var sessionUser = JSON.parse(sessionStorage.getItem("user"));
    
    const link = `http://localhost:5000/users/${id}`
    
    const [ user, setUser ] = useState(
    {
        Nom: "", 
        Prénom: "", 
        job: "", 
        adresse: "", 
        CplAdresse: "", 
        CP: "", 
        Ville: "", 
        Tel: "", 
        Email: "", 
        MDP: "", 
        Roles: "", 
        image: ""
    })

    useEffect(() => 
    {
        async function fetchDataUser()
        {
            const request = await axios.get(link);
            setUser(request.data);
            return request;
        }
        fetchDataUser();
    }, [link]);

    if(user.image === "")
    {
        user.image = "https://www.stratelio.net/img/front_v2/03_experts/02_nos_experts/user-icon.png" 
    }

    const url = "http://localhost:5000/amis";

    function submit(e, id1, id2)
    {
        e.preventDefault(e);
		axios.post(url,{
            User1: id1,
            User2: id2,
            status: "approved"
		})
		.then(res =>{
			console.log(res.data)
            submit2(e, id1, id)
		})
	}
    function submit2(e, id1, id2)
    {
		axios.post(url,{
            User1: id2,
            User2: id1,
		})
		.then(res =>{
			console.log(res.data)
		})
	}

    return (
        <div class="row text-light" style={{marginTop: "150px"}}>
            <div class="col-6 offset-3 bg-dark compte">
                <div class="row" style={{marginTop: "3.5%"}}>
                    <div class="col-4 offset-1">
                        <img class="border border-warning rounded-circle compte-img" src={user.image}></img>
                    </div>
                    <div class="col-6">
                        <div class="row container-compte border border-warning">
                            <div class="row">
                                <h4>Nom : {user.Nom}</h4>
                            </div>
                            <div class="row">
                                <h4>Pénom : {user.Prénom}</h4>
                            </div>
                            <div class="row">
                                <h4>Métier : {user.job}</h4>
                            </div>
                            <div class="row">
                                <h4>Adress : {user.adresse}</h4>
                            </div>
                            <div class="row">
                                <h4>Code Postale : {user.CP}</h4>
                            </div>
                            <div class="row">
                                <h4>Ville : {user.Ville}</h4>
                            </div>
                            <div class="row">
                                <h4>Tel : {user.Tel}</h4>
                            </div>
                            <div class="row">
                                <h4>Email : {user.Email}</h4>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={(e) => submit(e, sessionUser.id, id)} class="col-2 offset-7">
                        <button type="submit" class="btn btn-warning">Ajouter</button>
                    </form>
                </div>            
            </div>
        </div>
    )
}

export default Candidat;