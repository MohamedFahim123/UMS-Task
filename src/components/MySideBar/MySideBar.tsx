import { AiOutlineHome } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaUsers } from 'react-icons/fa'
import { GrUserSettings } from 'react-icons/gr'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { NavLink } from 'react-router-dom';
import { TbLogout2 } from 'react-icons/tb'
import profile from '../../assets/images/sidebar/9c5672219055d43b0ffb2caf907f4b0d.jpeg';
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function MySideBar() {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapseSideBar = () => setCollapsed(!collapsed);
    const [hideCollapse, setHideCollapse] = useState(false);
    const { decodedToken } = useContext(AuthContext) || {};

    useEffect(() => {
        if (window.innerWidth <= 991) {
            setCollapsed(true);
        };
        if (window.innerWidth <= 600) {
            setHideCollapse(true);
        }else {
            setHideCollapse(false);
        }
    }, [window.innerWidth])

    return (
        <div className="sideBarContaienr position-relative">
            <Sidebar collapsed={collapsed}>
                {
                    !hideCollapse &&
                    <div className={`${collapsed ? 'iconCollapsed' : 'iconNotCollapsed'}`}>
                        {
                            collapsed ?
                                <FaArrowAltCircleRight className='cursorPointer' size={30} onClick={toggleCollapseSideBar} />
                                :
                                <FaArrowAltCircleLeft className='cursorPointer' size={30} onClick={toggleCollapseSideBar} />
                        }
                    </div>
                }
                <div className='text-center mb-5 sideBarHeader'>
                    <div className={`${collapsed ? 'collapsedImage' : 'w-50'} image m-auto mt-3`}>
                        <img src={decodedToken?.image ? decodedToken?.image : profile} alt='profile image' />
                    </div>
                    <h3>{(decodedToken?.firstName && decodedToken?.lastName) ? `${decodedToken?.firstName} ${decodedToken?.lastName}` : 'Karthi Madesh'}</h3>
                    <p>{decodedToken?.gender ? decodedToken?.gender : "Admin"}</p>
                </div>
                <Menu
                    className={`${collapsed ? 'p-0' : 'px-4'}`}
                >
                    <MenuItem icon={<AiOutlineHome size={30} />} component={<NavLink className={({ isActive }) => isActive ? `active` : ''} to="/dashboard/home" />}>Home</MenuItem>
                    <MenuItem icon={<FaUsers size={30} />} component={<NavLink className={({ isActive }) => isActive ? `active` : ''} to="/dashboard/users-list" />}>Users</MenuItem>
                    <MenuItem icon={<GrUserSettings size={30} />} component={<NavLink className={({ isActive }) => isActive ? `active` : ''} to="/dashboard/add-user" />}>Add User</MenuItem>
                    <MenuItem icon={<CgProfile size={30} />} component={<NavLink className={({ isActive }) => isActive ? `active` : ''} to="/dashboard/profile" />}>Profile</MenuItem>
                    <MenuItem icon={<TbLogout2 size={30} />} component={<NavLink className={({ isActive }) => isActive ? `active` : ''} to="/" />}>Logout</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}
