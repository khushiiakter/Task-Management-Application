
import { CgProfile } from 'react-icons/cg';
import { FaBars, FaHome } from 'react-icons/fa';
import { Link} from 'react-router-dom';
import TaskBoard from './TaskBoard';


const Home = () => {
    return (
        <div className="drawer lg:drawer-open">
         
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    
          <div className="drawer-content flex flex-col ">
            <div className="border w-full flex items-center justify-between md:justify-end text-right px-8">
              <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden">
                <FaBars></FaBars>
              </label>
              
            </div>
            <div className="p-5 min-h-screen">
              <TaskBoard></TaskBoard>
            </div>
            
          </div>
    
          <div className="drawer-side ">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 font-medium text-lg  p-4 space-y-2 min-h-full w-64 ">
              {/* Sidebar content here */}
              <Link
                to="/"
                className="flex justify-center border-b-2 pb-1.5 items-center md:gap-1 "
              >
                {/* <img src={logo} className="h-7 md:block hidden" alt="" /> */}
                <p className="md:text-2xl text-lg font-bold">Taskify</p>
              </Link>
              
              <div className="divider"></div>
              <li>
                <Link to="/">
                  <FaHome></FaHome>
                  <span className="mx-4 font-medium">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/profilePage">
                <CgProfile />
                  <span className="mx-4 font-medium">Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
};

export default Home;