import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom'
import React,{ useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import useChat from "../../../useChat";
import axios from "../../../axios"
import $ from "jquery";

const Nav = () =>
{
    const [ popUp, setpopUp ] = useState('event')

    let location = useLocation();
    let route = location.pathname;
    let click = "";
    var user = JSON.parse(sessionStorage.getItem("user"));

    var Background = "";
    if(user.image === "")
    {
        Background = "https://www.stratelio.net/img/front_v2/03_experts/02_nos_experts/user-icon.png" 
    }else
    {
        Background = user.image;
    }

    const link = "http://localhost:5000/events/recentDate";
    const linkAmis = `http://localhost:5000/Amis/${user.id}`;
    const linkMessages = `http://localhost:5000/messages`;
    const [ events, setEvents ] = useState([]);
    const [ amis, setAmis ] = useState([]);
    const [ messages, setMessages ] = useState([]);
    const [ message, setMessage ] = useState('');
    const [ senderId, setSenderId] = useState([]);
    const [ receiverId, setReceiverId] = useState([]);

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

    useEffect(() => 
    {
        async function fetchDataAmis()
        {
            const request = await axios.get(linkAmis);
            setAmis(request.data)
            return request;
        }
        fetchDataAmis();
    },[linkAmis])

    

    useEffect(() => 
    {
        async function fetchDataMessage()
        {
            const request = await axios.get(linkMessages);
            setMessages(request.data)
            return request;
        }
        fetchDataMessage();
    },[linkMessages])

    useEffect(() => {
        window.addEventListener('mouseover', () => 
        {
            async function fetchDataMessage()
            {
            const request = await axios.get(linkMessages);
            setMessages(request.data)
            return request;
            }
            fetchDataMessage()
        });
      
        // returned function will be called on component unmount 
        return () => {
          window.removeEventListener('mousemove', () => {})
        }
      }, [linkMessages])

    function enterEvent()
    {
        setpopUp((popUp) => popUp = "event")
    }

    function roomChoice()
    {
        setpopUp((popUp) => popUp = "chat")
    }

    function notif()
    {
        setpopUp((popUp) => popUp = "notif")
    }

    function room(id1, id2)
    {
        setpopUp((popUp) => popUp = "room")
        setSenderId((senderId) => senderId = id1)
        setReceiverId((receiverId) => receiverId = id2)
        console.log(senderId)
        console.log(receiverId)
    }

    function onChangeMessage(e){
		const newMessage={...message}
		newMessage[e.target.id] = e.target.value
		setMessage(newMessage)
	}

    function submit(e, id)
    {
        var url = `http://localhost:5000/amis/update/${id}`
		axios.post(url,{
            status: "approved"
		})
		.then(res =>{
			console.log(res.data)
		})
	}

    const url = "http://localhost:5000/messages"

    function submitMessage(e)
    {
        e.preventDefault(e);
		axios.post(url,{
            sendBy: senderId,
            Message: message.message,
            reciveBy: receiverId,
		})
		.then(res =>{
			console.log(res.data)
		})
    }

    function deco()
    {
        var user = {
            "Roles": "visiteur"
        }
        window.location.replace("http://localhost:3000/Accueil")
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    function recruteur()
    {
        return (

            <>
            <div class="row mt-5">
                <div class="col-8 offset-3 side-bar-link">
                    <a href="/recruteur/Candidats"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                    </svg>Candidats</a>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-8 offset-3 side-bar-link">
                    <a href="/recruteur/Publier"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-plus" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/>
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                    </svg>publier</a>
                </div>
            </div>
            </>
        )
    }

    function admin()
    {
        return (

            <>
            <div class="row mt-5">
                <div class="col-8 offset-3 side-bar-link">
                    <a href="/admin/Candidats"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                    </svg>Utilisateurs</a>
                </div>
            </div>
            </>
        )
    }

    function friendList()
    {
        return (

            <div class="col text-light ">
                <div class="row text-light" style={{marginTop: "5%"}}>
                    <div class="col-2 offset-1 text-warning text-center">
                        <h4>Amis</h4>
                    </div>
                    <div class="col-4 offset-4">
                        <button class="btn btn-warning" onClick={enterEvent}>Retour</button>
                    </div>
                </div>
                <div class="row text-light" style={{marginLeft: "5%", width: "86%"}}>
                    {amis.map((value, index)=>
                    {
                        if(value.status == "approved")
                        {
                            return (
                            <a class="col-12 border border-secondary rounded popUp-event" style={{marginTop: "5%"}} onClick={(e) => room(user.id, value.User2._id)}>
                                <div class="row">
                                    <div class="col-3">
                                        <img src={value.User2.image} class="img-PopUp rounded-circle "></img>
                                    </div>
                                    <div class="col d-flex align-items-center">
                                        <p class="text-light">{value.User2.Prénom}</p>
                                    </div>
                                </div>
                            </a>
                            )
                        }
                    })}
                </div>

            </div>

        )
    }

    function notifListe()
    {
        return (

            <div class="col text-light ">
                <div class="row text-light" style={{marginTop: "5%"}}>
                    <div class="col-2 offset-1 text-warning text-center">
                        <h4>Amis</h4>
                    </div>
                    <div class="col-4 offset-4">
                        <button class="btn btn-warning" onClick={enterEvent}>Retour</button>
                    </div>
                </div>
                <div class="row text-light" style={{marginLeft: "5%", width: "86%"}}>
                    {amis.map((value, index)=>
                    {
                        if(value.status != "approved")
                        {
                            return (
                            <a class="col-12 border border-secondary rounded popUp-event" style={{marginTop: "5%"}}>
                                <div class="row">
                                    <div class="col-3">
                                        <img src={value.User2.image} class="img-PopUp rounded-circle "></img>
                                    </div>
                                    <div class="col-6" style={{marginTop: "3%"}}>
                                        <p class="text-light">{value.User2.Prénom}</p>
                                    </div>
                                    <form class="col-1" style={{marginTop: "2.5%"}} onSubmit={(e) => submit(e, value._id)}>
                                        <button type="submit" class="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                        </svg></button>
                                    </form>
                                </div>
                            </a>
                            )
                        }
                    })}
                </div>

            </div>

        )
    }

    function chatRoom()
    {
        var height = 20;
        $('div p').each(function(i, value){
            height += parseInt($(this).height());
        });

        height += '';

        $('div').animate({scrollTop: height});

        return (

            <div class="col text-light ">
                <div class="row text-light" style={{marginTop: "5%"}}>
                    <div class="col-4 offset-7">
                        <button class="btn btn-warning" onClick={roomChoice}>Retour</button>
                    </div>
                </div>
                <div class="row" style={{marginTop: "5%"}}>
                    <div class="col-12 bg-dark offset-1" style={{height: "350px"}} >
                        <div class="row" id="chatRoom">
                            <div class="col-10 overflow-auto" data-bs-spy="scroll" style={{maxHeight: "350px"}}>
                                {messages.map((message, i) => {

                                    if (message.sendBy == user.id && message.reciveBy == receiverId)
                                    {
                                        return (
                                        <p class="text-dark bg-warning rounded message text-end">{message.Message}</p>
                                        )
                                    }else if (message.sendBy == receiverId && message.reciveBy == user.id)
                                    {
                                        return (
                                            <p class="text-dark bg-light rounded message">{message.Message}</p>
                                        )
                                    }
                                    

                                })}
                            </div>
                        </div>
                        
                    </div>
                    <div >
                        <div class="row">
                            <div class="col-8 offset-1">
                                <input class="text-light form-control bg-dark border-warning rounded" id="message" placeholder="Ecrire message..." value={message.message} onChange={(e) => onChangeMessage(e)}/>
                            </div>
                            <form class="col-1" style={{marginLeft: "-65px"}} onSubmit={(e) => submitMessage(e)} id="form1">
                                <button class="rounded px-2 mx-5 mb-2 btn btn-warning"  id="btn-envoyer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                                    </svg>
                                </button>
                            </form>   
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    function event(event)
    {
        return (

            <div class="col-12">
                <div class="row text-center text-warning mt-3">
                    <h3>Évènements :</h3>
                </div>
                <div class="row text-light" style={{marginLeft: "5%", width: "86%"}}>
                    {event.map((value, index)=>
                    {
                        function zero(s) { return (s < 10) ? '0' + s : s; }
                        var d = new Date(value.createDate)
                        var date = zero(d.getDate()) +"/"+ zero(d.getMonth()+1);
                        var id = value._id;
                        if (index < 5)
                        {
                            return (
                            
                                <a href={"./ConsulterEvents/" + id} class="col-12 border border-secondary rounded popUp-event overflow-hidden" style={{marginTop: "5%", height:"60px"}}>
                                    <p class="text-start text-light">{value.titleEvent}</p>
                                    <p class="text-end text-warning">{date}</p>
                                </a>

                            )
                        }
                        
                    
                    })}
                </div>
            </div>

        )
    }

    return (

        <div class="container-fluid fixed-top">
            <nav class="row bg-dark nav-bar">
                <div class="col-2 d-flex justify-content-around align-items-center">
                    <h4 class="text-light">Adopt <span class="text-warning">Your</span> Boss</h4>
                </div>
                <div class="col-1 offset-2 d-flex justify-content-around align-items-center">
                    <div class="nav-btn d-flex justify-content-around align-items-center">
                        <a class="text-light" href="./Accueil" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                            </svg>
                        </a>
                    </div>
                    <div class={route == "/recruteur/Accueil" || route == "/candidat/Accueil" ? 'position-fixed click-nav bg-warning' : 'position-fixed click-nav'}></div>
                </div>
                <div class="col-1 d-flex justify-content-around align-items-center">
                    <div class="nav-btn d-flex justify-content-around align-items-center">
                        <a class="text-light" href="./News" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe2" viewBox="0 0 16 16">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"/>
                            </svg>
                        </a>
                    </div>
                    <div class={route == "/recruteur/News" || route == "/candidat/News" ? 'position-fixed click-nav bg-warning' : 'position-fixed click-nav'}></div>
                </div>
                <div class="col-1 d-flex justify-content-around align-items-center">
                    <div class="nav-btn d-flex justify-content-around align-items-center">
                        <a class="text-light" href="./Offres" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase" viewBox="0 0 16 16">
                                <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                        </a>
                    </div>
                    <div class={route == "/recruteur/Offres" || route == "/candidat/Offres" ? 'position-fixed click-nav bg-warning' : 'position-fixed click-nav'}></div>
                </div>
                <div class="col-1 d-flex justify-content-around align-items-center">
                    <div class="nav-btn d-flex justify-content-around align-items-center">
                        <a class="text-light" href="./Évènements" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2" viewBox="0 0 16 16">
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
                            </svg>
                        </a>
                    </div>
                    <div class={route == "/recruteur/Évènements" || route == "/candidat/Évènements" ? 'position-fixed click-nav bg-warning' : 'position-fixed click-nav'}></div>
                </div>
                <div class="col-1 offset-1 d-flex justify-content-around align-items-center text-light">
                    <a class="nav-btn d-flex justify-content-around align-items-center" onClick={roomChoice} href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                        </svg>
                    </a>
                    <div class={popUp === "chat" || popUp === "room" ? 'position-fixed click-nav bg-warning' : 'position-fixed click-nav'}></div>
                </div>
                <div class="col-1 d-flex justify-content-around align-items-center text-light">
                    <a class="nav-btn d-flex justify-content-around align-items-center" onClick={notif} href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                        </svg>
                    </a>
                    <div class={popUp === "notif" ? 'position-fixed click-nav bg-warning' : 'position-fixed click-nav'}></div>
                </div>
                <div class="col-1 d-flex justify-content-around align-items-center text-light">
                    <a class="d-flex justify-content-around align-items-center">
                        <img src={Background} class="img-users rounded-circle"></img>
                    </a>
                </div>

                    
                
            </nav>
            <div class="row bg-light d-flex justify-content-around align-items-center" style={{height: "80px"}}>
                <div class="col offset-3">
                    <h3>{route == "/recruteur/Accueil" || route == "/candidat/Accueil" ? "" : route == "/recruteur/News" || route == "/candidat/News" ? "News" : route == "/recruteur/Offres" || route == "/candidat/Offres" ? "Offres" : route == "/recruteur/Évènements" || route == "/candidat/Évènements" ? "Évènements" : route == "/recruteur/Compte" || route == "/candidat/Compte" ? "Compte" : route == "/recruteur/Candidats" ? "Candidats" : route == "/recruteur/Publier" ? "Publier" : ""}</h3>
                    <div class={route == "/recruteur/Accueil" || route == "/candidat/Accueil" ? "" : route == "/recruteur/News" || route == "/candidat/News" ? "titre bg-warning" : route == "/recruteur/Offres" || route == "/candidat/Offres" ? "titre bg-warning" : route == "/recruteur/Évènements" || route == "/candidat/Évènements" ? "titre bg-warning" : route == "/recruteur/Compte" || route == "/candidat/Compte" ? "titre bg-warning" : route == "/recruteur/Candidats" ? "titre bg-warning" : route == "/recruteur/Publier" ? "titre bg-warning" : ""}></div>
                </div>
            </div>

            <div class="bg-dark col-2 offset-10 position-fixed popUp">
                <div class="row">
                    { popUp === "event" && event(events) }
                    { popUp === "chat" && friendList() }
                    { popUp === "room" && chatRoom() }
                    { popUp === "notif" && notifListe() }
                </div>
            </div>
            <div class="bg-dark col-2 position-fixed side-bar text-light">
                <div class="row container-logo">   
                    <div class="col d-flex justify-content-center">
                        <img src="https://i.ibb.co/Db2HK0b/logo-1.png" class="logo"></img>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-6 offset-3 side-bar-link">
                        <a href={user.Roles === "recruteur" ? "/recruteur/Compte" : user.Roles === "candidat" ? "/candidat/Compte" : user.Roles === "admin" ? "/admin/Compte" : ""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        </svg>Compte</a>
                    </div>
                </div>
                { user.Roles === "recruteur" && recruteur()}
                { user.Roles === "admin" && admin()}
                <div class="row mt-5">
                    <div class="col-6 offset-3 side-bar-link">
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                        <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                        <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                        <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
                        </svg>Premium</a>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-8 offset-3 side-bar-link">
                        <a href="#" onClick={deco}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-x" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        <path fill-rule="evenodd" d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                        </svg>Deconnexion</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;