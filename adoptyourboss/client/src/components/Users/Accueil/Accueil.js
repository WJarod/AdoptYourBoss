import { useState, useEffect} from 'react'
import axios from "../../../axios"

const Accueil = () =>
{
    var sessionUser = JSON.parse(sessionStorage.getItem("user"));

    var Background = ""

    const link = `http://localhost:5000/offres/job/${sessionUser.job}`;
    const [ offres, setOffres ] = useState([])
    const link2 = "http://localhost:5000/news/recentDate";
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
            {news.map((value, index)=>
            {

                function zero(s) { return (s < 10) ? '0' + s : s; }
                var d = new Date(value.createDate)
                var date = "publier le "+ zero(d.getDate()) +"/"+ zero(d.getMonth()+1);
                var Background = value.image;

                if (index <= 0)
                {
                    return (

                        <div class="row text-light" style={{marginTop: "50px"}}>
                            <div class="col-6 offset-3 bg-dark news">
                                <div class="row">
                                    <div class="col-8 news-img" style={{backgroundImage: `url(${Background})`, background: "cover"}}>
                                        <div class="row h-75">
                                            <div class="col-8">
                                                <h2>{value.titleNews}</h2>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 offset-8 text-warning">
                                                <p class="text-warning">{date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="row">
                                            <h5>Description : </h5>
                                        </div>
                                        <div class="row news-desc">
                                            <p class="description">{value.description}</p>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 offset-3">
                                                <a class="btn btn-warning" href="./OffresTest">Consulter</a>
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
                        if (index < 4)
                        {
                            return (
                                <div style={{marginTop: "50px"}}>
                                    <div class="row text-light">
                                        <div class="col-6 offset-3 bg-dark news">
                                            <div class="row">
                                                <div class="col-8 news-img" style={{backgroundImage: `url(${Background})`}}>
                                                    <div class="row h-75">
                                                        <div class="col-8">
                                                            <h2>{value.titleOffre}</h2>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-4 offset-8 text-warning">
                                                            <p class="text-warning">{date}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="row">
                                                        <h5>{value.jobName}</h5>
                                                        <h6>{value.creator}</h6>
                                                    </div>
                                                    <div class="row">
                                                        <h5 >Description : </h5>
                                                    </div>
                                                    <div class="row news-desc">
                                                        <p class="description">{value.description}</p>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-4 offset-3">
                                                            <a class="btn btn-warning" href="./OffresTest">Consulter</a>
                                                        </div>
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