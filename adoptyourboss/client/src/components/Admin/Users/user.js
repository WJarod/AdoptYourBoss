import { useState, useEffect } from 'react'
import axios from "../../../axios"

const Compte = (props) => 
{

    const url = `http://localhost:5000/admin/users/`
    
    const [ user, setUser ] = useState([])

    useEffect(() => 
    {
        async function fetchDataOffres()
        {
			const id = props.match.params.id
            const request = await axios.get(url+id);
            setUser(request.data);
            return request;
        }
        fetchDataOffres();
    }, [url]);

    function recruteur(user)
    {    
        return (
            <div>
                <div class="row">
                    <h4>N° de siret : {user.siret}</h4>
                </div>
                <div class="row" style={{marginTop: "2.5%"}}>
                    <h4>Nom de l'entreprise : {user.NomEntreprise}</h4>
                </div>
            </div>
        )
    }


    function compte()
    {
        return (
            <div class="row text-light">
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
                                { user.Roles === "recruteur" ? recruteur(user) : ""}
                            </div>

                        </div>
                    </div>            
                </div>
            </div>
        )
    }

   
    return (
        <div style={{marginTop: "150px"}}>
            {compte()}
        </div>
    )
}

export default Compte;
