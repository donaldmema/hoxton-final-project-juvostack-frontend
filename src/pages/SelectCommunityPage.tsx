import "./SelectCommunityPage.css";
import { Link, useNavigate } from "react-router-dom";
import { SiNavBar } from "../components/SiNavBar";
import { useEffect } from "react";

type Props = {
  currentUser: any;
  signOut: () => void;
  allCommunities: any;
  setAllCommunities: any;
  setCurrentCommunity: any;
};

export function SelectCommunityPage({
  currentUser,
  signOut,
  allCommunities,
  setCurrentCommunity,
  setAllCommunities,
}: Props) {
  function handleClick() {
    let community = prompt("Please enter your community:");
    if (community != null) {
      setAllCommunities([...allCommunities, community]);
    }
  }

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate("/homepage");
  //   }
  // }, []);

  return (
    <div className="select-community-page-container">
      <SiNavBar currentUser={currentUser} signOut={signOut} />
      {/* <p>Current community: {community}</p> */}

      <div className="communities-section">
        <h4>
          What is today's <span className="keyword-colored">endeavor</span> ?
        </h4>

        {allCommunities.map((community: any) => (
          <Link key={community} to={"/community-questions"}>
            <button
              onClick={() => {
                setCurrentCommunity(community);
              }}
            >
              {community}
            </button>
          </Link>
        ))}

        <p className="select-community-p">
          Don't see your community? <br />
          <button onClick={handleClick}>Create one</button>
        </p>
      </div>

      <div></div>
    </div>
  );
}
