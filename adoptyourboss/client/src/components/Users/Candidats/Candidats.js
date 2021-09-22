import { useState, useEffect } from 'react'
import axios from "../../../axios"

const Candidat = () =>
{
    var sessionUser = JSON.parse(sessionStorage.getItem("user"));

    const link = `http://localhost:5000/users/job/${sessionUser.job}`;
    const [ users, setUsers ] = useState([])

    useEffect(() => 
    {
        async function fetchDataUsers()
        {
            const request = await axios.get(link);
            setUsers(request.data)
            return request;
        }
        fetchDataUsers();
    },[link])

    console.log(users)

    return (
        <div class="row text-light" style={{marginTop: "150px"}}>  
            <div class="col-6 offset-3">
                <div class="row">
                    {users.map((value, index)=>
                    {
                        if(value.image === "")
                        {
                            value.image = "https://www.stratelio.net/img/front_v2/03_experts/02_nos_experts/user-icon.png" 
                        }
                        if(index%2 == 0) 
                        {
                            return(
                                <div class="col-5 bg-dark rounded" style={{marginTop: "10px"}}>
                                    <div class="row">
                                        <div class="col-4 d-flex align-items-center">
                                            <img class="border border-warning rounded-circle candidats-img"src={value.image} ></img>
                                        </div>
                                        <div class="col">
                                            <div class="row">
                                                <p class="text-light">{value.Nom}</p>
                                            </div>
                                            <div class="row">
                                                <p class="text-light">{value.Prénom}</p>
                                            </div>
                                            <div class="row">
                                                <p class="text-light">{value.job}</p>
                                            </div>
                                            <div class="row" style={{marginBottom: "15px"}}>
                                                <div class="col-4 offset-5 d-flex align-items-center">
                                                    <a class="btn btn-warning" href={"/recruteur/Candidat/"+value._id}>Consulter</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }else if(index%2 == 1)
                        {
                            if(value.image === "")
                            {
                                value.image = "https://www.stratelio.net/img/front_v2/03_experts/02_nos_experts/user-icon.png" 
                            }
                            return(
                                <div class="col-5 offset-2 bg-dark rounded" style={{marginTop: "10px"}}>
                                    <div class="row">
                                        <div class="col-4 d-flex align-items-center">
                                            <img class="border border-warning rounded-circle candidats-img"src={value.image}></img>
                                        </div>
                                        <div class="col">
                                            <div class="row">
                                                <p class="text-light">{value.Nom}</p>
                                            </div>
                                            <div class="row">
                                                <p class="text-light">{value.Prénom}</p>
                                            </div>
                                            <div class="row">
                                                <p class="text-light">{value.job}</p>
                                            </div>
                                            <div class="row" style={{marginBottom: "15px"}}>
                                                <div class="col-4 offset-5 d-flex align-items-center">
                                                    <a class="btn btn-warning" href={"/recruteur/Candidat/"+value._id}>Consulter</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Candidat;