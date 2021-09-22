import { useState, useEffect } from 'react'
import axios from "../../../axios"
const Offres = () =>
{
    var sessionUser = JSON.parse(sessionStorage.getItem("user"));

    const link = `http://localhost:5000/offres/job/${sessionUser.job}`;
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

    console.log(offres)

    return(
        <div style={{marginTop: "150px"}}>  
                {offres.map((value, index)=>
                {
                    function zero(s) { return (s < 10) ? '0' + s : s; }
                    var d = new Date(value.createDate)
                    var date = "publier le "+ zero(d.getDate()) +"/"+ zero(d.getMonth()+1);
                    var Background = value.image;
                    var id = value._id;
                    
                    return (
                        <div class="row text-light justify-content-center mt-5 overflow-hidden">
                            <div class="col-6 px-0 bg-dark news">
                                <div class="row mx-0">
                                    <div class="col-8 px-0 imagetitre">
                                        <div class="news-img opacity-50 position-absolute" style={{ backgroundImage: `url(${Background})`}}>
                                        </div>
                                        <div class="row h-75">
                                            <h2 class="ps-4 pt-1">{value.titleOffre}</h2>
                                        </div>
                                        <div class="row h-25 d-flex justify-content-end position-relative">
                                            <div class="col d-flex justify-content-end align-self-end pe-4 text-warning">
                                                <p class="text-warning">{date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4 d-flex flex-column">
                                        <div class="row mt-2">
                                            <h5>Société : {value.creator}</h5>
                                            <h5>Poste : {value.jobName}</h5>
                                        </div>
                                        <div class="row overflow-hidden descriptionOffres pe-4">
                                            <p>{value.description}</p>
                                        </div>
                                        <div class="row mt-auto mb-3">
                                            <div class="text-center">
                                                <a class="btn btn-warning mt-3" href={"./ConsulterOffres/" + id}>Consulter</a>
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

export default Offres;