import React, { useState } from "react";
import axios from "axios";

const Inscription2 = () => 
{

    const [ formStep, setformStep ] = useState(1)
    const [ progress, setProgress ] = useState(0)
    const [checked, setChecked] = useState(0);

    const [ formValue, setformValue ] = useState(
    {
        Nom:'',
        Prénom:'',
        Métier:'',
        Adress:'',
        CplAdress:'',
        CP:'',
        Ville:'',
        Tel:'',
        Email:'',
        MDP:'',
        Roles:'recruteur',
        siret:'',
        NomEntreprise:'',
        image: '',
    })
    
    const updateForm = (e) => 
    {
        setformValue(
        {
            ...formValue,
            [e.target.id]: e.target.value,
        })
    }

    function nextStep()
    {
        setformStep((formStep) => formStep + 1)
        setProgress((progress) => progress + 25)
    }

    function backStep()
    {
        setformStep((formStep) => formStep - 1)
        setProgress((progress) => progress - 25)
    }

    function submit(e)
    {
        e.preventDefault();
        axios.post("http://localhost:5000/users",
        {
            "Nom": formValue.Nom,
            "Prénom": formValue.Prénom,
            "job": formValue.Métier,
            "adresse": formValue.Adress,
            "CplAdresse": formValue.CplAdress,
            "CP": formValue.CP,
            "Ville": formValue.Ville,
            "Tel": formValue.Tel,
            "Email": formValue.Email,
            "MDP": formValue.MDP,
            "Roles": formValue.Roles,
            "siret": formValue.siret,
            "NomEntreprise": formValue.NomEntreprise,
            "image": formValue.image,
        })
        .then(res =>
        {
            console.log(res)
        })
    }
    
    function formStep1 ()
    {
        return (

            <div class='col'>
                <div class="mb-3">
                    <label for="Nom" class="form-label text-light">Nom :</label>
                    <input type="text" class="form-control bg-dark border-warning rounded text-light" id="Nom" onChange={updateForm} value={formValue.Nom} required></input>
                </div>
                <div class="mb-3">
                    <label for="Prénom" class="form-label text-light">Prenom : </label>
                    <input type="text" class="form-control bg-dark border-warning rounded text-light" id="Prénom" onChange={updateForm} value={formValue.Prénom} required></input>
                </div>
                    <label for="Prénom" class="form-label text-light">Métier : </label>
                <select class="form-select bg-dark border-warning rounded text-light mb-3 form-select-md" aria-label="Default select example" id="Métier" onChange={updateForm} value={formValue.Métier}>
                    <option selected>Métier</option>
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
            </div>
        )
    }

    function formStep2 ()
    {
        return (

            <div class='col'>
                <div class="mb-3">
                    <label for="Adress" class="form-label text-light">Adresse : </label>
                    <input type="text" class="form-control bg-dark border-warning rounded text-light" id="Adress" onChange={updateForm} value={formValue.Adress} required></input>
                </div>
                <div class="mb-3">
                    <label for="CplAdress" class="form-label text-light">Complément d'adresse : </label>
                    <input type="text" class="form-control bg-dark border-warning rounded text-light" id="CplAdress" onChange={updateForm} value={formValue.CplAdress} required></input>
                </div>
                <div class="mb-3">
                    <div class="row">
                        <div class="col-5">
                            <label for="CP" class="form-label text-light">CP : </label>
                            <input type="text" class="form-control bg-dark border-warning rounded text-light" id="CP" onChange={updateForm} value={formValue.CP} required></input>
                        </div>
                        <div class="col-7">
                            <label for="Ville" class="form-label text-light">Ville : </label>
                            <input type="text" class="form-control bg-dark border-warning rounded text-light" id="Ville"  onChange={updateForm} value={formValue.Ville} required></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function formStep3 ()
    {
        return (

            <div class='col'>
                <div class="mb-3">
                    <label for="Tel" class="form-label text-light">Tel : </label>
                    <input type="text" class="form-control bg-dark border-warning rounded text-light" id="Tel" onChange={updateForm} value={formValue.Tel} required></input>
                </div>
                <div class="mb-3">
                    <label for="Email" class="form-label text-light">Email : </label>
                    <input type="email" class="form-control bg-dark border-warning rounded text-light" id="Email" onChange={updateForm} value={formValue.Email} required></input>
                </div>
                <div class="mb-3">
                    <label for="MDP" class="form-label text-light">Mot de passe : </label>
                    <input type="password" class="form-control bg-dark border-warning rounded text-light" id="MDP" onChange={updateForm} value={formValue.MDP} required></input>
                </div>
            </div>
        )
    }

    function formStep4 ()
    {
        return (

            <div class='col'>
                <div class="mb-3">
                    <label for="siret" class="form-label text-light">N°Siret: </label>
                    <input type="text" class="form-control bg-dark border-warning rounded text-light" id="siret" onChange={updateForm} value={formValue.siret} required></input>
                </div>
                <div class="mb-3">
                    <label for="NomEntreprise" class="form-label text-light">Nom de l'entreprise : </label>
                    <input type="email" class="form-control bg-dark border-warning rounded text-light" id="NomEntreprise" onChange={updateForm} value={formValue.NomEntreprise} required></input>
                </div>
            </div>
        )
    }

    function formStep5 ()
    {
        return (

            <div class="col">
                <div class="row">
                    <div class="mb-3">
                        <label for="image" class="form-label text-light">Photo :</label>
                        <input type="text" class="form-control bg-dark border-warning rounded text-light" id="image" onChange={updateForm} value={formValue.image} ></input>
                    </div>
                </div>
                <div class="row text-center">
                    <div class="form-check col-6 offset-3" style={{height: '50px'}}>
                        <input class="form-check-input bg-warning" type="checkbox" value="" id="cgu" required></input>
                        <label class="form-check-label" for="cgu">Accepter les cgu</label>
                    </div>
                </div>
                <div class="row text-center">
                    <button class="btn btn-warning col-6 offset-3" style={{marginTop: '40%'}} type="submit">S'inscrire</button>
                </div>
            </div>
        )
    }

    return (
        <div class="container-fluid">
            <div class="row" style={{marginTop: "15%"}}>
                <div class="col-6 offset-1 connexion-titrep-container">
                    <div class="row text-secondary">
                        <h1 class="connexion-titre text-monospace col">Adopt</h1>
                    </div>
                    <div class="row text-warning">
                        <h1 class="connexion-titre text-monospace col offset-3">Your</h1>
                    </div>
                    <div class="row text-secondary">
                        <h1 class="connexion-titre text-monospace col offset-4">Boss</h1>
                    </div>
                </div>
                
                <div class="col-3 bg-dark rounded-3">
                    <div class="progress bg-ligth" style={{marginTop: "10px", marginBottom: "10px"}}>
                        <div class="progress-bar bg-warning " role="progressbar" style={{width: `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                
                    <div class="row text-light">
                        <form class="needs-validation" action="./connexion" onSubmit={(e)=> submit(e)} novalidate>
                            { formStep === 1 && formStep1() }
                            { formStep === 2 && formStep2() }
                            { formStep === 3 && formStep3() }
                            { formStep === 4 && formStep4() }
                            { formStep === 5 && formStep5() }
                        </form>
                    </div>
                    <div class="row">
                        {formStep == 1 ? 
                        null : 
                        <button class="btn btn-warning col-2 offset-2 mb-3" onClick={backStep} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
                                <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                            </svg>
                        </button>
                        }
                        {formStep == 1 ?
                             <button class="btn btn-warning col-2 offset-7 mb-3" onClick={nextStep} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                </svg>
                             </button>
                            : formStep != 5 && 
                            <button class="btn btn-warning col-2 offset-3 mb-3" onClick={nextStep} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                </svg>
                            </button>
                        }
                        
                        
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}



export default Inscription2;