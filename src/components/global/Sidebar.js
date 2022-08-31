import { FaAlignJustify, FaAngleRight, FaUserShield, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
const Sidebar = () => {
    const { data: session } = useSession()
    let ruta = (str)=>{
        return str+"/"+session.username;
    }
    let ruta2 = (str1,str2)=>{
        return str1+"/"+session.username+"/"+str2;
    }
    return (
        <>
            <div className="sidebar-logo">
                <div className="logo">
                    <img src="/img/logo.png" width="60" height="60" />
                    <div className="sidebar-title">
                        Red de programación competitiva
                    </div>
                </div>
                <div id="menu-btn"><FaAlignJustify /></div>
            </div>
            <div className="sidebar-list">
                <ul>
                    <div className="spacer"></div>
                    <li>
                        <Link href="/createTeam">
                            <a>
                            <FaAngleRight id="sidebar-list-item" />
                            <span id="sidebar-link"> Crear equipo </span>
                            </a>
                        </Link>
                    </li>
                    <div className="spacer"></div>
                    <li>
                        <Link href= {"users/"+session.username+"/teams"}>
                            <a>
                            <FaAngleRight id="sidebar-list-item" />
                            <span id="sidebar-link"> Equipos </span>
                            </a>
                        </Link>
                    </li>
                    <div className="spacer"></div>
                    <li>
                        <Link href="/createCompetition">
                            <a>
                            <FaAngleRight id="sidebar-list-item" />
                            <span id="sidebar-link"> Crear Competencia </span>
                            </a>
                        </Link>
                    </li>
                    <div className="spacer"></div>
                    <li>
                        <Link href={ruta("/users")}>
                            <a>
                            <FaAngleRight id="sidebar-list-item" />
                            <span id="sidebar-link"> Usuarios </span>
                            </a>
                        </Link>
                    </li>
                    <div className="spacer"></div>
                    <li>
                        <Link href="/home/team/add">
                            <a>
                            <FaAngleRight id="sidebar-list-item" />
                            <span id="sidebar-link"> Agregar a Equipo </span>
                            </a>
                        </Link>
                    </li>
                    <div className="spacer"></div>
                    <li>
                        <Link href="/competitions/details">
                           <a>
                           <FaAngleRight id="sidebar-list-item" />
                            <span id="sidebar-link"> Detalles de competencias </span>
                           </a>
                        </Link>
                    </li>
                    <div className="spacer"></div>
                    <li>
                        <hr></hr>
                        <div className="footer">
                            <div className="user-logged">
                                <FaUserShield />  {session.username}
                            </div>

                            <div className="logout-block">
                                <button onClick={signOut} id="logout-btn"><p>signout <FaSignOutAlt /></p> </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar