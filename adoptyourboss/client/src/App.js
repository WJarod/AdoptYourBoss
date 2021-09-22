// visiteur 
import Nav from './components/visiteur/Nav/Nav';
import NavUser from './components/Users/Nav/NavUsers' 
import Accueil from './components/visiteur/Accueil/Accueil';
import News from './components/visiteur/News/News';
import Offres from './components/visiteur/Offres/Offres';
import Events from './components/visiteur/Events/Events';
import InscriptionCandidat from './components/visiteur/Inscription/InscriptionCandidat';
import InscriptionRecruteur from './components/visiteur/Inscription/InscriptionRecruteur';
import Inscription from './components/visiteur/Inscription/InscriptionChoix'
import Connexion from './components/visiteur/Connexion/Connexion'
import ConsulterNews from './components/visiteur/News/ConsulterNews';
import ConsulterEvents from './components/visiteur/Events/ConsulterEvents';
import ConsulterOffres from './components/visiteur/Offres/ConsulterOffres';

//users
import Compte from './components/Users/Compte/Compte'

//Candidats
import OffresJob from './components/Users/Offres/Offres'
import AccueilUsers from './components/Users/Accueil/Accueil'

//recruteur
import Candidats from './components/Users/Candidats/Candidats'
import Candidat from './components/Users/Candidats/Candidat'
import Publier from './components/Users/Publier/Publier'
import Update from './components/Users/Publier/Update'

// Admin 
import AdminOffres from './components/Admin/Offres/Offres'
import AdminNews from './components/Admin/News/News'
import AdminEvents from './components/Admin/Events/Events'
import FormOffre from './components/Admin/Form/Form'
import FormNews from './components/Admin/FormNews/FormNews'
import EventsForm from './components/Admin/FormEvents/FormEvent'
import UpOffre from './components/Admin/Offres/updateOffres'
// import navSide from './components/navSide/NavUsers'
import UpNews from './components/Admin/News/updateNews'
import UpEvents from './components/Admin/Events/updateEvents'
import Users from './components/Admin/Users/Users'
import UpUsers from './components/Admin/Users/updateUsers'
import User from './components/Admin/Users/user'

import { BrowserRouter as Router, Route } from 'react-router-dom'


function visiteur()
{
    return (
        <div>
            <Route path='/Accueil' render={props => <div><Nav /><Accueil /></div>} />
            <Route path='/News' render={props => <div><Nav /><News /></div>} />
            <Route path='/ConsulterNews/:id' render={props => <div><Nav /><ConsulterNews /></div>} />
            <Route path='/Offres' render={props => <div><Nav /><Offres /></div>} />
            <Route path='/ConsulterOffres/:id' render={props => <div><Nav /><ConsulterOffres /></div>} /> 
            <Route path='/Évènements' render={props => <div><Nav /><Events /></div>}/>
            <Route path='/ConsulterEvents/:id' render={props => <div><Nav /><ConsulterEvents /></div>} />
            <Route path='/inscriptionCandidat' render={props => <div><Nav /><InscriptionCandidat /></div>}/>
            <Route path='/inscriptionRecruteur' render={props => <div><Nav /><InscriptionRecruteur /></div>}/>
            <Route path='/inscription' render={props => <div><Nav /><Inscription /></div>}/>
            <Route path='/connexion' render={props => <div><Nav /><Connexion /></div>}/>
        </div>
    )
}

function candidat()
{
    return (
        <div>
            <Route path='/candidat/Accueil' render={props => <div><NavUser /><Accueil /></div>}/>
            <Route path='/candidat/News' render={props => <div><NavUser /><News /></div>}/>
            <Route path='/candidat/ConsulterNews/:id' render={props => <div><NavUser /><ConsulterNews /></div>} />
            <Route path='/candidat/Offres' render={props => <div><NavUser /><OffresJob /></div>}/>
            <Route path='/candidat/ConsulterOffres/:id' render={props => <div><NavUser /><ConsulterOffres /></div>} />
            <Route path='/candidat/Évènements' render={props => <div><NavUser /><Events /></div>}/>
            <Route path='/candidat/ConsulterEvents/:id' render={props => <div><NavUser /><ConsulterEvents /></div>} />
            <Route path='/candidat/Compte' render={props => <div><NavUser /><Compte /></div>}/>
        </div>
    )

}

