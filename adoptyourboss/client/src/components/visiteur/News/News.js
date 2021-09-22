import { useState, useEffect} from 'react'
import axios from "../../../axios"

const News = () => 
{
    const link = "http://localhost:5000/news/recentDate";
    const [ news, setNews ] = useState([]);

    useEffect(() => 
    {
        async function fetchDataNews()
        {
            const request = await axios.get(link);
            setNews(request.data)
            return request;
        }
        fetchDataNews();
    },[link])

    console.log(news)

    
    return(

        <div style={{marginTop: "150px"}}>
            {news.map((value, index)=>
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
                                <div class="col-4 d-flex flex-column pt-2">
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
            })}
        </div>

    )
}

export default News


                                            {/* <div class="col-8 news-img" style={{backgroundImage: `url(${Background})`}}>
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
                                                    <h5>Description : </h5>
                                                </div>
                                                <div class="row news-desc">
                                                    <p>{value.description}</p>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4 offset-3">
                                                        <a class="btn btn-warning" href="./OffresTest">Consulter</a> */}