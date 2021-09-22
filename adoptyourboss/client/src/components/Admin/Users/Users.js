import { useState, useEffect } from 'react'
import axios from "../../../axios"
import { useHistory } from 'react-router'

const Users = (props) =>
{
    const link = "http://localhost:5000/admin/users"
    const [ users, setUsers ] = useState([])
    const  [ data ]  = useState({})
    const [ dataStatus ] = useState({status: "approved"});
    const [ searchTerm, setSearchTerm ] = useState([])
    const [ select, setSelect ] = useState("Nom");
    var recherche = ""
    
    const history = useHistory()

console.log(select)
    useEffect(() => 
    {
        async function fetchDataUsers()
        {
            const request = await axios.get(link);
            setUsers(request.data);
            return request;
        }
        fetchDataUsers();
    }, [link]);

    function submit(e, id){
		e.preventDefault(e);

		axios.post(`http://localhost:5000/admin/users/${id}`,
        {
			status: dataStatus.status
		})
		.then(res =>{
			console.log(res.data)
            window.location.reload(false);
		})
	}

    console.log(users)


    function delUsers(id)
    {
        axios.get(`http://localhost:5000/admin/users/delete/${id}`);  
    }

    function upUsers(id)
    {
        history.push("./updateUser/"+id)
    }

    
    function Button(){
     return <button class="btn btn-warning col-3" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
     <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
     <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
   </svg></button>;
    }


    function getUser(id)
    {
        history.push("./User/"+id)
    }

    const handleSearchTerm = (e) =>{
        
        var value = e.target.value;

        setSearchTerm(value);
    }

    function onChange(e){

        setSelect((select) => select = e.target.value)
        console.log(select)
    }
    
//     console.log(searchTerm)
//    console.log(users)
//    console.log(select)
   

   return(
    <div  style={{marginTop:"150px"}} >
        
                <div class="input-group w-50 offset-3">
                    <span class="input-group-text" id="basic-addon1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </span>
                                <input onChange={handleSearchTerm} type="text" class="form-control" placeholder="Recherchez" aria-label="Input group example" aria-describedby="basic-addon1"/>
                                    <select onChange={(e) => onChange(e)} class="form-select" id="select" aria-label="Default select example">
                                            
                                            <option value="Nom">Nom</option>
                                            <option value="Prénom">Prénom</option>
                                            <option value="Métier">Métier</option>
                                            <option value="Ville">Ville</option>
                                            <option value="Email">Email</option>
                                            <option value="Email">Roles</option>

                                    </select>
                </div>

    <div class="container-fluid">
    <div class="row admin"></div>
    <div class="row">
    <div class="input-group w-50">
              
      </div>
        <div class="col-8 offset-2 mt-4">
            <div class="table-responsive">
                <div class="card bg-dark admin-users">
                    <table class="table align-items-center text-light">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col" class="sort text-warning" data-sort="nom">Nom</th>
                                <th scope="col" class="sort text-warning" data-sort="Prénom">Prénom</th>
                                <th scope="col" class="sort text-warning" data-sort="prenom">Email</th>
                                <th scope="col" class="sort text-warning" data-sort="prenom">Role</th>
                                <th scope="col" class="sort text-warning" data-sort="prenom">Status</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                    <tbody class="list">
                        {users.filter((value, index)=>
                        {
                            if(select === "Nom"){
                                    recherche = value.Nom
                                }else if(select === "Prénom"){
                                        recherche = value.Prénom
                                    }else if(select === "Métier"){
                                        recherche = value.job
                                        }else if(select === "Ville"){
                                            recherche = value.Ville
                                            }else if(select === "Email"){
                                                recherche = value.Email
                                                }else if(select === "Roles"){
                                                    recherche = value.Roles
                        } return recherche.toLowerCase().includes(searchTerm)}).map((value, index)=> ( 
                                <tr>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-lg">{value.Nom}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td class="text-lg budget">
                                    {value.Prénom}
                                    </td>
                                    <td class="text-lg budget">
                                    {value.Email}
                                    </td>
                                    <td class="text-lg budget">
                                    {value.Roles}
                                    </td>
                                    <td class="text-lg budget">
                                    {value.status}
                                    <span type="hidden" value={value.job}/>
                                    <span type="hidden" value={value.Ville}/>
                                    <span type="hidden" value={value.Email}/>
                                    <span type="hidden" value={value.Roles}/>
                                    </td>
                                    <td >
                                    
                                        <div >
                                        
                                        <form onSubmit={(e) => submit(e, value._id)} class="row">
                                        <button class="btn btn-warning col-3" onClick={(e)=>delUsers(value._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </button>
                                        <button class="btn btn-warning col-3" onClick={(e)=>upUsers(value._id)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16" >
                                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                                            </svg>
                                        </button>
                                        <button class="btn btn-warning col-3" onClick={(e)=>getUser(value._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                        </button>
                                        {value.status === 'pending' && <Button />}
                                        </form>
                                        </div>
                                    </td>
                                </tr>
                         ))}
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
              
    </div>
   
</div>
 
</div>
)};

export default Users;
