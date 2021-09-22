import React, { useState } from "react";
import axios from "axios";

const Connexion = () =>
{

    const [ formValue, setformValue ] = useState(
        {
            Email:'',
            MDP:'',
        })
    const updateForm = (e) => 
        {
            setformValue(
            {
                ...formValue,
                [e.target.id]: e.target.value,
            })
            console.log(formValue)
        }
    function submit(e)
        {
            e.preventDefault();
            axios.post("http://localhost:5000/users/connexion",
            {
                "Email": formValue.Email,
                "MDP": formValue.MDP,
            })
            .then(res =>
            {
                sessionStorage.clear();
                console.log(res.data)
                
                var user = {
                    "id": res.data._id,
                    "Nom": res.data.Nom,
                    "Prénom": res.data.Prénom,
                    "job": res.data.job,
                    "adresse": res.data.adresse,
                    "CplAdresse": res.data.CplAdresse,
                    "CP": res.data.CP,
                    "Ville": res.data.Ville,
                    "Tel": res.data.Tel,
                    "Email": res.data.Email,
                    "MDP": res.data.MDP,
                    "Roles": res.data.Roles,
                    "siret": res.data.siret,
                    "NomEntreprise" : res.data.NomEntreprise,
                    "image": res.data.image,
                    "status": res.data.status,
                }

                console.log(user);

                sessionStorage.setItem('user', JSON.stringify(user));

                if(res.data.status == "approved")
                {
                    if (res.data.Roles == "recruteur")
                    {
                        window.location.replace("http://localhost:3000/recruteur/Accueil")
                    }
                    else if(res.data.Roles == "candidat")
                    {
                        window.location.replace("http://localhost:3000/candidat/Accueil")
                    }
                    else if(res.data.Roles == "admin")
                    {
                        window.location.replace("http://localhost:3000/Admin/Accueil")
                    }
                }
                else if (res.data.status == "pending")
                {
                    window.alert("Validation de votre compte en cours")
                }
            })
        }

        return (

            <div class="container-fluid">
                <div class="row" style={{marginTop: "15%"}}>
                    <div class="col-6 offset-1 connexion-titrep-container">
                        <div class="row text-secondary">
                            <h1 class="connexion-titre text-monospace col">Adopt</h1>
                        </div>
                        <div class="row text-warning mt-3">
                            <h1 class="connexion-titre text-monospace col offset-2">Your</h1>
                        </div>
                        <div class="row text-secondary">
                            <h1 class="connexion-titre text-monospace col offset-4">Boss</h1>
                        </div>
                    </div>
                    
                    <div class="col-3 bg-dark connexion">
                        <form onSubmit={(e)=> submit(e)}>
                            <div class="mb-3" style={{marginTop: "2%"}}>
                                <label for="Email" class="form-label text-light">Email</label>
                                <input type="email" class="form-control bg-dark border-warning rounded text-light" id="Email" onChange={updateForm} value={formValue.Email}></input>
                            </div>
                            <div class="mb-3">
                                <label for="MDP" class="form-label text-light">Mot de passe</label>
                                <input type="password" class="form-control bg-dark border border-warning rounded text-light" id="MDP" onChange={updateForm} value={formValue.MDP}></input>
                            </div>
                            <div class="row justify-content-center">
                            <button type="submit" class="btn btn-warning col-4 mb-3 mt-1">Connexion</button>
                            <p class="text-center mt-3">Pas encore inscrit ? <a class="mb-2 inscription border rounded p-2" href="./inscription">Inscription</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        )
    
}

export default Connexion