function recruteur()
{
    return (
        <div>
            <Route path='/recruteur/Accueil' render={props => <div><NavUser /><Accueil /></div>}/>
            <Route path='/recruteur/News' render={props => <div><NavUser /><News /></div>}/>
            <Route path='/recruteur/ConsulterNews/:id' render={props => <div><NavUser /><ConsulterNews /></div>} />
            <Route path='/recruteur/Offres' render={props => <div><NavUser /><OffresJob /></div>}/>
            <Route path='/recruteur/ConsulterOffres/:id' render={props => <div><NavUser /><ConsulterOffres /></div>} />
            <Route path='/recruteur/Évènements' render={props => <div><NavUser /><Events /></div>}/>
            <Route path='/recruteur/ConsulterEvents/:id' render={props => <div><NavUser /><ConsulterEvents /></div>} />
            <Route path='/recruteur/Compte' render={props => <div><NavUser /><Compte /></div>}/>
            <Route path='/recruteur/Candidats' render={props => <div><NavUser /><Candidats /></div>}/>
            <Route path='/recruteur/Candidat/:id' render={props => <div><NavUser /><Candidat /></div>}/>
            <Route path='/recruteur/Publier' render={props => <div><NavUser /><Publier /></div>}/>
            <Route path='/recruteur/Update/:id' render={props => <div><NavUser /><Update /></div>}/>
        </div>
    )
}

function admin()
{
    return (
        <div>
            <Route path='/Admin/Accueil' render={props => <div><NavUser /><Accueil /></div>}/> 
            <Route path='/Admin/News' render={props => <div><NavUser /><AdminNews /></div>}/>
            <Route path='/Admin/addNews' render={props => <div><NavUser /><FormNews /></div>}/>
            <Route path='/Admin/updateNews/:id' render={props => <div><NavUser /><UpNews /></div>}/>
            <Route path='/Admin/ConsulterNews/:id' render={props => <div><NavUser /><ConsulterNews /></div>} />
            <Route path='/Admin/Offres' render={props => <div><NavUser /><AdminOffres /></div>}/>
            <Route path='/Admin/addOffres' render={props => <div><NavUser /><FormOffre /></div>}/>
            <Route path='/Admin/updateOffre/:id' render={props => <div><NavUser /><UpOffre /></div>}/>
            <Route path='/Admin/ConsulterOffres/:id' render={props => <div><NavUser /><ConsulterOffres /></div>} />
            <Route path='/Admin/Évènements' render={props => <div><NavUser /><AdminEvents /></div>}/>
            <Route path='/Admin/addEvent' render={props => <div><NavUser /><EventsForm /></div>}/>
            <Route path='/Admin/updateEvent/:id' render={props => <div><NavUser /><UpEvents /></div>}/>
            <Route path='/Admin/ConsulterEvents/:id' render={props => <div><NavUser /><ConsulterEvents /></div>} />
            <Route path='/Admin/Candidats' render={props => <div><NavUser /><Users /></div>}/>
            <Route path='/Admin/updateUser/:id' render={props => <div><NavUser /><UpUsers /></div>}/>
            <Route path='/Admin/User/:id' render={props => <div><NavUser /><Candidat /></div>}/>
            <Route path='/Admin/Compte' render={props => <div><NavUser /><Compte /></div>}/>
        </div>
    )
}


const App = () => 
{
    
    var user = JSON.parse(sessionStorage.getItem("user"));

    if (user == null)
    {
        return (
            <Router>
                {visiteur()}
            </Router>
        )
    }else
    {
        return (

            <div>
                <Router>
                    {/* Visiteur : */}
                    { user.Roles === "visiteur" && visiteur()}
                    { user.Roles === "admin" && visiteur()}
                    { user.Roles === "candidat" && visiteur()} 
                    { user.Roles === "recruteur" && visiteur()}
                    
                    {/* Candidat routes */}
                    { user.Roles === "candidat" && candidat()}
    
                    {/* Recruteur routes */}
                    { user.Roles === "recruteur" && recruteur()}
    
                    {/* Admin routes */}
                    { user.Roles == "admin" && admin()}
                </Router>
            </div>
    
        );
    }
}

export default App;