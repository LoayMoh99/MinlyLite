import { useState } from "react";
import SearchIcon from "../../assets/search.svg";
import './search.css';

function Search({ onSearch }: any) {
    const [search, setSearch] = useState<string>('');
    return (
        <div className="search">
            <input
                placeholder="Search for media"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <img
                src={SearchIcon}
                alt="Search"
                onChange={() => onSearch(search)}
            />
        </div>
    )
}

export default Search;