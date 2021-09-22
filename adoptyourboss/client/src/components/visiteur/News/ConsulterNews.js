import { useState, useEffect } from 'react'
import axios from "../../../axios"
import { useParams } from 'react-router-dom';

const ConsulterNews = () =>
{
    
    const { id } = useParams(); 
    const url = `http://localhost:5000/news/${id}`;
    const [ news, setNews ] = useState([]);
    

    useEffect(() => 
    {
        async function fetchDataNews()
        {
            const request = await axios.get(url);
            setNews(request.data);
            return request;
            console.log(url);
        }
        fetchDataNews();
    }, [url]); 
    
    var Background = news.image;
    function zero(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(news.createDate)
    var date = "publier le "+ zero(d.getDate()) +"/"+ zero(d.getMonth()+1);

    return (
        
                <div class="row justify-content-center">
                    <div style={{marginTop: "150px"}} class="col-6 px-0 bg-dark compte">
                        <div class="row h-75 titreconsulter bg-dark mx-0 px-0 ">
                            <div class="col px-5 text-warning mt-3">
                                <h1>{news.titleNews}</h1>
                            </div>
                        </div>
                        
                        <a data-bs-toggle="modal" data-bs-target="#modalimgage">
                            <div class="news-img-consulter mx-4 rounded flex-row-reverse d-flex" style={{ backgroundImage: `url(${Background})`}} >
                                <div class="row h-25 d-flex align-items-end align-self-end">
                                    <div class="col pe-4 text-warning">
                                        <p class="text-warning">{date}</p>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <div class="modal fade" id="modalimgage" tabindex="-1" aria-labelledby="modalimgageLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-body">
                                        <img style={{width: "100%"}} src={news.image} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row text-light mt-3">
                            <div class="col-10 offset-1">
                                <p class="text-light fs-6">{news.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
      
        )
}

export default ConsulterNews;
