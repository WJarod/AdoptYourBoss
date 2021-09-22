import { useState, useEffect} from 'react'
import { useHistory } from 'react-router';
import axios from "../../../axios"


const Events = (props) =>
{
    const link = "http://localhost:5000/events";
    const [ events, setEvents ] = useState([]);
    const [ select, setSelect] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState([]);
    var recherche = "";
    var history = useHistory();

    useEffect(() => 
    {
        async function fetchDataNews()
        {
            const request = await axios.get(link);
            setEvents(request.data)
            return request;
        }
        fetchDataNews();
    },[link])

    console.log(events)

    
    function delEvents(id)
    {
        axios.get(`http://localhost:5000/admin/events/delete/${id}`);
        window.location.reload();
    }

    function upEvent(id)
    {
        history.push("/Admin/updateEvent/"+id) 
    }

    const handleSearchTerm = (e) => {
        var cherche = e.target.value;
        setSearchTerm(cherche)
    }

    function onChange(e){

        setSelect((select) => select = e.target.value)
        console.log(select)
    }

    return(

        <div style={{marginTop: "150px"}}>
            
            <div class="input-group w-50 offset-3" >
                    <span class="input-group-text" id="basic-addon1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </span>
                                <input onChange={handleSearchTerm} type="text" class="form-control" placeholder="Recherchez" aria-label="Input group example" aria-describedby="basic-addon1"/>
                                    <select onChange={(e) => onChange(e)} class="form-select" id="select" aria-label="Default select example">
                                            
                                            <option value="Titre">Titre</option>
                                            <option value="Description">Description</option>

                                    </select>
                                    <button class="btn btn-warning" onClick={()=>history.push('./addEvent')} >Ajoutez un nouvel évènement</button>

                    </div>
            {events.filter((value, index)=>
            { 
                if(select === 'Titre'){
                    recherche = value.titleEvent
                        }else if(select === 'Description'){
                            recherche = value.description
                    

        }return recherche.toLowerCase().includes(searchTerm)}).map((value, index)=>

        {

                function zero(s) { return (s < 10) ? '0' + s : s; }
                var d = new Date(value.createDate)
                var date = "publier le "+ zero(d.getDate()) +"/"+ zero(d.getMonth()+1);
                var Background = value.image;
                
                var dates = new Date(value.dates);
                var options = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};
                
                return (

                    <div class="row text-light justify-content-center mt-5 overflow-hidden">
                        <div class="col-6 px-0 bg-dark news">
                            <div class="row mx-0">
                                <div class="col-8 px-0 imagetitre">
                                    <div class="news-img opacity-50 position-absolute" style={{ backgroundImage: `url(${Background})`}}>
                                    </div>
                                    <div class="row h-75">
                                        <h2 class="ps-4 pt-1">{value.titleEvent}</h2>
                                    </div>
                                    <div class="row h-25 d-flex justify-content-end position-relative">
                                        <div class="col d-flex justify-content-end align-self-end pe-4 text-warning">
                                            <p class="text-warning">{date}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 pe-0 d-flex flex-column">
                                    <div class="row mt-3 overflow-hidden">
                                        <h7 style={{textTransform: 'capitalize'}}>{dates.toLocaleDateString("fr-FR", options)}</h7>
                                    </div>
                                    <div class="row overflow-hidden">
                                        <h7>{value.lieu}</h7>
                                    </div>
                                    <div class="row overflow-hidden descriptionEvents pe-4">
                                        <p>{value.description}</p>
                                    </div>
                                    <div class="row mt-auto mb-3">
                                        <div class="text-center">
                                        <button class="btn btn-warning" onClick={(e)=>delEvents(value._id)}>Supprimer</button>
                                        <button class="btn btn-warning offset-1" onClick={(e)=>upEvent(value._id)} >Modifier</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )

            })}
        </div>

    )
}

export default Events

