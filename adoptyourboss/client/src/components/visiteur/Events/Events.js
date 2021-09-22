import { useState, useEffect } from 'react'
import axios from "../../../axios"

const Events = () =>
{
    const link = "http://localhost:5000/events/recentDate"
    const [ events, setEvents ] = useState([])

    useEffect(() => 
    {
        async function fetchDataEvents()
        {
            const request = await axios.get(link);
            setEvents(request.data);
            return request;
        }
        fetchDataEvents();
    }, [link]);

    console.log(events)

   return(
            <div style={{marginTop: "150px"}}>  
                    {events.map((value, index)=>
                    {
                        function zero(s) { return (s < 10) ? '0' + s : s; }
                        var d = new Date(value.createDate)
                        var date = "publier le "+ zero(d.getDate()) +"/"+ zero(d.getMonth()+1);
                        var Background = value.image;
                        var id = value._id;
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
                                        <div class="col-4 d-flex flex-column">
                                            <div class="row mt-3 overflow-hidden">
                                                <h7 class="text-light text-capitalize">{dates.toLocaleDateString("fr-FR", options)}</h7>
                                            </div>
                                            <div class="row overflow-hidden">
                                                <h7>{value.lieu}</h7>
                                            </div>
                                            <div class="row overflow-hidden descriptionEvents pe-4">
                                                <p>{value.description}</p>
                                            </div>
                                            <div class="row mt-auto mb-3">
                                                <div class="text-center">
                                                    <a class="btn btn-warning mt-3" href={"./ConsulterEvents/" + id}>Consulter</a>
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

export default Events;