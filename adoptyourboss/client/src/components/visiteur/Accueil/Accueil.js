import { useState, useEffect} from 'react'
import axios from "../../../axios"

const Accueil = () =>
{

    var Background = "https://s1.1zoom.me/b5050/596/Evening_Forests_Mountains_Firewatch_Campo_Santo_549147_1920x1080.jpg"

    const link = "http://localhost:5000/offres"
    const [ offres, setOffres ] = useState([])
    const link2 = "http://localhost:5000/news";
    const [ news, setNews ] = useState([]);

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

    useEffect(() => 
    {
        async function fetchDataNews()
        {
            const request = await axios.get(link2);
            setNews(request.data)
            return request;
        }
        fetchDataNews();
    },[link2])

    console.log(news)

    return (
        <div style={{marginTop: "150px"}}>

                <div class="row bg-light d-flex justify-content-around align-items-center" style={{height: "80px"}}>
                    <div class="col offset-3">
                        <h3>News</h3>
                        <div class="titre bg-warning"></div>
                    </div>
                </div>

            {news.map((value, index)=>
            {

                function zero(s) { return (s < 10) ? '0' + s : s; }
                var d = new Date(value.createDate)
                var date = "publier le "+ zero(d.getDate()) +"/"+ zero(d.getMonth()+1);
                var Background = value.image;
                var id = value._id;
                if (index <= 0)
                {
                    return (

                        <div class="row text-light justify-content-center mt-5 overflow-hidden">
                        <div class="col-6 px-0 bg-dark news">
                            <div class="row mx-0">

                                <div class="col-8 px-0 imagetitre">
                                    <div class="news-img opacity-50 position-absolute" style={{ backgroundImage: `url(${Background})`}}></div>
                                        <div class="row h-75">
                                            <h2 class="ps-4 pt-1">{value.titleNews}</h2>
                                        </div>
                                        <div class="row h-25 d-flex justify-content-end position-relative">
                                            <div class="col d-flex justify-content-end align-self-end pe-4 text-warning">
                                                <p class="text-warning">{date}</p>
                                            </div>
                                        </div>
                                </div>
                                <div class="col-4 d-flex flex-column">
                                    <div class="row mt-3">
                                        <h5>Description : </h5>
                                    </div>
                                    <div class="row overflow-hidden descriptionNews pe-4">
                                        <p>{value.description}</p>
                                    </div>
                                    <div class="row mt-auto mb-3">
                                        <div class="text-center">
                                            <a class="btn btn-warning mt-3" href={"./ConsulterNews/" + id}>Consulter</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    )
                }
            })}

            <div class="row bg-light d-flex justify-content-around align-items-center" style={{height: "80px"}}>
                <div class="col offset-3">
                    <h3>Offres</h3>
                    <div class="titre bg-warning"></div>
                </div>
            </div>
            {offres.map((value, index)=>
                    {
                        function zero(s) { return (s < 10) ? '0' + s : s; }
                        var d = new Date(value.createDate)
                        var date = "publier le "+ zero(d.getDate()) +"/"+ zero(d.getMonth()+1);
                        var Background = value.image;
                        var id = value._id;
                        if (index < 4)
                        {
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
                                            <div class="row mt-3">
                                                 <h5>Description : </h5>
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
                        }                        
                    })}
        </div>
    )

}

export default Accueil
