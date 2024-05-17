import SearchIcon from "../assets/search.svg";

function Search() {
    return (
        <div className="search">
            <input
                placeholder="Search for media"
                value="Media"
                onChange={(e) => console.log(e.target.value)}
            />
            <img
                src={SearchIcon}
                alt="Search"
                onChange={() => console.log("Search")}
            />
        </div>
    )
}

export default Search;